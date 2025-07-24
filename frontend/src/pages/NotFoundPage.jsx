import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Compass } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-[80vh] px-4"
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          className="mb-8 inline-block"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 flex items-center justify-center shadow-lg">
            <AlertCircle className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">404</span> - Page Not Found
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-8"
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to="/" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              icon={<Home className="w-5 h-5" />}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg" 
              icon={<Compass className="w-5 h-5" />}
              className="w-full sm:w-auto border-blue-600 text-blue-600 dark:border-violet-400 dark:text-violet-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Explore Dashboard
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Still lost? Contact our support team for assistance.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;