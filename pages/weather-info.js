import Link from 'next/link';
import '../styles/weatherInfo.css';

export default function WeatherInfo() {
  return (
    <>
      {/* Floating Weather Icons in Background */}
      <div className="weather-icons">
        <div className="weather-icon">☁</div>
        <div className="weather-icon">🌞</div>
        <div className="weather-icon">🌧</div>
        <div className="weather-icon">🌈</div>
      </div>

      {/* Main Content */}
      <div className="info-wrapper">
        <header className="info-header">
          <h1>🌦 Stay Weather-Smart</h1>
          <p>
            Your daily dose of climate wisdom, tips, and insights to thrive in all
            kinds of weather — because preparedness is power.
          </p>
        </header>

        <main className="info-content">
          {/* Why it matters */}
          <section>
            <h2>Why Staying Updated on Weather Matters</h2>
            <p>
              Weather impacts everything — from your daily commute to your mood.
              Understanding and anticipating it can help you make better
              decisions, protect your health, and improve your productivity.
            </p>
            <p>
              Think about it: missing a sudden downpour warning might mean
              getting drenched on your way to work, ruining documents, or even
              catching a cold. A timely update could save you time, money, and
              stress.
            </p>
          </section>

          {/* Quick Tips */}
          <section>
            <h2>Quick Tips for Every Season</h2>
            <ul>
              <li>
                <strong>Summer:</strong> Stay hydrated, wear breathable clothing,
                apply sunscreen, and avoid outdoor activity during peak heat
                hours (12 PM – 3 PM).
              </li>
              <li>
                <strong>Rainy Season:</strong> Keep an umbrella or raincoat handy,
                wear waterproof footwear, and beware of slippery roads.
              </li>
              <li>
                <strong>Winter:</strong> Dress in layers, wear gloves, and
                maintain good indoor heating.
              </li>
              <li>
                <strong>Spring:</strong> Enjoy the weather, but be mindful of
                pollen if you have allergies — consider wearing a mask or using
                air purifiers.
              </li>
            </ul>
          </section>

          {/* Educational - How Weather Works */}
          <section>
            <h2>Understanding Weather Basics</h2>
            <p>
              Weather is the short-term atmospheric condition at a particular
              place and time. It includes temperature, humidity, precipitation,
              wind speed, and visibility. Changes in weather are caused by
              interactions between the Earth's atmosphere, oceans, and land
              surfaces.
            </p>
            <p>Key factors influencing weather:</p>
            <ul>
              <li>Solar radiation — heats the Earth unevenly.</li>
              <li>Earth’s rotation — creates wind patterns.</li>
              <li>Water bodies — moderate temperatures and influence rain.</li>
              <li>Altitude — higher altitudes are generally cooler.</li>
            </ul>
          </section>

          {/* Motivational */}
          <section>
            <h2>Weather Preparedness = Life Preparedness</h2>
            <p>
              Being weather-smart isn't just about avoiding discomfort — it's
              about building resilience. Preparedness is a mindset that
              translates to every area of life: knowing what's ahead and taking
              proactive steps.
            </p>
            <blockquote>
              “There's no such thing as bad weather, only inappropriate clothing.”
              — Alfred Wainwright
            </blockquote>
          </section>

          {/* Climate Change Impact */}
          <section>
            <h2>How Climate Change is Changing the Rules</h2>
            <p>
              Climate change is intensifying extreme weather events: heat waves
              are hotter, storms are stronger, and floods are more frequent. This
              means traditional seasonal expectations are less reliable.
            </p>
            <p>Recent examples include:</p>
            <ul>
              <li>
                Record-breaking temperatures in Europe and Asia in the past
                decade.
              </li>
              <li>
                Unseasonal heavy rainfall causing urban flooding in major
                cities.
              </li>
              <li>
                Extended wildfire seasons due to prolonged droughts.
              </li>
            </ul>
          </section>

          {/* Preparedness Guides */}
          <section>
            <h2>Your All-Weather Preparedness Guide</h2>
            <p>
              Here's how to stay safe, comfortable, and productive in any
              condition:
            </p>
            <ul>
              <li>
                <strong>Always check daily forecasts</strong> before leaving home.
              </li>
              <li>
                <strong>Have a go-bag</strong> with essentials (water, snacks,
                power bank, small first aid kit).
              </li>
              <li>
                <strong>Weather-proof your home</strong> — fix leaks, seal
                windows, secure outdoor furniture.
              </li>
              <li>
                <strong>Sign up for alerts</strong> from reliable sources.
              </li>
            </ul>
          </section>

          {/* Global Weather Stories */}
          <section>
            <h2>Remarkable Weather Events in History</h2>
            <p>
              Learning from the past helps us prepare for the future. Some notable
              events:
            </p>
            <ul>
              <li>
                <strong>1931 China floods</strong> — the deadliest natural disaster
                in recorded history.
              </li>
              <li>
                <strong>2003 European heatwave</strong> — led to over 70,000 deaths
                across the continent.
              </li>
              <li>
                <strong>2010 Pakistan floods</strong> — affected over 20 million
                people.
              </li>
              <li>
                <strong>2020 Australian bushfires</strong> — burned over 46
                million acres.
              </li>
            </ul>
          </section>

          {/* Sustainable Living */}
          <section>
            <h2>Small Actions, Big Climate Impact</h2>
            <p>
              Fighting climate change and adapting to it starts with everyday
              actions:
            </p>
            <ul>
              <li>Use energy-efficient appliances.</li>
              <li>Reduce single-use plastics.</li>
              <li>Plant trees or support reforestation projects.</li>
              <li>Opt for public transport, cycling, or walking.</li>
            </ul>
          </section>

          {/* Live Facts Placeholder */}
          <section>
            <h2>🌍 Live Weather Facts</h2>
            <p>
              Soon, we'll integrate real-time weather API data here — so you can
              not only read but also see live conditions from different cities
              worldwide.
            </p>
          </section>

          {/* Closing CTA */}
          <section className="cta-section">
            <h3>💡 Ready to receive daily personalized tips?</h3>
            <Link href="/signup" className="cta-link">
              Sign Up Now
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
