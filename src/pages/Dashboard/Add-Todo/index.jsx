import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import "@/config/global";

const { TextArea } = Input;
const { Item } = Form;
const { Option } = Select;

const initialState = {
  title: "",
  priority: "Medium",
  status: "Pending",
  dueDate: "",
  description: ""
}

const AddTodo = () => {

  const [state, setState] = useState(initialState)
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setState((preState) => ({ ...preState, [e.target.name]: e.target.value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      return setImage(file)
    }
  }


  const handleSubmit = (e) => {

    e.preventDefault();

    const { title, priority, status, dueDate, description } = state;

    if (title.length < 3 || title.trim() === "") {
      return toastify("Enter todo title", "error")
    }
    if (!dueDate) {
      return toastify("Select a dueDate", "error")
    }
    if (description.length < 5 || description.trim() === "") {
      return toastify("Enter description", "error")
    }

    const todo = { title, priority, status, dueDate, description }

    const formData = new FormData();

    formData.append("image", image);

    for (const [key, value] of Object.entries(todo)) {
      formData.append(key, value)
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 my-4">

        {/* Header Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Add New Todo
          </h2>
          <p className="text-slate-500 text-sm mt-1">Fill in the details below to create a new task</p>
        </div>

        <Form layout="vertical" className="w-full">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Item
              label={<span className="font-semibold text-slate-700">Title</span>}
            >
              <Input size="large" placeholder="Enter todo title" className="rounded-xl py-2.5 border-slate-300 hover:border-blue-500 focus:border-blue-500" name="title" onChange={handleChange} />
            </Item>

            <Item
              label={<span className="font-semibold text-slate-700">Priority</span>}
              name="priority"
              initialValue="Medium"
            >
              <Select placeholder="Select priority" className="w-full" size="large" name="priority" onChange={(value) => setState((s) => ({ ...s, priority: value }))}>
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            </Item>
          </div>

          {/* Row 2: Status & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Item
              label={<span className="font-semibold text-slate-700">Status</span>}
              name="status"
              initialValue="Pending"
            >
              <Select placeholder="Select status" className="w-full" size="large" name="status" onChange={(value) => setState((s) => ({ ...s, status: value }))}>
                <Option value="Pending">Pending</Option>
                <Option value="In-Progress">In Progress</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Item>

            <Item
              label={<span className="font-semibold text-slate-700">Due Date</span>}
            >
              <DatePicker size="large" className="w-full rounded-xl py-2.5 border-slate-300 hover:border-blue-500" placeholder="Select due date" name="dueDate" onChange={(obj, value) => setState((s) => ({ ...s, dueDate: value }))} />
            </Item>
          </div>

          {/* Description */}
          <Item
            label={<span className="font-semibold text-slate-700">Description</span>}
          >
            <TextArea rows={4} placeholder="Write details about your todo..." className="rounded-xl p-3 border-slate-300 hover:border-blue-500" name="description" onChange={handleChange} />
          </Item>

          {/* Upload Image  */}
          <Item
            label={<span className="font-semibold text-slate-700">Upload Image</span>}
            name="image"
            valuePropName="file"
            getValueFromEvent={(e) => e.target.files[0]} // File object ko form state mein save karne ke liye
          >
            <input
              type="file"
              className="w-full text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-800 hover:file:bg-blue-100 cursor-pointer border border-slate-300 rounded-xl bg-white"
              onChange={handleImageChange}
            />
          </Item>

          {/* Submit Button */}
          <Item className="mb-0 pt-4">
            <Button
              size="large"
              block
              type="primary"
              htmlType="submit"
              className="bg-blue-950 hover:bg-blue-900 font-semibold h-12 text-base rounded-xl shadow-lg transition-all duration-300 transform active:scale-[0.99]"
              onClick={handleSubmit}
            >
              Save Todo
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default AddTodo;