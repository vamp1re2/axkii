import { neon } from '@neondatabase/serverless';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL);

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { content } = await request.json();

    const result = await sql(
      `INSERT INTO messages (content, sender, senderId)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [content, user.name || user.email, user.userId]
    );

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json({ error: 'Failed to add message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await sql(`SELECT * FROM messages ORDER BY timestamp ASC`);
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    return NextResponse.json({ error: 'Failed to get messages' }, { status: 500 });
  }
}
