import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Space, Table, Modal, Form, Input, Select } from 'antd';
import { useAuthContext } from '@/context/AuthContext';
import "@/config/global";
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
    BarsOutlined,
    ClockCircleOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    ArrowLeftOutlined,
    UserOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Item } = Form;
const { Option } = Select;

const initialState = { id: '', title: '', description: '', priority: '', status: '', dueDate: '' };

const UserDashboard = () => {
    const GET_ALL_TODOS = import.meta.env.VITE_GET_ALL_TODO_API;
    const EDIT_TODO_API = import.meta.env.VITE_EDIT_TODO_API;
    const DELETE_TODO_API = import.meta.env.VITE_DELETE_TODO_API;

    const { user } = useAuthContext();

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [editTodo, setEditTodo] = useState(initialState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Input fields change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditTodo((s) => ({ ...s, [name]: value }));
    };

    const token = localStorage.getItem("jwt");

    // -------- GET All Todos --------- //
    const getAllTodos = () => {
        setLoading(true);

        axios.get(`${GET_ALL_TODOS}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setTodos(data.allTodos || []);
                }
            })
            .catch((error => {
                console.error("Error : ", error);
                toastify("Get all todos", "error");
            }))
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllTodos();
    }, []);

    // ------- Get Todo data on the click edit button ------- //
    const handleEdit = (record) => {
        setEditTodo({
            id: record.id || record._id,
            title: record.title || '',
            description: record.description || '',
            priority: record.priority || '',
            status: record.status || '',
            dueDate: record.dueDate || ''
        });
        setIsModalOpen(true);
    };

    // ------ Todo Edit Function ------- //
    const handleEditTodo = async () => {
        setIsSubmitting(true);
        try {
            const res = await axios.patch(`${EDIT_TODO_API}`, editTodo, { headers: { Authorization: `Bearer ${token}` } });
            const { status, data } = res;
            if (status === 200) {
                toastify(data.message || "Todo updated successfully", "success");
                setIsModalOpen(false);
                getAllTodos();
            }
        } catch (error) {
            console.error("Error : ", error);
            toastify(error.response?.data?.message || "Failed to update todo", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ------ Todo Delete Function ------- //
    const handleDelete = async (record) => {
        setIsSubmitting(true);
        try {
            const todoId = record.id || record._id;
            const res = await axios.delete(`${DELETE_TODO_API}/${todoId}`, { headers: { Authorization: `Bearer ${token}` } });

            const { status, data } = res;
            if (status === 200 && !data.isError) {
                toastify(data.message || "Todo deleted", "success");
                const filterTodo = todos.filter((todo) => {
                    const currentId = todo.id || todo._id;
                    return currentId !== todoId;
                });
                setTodos(filterTodo);
            }
        } catch (error) {
            toastify(error.response?.data?.message || "Todo not deleted", "error");
            console.error("Error : ", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    // ---------- Ant Design Table Column --------- //
    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageURL',
            render: (imageURL) => imageURL ? (
                <Image
                    style={{ width: 55, height: 44, borderRadius: 6, objectFit: 'cover' }}
                    src={imageURL}
                    alt="Todo Attachment"
                />
            ) : (
                <span className="text-slate-400 text-xs italic bg-gray-50 px-2 py-1 rounded-md border border-gray-100">No Image</span>
            ),
            key: 'imageURL',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title) => <span className="font-semibold text-slate-800">{title}</span>
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priority === 'High'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : priority === 'Medium'
                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>
                    {priority || 'Normal'}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${status === 'Completed'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : status === 'In-Progress' || status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                    {status || 'Pending'}
                </span>
            ),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (date) => <span className="text-slate-600 text-xs font-medium">{date}</span>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (desc) => <span className="text-slate-500 text-xs line-clamp-2 max-w-xs">{desc}</span>
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="small">
                    <button
                        className='bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-200 font-semibold rounded-xl px-3 py-1.5 text-xs transition-all flex items-center gap-1 shadow-2xs cursor-pointer'
                        onClick={() => handleEdit(record)}
                    >
                        <EditOutlined />
                        <span>Edit</span>
                    </button>
                    <button
                        className='bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 font-semibold rounded-xl px-3 py-1.5 text-xs transition-all flex items-center gap-1 shadow-2xs cursor-pointer'
                        onClick={() => handleDelete(record)}
                    >
                        <DeleteOutlined />
                        <span>Delete</span>
                    </button>
                </Space>
            ),
        },
    ];

    // Dynamic Counts Calculation
    const pendingCount = todos.filter(t => t.status === 'Pending').length;
    const inProgressCount = todos.filter(t => t.status === 'In-Progress' || t.status === 'In Progress').length;
    const completedCount = todos.filter(t => t.status === 'Completed').length;

    return (
        <div className="min-h-[calc(100vh-70px)] flex flex-col bg-gray-50 overflow-x-hidden">

            {/* 1. HERO HEADER SECTION */}
            <header className='py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#1a3254] to-[#284879] shadow-md flex justify-between items-center gap-2 sm:gap-4'>
                {/* Left: Home Page Button */}
                <div className='flex-shrink-0'>
                    <Link
                        className='group bg-[#8c51d3] hover:bg-[#733cb6] text-white py-2 px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap'
                        to="/"
                    >
                        <ArrowLeftOutlined className="transform group-hover:-translate-x-1 transition-transform" />
                        <span>Home Page</span>
                    </Link>
                </div>

                {/* Center: Title */}
                <h1 className='text-base sm:text-xl md:text-2xl font-extrabold text-white mb-0 tracking-tight text-center truncate px-2'>
                    User Dashboard
                </h1>

                {/* Right: Profile Info */}
                <div className='flex-shrink-0 flex items-center bg-slate-800/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-xs'>
                    <Space size="small">
                        <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8c51d3] text-white flex items-center justify-center font-bold text-xs shadow-inner'>
                            <UserOutlined />
                        </div>
                        <span className='text-slate-200 text-xs sm:text-sm font-medium hidden sm:inline max-w-[120px] md:max-w-[180px] truncate'>
                            {user?.email || 'User Account'}
                        </span>
                    </Space>
                </div>
            </header>

            {/* 2. MAIN CONTENT AREA */}
            <main className='flex-grow px-3 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full'>

                {/* STATISTICS CARDS */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>

                    {/* Total */}
                    <div className='bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-center justify-between group'>
                        <div>
                            <p className='text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>Total Todos</p>
                            <h3 className='text-2xl sm:text-3xl font-extrabold text-[#1a3254] m-0 group-hover:scale-105 transition-transform origin-left'>{todos.length}</h3>
                            <span className='text-[10px] text-gray-400 mt-0.5 block'>All assigned tasks</span>
                        </div>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-indigo-50 text-[#1a3254] rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:bg-[#1a3254] group-hover:text-white transition-colors'>
                            <BarsOutlined />
                        </div>
                    </div>

                    {/* Pending */}
                    <div className='bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-center justify-between group'>
                        <div>
                            <p className='text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>Pending</p>
                            <h3 className='text-2xl sm:text-3xl font-extrabold text-orange-600 m-0 group-hover:scale-105 transition-transform origin-left'>{pendingCount}</h3>
                            <span className='text-[10px] text-orange-400 mt-0.5 block'>Awaiting action</span>
                        </div>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:bg-orange-600 group-hover:text-white transition-colors'>
                            <ClockCircleOutlined />
                        </div>
                    </div>

                    {/* In Progress */}
                    <div className='bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-center justify-between group'>
                        <div>
                            <p className='text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>In Progress</p>
                            <h3 className='text-2xl sm:text-3xl font-extrabold text-blue-600 m-0 group-hover:scale-105 transition-transform origin-left'>{inProgressCount}</h3>
                            <span className='text-[10px] text-blue-400 mt-0.5 block'>Active workflows</span>
                        </div>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                            <SyncOutlined spin />
                        </div>
                    </div>

                    {/* Completed */}
                    <div className='bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-center justify-between group'>
                        <div>
                            <p className='text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1'>Completed</p>
                            <h3 className='text-2xl sm:text-3xl font-extrabold text-emerald-600 m-0 group-hover:scale-105 transition-transform origin-left'>{completedCount}</h3>
                            <span className='text-[10px] text-emerald-400 mt-0.5 block'>Successfully done</span>
                        </div>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors'>
                            <CheckCircleOutlined />
                        </div>
                    </div>

                </div>

                {/* TABLE SECTION WRAPPER */}
                <div className='bg-white rounded-2xl shadow-md border border-gray-100 p-5 sm:p-6 mb-10'>

                    {/* Header & Add Button Bar */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 border-b border-gray-100 pb-4'>
                        <div>
                            <h2 className='font-extrabold text-xl sm:text-2xl text-[#1a3254] m-0'>🎯 Todos Management List</h2>
                            <p className='text-xs text-gray-500 mt-0.5'>View, edit, or delete your registered personal tasks efficiently.</p>
                        </div>
                        <Link
                            className='w-full sm:w-auto bg-[#8c51d3] hover:bg-[#733cb6] text-white py-2.5 px-5 font-semibold rounded-xl transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap'
                            to="/dashboard/add-todo"
                        >
                            <PlusCircleOutlined className="text-base" />
                            <span>Add New Todo</span>
                        </Link>
                    </div>

                    {/* Ant Design Table */}
                    <div className='overflow-hidden rounded-xl border border-gray-100'>
                        <Table
                            rowKey={(record) => record._id || record.id}
                            columns={columns}
                            dataSource={todos}
                            loading={loading}
                            pagination={{ pageSize: 5 }}
                            scroll={{ x: 'max-content' }}
                        />
                    </div>
                </div>

                {/* EDIT TODO MODAL */}
                <Modal
                    style={{ top: 20, bottom: 20 }}
                    styles={{ body: { maxHeight: 'calc(100vh - 220px)', overflowY: 'auto', paddingRight: '4px' } }}
                    title={<div style={{ textAlign: 'center', width: '100%', fontSize: "18px", fontWeight: "800", color: "#1a3254", padding: "10px 0" }}>Update Task Details</div>}
                    open={isModalOpen}
                    onOk={handleEditTodo}
                    onCancel={() => setIsModalOpen(false)}
                    confirmLoading={isSubmitting}
                    okText="Update Todo"
                    okButtonProps={{ style: { backgroundColor: '#8c51d3', borderColor: '#8c51d3', fontWeight: '600', borderRadius: '10px' } }}
                    cancelButtonProps={{ style: { borderRadius: '10px' } }}
                >
                    <div className="py-3">
                        <Form layout='vertical'>
                            <Item label={<span className="font-semibold text-xs text-slate-700">Task Title</span>}>
                                <Input placeholder='Enter Title' value={editTodo.title} size='large' name="title" onChange={handleInputChange} style={{ borderRadius: '10px' }} />
                            </Item>

                            <Item label={<span className="font-semibold text-xs text-slate-700">Due Date</span>}>
                                <Input
                                    placeholder='Select Due Date (YYYY-MM-DD)'
                                    value={editTodo.dueDate}
                                    size='large'
                                    name="dueDate"
                                    onChange={handleInputChange}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Item>

                            <Item label={<span className="font-semibold text-xs text-slate-700">Priority Level</span>}>
                                <Select
                                    placeholder="Select priority"
                                    className="w-full"
                                    size="large"
                                    value={editTodo.priority || undefined}
                                    onChange={(priority) => setEditTodo((s) => ({ ...s, priority }))}
                                >
                                    <Option value="Low">Low</Option>
                                    <Option value="Medium">Medium</Option>
                                    <Option value="High">High</Option>
                                </Select>
                            </Item>

                            <Item label={<span className="font-semibold text-xs text-slate-700">Task Status</span>}>
                                <Select
                                    placeholder="Select status"
                                    className="w-full"
                                    size="large"
                                    value={editTodo.status || undefined}
                                    onChange={(status) => setEditTodo((s) => ({ ...s, status }))}
                                >
                                    <Option value="Pending">Pending</Option>
                                    <Option value="In-Progress">In Progress</Option>
                                    <Option value="Completed">Completed</Option>
                                </Select>
                            </Item>

                            <Item label={<span className="font-semibold text-xs text-slate-700">Description</span>}>
                                <Input.TextArea rows={3} placeholder='Write description about todo..' value={editTodo.description} size='large' name="description" onChange={handleInputChange} style={{ borderRadius: '10px' }} />
                            </Item>
                        </Form>
                    </div>
                </Modal>

            </main>

            {/* 3. FOOTER SECTION */}
            <footer className="bg-[#1a3254] text-white py-4 mt-auto shadow-inner border-t border-slate-700/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="mb-0 text-slate-300 text-xs sm:text-sm">
                        &copy; 2026 User Dashboard / TaskCloud. All Rights Reserved.
                    </p>
                </div>
            </footer>

        </div>
    );
};

export default UserDashboard;