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
      className="overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-900 via-violet-900 to-purple-900">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                About <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">DeepFakeGuard</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                We're on a mission to combat misinformation and protect digital integrity with advanced AI-powered deepfake detection.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Mission</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              As digital media manipulation becomes increasingly sophisticated, we're committed to developing tools that help people verify the authenticity of the content they consume.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Protect Truth",
                description: "Empower individuals and organizations to verify content authenticity and combat the spread of misinformation.",
                bg: "from-blue-600 to-violet-600"
              },
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Advance Technology",
                description: "Continuously improve deepfake detection techniques through research and development of AI technologies.",
                bg: "from-violet-600 to-purple-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Educate Public",
                description: "Raise awareness about the risks of deepfakes and provide tools and knowledge for digital literacy.",
                bg: "from-purple-600 to-blue-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br ${item.bg} text-white rounded-xl`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Technology</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              DeepFakeGuard utilizes state-of-the-art artificial intelligence to detect manipulated media with high accuracy.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">How It Works</h3>
              <div className="space-y-6">
                {[ 
                  { num: '1', title: 'Face Detection', desc: 'Advanced algorithms identify and isolate faces in images and videos for detailed analysis.' },
                  { num: '2', title: 'Deep Learning Analysis', desc: 'Neural networks trained on millions of examples identify manipulation signatures invisible to the human eye.' },
                  { num: '3', title: 'Artifact Detection', desc: 'Specialized algorithms look for inconsistencies in lighting, textures, and facial features.' },
                  { num: '4', title: 'Confidence Scoring', desc: 'Each analysis produces a detailed confidence score with visual evidence of potential manipulation.' },
                ].map(({ num, title, desc }) => (
                  <motion.div 
                    key={num}
                    whileHover={{ x: 5 }}
                    className="flex p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white font-bold">
                        {num}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h4>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">AI Models</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our detection system combines multiple specialized models:
              </p>

              <div className="space-y-4">
                {[ 
                  { icon: Code, title: 'Face Detection Networks', desc: 'MTCNN and RetinaFace models locate and extract facial regions.' },
                  { icon: Brain, title: 'Deepfake Classification', desc: 'EfficientNet and Vision Transformer (ViT) architectures trained on diverse datasets.' },
                  { icon: Server, title: 'Temporal Analysis', desc: 'LSTM networks examine inconsistencies between video frames over time.' },
                  { icon: Tool, title: 'Explainability Tools', desc: 'Grad-CAM and attention visualization highlight manipulated regions.' },
                ].map(({ icon: Icon, title, desc }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="border border-gray-100 dark:border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 p-2 bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30 rounded-lg">
                            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h4>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">{desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Privacy */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-violet-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Trust & Privacy</h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                We're committed to maintaining the highest standards of privacy and security for all users.
              </p>

              <div className="space-y-6">
                {[ 
                  { icon: Lock, title: 'Secure Processing', desc: 'All uploads and analysis are secured with end-to-end encryption.' },
                  { icon: FileText, title: 'Privacy First', desc: 'We do not store your media unless you explicitly choose to save it.' },
                  { icon: Shield, title: 'Transparent Operation', desc: 'Our detection methods are documented and explained in detail.' },
                ].map(({ icon: Icon, title, desc }, index) => (
                  <motion.div 
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start p-4 rounded-lg bg-white/5 backdrop-blur-sm"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Icon className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">{title}</h4>
                      <p className="mt-1 text-blue-200">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="bg-white text-blue-900 hover:bg-gray-100 font-medium">
                  View Privacy Policy
                </Button>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-6">Our Commitments</h3>
              <ul className="space-y-4">
                {[
                  'We never share your uploaded content with third parties',
                  'All data is processed locally when possible',
                  'We maintain transparent AI model development practices',
                  'We do not use your data to train our models without consent',
                  'Regular security audits and vulnerability testing',
                ].map((commitment, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start p-3 rounded-lg bg-white/5"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-3 text-blue-100">{commitment}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white dark:bg-gray-900 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto p-8 rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Verify Your Media?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Start using DeepFakeGuard today to detect manipulated content and protect yourself from misinformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-700 hover:to-violet-700">
                Upload Media
              </Button>
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 dark:border-violet-400 dark:text-violet-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;