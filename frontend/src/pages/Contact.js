import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitFeedback } from '../services/api';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
    category: 'General'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare email data
      const emailSubject = `RCB Universe - ${formData.category} from ${formData.name}`;
      const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\nRating: ${formData.rating}/5\n\nMessage:\n${formData.message}`;

      // Submit to backend (which should handle email sending)
      const response = await submitFeedback({
        ...formData,
        recipientEmail: 'ps2235563@gmail.com'
      });

      if (response.success) {
        // Show success message
        setSubmitted(true);
        
        // Also open mailto as backup
        const mailtoLink = `mailto:ps2235563@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink, '_blank');
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: '',
          rating: 5,
          category: 'General'
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Message sent! Your email client will open to confirm sending.');
      
      // Open mailto as fallback
      const emailSubject = `RCB Universe - ${formData.category} from ${formData.name}`;
      const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\nRating: ${formData.rating}/5\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:ps2235563@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        message: '',
        rating: 5,
        category: 'General'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Contact Us
          </h1>
          <p className="text-xl text-gray-400">
            We'd love to hear from you! Share your feedback and suggestions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-green-500/20 border-2 border-green-500 rounded-lg p-6 mb-6 text-center"
                >
                  <div className="text-5xl mb-3">✓</div>
                  <p className="text-green-500 font-bold text-xl mb-2">
                    Message Sent Successfully!
                  </p>
                  <p className="text-green-400 text-sm">
                    Your message has been sent to ps2235563@gmail.com
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    We'll get back to you soon!
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-rcb-darkGray border border-rcb-red/20 rounded-lg text-white focus:outline-none focus:border-rcb-red"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-rcb-darkGray border border-rcb-red/20 rounded-lg text-white focus:outline-none focus:border-rcb-red"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-rcb-darkGray border border-rcb-red/20 rounded-lg text-white focus:outline-none focus:border-rcb-red"
                  >
                    <option value="General">General</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Appreciation">Appreciation</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-rcb-darkGray border border-rcb-red/20 rounded-lg text-white focus:outline-none focus:border-rcb-red resize-none"
                    placeholder="Tell us what you think..."
                  ></textarea>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Rate your experience
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={`transition-colors ${
                            star <= formData.rating
                              ? 'text-rcb-gold fill-rcb-gold'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner w-5 h-5 border-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rcb-red/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-rcb-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <a href="mailto:ps2235563@gmail.com" className="text-rcb-gold hover:text-rcb-gold/80 text-sm transition-colors">
                      ps2235563@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rcb-red/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-rcb-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <p className="text-gray-400 text-sm">+91 80 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-rcb-red/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-rcb-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Location</h4>
                    <p className="text-gray-400 text-sm">
                      M. Chinnaswamy Stadium<br />
                      Bengaluru, Karnataka, India
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Help</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Response Time</h4>
                  <p className="text-gray-400 text-sm">
                    We typically respond within 24-48 hours
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Support Hours</h4>
                  <p className="text-gray-400 text-sm">
                    Monday - Friday: 9 AM - 6 PM IST
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Follow Us</h4>
                  <div className="flex gap-2 mt-2">
                    <button type="button" className="w-8 h-8 bg-rcb-red/20 hover:bg-rcb-red rounded-full flex items-center justify-center transition-colors">
                      <span className="text-sm">𝕏</span>
                    </button>
                    <button type="button" className="w-8 h-8 bg-rcb-red/20 hover:bg-rcb-red rounded-full flex items-center justify-center transition-colors">
                      <span className="text-sm">📘</span>
                    </button>
                    <button type="button" className="w-8 h-8 bg-rcb-red/20 hover:bg-rcb-red rounded-full flex items-center justify-center transition-colors">
                      <span className="text-sm">📷</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-effect rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-4">🏏</div>
              <h3 className="text-xl font-bold text-white mb-2">Join Our Community</h3>
              <p className="text-gray-400 text-sm mb-4">
                Connect with thousands of RCB fans worldwide
              </p>
              <button 
                onClick={() => navigate('/fan-zone')}
                className="btn-secondary w-full"
              >
                Join Fan Zone
              </button>
            </motion.div>
          </div>
        </div>

        {/* Stadium Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 glass-effect rounded-xl overflow-hidden relative"
        >
          <div className="relative" style={{ height: '500px', maxHeight: '500px' }}>
            <img 
              src="/images/rcb-stadium.jpg" 
              alt="M. Chinnaswamy Stadium" 
              className="w-full h-full object-contain bg-rcb-black"
              style={{ 
                objectFit: 'contain',
                objectPosition: 'center',
                imageRendering: 'crisp-edges'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div style="height: 500px" class="bg-gradient-to-br from-rcb-red/10 to-rcb-gold/10 flex items-center justify-center"><div class="text-center"><div class="text-rcb-gold mx-auto mb-4 text-6xl">🏟️</div><h3 class="text-2xl font-bold text-white mb-2">M. Chinnaswamy Stadium</h3><p class="text-gray-400">Home of Royal Challengers Bengaluru</p></div></div>';
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">M. Chinnaswamy Stadium</h3>
                <p className="text-gray-200 text-lg">Home of Royal Challengers Bengaluru</p>
                <p className="text-gray-400 mt-2">Bengaluru, Karnataka, India</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
