import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

const Badge = ({ 
  className, 
  variant = 'default', 
  icon: Icon, 
  animate = true,
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
    primary: 'bg-gradient-to-r from-blue-500 to-violet-500 text-white border border-blue-400 dark:border-violet-600',
    secondary: 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 dark:from-violet-900/30 dark:to-purple-900/30 dark:text-violet-300 border border-violet-200 dark:border-violet-700',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border border-green-400 dark:border-emerald-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white border border-yellow-400 dark:border-amber-600',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white border border-red-400 dark:border-pink-600',
    outline: 'bg-transparent border border-gray-300 text-gray-800 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-700',
    violet: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400 border border-violet-200 dark:border-violet-700',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-700',
  };

  const MotionComponent = animate ? motion.div : 'div';

  return (
    <MotionComponent
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all',
        'whitespace-nowrap shadow-sm',
        variantClasses[variant] || variantClasses.default,
        className
      )}
      whileHover={animate ? { scale: 1.05 } : {}}
      whileTap={animate ? { scale: 0.95 } : {}}
      {...props}
    >
      {Icon && (
        <Icon className={cn(
          'w-3 h-3 mr-1.5',
          variant === 'default' && 'text-gray-600 dark:text-gray-400',
          variant === 'primary' && 'text-white',
          variant === 'secondary' && 'text-violet-600 dark:text-violet-400',
          variant === 'success' && 'text-white',
          variant === 'warning' && 'text-white',
          variant === 'danger' && 'text-white',
          variant === 'outline' && 'text-gray-600 dark:text-gray-400',
          variant === 'blue' && 'text-blue-600 dark:text-blue-400',
          variant === 'violet' && 'text-violet-600 dark:text-violet-400',
          variant === 'purple' && 'text-purple-600 dark:text-purple-400',
        )} />
      )}
      {props.children}
    </MotionComponent>
  );
};

export default Badge;