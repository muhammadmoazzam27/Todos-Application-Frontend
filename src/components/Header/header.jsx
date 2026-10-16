import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import {
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  DashboardOutlined,
  CheckSquareOutlined
} from '@ant-design/icons';

const Navbar = () => {
  const { isAuth, handleLogout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper to check active tab
  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1d3557]/95 backdrop-blur-md border-b border-slate-700/60 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* 1. Logo Section (Responsive scaling) */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2 sm:gap-2.5 group transition-transform duration-200 active:scale-95"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#8c51d3] text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-md group-hover:bg-[#733cb6] transition-colors">
                <CheckSquareOutlined />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight px-1">
                Todo<span className="text-[#8c51d3] px-1">App</span>
              </span>
            </Link>
          </div>

          {/* 2. Desktop & Tablet Navigation Links (Hidden on mobile, visible on md+) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <Link
              to="/"
              className={`px-3 lg:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                isActive('/')
                  ? 'bg-[#8c51d3] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 lg:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                isActive('/about')
                  ? 'bg-[#8c51d3] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 lg:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                isActive('/contact')
                  ? 'bg-[#8c51d3] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* 3. Desktop & Tablet Auth Buttons (Hidden on mobile, visible on md+) */}
          <div className="hidden md:flex items-center space-x-2.5 lg:space-x-3">
            {!isAuth ? (
              <>
                <Link
                  to="/auth/login"
                  className="px-3 lg:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/70 rounded-xl transition-all border border-transparent hover:border-slate-700"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="px-3 lg:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#8c51d3] hover:bg-[#733cb6] rounded-xl shadow-md hover:shadow-purple-500/20 active:scale-95 transition-all duration-200 whitespace-nowrap"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard/home-overview"
                  className="px-3 lg:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                >
                  <DashboardOutlined className="text-[#8c51d3]" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 lg:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-red-600/90 hover:bg-red-600 rounded-xl shadow-md hover:shadow-red-500/20 active:scale-95 transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <LogoutOutlined />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* 4. Mobile Hamburger Button (Visible on mobile, hidden on md+) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800/80 focus:outline-hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <CloseOutlined className="text-xl" />
              ) : (
                <MenuOutlined className="text-xl" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Mobile & Small Screen Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1d3557] border-b border-slate-700/80 px-4 pt-3 pb-6 space-y-3 shadow-2xl transition-all">
          <div className="flex flex-col space-y-1.5">
            <Link
              to="/"
              onClick={closeMenu}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/')
                  ? 'bg-[#8c51d3] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/about')
                  ? 'bg-[#8c51d3] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/contact')
                  ? 'bg-[#8c51d3] text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Auth Actions */}
          <div className="pt-3 border-t border-slate-700/60 flex flex-col space-y-2.5">
            {!isAuth ? (
              <>
                <Link
                  to="/auth/login"
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/60 hover:bg-slate-800 rounded-xl transition-all border border-slate-700/50"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#8c51d3] hover:bg-[#733cb6] rounded-xl shadow-md transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard/home-overview"
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center gap-2 shadow-xs"
                >
                  <DashboardOutlined className="text-[#8c51d3]" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogoutOutlined />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;