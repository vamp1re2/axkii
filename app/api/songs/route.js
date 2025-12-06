import { neon } from '@neondatabase/serverless';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL);

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name, url, uploadedBy } = await request.json();

    const result = await sql(
      `INSERT INTO songs (name, url, uploadedBy, userId)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, url, uploadedBy, user.userId]
    );

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error adding song:', error);
    return NextResponse.json({ error: 'Failed to add song' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const songs = await sql(`SELECT * FROM songs ORDER BY createdAt DESC`);
    return NextResponse.json(songs);
  } catch (error) {
    console.error('Error getting songs:', error);
    return NextResponse.json({ error: 'Failed to get songs' }, { status: 500 });
  }
}
