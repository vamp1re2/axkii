// Client-side API wrappers for database operations

export async function addSong(name, url, uploadedBy, userId) {
  const res = await fetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, url, uploadedBy, userId })
  });
  if (!res.ok) throw new Error('Failed to add song');
  return res.json();
}

export async function getSongs() {
  const res = await fetch('/api/songs');
  if (!res.ok) throw new Error('Failed to get songs');
  return res.json();
}

export async function deleteSong(id) {
  const res = await fetch(`/api/songs/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete song');
}

export async function addGalleryImage(imageData, caption, uploadedBy, userId) {
  const res = await fetch('/api/gallery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageData, caption, uploadedBy, userId })
  });
  if (!res.ok) throw new Error('Failed to upload image');
  return res.json();
}

export async function getGalleryImages() {
  const res = await fetch('/api/gallery');
  if (!res.ok) throw new Error('Failed to get images');
  return res.json();
}

export async function getGalleryImageData(id) {
  const res = await fetch(`/api/gallery/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.imageData;
}

export async function deleteGalleryImage(id) {
  const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete image');
}

export async function addMessage(content, sender, senderId) {
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, sender, senderId })
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}

export async function getMessages() {
  const res = await fetch('/api/messages');
  if (!res.ok) throw new Error('Failed to get messages');
  return res.json();
}
