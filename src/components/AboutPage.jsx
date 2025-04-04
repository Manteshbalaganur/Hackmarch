import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-medium-blue rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">AI</span>
          </div>
          <h1 className="text-2xl font-bold text-dark-blue dark:text-light-blue">AI Innovate</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="px-4 py-2 bg-medium-blue text-white rounded-lg hover:bg-dark-blue transition">
            Back to Chat
          </Link>
        </div>
      </nav>

      {/* About Section */}
      <section className="py-12 px-4 bg-gray-200 dark:bg-gray-800">
        <h3 className="text-3xl font-bold text-center mb-8 text-dark-blue dark:text-light-blue">
          About AI Innovate
        </h3>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            AI Innovate is a cutting-edge AI-powered chatbot designed to provide intelligent, real-time solutions for any problem. Whether you need assistance with data analysis, answering questions, or exploring new ideas, AI Innovate is here to help.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Built by Team Innovate for Hackathon 2025, this project showcases the power of AI in a user-friendly interface, with features like chat history, dark/light mode, and a modern design.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white dark:bg-gray-800 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          Built with ❤️ by Team Innovate for Hackathon 2025
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © 2025 AI Innovate. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;