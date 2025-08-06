
import { connectToDatabase } from '../../lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, preferred_time, timezone, city } = req.body;

  if (!email || !preferred_time || !timezone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { db } = await connectToDatabase();
    const users = db.collection('users');

    const existing = await users.findOne({ email });
    if (existing && existing.status !== 'inactive') {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user_id = uuidv4();
    const dashboard_token = jwt.sign(
      { user_id },
      process.env.JWT_SECRET,
      { expiresIn: '365d' }
    );
    const dashboard_url = `${process.env.NEXT_PUBLIC_BASE_URL}?token=${dashboard_token}`;

    const now = new Date();

    await users.insertOne({
      user_id,
      name: name || '',
      email,
      preferred_time,
      timezone,
      city: city || '',
      status: 'active',
      created_at: now,
      updated_at: now,
      dashboard_token,
      error_count: 0,
    });

    return res.status(200).json({
      message: 'Signup successful!',
      dashboard_url,
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
