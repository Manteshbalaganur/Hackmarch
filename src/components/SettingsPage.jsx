import React from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
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

      {/* Settings Section */}
      <section className="py-12 px-4 bg-gray-200 dark:bg-gray-800">
        <h3 className="text-3xl font-bold text-center mb-8 text-dark-blue dark:text-light-blue">
          Settings
        </h3>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Account Profile */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-dark-blue dark:text-light-blue">
              Account Profile
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your account details, update your profile, and change your password.
            </p>
            <button className="mt-4 px-4 py-2 bg-medium-blue text-white rounded-lg hover:bg-dark-blue transition">
              Edit Profile
            </button>
          </div>

          {/* Notifications */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-dark-blue dark:text-light-blue">
              Notifications
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Configure your notification preferences for messages and updates.
            </p>
            <button className="mt-4 px-4 py-2 bg-medium-blue text-white rounded-lg hover:bg-dark-blue transition">
              Manage Notifications
            </button>
          </div>

          {/* Write Feedback */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-dark-blue dark:text-light-blue">
              Write Feedback
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Share your feedback to help us improve AI Innovate.
            </p>
            <button className="mt-4 px-4 py-2 bg-medium-blue text-white rounded-lg hover:bg-dark-blue transition">
              Submit Feedback
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-dark-blue dark:text-light-blue">
              Terms and Conditions
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Read our terms and conditions for using AI Innovate.
            </p>
            <button className="mt-4 px-4 py-2 bg-medium-blue text-white rounded-lg hover:bg-dark-blue transition">
              View Terms
            </button>
          </div>

          {/* About Us */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-dark-blue dark:text-light-blue">
              About Us
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Learn more about Team Innovate and our mission.
            </p>
            <Link to="/about" className="mt-4 inline-block px-4 py-2 bg-medium-blue text-white rounded-lg hover:bg-dark-blue transition">
              Go to About
            </Link>
          </div>

          {/* Contact Us */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-dark-blue dark:text-light-blue">
              Contact Us
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Get in touch with us for support or inquiries.
            </p>
            <button className="mt-4 px-4 py-2 bg-medium-blue text-white rounded-lg hover:bg-dark-blue transition">
              Contact Support
            </button>
          </div>
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

export default SettingsPage;