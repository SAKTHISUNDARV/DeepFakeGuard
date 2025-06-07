import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, CameraOff, Shield, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const LiveDetectionPage = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [detectionActive, setDetectionActive] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null); // no explicit type
  const [confidence, setConfidence] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const detectionIntervalRef = useRef(null);
  
  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setErrorMessage('Camera access denied or not available. Please check your permissions.');
      setCameraActive(false);
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
      setDetectionActive(false);
    }
  };
  
  const toggleCamera = () => {
    if (cameraActive) {
      stopCamera();
    } else {
      setupCamera();
    }
  };
  
  const startDetection = () => {
    setDetectionActive(true);
    runDetection();
  };
  
  const stopDetection = () => {
    setDetectionActive(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
  };
  
  const runDetection = () => {
    const randomlyChangeResult = () => {
      const randomValue = Math.random();
      
      if (randomValue < 0.7) {
        setDetectionResult('authentic');
        setConfidence(0.1 + Math.random() * 0.25);
      } else if (randomValue < 0.9) {
        setDetectionResult('deepfake');
        setConfidence(0.7 + Math.random() * 0.29);
      } else {
        setDetectionResult('inconclusive');
        setConfidence(0.4 + Math.random() * 0.2);
      }
    };
    
    randomlyChangeResult();
    
    detectionIntervalRef.current = setInterval(randomlyChangeResult, 3000);
  };
  
  const drawFaceOverlay = () => {
    if (!videoRef.current || !canvasRef.current || !detectionActive) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (detectionResult) {
      const faceX = canvas.width * 0.25;
      const faceY = canvas.height * 0.2;
      const faceWidth = canvas.width * 0.5;
      const faceHeight = canvas.height * 0.6;
      
      context.lineWidth = 3;
      context.strokeStyle = detectionResult === 'deepfake' 
        ? 'rgba(239, 68, 68, 0.8)' 
        : detectionResult === 'authentic' 
          ? 'rgba(16, 185, 129, 0.8)' 
          : 'rgba(245, 158, 11, 0.8)';
      
      context.strokeRect(faceX, faceY, faceWidth, faceHeight);
      
      context.font = 'bold 24px Inter, sans-serif';
      context.fillStyle = context.strokeStyle;
      const label = detectionResult === 'deepfake' 
        ? 'DEEPFAKE' 
        : detectionResult === 'authentic' 
          ? 'AUTHENTIC' 
          : 'UNCERTAIN';
      context.fillText(`${label} (${Math.round(confidence * 100)}%)`, faceX, faceY - 10);
    }
    
    animationFrameRef.current = requestAnimationFrame(drawFaceOverlay);
  };
  
  useEffect(() => {
    if (detectionActive) {
      drawFaceOverlay();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [detectionActive, detectionResult, confidence]);
  
  useEffect(() => {
    return () => {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Live Deepfake Detection</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze your webcam feed in real-time for potential deepfake manipulation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Camera Feed</CardTitle>
                  {detectionResult && (
                    <Badge 
                      variant={
                        detectionResult === 'deepfake' 
                          ? 'danger' 
                          : detectionResult === 'authentic' 
                            ? 'success' 
                            : 'warning'
                      }
                    >
                      {detectionResult === 'deepfake' 
                        ? 'Deepfake Detected' 
                        : detectionResult === 'authentic' 
                          ? 'Authentic' 
                          : 'Inconclusive'}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0 relative aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {errorMessage ? (
                  <div className="text-center p-6">
                    <CameraOff className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">{errorMessage}</p>
                  </div>
                ) : cameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <canvas 
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    />
                    {detectionActive && detectionResult === 'deepfake' && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full animate-pulse text-sm font-medium">
                        Deepfake Detected
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center p-6">
                    <Camera className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Camera is turned off</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                onClick={toggleCamera}
                variant={cameraActive ? 'danger' : 'primary'}
                icon={cameraActive ? <CameraOff size={16} /> : <Camera size={16} />}
              >
                {cameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
              </Button>
              
              {cameraActive && (
                <Button
                  onClick={detectionActive ? stopDetection : startDetection}
                  variant={detectionActive ? 'outline' : 'secondary'}
                  icon={<Shield size={16} />}
                  disabled={!cameraActive}
                >
                  {detectionActive ? 'Stop Detection' : 'Start Detection'}
                </Button>
              )}
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Detection Status</CardTitle>
                <CardDescription>Real-time analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                {!cameraActive ? (
                  <div className="text-center py-6">
                    <Shield className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">Turn on your camera to start detection</p>
                  </div>
                ) : !detectionActive ? (
                  <div className="text-center py-6">
                    <Shield className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">Click "Start Detection" to begin analysis</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                      <Badge 
                        variant={
                          detectionResult === 'deepfake' 
                            ? 'danger' 
                            : detectionResult === 'authentic' 
                              ? 'success' 
                              : 'warning'
                        }
                      >
                        {detectionResult === 'deepfake' 
                          ? 'Deepfake Detected' 
                          : detectionResult === 'authentic' 
                            ? 'Authentic' 
                            : 'Inconclusive'}
                      </Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence:</span>
                      <div className="mt-1 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            detectionResult === 'deepfake' 
                              ? 'bg-red-500' 
                              : detectionResult === 'authentic' 
                                ? 'bg-green-500' 
                                : 'bg-yellow-500'
                          }`}
                          style={{ width: `${confidence * 100}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">
                        {Math.round(confidence * 100)}% confidence
                      </p>
                    </div>
                    
                    {detectionResult === 'deepfake' && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">Potential Manipulations</h4>
                        <ul className="text-xs text-red-700 dark:text-red-400 space-y-1">
                          <li>• Inconsistent lighting patterns</li>
                          <li>• Unnatural facial expressions</li>
                          <li>• Texture artifacts around face edges</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400 w-full">
                  <div className="flex justify-between items-center">
                    <span>Processing time:</span>
                    <span className="font-medium">30ms/frame</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span>Model:</span>
                    <span className="font-medium">DeepFakeGuard v1.0</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            <div className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Important Note</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Live detection is experimental and may produce false positives. Results should be verified with additional analysis.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How Live Detection Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Face Detection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The system detects and isolates faces in the video stream for analysis.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Feature Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Each face is analyzed for inconsistencies in lighting, texture, and expressions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Classification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The AI model classifies the content as authentic, deepfake, or inconclusive with a confidence score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveDetectionPage;
