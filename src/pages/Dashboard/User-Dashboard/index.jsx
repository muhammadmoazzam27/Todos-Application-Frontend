import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Image, Space, Table, Modal, Form, Input, Select } from 'antd';
import { useAuthContext } from '@/context/AuthContext';
import "@/config/global";
import axios from 'axios';


const { Item } = Form;
const { Option } = Select;

const UserDashboard = () => {

    const GET_ALL_TODOS = import.meta.env.VITE_GET_ALL_TODO_API
    const EDIT_TODO_API = import.meta.env.VITE_EDIT_TODO_API
    const DELETE_TODO_API = import.meta.env.VITE_DELETE_TODO_API

    const { user } = useAuthContext();

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);


    const initialState = { id: '', title: '', description: '', priority: '', status: '', dueDate: '' };

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

            const res = await axios.patch(
                `${EDIT_TODO_API}`,
                editTodo,
                { headers: { Authorization: `Bearer ${token}` } }
            );

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

            const todoId = record.id;
            const res = await axios.delete(`${DELETE_TODO_API}/${todoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { status, data } = res;
            if (status === 200 && !data.isError) {
                toastify(data.message || "Todo deleted", "success");

                const filterTodo = todos.filter((todo) => {
                    const currentId = todo.id;
                    return currentId !== todoId;
                });

                setTodos(filterTodo);

            }
        }
        catch (error) {
            toastify(error.response?.data?.message || "Todo not deleted", "error");
            console.error("Error : ", error);
        }
        finally {
            setIsSubmitting(false);
        }
    }

    // ---------- Ant Design Table Column --------- //
    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageURL',
            render: (imageURL) => imageURL ? <Image style={{ width: 50, height: 40, borderRadius: 4 }} src={imageURL} /> : <span className="text-slate-400 text-xs">No Image</span>,
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
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority === 'High' ? 'bg-green-100 text-green-700' : priority === 'Medium' ? 'bg-sky-100 text-sky-700' : 'bg-red-100 text-red-700'}`}>
                    {priority}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Completed' ? 'bg-green-100 text-green-700' : status === 'In-Progress' || status === 'In Progress' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
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
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <button
                        className='bg-green-800 text-white font-normal rounded px-3 py-1 text-sm hover:bg-green-700 transition-colors'
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </button>
                    <button
                        className='bg-red-800 text-white font-normal rounded px-3 py-1 text-sm hover:bg-red-700 transition-colors'
                        onClick={() => handleDelete(record)}
                    >
                        Delete
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
        <div className="min-h-screen flex flex-col bg-slate-50">

            {/* Header */}
            <header className='py-3 px-4 sm:px-6 lg:px-8 bg-[#1a3254] flex justify-between items-center shadow-md gap-2 sm:gap-4'>
                {/* Left: Button */}
                <div className='flex-shrink-0'>
                    <Link
                        className='group bg-[#8c51d3] hover:bg-[#5d36a7] text-white py-1.5 px-3 sm:py-2 sm:px-5 text-sm sm:text-base font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap'
                        to="/"
                    >
                        {/* Back Arrow SVG with hover effect */}
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-white transform group-hover:-translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        <span>Home Page</span>
                    </Link>
                </div>

                {/* Center: Title */}

                <h1 className='text-base sm:text-xl md:text-2xl font-bold text-white mb-0 tracking-wide text-center truncate px-2'>
                    User Dashboard
                </h1>

                {/* Right: Profile Info */}
                <div className='flex-shrink-0 flex items-center'>
                    <Space size={{ xs: 'small', sm: 'middle' }}>
                        <span className='inline-block bg-gradient-to-tr from-blue-400 to-indigo-500 border-2 border-white rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mx-1 shadow-inner flex-shrink-0'></span>
                        <span className='text-white text-xs sm:text-sm md:text-base font-medium hidden sm:inline max-w-[120px] md:max-w-[200px] truncate'>
                            {user?.email}
                        </span>
                    </Space>
                </div>
            </header>

            {/* Main Content */}
            <main className='flex-grow px-3 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full'>

                {/* Cards Section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm'>
                        <h2 className='font-semibold text-slate-500 text-sm sm:text-base uppercase tracking-wider mb-1'>Total Todos</h2>
                        <p className='text-3xl sm:text-4xl font-extrabold text-[#1a3254] mb-0'>{todos.length}</p>
                    </div>
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm'>
                        <h2 className='font-semibold text-amber-600 text-sm sm:text-base uppercase tracking-wider mb-1'>Pending</h2>
                        <p className='text-3xl sm:text-4xl font-extrabold text-amber-600 mb-0'>{pendingCount}</p>
                    </div>
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm'>
                        <h2 className='font-semibold text-sky-600 text-sm sm:text-base uppercase tracking-wider mb-1'>In Progress</h2>
                        <p className='text-3xl sm:text-4xl font-extrabold text-sky-600 mb-0'>{inProgressCount}</p>
                    </div>
                    <div className='p-5 bg-white text-slate-800 text-center border border-slate-200 rounded-2xl shadow-sm'>
                        <h2 className='font-semibold text-emerald-600 text-sm sm:text-base uppercase tracking-wider mb-1'>Completed</h2>
                        <p className='text-3xl sm:text-4xl font-extrabold text-emerald-600 mb-0'>{completedCount}</p>
                    </div>
                </div>

                {/* Section Title & Add Button */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm'>
                    <h2 className='font-bold text-xl sm:text-2xl text-slate-800 mb-0'>Todos List</h2>
                    <Link className='w-full sm:w-auto bg-[#1a3254] hover:bg-[#244575] text-white py-2 px-5 font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2' to="/dashboard/add-todo">
                        <span className="text-lg leading-none">+</span> Add Todo
                    </Link>
                </div>

                {/* Ant Design Table */}
                <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-3 sm:p-4'>
                    <Table
                        rowKey={(record) => record._id || record.id}
                        columns={columns}
                        dataSource={todos}
                        loading={loading}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: 'max-content' }}
                    />
                </div>

                {/* Ant Design Edit Modal */}
                <Modal
                    style={{ top: 20, bottom: 20 }}
                    styles={{ body: { maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', paddingRight: '4px' } }}
                    title={<div style={{ textAlign: 'center', width: '100%', fontSize: "20px", fontWeight: "700", padding: "8px" }}>Update Todo</div>}
                    open={isModalOpen}
                    onOk={handleEditTodo}
                    onCancel={() => setIsModalOpen(false)}
                    confirmLoading={isSubmitting}
                    okText="Update"
                >
                    <div className="py-3">

                        <Form layout='vertical'>

                            <Item label="Title">
                                <Input placeholder='Enter Title' value={editTodo.title} size='large' name="title" onChange={handleInputChange} />
                            </Item>

                            <Item label="Due Date">
                                <Input
                                    placeholder='Select Due Date'
                                    value={editTodo.dueDate}
                                    size='large'
                                    name="dueDate"
                                    onChange={handleInputChange}
                                />
                            </Item>

                            <Item label="Priority">
                                <Select
                                    placeholder="Select priority"
                                    className="w-full"
                                    size="large"
                                    value={editTodo.priority || ""}
                                    onChange={(priority) => setEditTodo((s) => ({ ...s, priority }))}
                                >
                                    <Option value="Low">Low</Option>
                                    <Option value="Medium">Medium</Option>
                                    <Option value="High">High</Option>
                                </Select>
                            </Item>

                            <Item label="Status">
                                <Select
                                    placeholder="Select status"
                                    className="w-full"
                                    size="large"
                                    value={editTodo.status || ""}
                                    onChange={(status) => setEditTodo((s) => ({ ...s, status }))}
                                >
                                    <Option value="Pending">Pending</Option>
                                    <Option value="In-Progress">In Progress</Option>
                                    <Option value="Completed">Completed</Option>
                                </Select>
                            </Item>

                            <Item label="Description">
                                <Input.TextArea rows={3} placeholder='Write description about todo..' value={editTodo.description} size='large' name="description" onChange={handleInputChange} />
                            </Item>
                        </Form>
                    </div>
                </Modal>

            </main>

            {/* Footer */}
            <footer className="bg-[#1a3254] py-4 mt-auto shadow-inner">
                <div className="text-center">
                    <p className="mb-0 text-slate-300 text-sm">© 2026 User Dashboard. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    )
}

export default UserDashboard