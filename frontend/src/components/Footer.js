import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rcb-black border-t border-rcb-red/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-rcb-red rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">RCB</span>
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">RCB Universe</h3>
                <p className="text-sm text-rcb-gold">Ee Sala Cup Namde!</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate fan hub for Royal Challengers Bengaluru. Stay updated with live scores, 
              player stats, news, and connect with fellow RCB fans.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-rcb-red/20 hover:bg-rcb-red rounded-full flex items-center justify-center transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-rcb-red/20 hover:bg-rcb-red rounded-full flex items-center justify-center transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-rcb-red/20 hover:bg-rcb-red rounded-full flex items-center justify-center transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-rcb-red/20 hover:bg-rcb-red rounded-full flex items-center justify-center transition-all duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/squad" className="text-gray-400 hover:text-rcb-gold transition-colors">Team Squad</Link></li>
              <li><Link to="/matches" className="text-gray-400 hover:text-rcb-gold transition-colors">Matches</Link></li>
              <li><Link to="/statistics" className="text-gray-400 hover:text-rcb-gold transition-colors">Statistics</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-rcb-gold transition-colors">News</Link></li>
              <li><Link to="/fan-zone" className="text-gray-400 hover:text-rcb-gold transition-colors">Fan Zone</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span>support@rcbuniverse.com</span>
              </li>
              <li><Link to="/contact" className="text-gray-400 hover:text-rcb-gold transition-colors">Send Feedback</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-rcb-gold transition-colors">About Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rcb-red/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-2">
            <span>© {currentYear} RCB Universe. Made with</span>
            <Heart size={16} className="text-rcb-red fill-rcb-red" />
            <span>for RCB fans</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This is a fan-made website and is not officially affiliated with Royal Challengers Bengaluru or IPL.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
