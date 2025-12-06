'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  if (user) {
    router.push('/');
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to login');
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUser(data.user);
      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', margin: '0 1rem' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">💕 Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Login to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-6"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
