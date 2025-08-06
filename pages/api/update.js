
import { connectToDatabase } from '../../lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, name, preferred_time, timezone, city } = req.body;
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

  // Build update document only with provided fields
  const updateFields = { updated_at: new Date() };
  if (name !== undefined) updateFields.name = name;
  if (preferred_time !== undefined) updateFields.preferred_time = preferred_time;
  if (timezone !== undefined) updateFields.timezone = timezone;
  if (city !== undefined) updateFields.city = city;

  try {
    const { db } = await connectToDatabase();
    const users = db.collection('users');

    const existing = await users.findOne({ user_id });
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Apply update
    await users.updateOne({ user_id }, { $set: updateFields });

    // Return updated summary (excluding sensitive token)
    const updated = await users.findOne(
      { user_id },
      { projection: { dashboard_token: 0, error_count: 0 } }
    );

    return res.status(200).json({ message: 'Updated successfully', user: updated });
  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
