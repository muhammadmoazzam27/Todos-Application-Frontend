import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Image, Space, Table, Modal } from 'antd'
import axios from 'axios';

const UserDashboard = () => {

    const GET_ALL_TODOS = import.meta.env.VITE_GET_ALL_TODO_API

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);


    // -------- Fetch All Todos --------- //

    const getAllTodos = () => {

        setLoading(true);

        const token = localStorage.getItem("jwt");

        axios.get(`${GET_ALL_TODOS}`, { headers: { Authorization: `Bearer ${token}` } })

            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    console.log("All Todos : ", data.allTodos)
                    setTodos(data.allTodos);
                }
            })
            .catch((error => {
                console.error("Error : ", error);
            }))
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {
        getAllTodos();
    }, [])


    // ------ Todo Delete Function ------- //

    const handleDelete = (todo) => {
        console.log("Delete Todo : ", todo)
    }

    // ------ Todo Edit Function ------- //

    const handleEdit = (todo) => {
        console.log("Edit Todo : ", todo)
    }


    // ---------- Ant Design Table Column --------- //

    const columns = [

        {
            title: 'Image',
            dataIndex: 'imageURL',
            render: (imageURL) => imageURL ? <Image style={{ width: 50, height: 40, borderRadius: 4 }} src={imageURL} /> : <Text>No Image</Text>,
            key: 'imageURL',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority === 'High' ? 'bg-green-100 text-green-700' : priority === 'Medium' ? 'bg-sky-100 text-sky-700' : 'bg-red-100 text-red-800'}`}>
                    {priority}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Completed' ? 'bg-green-100 text-green-700' : status === 'In Progress' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <button
                        className='bg-green-800 text-white font-normal rounded px-3 py-1'
                        onClick={() => handleEditClick(record)} // <-- Yahan record pass kiya
                    >
                        Edit
                    </button>
                    <button
                        className='bg-red-800 text-white font-normal rounded px-3 py-1'
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </button>
                </Space>
            ),
        },
    ];


    // --------- Ant Design Modal --------- //

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({
        title: '',
        description: '',
        priority: '',
        status: '',
        dueDate: '',
        imageURL: ''
    });

    // Jab user Edit button dabaye
    const handleEditClick = (record) => {
        setCurrentTodo(record); // Us todo ka data state mein daal dein
        setIsModalOpen(true);   // Modal khol dein
    };

    // Input fields change hone par state update karne ke liye
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTodo({ ...currentTodo, [name]: value });
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


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
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-[#1a3254]'>{todos.length}</h1>
                    </div>

                    {/* Pending Card */}
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
                        <h1 className='font-semibold text-amber-600 text-sm sm:text-base uppercase tracking-wider mb-1'>Pending</h1>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-amber-600'>0</h1>
                    </div>

                    {/* In-Progress Card */}
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
                        <h1 className='font-semibold text-sky-600 text-sm sm:text-base uppercase tracking-wider mb-1'>In Progress</h1>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-sky-600'>0</h1>
                    </div>

                    {/* Completed Card */}
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1'>
                        <h1 className='font-semibold text-emerald-600 text-sm sm:text-base uppercase tracking-wider mb-1'>Completed</h1>
                        <h1 className='text-3xl sm:text-4xl font-extrabold text-emerald-600'>0</h1>
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
                        rowKey="id"
                        columns={columns}
                        dataSource={todos}
                        loading={loading}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: 'max-content' }}
                    />
                </div>

                {/* Ant Desgin Edit Modal  */}
                <Modal
                    title="Edit Todo"
                    open={isModalOpen}
                    onOk={handleOk} // Yahan aap apni update API ki call likhenge
                    onCancel={() => setIsModalOpen(false)}
                    okText="Update"
                >
                    <div className="flex flex-col gap-4 py-3">
                        {/* Title Input */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={currentTodo.title}
                                onChange={handleInputChange}
                                className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Description Input */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Description</label>
                            <textarea
                                name="description"
                                value={currentTodo.description}
                                onChange={handleInputChange}
                                className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                rows="3"
                            />
                        </div>

                        {/* Priority Select */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Priority</label>
                            <select
                                name="priority"
                                value={currentTodo.priority}
                                onChange={handleInputChange}
                                className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        {/* Status Select */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-700">Status</label>
                            <select
                                name="status"
                                value={currentTodo.status}
                                onChange={handleInputChange}
                                className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="Completed">Completed</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </Modal>

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