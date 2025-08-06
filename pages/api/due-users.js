
import { connectToDatabase } from '../../lib/mongodb';
import { isUserDue } from '../../utils/time';

const WEATHER_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Simple weather → tip mapping
function getWeatherTip(weatherMain) {
  const map = {
    Rain: '🌧 Carry an umbrella today!',
    Drizzle: '🌦 Light rain expected — keep a raincoat handy.',
    Thunderstorm: '⛈ Storm alert — avoid outdoor travel if possible.',
    Snow: '❄ Stay warm and be careful on slippery roads.',
    Clear: '☀ Enjoy the sunshine! Dont forget sunscreen.',
    Clouds: '☁ A cloudy day — good for outdoor walks.',
    Mist: '🌫 Drive carefully — low visibility ahead.',
    Haze: '🌫 Air quality may be poor, wear a mask outdoors.',
  };
  return map[weatherMain] || `🌡 Stay prepared for today's weather.`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();

    const RESEND_WINDOW_MS = 60 * 60 * 1000; // 1 hour
    const resendCutoffDate = new Date(Date.now() - RESEND_WINDOW_MS);

    // Fetch users who have never been emailed (field missing or null) or whose last email was >1 hour ago
    const users = await db
      .collection('users')
      .find({
        status: 'active',
        city: { $exists: true, $ne: '' },
        $or: [
          { last_email_sent: { $exists: false } },
          { last_email_sent: null },
          { last_email_sent: { $lt: resendCutoffDate } },
        ],
      })
      .toArray();

    // Filter users whose preferred time matches current time in timezone within tolerance
    const dueUsers = users.filter(user =>
      isUserDue(user.preferred_time, user.timezone)
    );

    console.log('Due users:', dueUsers.map(u => ({
      email: u.email,
      preferred_time: u.preferred_time,
      last_email_sent: u.last_email_sent,
      timezone: u.timezone,
    })));

    const results = [];
    for (const user of dueUsers) {
      try {
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            user.city
          )}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const weatherData = await weatherRes.json();

        if (weatherData.cod !== 200) {
          console.warn(`Weather API error for ${user.city}:`, weatherData.message);
          continue;
        }

        const weatherMain = weatherData.weather?.[0]?.main || 'Unknown';
        const temperature = weatherData.main?.temp ?? 'N/A';
        const tip = getWeatherTip(weatherMain);

        results.push({
          name: user.name || '',
          email: user.email,
          city: user.city,
          preferred_time: user.preferred_time,
          timezone: user.timezone,
          weather_condition: weatherMain,
          temperature_celsius: `${temperature}°C`,
          tip_message: tip,
          message_to_send: `Hi ${user.name || 'there'}, the weather in ${
            user.city
          } is ${weatherMain} (${temperature}°C). ${tip}`,
        });
      } catch (err) {
        console.error(`Error fetching weather for ${user.city}:`, err);
      }
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      due_users: results,
    });
  } catch (err) {
    console.error('Error in due-users:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
