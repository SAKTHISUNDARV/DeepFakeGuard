import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image, Video, Upload, Check, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import FileUploader from '../components/FileUploader';
import { generateMockResult } from '../utils/mockData';
import { getRandomDelay } from '../utils/helpers';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const handleFileSelected = (file) => {
    setSelectedFile(file);
    
    if (file.type.startsWith('image/')) {
      setFileType('image');
    } else if (file.type.startsWith('video/')) {
      setFileType('video');
    }
  };
  
  const handleAnalyze = async () => {
    if (!selectedFile || !fileType) return;
    
    setIsProcessing(true);
    
    // Simulating API call with a delay
    setTimeout(() => {
      const result = generateMockResult(fileType, selectedFile.name);
      setIsProcessing(false);
      navigate(`/results/${result.id}`, { state: { result } });
    }, getRandomDelay(2000, 4000));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Upload Media for Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload an image or video to analyze it for potential deepfake manipulation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <UploadOption
            title="Image Analysis"
            description="Upload photos to detect face manipulation"
            icon={<Image size={24} />}
            active={fileType === 'image'}
            onClick={() => setFileType('image')}
          />
          <UploadOption
            title="Video Analysis"
            description="Upload videos to detect deepfake content"
            icon={<Video size={24} />}
            active={fileType === 'video'}
            onClick={() => setFileType('video')}
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload Your File</CardTitle>
            <CardDescription>
              Files are analyzed securely and privately. Maximum size: 10MB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader
              onFileSelected={handleFileSelected}
              accept={{
                'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
                'video/*': ['.mp4', '.webm', '.mov']
              }}
              maxSize={10 * 1024 * 1024} // 10MB
            />
            
            <div className="mt-6 flex justify-end">
              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || isProcessing}
                isLoading={isProcessing}
                className="w-full sm:w-auto"
              >
                {isProcessing ? 'Analyzing...' : 'Analyze for Deepfakes'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What We Check For</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureItem
              icon={<Check className="h-5 w-5 text-green-500" />}
              title="Face Manipulation"
              description="Detects face swaps and facial feature edits"
            />
            <FeatureItem
              icon={<Check className="h-5 w-5 text-green-500" />}
              title="Inconsistent Lighting"
              description="Identifies lighting inconsistencies"
            />
            <FeatureItem
              icon={<Check className="h-5 w-5 text-green-500" />}
              title="Unnatural Expressions"
              description="Flags expressions that appear artificial"
            />
            <FeatureItem
              icon={<Check className="h-5 w-5 text-green-500" />}
              title="Digital Artifacts"
              description="Detects visual artifacts from manipulation"
            />
          </div>
        </div>
        
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3">
          <div className="shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important Note</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              While our AI models are highly accurate, no detection system is perfect. Always use critical thinking when evaluating media content.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const UploadOption = ({ title, description, icon, active, onClick }) => {
  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        active 
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-600' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          active 
            ? 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default UploadPage;
