import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Server, Brain, Lock, FileText, Users, PenTool as Tool } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About DeepFakeGuard</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                We're on a mission to combat misinformation and protect digital integrity with advanced AI-powered deepfake detection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              As digital media manipulation becomes increasingly sophisticated, we're committed to developing tools that help people verify the authenticity of the content they consume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Protect Truth</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Empower individuals and organizations to verify content authenticity and combat the spread of misinformation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Advance Technology</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Continuously improve deepfake detection techniques through research and development of AI technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Educate Public</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Raise awareness about the risks of deepfakes and provide tools and knowledge for digital literacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Technology</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              DeepFakeGuard utilizes state-of-the-art artificial intelligence to detect manipulated media with high accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How It Works</h3>
              <div className="space-y-6">
                {[ 
                  { num: '1', title: 'Face Detection', desc: 'Advanced algorithms identify and isolate faces in images and videos for detailed analysis.' },
                  { num: '2', title: 'Deep Learning Analysis', desc: 'Neural networks trained on millions of examples identify manipulation signatures invisible to the human eye.' },
                  { num: '3', title: 'Artifact Detection', desc: 'Specialized algorithms look for inconsistencies in lighting, textures, and facial features.' },
                  { num: '4', title: 'Confidence Scoring', desc: 'Each analysis produces a detailed confidence score with visual evidence of potential manipulation.' },
                ].map(({ num, title, desc }) => (
                  <div key={num} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                        {num}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">AI Models</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our detection system combines multiple specialized models:
              </p>

              <div className="space-y-4">
                {[ 
                  { icon: Code, title: 'Face Detection Networks', desc: 'MTCNN and RetinaFace models locate and extract facial regions.' },
                  { icon: Brain, title: 'Deepfake Classification', desc: 'EfficientNet and Vision Transformer (ViT) architectures trained on diverse datasets.' },
                  { icon: Server, title: 'Temporal Analysis', desc: 'LSTM networks examine inconsistencies between video frames over time.' },
                  { icon: Tool, title: 'Explainability Tools', desc: 'Grad-CAM and attention visualization highlight manipulated regions.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <Card key={title}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-md font-medium text-gray-900 dark:text-white">{title}</h4>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Privacy */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Trust & Privacy</h2>
              <p className="text-lg text-primary-100 mb-6">
                We're committed to maintaining the highest standards of privacy and security for all users.
              </p>

              <div className="space-y-4">
                {[ 
                  { icon: Lock, title: 'Secure Processing', desc: 'All uploads and analysis are secured with end-to-end encryption.' },
                  { icon: FileText, title: 'Privacy First', desc: 'We do not store your media unless you explicitly choose to save it.' },
                  { icon: Shield, title: 'Transparent Operation', desc: 'Our detection methods are documented and explained in detail.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-primary-300" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">{title}</h4>
                      <p className="mt-1 text-primary-200">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-white text-primary-900 hover:bg-gray-100">
                  View Privacy Policy
                </Button>
              </div>
            </div>

            <div className="bg-primary-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Our Commitments</h3>
              <ul className="space-y-4">
                {[
                  'We never share your uploaded content with third parties',
                  'All data is processed locally when possible',
                  'We maintain transparent AI model development practices',
                  'We do not use your data to train our models without consent',
                  'Regular security audits and vulnerability testing',
                ].map((commitment, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-primary-100">{commitment}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-gray-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Verify Your Media?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Start using DeepFakeGuard today to detect manipulated content and protect yourself from misinformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Upload Media</Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
