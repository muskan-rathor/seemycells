import React, { useState, useRef } from 'react';
import './upload.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { MdUpload, MdCancel, MdCheckCircle, MdPerson } from 'react-icons/md';
import { RotatingLines } from 'react-loader-spinner';

export default function Upload() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [patientName, setPatientName] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB.');
      return;
    }

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    if (!patientName.trim()) {
      alert('Please enter patient name!');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('patientName', patientName);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        alert(`Analysis error: ${data.error}`);
      } else {
        navigate('/result', { 
          state: { 
            result: data,
            originalImage: previewUrl,
            patientName: patientName 
          } 
        });
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert(`Analysis failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-container">
        <h2>Upload Blood Smear Image for Analysis</h2>
        <p className="upload-subtitle">
          Get instant AI-powered blood cell analysis with detailed results
        </p>

        {/* Patient Name Input */}
        <div className="patient-name-input">
          <div className="input-group">
            <MdPerson className="input-icon" size={20} />
            <input
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>

        <label 
          className={`upload-drop-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          htmlFor="file-upload"
        >
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            hidden
            disabled={loading}
          />
          <div className="upload-box">
            <MdUpload className="upload-icon" size={48} />
            <div>
              <p className="upload-instruction">
                {dragActive ? 'Drop your image here' : 'Click to browse or drag & drop'}
              </p>
              <p className="upload-requirements">
                Supported formats: JPG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        </label>

        {previewUrl && (
          <div className="preview-container">
            <div className="preview-header">
              <h3>Image Preview</h3>
              <button 
                className="preview-clear" 
                onClick={handleCancel}
                disabled={loading}
              >
                <MdCancel size={20} />
              </button>
            </div>
            <div className="preview">
              <img src={previewUrl} alt="Upload preview" />
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-indicator">
            <RotatingLines
              strokeColor="#23C8AC"
              strokeWidth="5"
              animationDuration="0.75"
              width="48"
              visible={true}
            />
            <p>Analyzing your blood smear image...</p>
          </div>
        )}

        <div className="action-buttons">
          <button 
            className="cancel-button" 
            onClick={handleCancel} 
            disabled={loading || !image}
          >
            <MdCancel className="button-icon" />
            Clear
          </button>
          <button 
            className={`continue-button ${!image || !patientName.trim() ? 'disabled' : ''}`}
            onClick={handleUpload}
            disabled={loading || !image || !patientName.trim()}
          >
            {loading ? (
              <>
                <span className="button-loading">
                  <RotatingLines width="20" />
                </span>
                Processing...
              </>
            ) : (
              <>
                <MdCheckCircle className="button-icon" />
                Analyze Image
              </>
            )}
          </button>
        </div>

        <div className="upload-tips">
          <h4>For Best Results:</h4>
          <ul>
            <li>Use microscope images at 40x-100x magnification</li>
            <li>Ensure good lighting and focus</li>
            <li>Avoid blurry or overexposed images</li>
            <li>Crop to include only the blood smear area</li>
          </ul>
        </div>
      </div>
    </>
  );
}