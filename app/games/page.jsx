'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function GamesPage() {
  const { user } = useAuth();
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [gameTime, setGameTime] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  const handleClick = () => {
    if (gameActive) {
      setScore(score + 1);
    }
  };

  const startGame = () => {
    setScore(0);
    setGameActive(true);
    setGameTime(30);
    setGameStarted(true);

    const interval = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetGame = () => {
    setScore(0);
    setGameActive(true);
    setGameTime(30);
    setGameStarted(false);
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="text-4xl font-bold mb-2">🎮 Mini Click Game</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Click as many times as you can in 30 seconds!
          </p>

          <div className="card" style={{ padding: '3rem', marginBottom: '2rem' }}>
            {!gameStarted ? (
              <>
                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                  Ready to test your clicking skills? 🚀
                </p>
                <button
                  onClick={startGame}
                  className="btn btn-primary"
                  style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
                >
                  Start Game
                </button>
              </>
            ) : (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Time Remaining
                  </div>
                  <div style={{ fontSize: '3rem', fontWeight: 'bold', color: gameTime <= 5 ? '#ef4444' : 'var(--accent-color)' }}>
                    {gameTime}s
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Your Score
                  </div>
                  <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                    {score}
                  </div>
                </div>

                <button
                  onClick={handleClick}
                  disabled={!gameActive}
                  style={{
                    width: '100%',
                    padding: '3rem 1rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    backgroundColor: gameActive ? 'var(--accent-color)' : 'var(--border-color)',
                    color: gameActive ? 'white' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: gameActive ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    transform: gameActive ? 'scale(1)' : 'scale(0.95)'
                  }}
                  onMouseDown={(e) => {
                    if (gameActive) {
                      e.currentTarget.style.transform = 'scale(0.95)';
                    }
                  }}
                  onMouseUp={(e) => {
                    if (gameActive) {
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  {gameActive ? '👆 CLICK ME!' : '⏱️ Game Over!'}
                </button>

                {!gameActive && (
                  <>
                    <div style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                        Great effort! You scored <strong style={{ color: 'var(--accent-color)' }}>{score}</strong> clicks!
                      </p>
                    </div>
                    <button
                      onClick={startGame}
                      className="btn btn-primary"
                      style={{ width: '100%', marginRight: '0.5rem' }}
                    >
                      Play Again
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          <div className="card" style={{ textAlign: 'left' }}>
            <h3 className="font-bold mb-2">How to Play:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>👉 Click the button as fast as you can</li>
              <li style={{ marginBottom: '0.5rem' }}>⏱️ You have 30 seconds</li>
              <li>🏆 Try to beat your high score!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
