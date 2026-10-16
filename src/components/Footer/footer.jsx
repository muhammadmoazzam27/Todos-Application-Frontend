import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircleOutlined,
  CloudServerOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  HeartFilled
} from '@ant-design/icons';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1d3557] text-white border-t border-slate-700/60 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-700/50">
          
          {/* Column 1: Brand Info (Left aligned on all screen sizes) */}
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#8c51d3] flex items-center justify-center text-white font-bold text-lg shadow-md">
                T
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Todo <span className="text-[#8c51d3]">TaskCloud</span>
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm mb-4">
              Manage your tasks effortlessly, store secure assets with Cloudinary, and stay organized every day.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#8c51d3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 text-sm shadow-sm"
              >
                <GithubOutlined />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#8c51d3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 text-sm shadow-sm"
              >
                <LinkedinOutlined />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-[#8c51d3] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 text-sm shadow-sm"
              >
                <TwitterOutlined />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (Left aligned on sm, md, lg) */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/dashboard/home-overview" className="hover:text-purple-300 transition-colors">
                  Dashboard Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-todo" className="hover:text-purple-300 transition-colors">
                  Create New Task
                </Link>
              </li>
              <li>
                <Link to="/dashboard/home-overview" className="hover:text-purple-300 transition-colors">
                  Completed Tasks
                </Link>
              </li>
              <li>
                <Link to="/dashboard/home-overview" className="hover:text-purple-300 transition-colors">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech & Features (Left aligned on sm, md, lg) */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-purple-300 mb-3">
              Cloud Powered
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CloudServerOutlined className="text-[#8c51d3] text-sm" />
                <span>Cloudinary Dynamic Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleOutlined className="text-emerald-400 text-sm" />
                <span>Real-Time Status Tracking</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                Fast, responsive, and secure task management solution built with modern MERN stack standards.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-300 gap-2">
          <p className="mb-0 text-left">
            &copy; <span className="font-bold text-white">{year}</span> Todo / TaskCloud. All Rights Reserved.
          </p>
          <p className="mb-0 flex items-center gap-1 text-slate-400 text-[11px]">
            Made with <HeartFilled className="text-red-500 text-xs" /> for MERN Stack Applications
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;