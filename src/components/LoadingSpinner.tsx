import React from 'react';
import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <motion.svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          stroke="#60A5FA"
          strokeWidth="4"
          fill="none"
          strokeDasharray="31.4 31.4"
          animate={{ strokeDashoffset: [0, 62.8] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </motion.svg>
    </div>
  );
}
