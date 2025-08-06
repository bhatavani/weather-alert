
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, from } = req.query; // optional `from` param
  if (!token) {
    return res.status(400).json({ valid: false, error: 'Missing token' });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ valid: false, error: 'Invalid or expired token' });
  }

  const { user_id } = payload;
  if (!user_id) {
    return res.status(400).json({ valid: false, error: 'Malformed token payload' });
  }

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne(
      { user_id },
      { projection: { _id: 0, error_count: 0 } }
    );

    if (!user) {
      return res.status(404).json({ valid: false, error: 'User not found' });
    }

    // Only include dashboard_url if not already on dashboard
    let dashboard_url = null;
    if (from !== 'dashboard') {
      dashboard_url = `${process.env.NEXT_PUBLIC_BASE_URL}/?token=${user.dashboard_token}`;
    }

    delete user.dashboard_token;

    return res.status(200).json({
      valid: true,
      user: {
        ...user,
        ...(dashboard_url ? { dashboard_url } : {}), // add only if available
      },
    });
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({ valid: false, error: 'Internal server error' });
  }
}
