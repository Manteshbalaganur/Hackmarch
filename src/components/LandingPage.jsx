import React, { useState, useEffect, useRef } from 'react';
import { FaMoon, FaSun, FaTimes, FaMicrophone, FaUser, FaCog, FaBell, FaComment, FaFileAlt, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [query, setQuery] = useState('');
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('conversations');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar by default open
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  // SpeechRecognition Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript;
          else interimTranscript += transcript;
        }
        setQuery(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        alert('Speech recognition error: ' + event.error);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (query.trim()) handleSubmit({ preventDefault: () => {} });
      };

      return () => recognitionRef.current?.stop();
    } else {
      console.warn('SpeechRecognition not supported.');
    }
  }, [query]);

  // Dark Mode Toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Scroll to Bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversations, currentConversationId]);

  // Save Conversations
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  const startNewConversation = () => {
    setCurrentConversationId(null);
    setQuery('');
  };

  const selectConversation = (id) => {
    setCurrentConversationId(id);
    setIsSidebarOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    let newConversationId = currentConversationId;
    let updatedConversations = [...conversations];

    if (!currentConversationId) {
      newConversationId = Date.now().toString();
      updatedConversations.push({ id: newConversationId, name: query.substring(0, 30), messages: [] });
    }

    const conversationIndex = updatedConversations.findIndex((conv) => conv.id === newConversationId);
    updatedConversations[conversationIndex].messages.push({ role: 'user', content: query });

    setConversations(updatedConversations);
    setCurrentConversationId(newConversationId);
    setQuery('');
    setIsLoading(true);

    setTimeout(() => {
      setConversations((prev) => {
        const updated = [...prev];
        updated[conversationIndex].messages.push({
          role: 'bot',
          content: "I'm here to help! How can I assist you today?",
        });
        return updated;
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setQuery('');
      recognitionRef.current.start();
    }
    setIsListening((prev) => !prev);
  };

  const currentConversation = conversations.find((conv) => conv.id === currentConversationId);
  const currentMessages = currentConversation ? currentConversation.messages : [];

  const heroVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const settingsVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
  const messageVariants = {
    hidden: { opacity: 0, x: (role) => (role === 'user' ? 50 : -50) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-poppins flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-800 shadow-lg">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl sm:text-2xl font-bold text-white">AI Innovate</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition text-white">
            <FaUser />
          </button>
          <button
            onClick={toggleSettings}
            className="p-2 bg-white/10 backdrop-blur-lg rounded-full hover:bg-white/20 transition text-white"
          >
            <FaCog />
          </button>
          <button className="px-4 py-2 bg-white/20 backdrop-blur-lg text-white rounded-lg hover:bg-white/30 transition shadow-lg">
            Get Started
          </button>
        </div>
      </nav>

      {/* Settings Dropdown */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={settingsVariants}
            className="absolute top-16 right-4 w-64 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-3 z-50"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaMoon className="text-medium-blue" />
                  <p className="text-white text-sm">Dark Mode</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`p-1 rounded-full ${isDarkMode ? 'bg-medium-blue' : 'bg-gray-400'}`}
                >
                  {isDarkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
                </button>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaBell className="text-medium-blue" />
                  <p className="text-white text-sm">Notifications</p>
                </div>
                <button
                  onClick={() => setNotificationsEnabled((prev) => !prev)}
                  className={`p-1 rounded-full ${notificationsEnabled ? 'bg-medium-blue' : 'bg-gray-400'}`}
                >
                  <span className="text-xs">{notificationsEnabled ? 'On' : 'Off'}</span>
                </button>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-white/20 rounded-lg">
                <FaComment className="text-medium-blue" />
                <p className="text-white text-sm">Write Feedback</p>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-white/20 rounded-lg">
                <FaFileAlt className="text-medium-blue" />
                <p className="text-white text-sm">Terms and Conditions</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FaInfoCircle className="text-medium-blue" />
                  <p className="text-white text-sm">About Us</p>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                  AI Innovate is a cutting-edge AI-powered chatbot designed to provide intelligent, real-time solutions for any problem. Built by Team Innovate for Hackathon 2025.
                </p>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-white/20 rounded-lg">
                <FaEnvelope className="text-medium-blue" />
                <p className="text-white text-sm">Contact Us</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col items-center justify-between overflow-hidden">
          <div
            ref={chatContainerRef}
            className="flex-1 w-full max-w-[70%] overflow-y-auto p-6 flex flex-col items-center"
          >
            {currentMessages.length > 0 ? (
              currentMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                  custom={message.role}
                  className={`flex w-full max-w-2xl mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-4 rounded-2xl shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-500 text-white'
                        : 'bg-white/10 backdrop-blur-lg text-gray-800 dark:text-gray-100'
                    }`}
                  >
                    <p className="text-base">{message.content}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div initial="hidden" animate="visible" variants={heroVariants} className="text-center">
                <h2 className="text-3xl font-bold mb-6 text-dark-blue dark:text-light-blue">
                  Welcome to AI Innovate
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Start a conversation by typing or speaking your query below!
                </p>
              </motion.div>
            )}
            {isLoading && (
              <div className="text-gray-600 dark:text-gray-400 text-sm text-center">
                AI Analyzing...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-[70%] p-6 flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 p-4 bg-white/10 backdrop-blur-lg border border-gray-300/20 dark:border-gray-600/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-medium-blue text-gray-800 dark:text-gray-100 placeholder-gray-400 shadow-md transition-colors duration-300 text-base"
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-4 rounded-xl transition shadow-lg ${
                isListening
                  ? 'bg-gradient-to-r from-blue-600 to-purple-500 text-white'
                  : 'bg-white/10 backdrop-blur-lg text-gray-800 dark:text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              <FaMicrophone />
            </button>
            <button
              type="submit"
              className="p-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl hover:bg-gradient-to-r hover:from-blue-700 hover:to-purple-600 hover:scale-105 transition shadow-lg"
            >
              ➤
            </button>
          </form>
        </div>

        {/* Right Sidebar (Chat History) */}
        <aside
          className={`${
            isSidebarOpen ? 'w-56' : 'w-0'
          } bg-white/10 backdrop-blur-lg border-l border-gray-300/20 dark:border-gray-600/20 p-6 flex-shrink-0 overflow-y-auto transition-all duration-300 md:w-56 md:static md:h-auto z-40`}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-medium text-dark-blue dark:text-light-blue">Chat History</h3>
          </div>
          <div className="space-y-4">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => selectConversation(conv.id)}
                  className={`p-4 bg-white/20 backdrop-blur-lg rounded-xl text-dark-blue dark:text-light-blue text-sm hover:bg-white/30 transition cursor-pointer truncate ${
                    conv.id === currentConversationId ? 'bg-white/30' : ''
                  }`}
                >
                  {conv.name}
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center">No chats yet</p>
            )}
          </div>
          <button
            onClick={startNewConversation}
            className="mt-8 w-full p-4 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition shadow-lg"
          >
            New Chat
          </button>
        </aside>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 bg-white dark:bg-gray-800 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">© 2025 AI Innovate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;