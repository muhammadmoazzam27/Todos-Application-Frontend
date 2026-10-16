import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircleOutlined,
  BarsOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CalendarOutlined,
  FlagOutlined,
  PictureOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  CloudUploadOutlined,
  SafetyCertificateOutlined,
  DashboardOutlined
} from '@ant-design/icons';

const Home = () => {
  // Sample data
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Complete React Dashboard UI',
      description: 'Design responsive layout using Tailwind CSS and Ant Design icons.',
      dueDate: '2026-04-20',
      priority: 'High',
      status: 'In Progress',
      imageUrl: 'https://images.unsplash.com/photo-1641261689141-ee46b8a0470c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
    },
    {
      id: 2,
      title: 'Setup Node.js & Cloudinary API',
      description: 'Implement backend delete API with image cleanup from Cloudinary.',
      dueDate: '2026-04-18',
      priority: 'Medium',
      status: 'Completed',
      imageUrl: 'https://images.unsplash.com/photo-1767449356630-c60094b1d1b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
    },
    {
      id: 3,
      title: 'Database Schema Optimization',
      description: 'Add publicId fields to handle image deletions efficiently.',
      dueDate: '2026-04-25',
      priority: 'Low',
      status: 'Pending',
      imageUrl: "https://images.unsplash.com/photo-1676287569521-20f0fe96eebf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
    }
  ]);

  // Statistics calculation
  const totalTodos = todos.length;
  const pendingTodos = todos.filter(t => t.status === 'Pending').length;
  const inProgressTodos = todos.filter(t => t.status === 'In Progress').length;
  const completedTodos = todos.filter(t => t.status === 'Completed').length;

  // Priority color helper
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Status color helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Pending':
        return 'bg-orange-50 text-orange-700 border border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <main className="w-full min-h-[calc(100vh-70px)] bg-gray-50 px-3 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto bg-gradient-to-r from-[#1a3254] to-[#284879] text-white rounded-2xl p-6 sm:p-10 shadow-xl mb-10 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#8c51d3]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="text-center md:text-left z-10">
          <span className="inline-block bg-[#8c51d3]/30 text-purple-200 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-full mb-3 border border-purple-400/35 shadow-inner">
            ⚡ Smart Task & Cloud Manager
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            Your Day, Your Tasks, <br /> <span className="text-[#a875e6]">All in One Place</span>
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            Track your daily tasks efficiently, keep images securely stored on Cloudinary, and elevate your personal productivity to the next level.
          </p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center z-10">
          <Link
            to="/dashboard/add-todo"
            className="w-full sm:w-auto bg-[#8c51d3] hover:bg-[#733cb6] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2.5 text-sm whitespace-transform hover:-translate-y-0.5"
          >
            <PlusCircleOutlined className="text-lg" />
            <span>Add New Todo</span>
          </Link>
        </div>
      </section>

      {/* 2. STATUS TRACKING CARDS */}
      <section className="max-w-7xl mx-auto mb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {/* Total Todos */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-between group">
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Total Todos</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a3254] mt-1 group-hover:scale-105 transition-transform origin-left">{totalTodos}</h3>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5 block">Overall tasks recorded</span>
            </div>
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-indigo-50 text-[#1a3254] rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:bg-[#1a3254] group-hover:text-white transition-colors duration-300">
              <BarsOutlined />
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-between group">
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Status</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-orange-600 mt-1 group-hover:scale-105 transition-transform origin-left">{pendingTodos}</h3>
              <span className="text-[10px] text-orange-400 font-medium mt-0.5 block">Awaiting action</span>
            </div>
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
              <ExclamationCircleOutlined />
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-between group">
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">In Progress</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1 group-hover:scale-105 transition-transform origin-left">{inProgressTodos}</h3>
              <span className="text-[10px] text-blue-400 font-medium mt-0.5 block">Currently working</span>
            </div>
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <SyncOutlined spin />
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center justify-between group">
            <div>
              <p className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Completed Status</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 group-hover:scale-105 transition-transform origin-left">{completedTodos}</h3>
              <span className="text-[10px] text-emerald-400 font-medium mt-0.5 block">Successfully done</span>
            </div>
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <CheckCircleOutlined />
            </div>
          </div>

        </div>
      </section>

      {/* 3. TODOS LIST & CARDS SECTION */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a3254] flex items-center gap-2">
                <span>🎯 Active Tasks Overview</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Manage, edit, and keep track of your priority workflows in real-time.</p>
            </div>
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              Showing {todos.length} Active Items
            </span>
          </div>

          {todos.length === 0 ? (
            <div className="text-center bg-gray-50 p-12 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm font-medium">No todos found. Create your first task now!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden text-sm group"
                >
                  {/* Todo Image Preview */}
                  {todo.imageUrl ? (
                    <div className="w-full h-40 bg-gray-100 relative overflow-hidden">
                      <img
                        src={todo.imageUrl}
                        alt={todo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                        <PictureOutlined /> Cloudinary
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-20 bg-gray-50 border-b border-gray-100 flex items-center justify-center text-gray-400 text-xs gap-1.5">
                      <PictureOutlined /> No Image Attached
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Header: Title & Status */}
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-bold text-[#1a3254] text-base line-clamp-1 group-hover:text-[#8c51d3] transition-colors">{todo.title}</h3>
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold whitespace-nowrap shadow-xs ${getStatusBadge(todo.status)}`}>
                          {todo.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed">
                        {todo.description}
                      </p>
                    </div>

                    <div>
                      {/* Metadata: Due Date & Priority */}
                      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3 mb-4">
                        <div className="flex items-center gap-1.5">
                          <CalendarOutlined className="text-[#8c51d3]" />
                          <span className="text-xs font-medium">{todo.dueDate}</span>
                        </div>
                        <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${getPriorityBadge(todo.priority)}`}>
                          <FlagOutlined />
                          <span>{todo.priority}</span>
                        </div>
                      </div>

                      {/* Actions: Edit & Delete */}
                      <div className="flex gap-2.5">
                        <button className="flex-1 bg-gray-50 hover:bg-[#1a3254] hover:text-white text-[#1a3254] text-xs font-semibold py-2 rounded-xl border border-gray-200 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs">
                          <EditOutlined /> Edit
                        </button>
                        <button className="flex-1 bg-red-50/60 hover:bg-red-600 hover:text-white text-red-600 text-xs font-semibold py-2 rounded-xl border border-red-100 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs">
                          <DeleteOutlined /> Delete
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. FOOTER INFO BOX SECTION */}
      <section className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#8c51d3] flex items-center justify-center text-xl shadow-xs">
              <DashboardOutlined />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1a3254]">About Your Cloud Task Dashboard</h3>
              <p className="text-xs text-gray-500">Empowering seamless daily management and reliable cloud asset handling.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600">
            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-[#1a3254] mb-1.5 text-sm">
                <CloudUploadOutlined className="text-[#8c51d3] text-base" /> Cloudinary Integration
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                All uploaded task visuals and attachments are securely processed through Cloudinary APIs with optimized delivery and fast public ID cleanup on deletions.
              </p>
            </div>

            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-[#1a3254] mb-1.5 text-sm">
                <SafetyCertificateOutlined className="text-emerald-600 text-base" /> Secure & Role-Based
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Protected by robust JWT authentication and role-based access rules to ensure that your personal tasks and sensitive data remain strictly private and secure.
              </p>
            </div>

            <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-[#1a3254] mb-1.5 text-sm">
                <SyncOutlined className="text-blue-600 text-base" /> Real-Time Analytics
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Instant tracking updates across Pending, In Progress, and Completed states to give you a clear visual breakdown of your daily workflow performance.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;