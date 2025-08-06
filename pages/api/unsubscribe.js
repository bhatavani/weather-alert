
import { connectToDatabase } from '../../lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Missing token' });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const { user_id } = payload;
  if (!user_id) {
    return res.status(400).json({ error: 'Malformed token payload' });
  }

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('users').updateOne(
      { user_id },
      {
        $set: {
          status: 'inactive',
          name: '',
          preferred_time: '',
          timezone: '',
          city: '',
          updated_at: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'User not found or already unsubscribed' });
    }

    return res.status(200).json({ message: 'You have unsubscribed and your preferences have been cleared.' });
  } catch (err) {
    console.error('Unsubscribe error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
