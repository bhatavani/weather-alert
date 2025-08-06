
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { db } = await connectToDatabase();

    await db.collection('users').updateOne(
      { email },
      {
        $set: {
          last_email_sent: new Date(),
          updated_at: new Date(),
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Email marked as sent',
    });
  } catch (error) {
    console.error('Mark sent error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

