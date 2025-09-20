import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, FileText, X } from 'lucide-react';
import { generateMockResult } from '../utils/mockData';
import { getRandomDelay } from '../utils/helpers';

import axios from 'axios'; 

// A simple spinner for the loading state
const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const handleFile = (file) => {
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit. Please choose a smaller file.");
      return;
    }

    //the file duration must not exceed 30 seconds for videos
    if (event.target.files[0].type.startsWith('video/')) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(event.target.files[0]);
      video.onloadedmetadata = () => {
        if (video.duration > 30) {
          alert("Video duration exceeds 30 seconds. Please choose a shorter video.");
          return;
        }
      };
    }

    if (event.target.files && event.target.files.length > 0 ) {
      handleFile(event.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
  };

  // Drag and Drop Handlers
  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
 const handleAnalyze = async () => {
  if (!selectedFile) return;
  setIsProcessing(true);

  try {
    // Choose endpoint based on file type
    const fileType = selectedFile.type.startsWith('image/') ? 'image' : 'video';
    const endpoint =
      fileType === 'image'
        ? 'http://127.0.0.1:8000/predict/image'
        : 'http://127.0.0.1:8000/predict/video';

    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await axios.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const apiResult = response.data;

    // Prepare object for ResultsPage
    const result = {
      id: Date.now(), // unique id for route
      fileName: selectedFile.name,
      fileUrl: fileType === 'image' ? URL.createObjectURL(selectedFile) : null,
      sourceType: fileType,
      // map API values
      status:
        apiResult.result.toLowerCase() === 'fake'
          ? 'deepfake'
          : 'authentic',
      confidence: 1 - apiResult.score, // if your model outputs Fake prob, Real = 1-score
      raw: apiResult,
    };

    navigate(`/results/${result.id}`, { state: { result } });
  } catch (error) {
    alert('Error analyzing file. Check the backend logs.');
    console.error(error);
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 text-center">
        
        <h1 className="text-4xl font-bold">
          Analyze Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Media</span>
        </h1>
        <p className="mt-4 text-lg text-white/70">
          Upload a file to check for deepfake manipulation.
        </p>

        <div className="mt-12">
          <div
            onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
            className={`p-8 bg-gray-800/50 border-2 border-dashed rounded-lg transition-colors duration-300 ${isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700'}`}
          >
            <input
              id="file-upload" type="file" ref={inputFileRef} className="hidden" onChange={handleFileChange} accept="image/*,video/*"
            />
            {selectedFile ? (
              <div>
                <div className="flex items-center justify-center font-medium">
                  <FileText size={20} className="text-purple-400 mr-2"/>
                  <span className="truncate">{selectedFile.name}</span>
                </div>
                <div className="mt-4 flex justify-center items-center gap-4">
                  <label htmlFor="file-upload" className="text-sm cursor-pointer text-blue-400 hover:underline">Change file</label>
                  <button onClick={clearFile} className="text-sm text-red-500 hover:text-red-400">Remove</button>
                </div>
              </div>
            ) : (
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <UploadIcon size={32} className="mb-4 text-gray-400" />
                <p className="font-semibold text-white">Drag & drop or click to upload</p>
                <p className="text-sm text-gray-500 mt-2">Images and videos up to 10MB</p>
                <p className='text-sm text-gray-500 mt-1'>(Videos must be under 30 seconds)</p>
              </label>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isProcessing}
            className="w-full inline-flex items-center justify-center text-white text-lg tracking-wide px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing && <Spinner />}
            {isProcessing ? 'Analyzing...' : 'Analyze for Deepfakes'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default UploadPage;