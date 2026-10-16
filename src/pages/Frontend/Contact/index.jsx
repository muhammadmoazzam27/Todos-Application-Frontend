import React, { useState } from 'react';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 4000);
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-70px)] bg-gray-50 px-3 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="max-w-7xl mx-auto bg-gradient-to-r from-[#1a3254] to-[#284879] text-white rounded-2xl p-6 sm:p-10 shadow-xl mb-10 text-center relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-[#8c51d3]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-2xl mx-auto z-10 relative">
          <span className="inline-block bg-[#8c51d3]/30 text-purple-200 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-full mb-3 border border-purple-400/35 shadow-inner">
            💬 Get in Touch with Us
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            How Can We <span className="text-[#a875e6]">Help You Today?</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Have questions about Cloudinary media storage, account authorization, or task management? Drop us a message and our support team will respond promptly.
          </p>
        </div>
      </section>

      {/* 2. CONTACT FORM & INFO GRID */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Left Column: Contact Cards */}
        <div className="space-y-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#8c51d3] flex items-center justify-center text-xl shrink-0 shadow-xs">
              <MailOutlined />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a3254] mb-1">Email Support</h3>
              <p className="text-xs text-gray-500 mb-1">Send us an email anytime:</p>
              <a href="mailto:support@veloriataskcloud.com" className="text-xs font-semibold text-[#8c51d3] hover:underline">
                support@taskcloud.com
              </a>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0 shadow-xs">
              <ClockCircleOutlined />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a3254] mb-1">Response Time</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We usually reply within <strong className="text-gray-700">24 hours</strong>.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0 shadow-xs">
              <EnvironmentOutlined />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a3254] mb-1">Office Location</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                TaskCloud Headquarter <br />
                Full-Stack Web Engineering Hub
              </p>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-gradient-to-br from-[#1a3254] to-[#284879] text-white p-6 rounded-2xl shadow-md">
            <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
              <MessageOutlined className="text-[#8c51d3]" /> Cloud & Technical Inquiries
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If you are experiencing issues with Cloudinary image uploads or JWT access permissions, please include your registered account email in the query message.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form (Takes 2 Columns on Large Screens) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a3254]">Send Us a Direct Message</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fill out the form below and our technical support staff will get back to you immediately.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center my-8 animate-fadeIn">
              <CheckCircleOutlined className="text-4xl text-emerald-600 mb-2" />
              <h3 className="text-lg font-bold">Message Sent Successfully!</h3>
              <p className="text-xs sm:text-sm text-emerald-700 mt-1">
                Thank you for contacting Veloria TaskCloud. We will process your request shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Full Name"
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-hidden focus:border-[#8c51d3] focus:bg-white transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-hidden focus:border-[#8c51d3] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Cloudinary Upload Query, Bug Report, Feature Request"
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-hidden focus:border-[#8c51d3] focus:bg-white transition-colors"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your issue or query in detail..."
                  className="w-full bg-gray-50/80 border border-gray-200 rounded-xl p-4 text-xs sm:text-sm focus:outline-hidden focus:border-[#8c51d3] focus:bg-white transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#8c51d3] hover:bg-[#733cb6] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-purple-500/25 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <SendOutlined />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </section>

      {/* 3. FAQ SECTION */}
      <section className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#8c51d3] flex items-center justify-center text-xl shadow-xs">
            <QuestionCircleOutlined />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1a3254]">Frequently Asked Questions</h3>
            <p className="text-xs text-gray-500">Quick answers to common questions about TaskCloud.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100">
            <h4 className="font-bold text-[#1a3254] mb-1">How are task images stored on Cloudinary?</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              When you attach an image to a task, it is uploaded directly to Cloudinary and referenced with a public ID in MongoDB. Deleting a task automatically cleans up the file.
            </p>
          </div>

          <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100">
            <h4 className="font-bold text-[#1a3254] mb-1">Is my task data private and secure?</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              Yes, all user sessions are protected using JSON Web Tokens (JWT). Your tasks are linked specifically to your authenticated user account.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;