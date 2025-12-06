import { neon } from '@neondatabase/serverless';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL);

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { imageData, caption, uploadedBy } = await request.json();

    const result = await sql(
      `INSERT INTO gallery_images (imageData, caption, uploadedBy, userId)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [imageData, caption, uploadedBy, user.userId]
    );

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error adding image:', error);
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const images = await sql(`SELECT * FROM gallery_images ORDER BY createdAt DESC`);
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error getting images:', error);
    return NextResponse.json({ error: 'Failed to get images' }, { status: 500 });
  }
}
