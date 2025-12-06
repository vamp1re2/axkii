'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addSong, getSongs, deleteSong } from '@/lib/db';

export default function MusicPage() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          const allSongs = await getSongs();
          setSongs(allSongs);
        } catch (error) {
          console.error('Error loading songs:', error);
        }
      }
      setFetching(false);
    };

    loadData();
  }, [user]);

  const handleAddSong = async (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const newSong = await addSong(name, url, user.name, user.id);
      setSongs([newSong, ...songs]);
      setName('');
      setUrl('');
    } catch (error) {
      console.error('Error adding song:', error);
      alert('Failed to add song');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSong = async (id) => {
    if (confirm('Delete this song?')) {
      try {
        await deleteSong(id);
        setSongs(songs.filter(song => song.id !== id));
      } catch (error) {
        console.error('Error deleting song:', error);
        alert('Failed to delete song');
      }
    }
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-2">🎵 Our Music</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Share and play your favorite songs together
        </p>

        {/* Add Song Form */}
        <div className="card mb-8" style={{ maxWidth: '500px' }}>
          <h2 className="text-2xl font-bold mb-4">Add a Song</h2>
          <form onSubmit={handleAddSong} className="space-y-4">
            <div className="form-group">
              <label className="form-label">Song Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="e.g., Our Favorite Song"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Song URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="input-field"
                placeholder="https://example.com/song.mp3"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Song'}
            </button>
          </form>
        </div>

        {/* Songs List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Playlist</h2>
          {fetching ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading songs...</div>
          ) : songs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              No songs yet. Add one to get started! 🎶
            </div>
          ) : (
            <div className="space-y-4">
              {songs.map((song) => (
                <div key={song.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 className="text-xl font-bold">{song.name}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Added by {song.uploadedby}
                      </p>
                    </div>
                  </div>

                  <audio controls style={{ width: '100%', marginBottom: '1rem' }}>
                    <source src={song.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>

                  <button
                    onClick={() => handleDeleteSong(song.id)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
