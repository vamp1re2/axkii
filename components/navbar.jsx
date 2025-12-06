'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

function NavbarContent() {
  const { user, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          💕 Our App
        </Link>

        <div className="navbar-menu">
          <Link href="/music" className="nav-link">
            🎵 Music
          </Link>
          <Link href="/gallery" className="nav-link">
            📸 Gallery
          </Link>
          <Link href="/chat" className="nav-link">
            💬 Chat
          </Link>
          <Link href="/games" className="nav-link">
            🎮 Games
          </Link>
          <Link href="/extra" className="nav-link">
            ✨ Extra
          </Link>
        </div>

        <div className="navbar-controls">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <NavbarContent />;
}
