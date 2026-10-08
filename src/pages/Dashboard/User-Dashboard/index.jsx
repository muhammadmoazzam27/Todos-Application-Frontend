import { Space, Table, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

const UserDashboard = () => {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Completed' ? 'bg-green-100 text-green-700' : status === 'In Progress' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>                 {status}
                </span>
            ),
        },
    ];

    const data = [
        { key: '1', id: 1, title: 'Learn React & Tailwind', status: 'Completed' },
        { key: '2', id: 2, title: 'Build User Dashboard', status: 'Pending' },
        { key: '3', id: 3, title: 'Integrate Ant Design Table', status: 'In Progress' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">

            {/* Header */}
            <header className='header py-3 px-4 sm:px-6 bg-[#1a3254] flex justify-between items-center shadow-md'>
                <h1 className='text-lg sm:text-2xl font-bold text-white mb-0 tracking-wide'>User Dashboard</h1>
                <div className='flex items-center'>
                    <Space size="middle">
                        <span className='inline-block bg-gradient-to-tr from-blue-400 to-indigo-500 border-2 border-white rounded-full w-9 h-9 sm:w-10 sm:h-10 shadow-inner'></span>
                        <span className='text-white text-sm sm:text-base font-medium hidden sm:inline'>user@gmail.com</span>
                    </Space>
                </div>
            </header>

            {/* Main Content */}
            <main className='main-content flex-grow px-3 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full'>

                {/* Cards Section */}
                <div className='card-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>

                    {/* Total Todos Card */}
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
                        <h1 className='font-semibold text-slate-500 text-sm sm:text-base uppercase tracking-wider mb-1'>Total Todos</h1>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-[#1a3254]'>20</h1>
                    </div>

                    {/* Pending Card */}
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
                        <h1 className='font-semibold text-amber-600 text-sm sm:text-base uppercase tracking-wider mb-1'>Pending</h1>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-amber-600'>5</h1>
                    </div>

                    {/* In-Progress Card */}
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
                        <h1 className='font-semibold text-sky-600 text-sm sm:text-base uppercase tracking-wider mb-1'>In Progress</h1>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-sky-600'>5</h1>
                    </div>

                    {/* Completed Card */}
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
                        <h1 className='font-semibold text-emerald-600 text-sm sm:text-base uppercase tracking-wider mb-1'>Completed</h1>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-emerald-600'>10</h1>
                    </div>

                </div>

                {/* Section Title & Add Button */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
                    <h1 className='font-bold text-xl sm:text-2xl text-slate-800'>Todos List</h1>
                    <Link className='w-full sm:w-auto bg-[#1a3254] hover:bg-[#244575] text-white py-2 px-5 font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2' to="/dashboard/add-todo">
                        <span className="text-lg leading-none">+</span> Add Todo
                    </Link>
                </div>

                {/* Ant Design Table container with horizontal scroll for responsiveness */}
                <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-3 sm:p-4'>
                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: 'max-content' }}
                    />
                </div>

            </main>

            {/* Footer */}
            <footer className="footer bg-[#1a3254] py-4 mt-auto shadow-inner">
                <div className="text-center">
                    <p className="mb-0 text-slate-300 text-sm">© 2026 User Dashboard. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    )
}

export default UserDashboard