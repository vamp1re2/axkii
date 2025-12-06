import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { createToken, setAuthCookie } from '@/lib/auth';
import { NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL);

export async function POST(request) {
  try {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await sql(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await sql(
      `INSERT INTO users (email, name, password)
       VALUES ($1, $2, $3)
       RETURNING id, email, name, createdAt`,
      [email, name, hashedPassword]
    );
    
    const user = result[0];

    // Create token
    const token = createToken(user.id, user.email, user.name);
    await setAuthCookie(token);

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
