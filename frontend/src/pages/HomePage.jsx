import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Upload, Video, BarChart3, AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900  to-violet-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Detect Deepfakes with <span className="bg-gradient-to-r from-blue-300 to-violet-400 bg-clip-text text-transparent">Advanced AI</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              DeepFakeGuard uses cutting-edge artificial intelligence to identify manipulated images and videos with high accuracy. Protect yourself from misinformation and digital fraud.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/upload" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                  <Upload size={20} />
                  Upload Media
                </Button>
              </Link>
              <Link to="/live" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
                  Try Live Detection
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative bg-white dark:bg-gray-900 py-12 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30"
                whileHover={{ y: -5 }}
              >
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">99.7%</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Detection Accuracy</p>
              </motion.div>
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30"
                whileHover={{ y: -5 }}
              >
                <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">2.5M+</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Media Analyzed</p>
              </motion.div>
              <motion.div 
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30"
                whileHover={{ y: -5 }}
              >
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">&lt;2s</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Average Processing Time</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Powerful <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Features</span>
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our AI-powered platform offers comprehensive tools to detect and analyze deepfake content.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Upload className="w-10 h-10 text-blue-600" />}
              title="Media Upload"
              description="Upload images and videos for instant deepfake detection and detailed analysis."
            />
            <FeatureCard 
              icon={<Video className="w-10 h-10 text-violet-600" />}
              title="Live Detection"
              description="Real-time webcam analysis to detect deepfakes during video calls or live streams."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-10 h-10 text-purple-600" />}
              title="Detailed Reports"
              description="Get comprehensive analysis with confidence scores and visual indicators."
            />
            <FeatureCard 
              icon={<Shield className="w-10 h-10 text-blue-600" />}
              title="Advanced AI Models"
              description="Utilizing state-of-the-art deep learning models trained on millions of examples."
            />
            <FeatureCard 
              icon={<AlertTriangle className="w-10 h-10 text-violet-600" />}
              title="Manipulation Detection"
              description="Identify specific areas of manipulation with visual overlays and heat maps."
            />
            <FeatureCard 
              icon={<ArrowRight className="w-10 h-10 text-purple-600" />}
              title="One-Click Verification"
              description="Simple interface for quick authentication of digital content."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-violet-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Start Detecting Deepfakes?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get started now and help combat the spread of manipulated media.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/upload" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-900 hover:bg-gray-100 font-medium">
                Upload Media
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              How It <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Works</span>
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our advanced AI processes media in multiple stages to deliver accurate results.
            </motion.p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-violet-200 to-purple-200 dark:from-blue-800 dark:via-violet-800 dark:to-purple-800"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <Step 
                number={1} 
                title="Upload" 
                description="Upload an image or video, or use your webcam for live detection."
              />
              <Step 
                number={2} 
                title="Analysis" 
                description="Our AI analyzes visual patterns, artifacts, and inconsistencies."
              />
              <Step 
                number={3} 
                title="Detection" 
                description="Deepfakes are identified with precise bounding boxes and confidence scores."
              />
              <Step 
                number={4} 
                title="Results" 
                description="Get detailed reports and visual evidence of manipulations."
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Step = ({ number, title, description }) => {
  return (
    <motion.div 
      className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-50 to-violet-50 dark:from-blue-900/10 dark:to-violet-900/10 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-center">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white font-bold text-lg z-10">
          {number}
        </div>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white text-center">{title}</h3>
      <p className="mt-3 text-gray-600 dark:text-gray-400 text-center">{description}</p>
    </motion.div>
  );
};

export default HomePage;