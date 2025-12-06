'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-color"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container">
            <div className="text-center py-12">
                <h1 className="text-5xl font-bold mb-4">💕 Welcome to Our App</h1>
                <p className="text-xl text-text-secondary mb-8">
                    A special place just for us to share music, memories, and love
                </p>

                <div className="grid grid-1 md:grid-2 lg:grid-3 gap-6 mt-12">
                    <Link href="/music" className="card">
                        <div className="text-4xl mb-2">🎵</div>
                        <h3 className="text-xl font-bold mb-2">Music</h3>
                        <p>Share and play our favorite songs</p>
                    </Link>

                    <Link href="/gallery" className="card">
                        <div className="text-4xl mb-2">📸</div>
                        <h3 className="text-xl font-bold mb-2">Gallery</h3>
                        <p>Our precious memories and moments</p>
                    </Link>

                    <Link href="/chat" className="card">
                        <div className="text-4xl mb-2">💬</div>
                        <h3 className="text-xl font-bold mb-2">Chat</h3>
                        <p>Send messages anytime, anywhere</p>
                    </Link>

                    <Link href="/games" className="card">
                        <div className="text-4xl mb-2">🎮</div>
                        <h3 className="text-xl font-bold mb-2">Games</h3>
                        <p>Play mini games together</p>
                    </Link>

                    <Link href="/extra" className="card">
                        <div className="text-4xl mb-2">✨</div>
                        <h3 className="text-xl font-bold mb-2">Extra</h3>
                        <p>Love notes and special surprises</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
