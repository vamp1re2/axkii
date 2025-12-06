'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addMessage, getMessages } from '@/lib/db';

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          const allMessages = await getMessages();
          setMessages(allMessages);
        } catch (error) {
          console.error('Error loading messages:', error);
        }
      }
      setFetching(false);
    };

    loadData();

    // Poll for new messages every 2 seconds
    const interval = setInterval(async () => {
      if (user) {
        try {
          const allMessages = await getMessages();
          setMessages(allMessages);
        } catch (error) {
          console.error('Error refreshing messages:', error);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const newMessage = await addMessage(content, user.name, user.id);
      setMessages([...messages, newMessage]);
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)' }}>
      <h1 className="text-4xl font-bold mb-2">💬 Our Chat</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Send messages anytime
        </p>

        {/* Messages Container */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-color)'
          }}
        >
          {fetching ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              No messages yet. Start the conversation! 💕
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: msg.sender === user.name ? 'var(--accent-color)' : 'var(--card-bg)',
                    color: msg.sender === user.name ? 'white' : 'var(--text-primary)',
                    borderRadius: '0.5rem',
                    maxWidth: '70%',
                    marginLeft: msg.sender === user.name ? 'auto' : '0',
                    marginRight: msg.sender === user.name ? '0' : 'auto'
                  }}
                >
                  <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>
                    {msg.sender}
                  </p>
                  <p style={{ marginBottom: '0.25rem' }}>{msg.content}</p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field"
            placeholder="Type your message..."
            style={{ flex: 1 }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !content.trim()}
          >
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    );
  }
