import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquareOutlined,
  CloudUploadOutlined,
  SafetyCertificateOutlined,
  SyncOutlined,
  RocketOutlined,
  ArrowRightOutlined,
  DatabaseOutlined,
  CodeOutlined
} from '@ant-design/icons';

const About = () => {
  return (
    <main className="w-full min-h-[calc(100vh-70px)] bg-gray-50 px-3 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto bg-gradient-to-r from-[#1a3254] to-[#284879] text-white rounded-2xl p-6 sm:p-12 shadow-xl mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#8c51d3]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-2xl z-10">
          <span className="inline-block bg-[#8c51d3]/30 text-purple-200 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-full mb-4 border border-purple-400/35 shadow-inner">
            🚀 About Veloria TaskCloud
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Empowering Your Productivity, <br />
            <span className="text-[#a875e6]">One Task at a Time</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-6">
            Welcome to <strong className="text-white">Veloria TaskCloud</strong> — a modern, secure, and full-stack task management application designed to keep your daily workflows organized while seamlessly handling secure image assets in the cloud.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <Link
              to="/contact"
              className="bg-[#8c51d3] hover:bg-[#733cb6] text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <span>Get in Touch</span>
              <ArrowRightOutlined />
            </Link>
            <Link
              to="/"
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold py-2.5 px-6 rounded-xl border border-slate-700 transition-all duration-300 text-sm"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-center z-10">
          <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-[#8c51d3] to-[#1a3254] flex items-center justify-center shadow-2xl border-4 border-white/10">
            <CheckSquareOutlined className="text-6xl sm:text-7xl text-white" />
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES SECTION */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3254] mb-3">
            Built with Powerful Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Our platform combines cutting-edge web development tools to deliver a fast, reliable, and secure task management experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#8c51d3] flex items-center justify-center text-xl mb-4 group-hover:bg-[#8c51d3] group-hover:text-white transition-colors duration-300 shadow-sm">
                <CloudUploadOutlined />
              </div>
              <h3 className="text-lg font-bold text-[#1a3254] mb-2">Cloudinary Image Storage</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Attach images seamlessly to your tasks. All visual assets are uploaded securely via Cloudinary API with efficient public ID tracking for quick cleanups.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] font-semibold text-[#8c51d3] flex items-center gap-1">
              <span>Optimized Cloud Assets</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <SafetyCertificateOutlined />
              </div>
              <h3 className="text-lg font-bold text-[#1a3254] mb-2">Secure Authentication</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Protected by JSON Web Tokens (JWT) and robust role-based access control, ensuring your personal tasks and account data remain confidential.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
              <span>End-to-End Security</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <SyncOutlined />
              </div>
              <h3 className="text-lg font-bold text-[#1a3254] mb-2">Real-Time Status Tracking</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Monitor your daily performance with live analytics across Total, Pending, In Progress, and Completed task indicators.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
              <span>Live Workflow Updates</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TECH STACK & MISSION SECTION */}
      <section className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8c51d3] mb-2 block">
              Our Technology Stack
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a3254] mb-4">
              Engineered with Modern MERN Standards
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              Veloria TaskCloud is crafted using a robust full-stack architecture. From responsive front-end components built with React, Tailwind CSS, and Ant Design icons to a scalable Node.js/Express backend integrated with MongoDB.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-gray-700">
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <CodeOutlined className="text-[#8c51d3] text-base" /> React & Tailwind CSS
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <DatabaseOutlined className="text-blue-600 text-base" /> MongoDB & Express
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a3254] to-[#284879] text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#8c51d3]/20 rounded-full blur-2xl pointer-events-none"></div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <RocketOutlined className="text-[#8c51d3]" /> Our Core Mission
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              To provide developers and everyday users with an intuitive, clutter-free task management ecosystem that bridges simple tracking with powerful cloud storage features.
            </p>
            <p className="text-xs text-purple-200 font-medium">
              ⚡ Stay productive, stay organized, and let us handle the heavy lifting of cloud storage!
            </p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;