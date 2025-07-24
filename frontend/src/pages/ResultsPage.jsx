import { useLocation, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Bookmark, Share2, AlertTriangle, Check, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { formatDate, formatPercentage, formatTime } from '../utils/helpers';

const ResultsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const result = location.state?.result;
  
  if (!result) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Result Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The analysis result you're looking for is not available or has expired.
          </p>
          <Link to="/upload">
            <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
              Upload New Media
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }
  
  const statusVariant = result.status === 'deepfake' 
    ? 'danger' 
    : result.status === 'authentic' 
      ? 'success' 
      : 'warning';
  
  const statusText = result.status === 'deepfake' 
    ? 'Deepfake Detected' 
    : result.status === 'authentic' 
      ? 'Authentic Content' 
      : 'Inconclusive';
      
  const statusIcon = result.status === 'deepfake' 
    ? <X className="h-6 w-6 text-white" /> 
    : result.status === 'authentic' 
      ? <Check className="h-6 w-6 text-white" /> 
      : <AlertTriangle className="h-6 w-6 text-white" />;
  
  const statusBgColor = result.status === 'deepfake' 
    ? 'bg-red-600' 
    : result.status === 'authentic' 
      ? 'bg-green-600' 
      : 'bg-yellow-600';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <Link 
          to="/upload" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Upload
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analysis <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Results</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {formatDate(result.timestamp)} • {result.sourceType === 'image' ? 'Image' : 'Video'} Analysis
          </p>
        </div>
        
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Download size={16} />}
            className="border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            Export Report
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Bookmark size={16} />}
            className="border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
          >
            Save
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Share2 size={16} />}
            className="border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            Share
          </Button>
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="mb-8 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-0">
                <CardTitle>Media Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative mb-4">
                  {result.sourceType === 'image' && result.fileUrl && (
                    <img 
                      src={result.fileUrl} 
                      alt="Analyzed content" 
                      className="w-full h-full object-contain"
                    />
                  )}
                  
                  {/* For images, show bounding boxes around detected faces */}
                  {result.sourceType === 'image' && (
                    <div className="absolute inset-0">
                      {result.detectedFaces.map((face) => {
                        const { x, y, width, height } = face.boundingBox;
                        const boxColor = face.status === 'deepfake' 
                          ? 'border-red-500' 
                          : face.status === 'authentic' 
                            ? 'border-green-500' 
                            : 'border-yellow-500';
                            
                        return (
                          <motion.div 
                            key={face.id}
                            className={`absolute border-4 ${boxColor} rounded-sm`}
                            style={{
                              left: `${x * 100}%`,
                              top: `${y * 100}%`,
                              width: `${width * 100}%`,
                              height: `${height * 100}%`
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div 
                              className={`absolute -top-7 left-0 text-xs font-bold px-2 py-1 rounded-t-sm ${
                                face.status === 'deepfake' 
                                  ? 'bg-red-500 text-white' 
                                  : face.status === 'authentic' 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-yellow-500 text-white'
                              }`}
                            >
                              {face.status.toUpperCase()} ({Math.round(face.confidence * 100)}%)
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* For videos, we'd show a video player here with controls */}
                  {result.sourceType === 'video' && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 dark:text-gray-400">Video playback would be shown here</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusBgColor}`}>
                    {statusIcon}
                  </div>
                  <div>
                    <Badge variant={statusVariant} className="mb-1">
                      {statusText}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {result.status === 'deepfake' 
                        ? 'This content appears to be manipulated' 
                        : result.status === 'authentic' 
                          ? 'This content appears to be authentic' 
                          : 'Unable to determine authenticity with high confidence'}
                    </h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 p-4 rounded-lg"
                    whileHover={{ y: -3 }}
                  >
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confidence Score</h4>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatPercentage(result.confidence)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {result.status === 'deepfake' ? 'likelihood of manipulation' : 'likelihood of authenticity'}
                      </span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 p-4 rounded-lg"
                    whileHover={{ y: -3 }}
                  >
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Processing Details</h4>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Processing Time:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formatTime(result.processingTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Faces Detected:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{result.detectedFaces.length}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {result.detectedFaces.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Face Analysis</CardTitle>
                  <CardDescription>Detailed results for each detected face</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.detectedFaces.map((face, index) => (
                      <motion.div 
                        key={face.id}
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white">Face #{index + 1}</h4>
                          <Badge 
                            variant={
                              face.status === 'deepfake' 
                                ? 'danger' 
                                : face.status === 'authentic' 
                                  ? 'success' 
                                  : 'warning'
                            }
                          >
                            {face.status === 'deepfake' 
                              ? 'Deepfake' 
                              : face.status === 'authentic' 
                                ? 'Authentic' 
                                : 'Inconclusive'}
                          </Badge>
                        </div>
                        
                        <div className="mb-3">
                          <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Manipulation Score</h5>
                          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                face.status === 'deepfake' 
                                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                                  : face.status === 'authentic' 
                                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                                    : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                              }`}
                              style={{ width: `${face.manipulationScore * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Authentic</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Manipulated</span>
                          </div>
                        </div>
                        
                        {face.artifacts && face.artifacts.length > 0 && (
                          <div>
                            <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Detected Artifacts</h5>
                            <div className="flex flex-wrap gap-2">
                              {face.artifacts.map((artifact, i) => (
                                <motion.span 
                                  key={i}
                                  className="inline-block text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-2 py-1"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {artifact.replace('_', ' ')}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
        
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>File Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "Filename", value: result.fileName },
                    { label: "Analysis Date", value: formatDate(result.timestamp) },
                    { label: "Media Type", value: result.sourceType.charAt(0).toUpperCase() + result.sourceType.slice(1) },
                    { label: "Report ID", value: result.id }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</h4>
                      <p className="text-sm text-gray-900 dark:text-white">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>What Does This Mean?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  {result.status === 'deepfake' ? (
                    <>
                      <p className="text-gray-700 dark:text-gray-300">
                        Our AI has detected strong indicators that this content has been manipulated or artificially generated. Key issues include:
                      </p>
                      <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>Inconsistent lighting patterns</li>
                        <li>Unnatural facial expressions</li>
                        <li>Digital artifacts around facial features</li>
                        <li>Texture inconsistencies</li>
                      </ul>
                    </>
                  ) : result.status === 'authentic' ? (
                    <p className="text-gray-700 dark:text-gray-300">
                      Our analysis indicates this content is likely authentic. No significant manipulations or deepfake indicators were detected in the analyzed media.
                    </p>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      Our AI couldn't determine with high confidence whether this content is authentic or manipulated. This may be due to image quality, complex lighting, or subtle manipulations.
                    </p>
                  )}
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mt-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        AI detection is not perfect. Always use critical thinking and consider context when evaluating potentially manipulated media.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 dark:border-gray-700">
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20" 
                  icon={<Download size={16} />}
                >
                  Download Detailed Report
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;