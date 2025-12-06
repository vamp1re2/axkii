'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addGalleryImage, getGalleryImages, getGalleryImageData, deleteGalleryImage } from '@/lib/db';

export default function GalleryPage() {
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imageCache, setImageCache] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        try {
          const allImages = await getGalleryImages();
          setImages(allImages);
        } catch (error) {
          console.error('Error loading images:', error);
        }
      }
      setFetching(false);
    };

    loadData();
  }, [user]);

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      alert('Please select an image');
      return;
    }

    if (!caption.trim()) {
      alert('Please add a caption');
      return;
    }

    setLoading(true);
    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result;
        
        try {
          const newImage = await addGalleryImage(base64Data, caption, user.name, user.id);
          setImageCache({
            ...imageCache,
            [newImage.id]: base64Data
          });
          setImages([newImage, ...images]);
          setCaption('');
          if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image');
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image');
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (confirm('Delete this image?')) {
      try {
        await deleteGalleryImage(id);
        setImages(images.filter(img => img.id !== id));
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Failed to delete image');
      }
    }
  };

  const getImageData = async (id) => {
    if (imageCache[id]) return imageCache[id];
    try {
      const data = await getGalleryImageData(id);
      if (data) {
        setImageCache({ ...imageCache, [id]: data });
        return data;
      }
    } catch (error) {
      console.error('Error getting image data:', error);
    }
    return null;
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-2">📸 Our Gallery</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Our precious memories and moments
        </p>

        {/* Upload Image Form */}
        <div className="card mb-8" style={{ maxWidth: '500px' }}>
          <h2 className="text-2xl font-bold mb-4">Upload an Image</h2>
          <form onSubmit={handleUploadImage} className="space-y-4">
            <div className="form-group">
              <label className="form-label">Select Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="input-field"
                placeholder="Add a caption for this moment"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Memories</h2>
          {fetching ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading gallery...</div>
          ) : images.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              No images yet. Upload one to get started! 📷
            </div>
          ) : (
            <div className="grid-4">
              {images.map((image) => (
                <GalleryCard 
                  key={image.id} 
                  image={image} 
                  onDelete={handleDeleteImage}
                  onGetData={getImageData}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

function GalleryCard({ image, onDelete, onGetData }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const data = await onGetData(image.id);
      if (data) setImageSrc(data);
    };
    loadImage();
  }, [image.id, onGetData]);

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={image.caption}
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}
        />
      )}
      <h3 className="font-bold mb-1">{image.caption}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        by {image.uploadedby}
      </p>
      <button
        onClick={() => onDelete(image.id)}
        className="btn btn-secondary"
        style={{ fontSize: '0.9rem', width: '100%' }}
      >
        Delete
      </button>
    </div>
  );
}
