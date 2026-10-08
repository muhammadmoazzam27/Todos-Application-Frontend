import { useAuthContext } from '@/context/AuthContext';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { isAuth, handleLogout } = useAuthContext();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Navbar Bar */}
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            Todo App
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        <Link to="/" className="px-3 py-2 text-sm font-semibold text-slate-600 rounded-lg transition-colors hover:text-blue-600 hover:bg-slate-50">
                            Home
                        </Link>
                        <Link to="/about" className="px-3 py-2 text-sm font-semibold text-slate-600 rounded-lg transition-colors hover:text-blue-600 hover:bg-slate-50">
                            About
                        </Link>
                        <Link to="/contact" className="px-3 py-2 text-sm font-semibold text-slate-600 rounded-lg transition-colors hover:text-blue-600 hover:bg-slate-50">
                            Contact
                        </Link>
                    </div>

                    {/* Desktop Auth Buttons */}
                    {
                        !isAuth ?
                            <div className="hidden md:flex items-center space-x-3">
                                <Link to="/auth/login" className="px-4 py-2 text-sm font-semibold text-slate-700 rounded-xl hover:text-blue-600 hover:bg-slate-100 transition-all">
                                    Login
                                </Link>
                                <Link to="/auth/register" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all">
                                    Register
                                </Link>
                            </div>
                            :
                            <div className="hidden md:flex items-center space-x-3">
                                <Link to="/dashboard/home-overview" className="px-4 py-2 text-sm font-semibold text-green-700 bg-slate-50 rounded-xl hover:text-green-900 hover:bg-slate-100 transition-all">
                                    Dashboard
                                </Link>
                                <button className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl shadow-md shadow-blue-500/20 hover:bg-red-700 active:scale-95 transition-all" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                    }

                    {/* Pure CSS Mobile Toggle (Peer Pattern using Hidden Checkbox) */}
                    <div className="flex md:hidden">
                        <label className="relative cursor-pointer p-2 rounded-lg hover:bg-slate-100">
                            <input type="checkbox" className="peer hidden" id="menu-toggle" />

                            {/* Hamburger Icon (Visible when checkbox is unchecked) */}
                            <svg className="w-6 h-6 text-slate-700 peer-checked:hidden transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                            {/* Close Cross Icon (Visible when checkbox is checked) */}
                            <svg className="w-6 h-6 text-slate-700 hidden peer-checked:block transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            {/* Mobile Menu Dropdown (Controlled purely via CSS peer-checked modifier) */}
                            <div className="fixed inset-x-0 top-16 bg-white border-b border-slate-200 p-4 shadow-xl hidden peer-checked:flex flex-col space-y-3 md:hidden">
                                <Link to="/" className="px-3 py-2 text-base font-semibold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors">
                                    Home
                                </Link>
                                <Link to="/about" className="px-3 py-2 text-base font-semibold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors">
                                    About
                                </Link>
                                <Link to="/contact" className="px-3 py-2 text-base font-semibold text-slate-700 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors">
                                    Contact
                                </Link>

                                {
                                    !isAuth ?
                                        <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
                                            <Link to="/auth/login" className="px-4 py-2 text-sm font-semibold text-slate-700 rounded-xl hover:text-blue-600 hover:bg-slate-100 transition-all">
                                                Login
                                            </Link>
                                            <Link to="/auth/register" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all">
                                                Register
                                            </Link>
                                        </div>
                                        :
                                        <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
                                            <Link to="/dashboard/home-overview" className="px-4 py-2 text-sm font-semibold text-green-700 bg-slate-50 rounded-xl hover:text-green-900 hover:bg-slate-100 transition-all">
                                                Dashboard
                                            </Link>
                                            <button className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl shadow-md shadow-blue-500/20 hover:bg-red-700 active:scale-95 transition-all" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                }
                            </div>
                        </label>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;