'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const loveNotes = [
  {
    emoji: '💕',
    title: 'Why I Love You',
    content: 'You make every day special just by being you. Your smile brightens my darkest days, and your laugh is my favorite sound.'
  },
  {
    emoji: '🌟',
    title: 'Our Adventure',
    content: 'Every moment with you is an adventure. Whether we\'re doing something exciting or just sitting quietly together, it\'s perfect because you\'re there.'
  },
  {
    emoji: '🎭',
    title: 'You Complete Me',
    content: 'I didn\'t know what was missing in my life until I met you. You fill my heart with love, joy, and endless possibilities.'
  },
  {
    emoji: '🎵',
    title: 'Our Love Song',
    content: 'If our love was a song, it would be the most beautiful melody ever created. Every note, every beat, every moment with you is music to my ears.'
  },
  {
    emoji: '🌹',
    title: 'Forever and Always',
    content: 'I promise to love you forever. Through the ups and downs, the laughter and tears, I\'ll always be here for you.'
  },
  {
    emoji: '✨',
    title: 'You\'re Magic',
    content: 'There\'s something magical about you. The way you make me feel, the way you care, the way you love - it\'s pure magic.'
  },
  {
    emoji: '🌈',
    title: 'Colors of Love',
    content: 'You add so many colors to my life. Every moment with you is brighter, warmer, and more beautiful than before.'
  },
  {
    emoji: '💎',
    title: 'My Treasure',
    content: 'You\'re more precious to me than any treasure in the world. You\'re my greatest blessing, my answered prayer, my forever person.'
  }
];

const surprises = [
  {
    emoji: '🎉',
    title: 'Remember When...',
    content: 'Let\'s create more amazing memories together. Every moment with you becomes a cherished memory I want to relive forever.'
  },
  {
    emoji: '🎁',
    title: 'A Little Gift',
    content: 'Sometimes the best gifts aren\'t wrapped. Your love is the greatest gift I could ever receive. Thank you for being mine.'
  },
  {
    emoji: '🌙',
    title: 'Under the Stars',
    content: 'Looking at the stars reminds me of you - beautiful, bright, and absolutely breathtaking. I love you to the moon and back.'
  },
  {
    emoji: '❤️',
    title: 'Open Your Heart',
    content: 'This is a space where love lives. A sanctuary just for us, where we can share our dreams, fears, and endless love.'
  }
];

export default function ExtraPage() {
  const { user } = useAuth();
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-4xl font-bold mb-2">✨ Love & Surprises</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Special moments, sweet words, and little surprises just for us
          </p>
        </div>

        {/* Love Notes Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ textAlign: 'center' }}>💕 Love Notes</h2>
          <div className="grid-2">
            {loveNotes.map((note, index) => (
              <div
                key={index}
                className="card"
                onClick={() => setSelectedNote(note)}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{note.emoji}</div>
                <h3 className="text-xl font-bold">{note.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Surprises Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 className="text-3xl font-bold mb-4" style={{ textAlign: 'center' }}>🎁 Surprises</h2>
          <div className="grid-2">
            {surprises.map((surprise, index) => (
              <div
                key={index}
                className="card"
                onClick={() => setSelectedNote(surprise)}
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{surprise.emoji}</div>
                <h3 className="text-xl font-bold">{surprise.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Selected Note */}
        {selectedNote && (
          <div
            onClick={() => setSelectedNote(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <div
              className="card"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '500px',
                width: '90%',
                padding: '2rem',
                animation: 'fadeIn 0.3s ease'
              }}
            >
              <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>
                {selectedNote.emoji}
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ textAlign: 'center' }}>
                {selectedNote.title}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: 'var(--text-primary)',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                {selectedNote.content}
              </p>
              <button
                onClick={() => setSelectedNote(null)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
