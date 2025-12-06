import { neon } from '@neondatabase/serverless';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL);

export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;

    const result = await sql(
      `DELETE FROM songs 
       WHERE id = $1 AND userId = $2
       RETURNING *`,
      [id, user.userId]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: 'Song not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error deleting song:', error);
    return NextResponse.json({ error: 'Failed to delete song' }, { status: 500 });
  }
}
