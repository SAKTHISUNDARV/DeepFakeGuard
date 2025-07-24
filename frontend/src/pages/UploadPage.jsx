import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image, Video, Upload as UploadIcon, Check, AlertTriangle } from 'lucide-react';
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
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Upload <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Media</span> for Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload an image or video to analyze it for potential deepfake manipulation.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <UploadOption
            title="Image Analysis"
            description="Upload photos to detect face manipulation"
            icon={<Image className="w-6 h-6" />}
            active={fileType === 'image'}
            onClick={() => setFileType('image')}
          />
          <UploadOption
            title="Video Analysis"
            description="Upload videos to detect deepfake content"
            icon={<Video className="w-6 h-6" />}
            active={fileType === 'video'}
            onClick={() => setFileType('video')}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
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
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                  icon={<UploadIcon className="w-5 h-5" />}
                >
                  {isProcessing ? 'Analyzing...' : 'Analyze for Deepfakes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            What We <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Check</span> For
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Check className="h-5 w-5 text-green-500" />,
                title: "Face Manipulation",
                description: "Detects face swaps and facial feature edits"
              },
              {
                icon: <Check className="h-5 w-5 text-green-500" />,
                title: "Inconsistent Lighting",
                description: "Identifies lighting inconsistencies"
              },
              {
                icon: <Check className="h-5 w-5 text-green-500" />,
                title: "Unnatural Expressions",
                description: "Flags expressions that appear artificial"
              },
              {
                icon: <Check className="h-5 w-5 text-green-500" />,
                title: "Digital Artifacts",
                description: "Detects visual artifacts from manipulation"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureItem
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start gap-3"
        >
          <div className="shrink-0 p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important Note</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              While our AI models are highly accurate, no detection system is perfect. Always use critical thinking when evaluating media content.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const UploadOption = ({ title, description, icon, active, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        active 
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 dark:border-blue-600' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${
          active 
            ? 'bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 text-blue-600 dark:text-blue-400' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

export default UploadPage;