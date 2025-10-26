import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Squad', path: '/squad' },
    { name: 'Matches', path: '/matches' },
    { name: 'Iconic Moments', path: '/iconic-moments' },
    { name: 'Statistics', path: '/statistics' },
    { name: 'Comparison', path: '/comparison' },
    { name: 'News', path: '/news' },
    { name: 'Fan Zone', path: '/fan-zone' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/98 backdrop-blur-md border-b border-rcb-red/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex-shrink-0">
              <img 
                src="/images/rcb-logo.jpg" 
                alt="RCB Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-rcb-red">RCB</span>{' '}
                <span className="text-rcb-gold">UNIVERSE</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-wider">ROYAL CHALLENGERS BENGALURU</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-white bg-rcb-red rounded-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-rcb-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 border-t border-rcb-red/20"
          >
            <div className="px-6 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-semibold transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-rcb-red text-white'
                      : 'text-gray-400 hover:text-white hover:bg-rcb-red/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
