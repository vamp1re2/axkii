import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function createToken(userId, email, name) {
  return jwt.sign(
    { userId, email, name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token) {
  try {
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
  } catch (error) {
    console.error('Error setting auth cookie:', error);
  }
}

export async function getAuthToken() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('auth_token')?.value;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export async function clearAuthCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
  } catch (error) {
    console.error('Error clearing auth cookie:', error);
  }
}

export async function getCurrentUser() {
  try {
    const token = await getAuthToken();
    if (!token) return null;
    return verifyToken(token);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
