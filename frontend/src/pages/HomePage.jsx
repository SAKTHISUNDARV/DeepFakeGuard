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
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Detect Deepfakes with Advanced AI Technology
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              DeepFakeGuard uses cutting-edge artificial intelligence to identify manipulated images and videos with high accuracy. Protect yourself from misinformation and digital fraud.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/upload">
                <Button size="lg" className="flex items-center gap-2">
                  <Upload size={20} />
                  Upload Media
                </Button>
              </Link>
              <Link to="/live">
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
                  Try Live Detection
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative bg-white dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">99.7%</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Detection Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">2.5M+</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Media Analyzed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">&lt;2s</p>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Average Processing Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Powerful Features</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI-powered platform offers comprehensive tools to detect and analyze deepfake content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Upload className="w-10 h-10 text-primary-600" />}
              title="Media Upload"
              description="Upload images and videos for instant deepfake detection and detailed analysis."
            />
            <FeatureCard 
              icon={<Video className="w-10 h-10 text-primary-600" />}
              title="Live Detection"
              description="Real-time webcam analysis to detect deepfakes during video calls or live streams."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-10 h-10 text-primary-600" />}
              title="Detailed Reports"
              description="Get comprehensive analysis with confidence scores and visual indicators."
            />
            <FeatureCard 
              icon={<Shield className="w-10 h-10 text-primary-600" />}
              title="Advanced AI Models"
              description="Utilizing state-of-the-art deep learning models trained on millions of examples."
            />
            <FeatureCard 
              icon={<AlertTriangle className="w-10 h-10 text-primary-600" />}
              title="Manipulation Detection"
              description="Identify specific areas of manipulation with visual overlays and heat maps."
            />
            <FeatureCard 
              icon={<ArrowRight className="w-10 h-10 text-primary-600" />}
              title="One-Click Verification"
              description="Simple interface for quick authentication of digital content."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Detecting Deepfakes?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Get started now and help combat the spread of manipulated media.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/upload">
              <Button size="lg" className="bg-white text-primary-900 hover:bg-gray-100">
                Upload Media
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our advanced AI processes media in multiple stages to deliver accurate results.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-12 left-0 right-0 h-1 bg-primary-200 dark:bg-primary-800"></div>
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
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-full">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Step = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg z-10">
          {number}
        </div>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white text-center">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-center">{description}</p>
    </div>
  );
};

export default HomePage;
