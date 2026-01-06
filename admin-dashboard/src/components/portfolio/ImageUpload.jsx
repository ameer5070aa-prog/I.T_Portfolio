import React, { useState, useRef } from 'react';

export default function ImageUpload({ currentImage, onUpload, label = "Upload Image", accept = "image/*" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const imageUrl = `http://localhost:3001${data.url}`;
      setPreview(imageUrl);
      onUpload(imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      
      <div
        className={`border rounded p-3 text-center ${dragActive ? 'border-primary bg-light' : 'border-secondary'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{ cursor: 'pointer', minHeight: '150px', position: 'relative' }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          disabled={uploading}
        />

        {uploading ? (
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '120px' }}>
            <div className="spinner-border text-primary mb-2" role="status">
              <span className="visually-hidden">Uploading...</span>
            </div>
            <small className="text-muted">Uploading and optimizing...</small>
          </div>
        ) : preview ? (
          <div className="d-flex flex-column align-items-center">
            <img
              src={preview}
              alt="Preview"
              className="img-thumbnail mb-2"
              style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
            />
            <small className="text-muted">Click or drag to change image</small>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '120px' }}>
            <i className="ti ti-cloud-upload display-4 text-muted mb-2"></i>
            <p className="mb-1">Click to upload or drag and drop</p>
            <small className="text-muted">PNG, JPG, WebP up to 10MB</small>
          </div>
        )}
      </div>
    </div>
  );
}
