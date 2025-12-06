import { neon } from '@neondatabase/serverless';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  try {
    const payload = await getCurrentUser();
    
    if (!payload) {
      return NextResponse.json(null, { status: 401 });
    }

    const users = await sql(
      `SELECT id, email, name, createdAt FROM users WHERE id = $1`,
      [payload.userId]
    );
    
    const user = users[0];
    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}
