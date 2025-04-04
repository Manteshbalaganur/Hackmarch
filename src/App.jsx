import React from 'react';
import LandingPage from './components/LandingPage';
import { motion } from 'framer-motion';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <LandingPage />
    </motion.div>
  );
}

export default App;