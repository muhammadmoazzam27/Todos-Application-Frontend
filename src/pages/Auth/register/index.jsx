import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import "@/config/global";
import axios from 'axios';

const { Item } = Form;

const initialState = { fullName: "", email: "", password: "", confirmPassword: "" };

const Register = () => {

  const VITE_AUTH_API_REGISTER = import.meta.env.VITE_AUTH_API_REGISTER

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState((preState) => ({ ...preState, [e.target.name]: e.target.value }))
  }

  const handlesubmit = async (e) => {

    e.preventDefault();

    const { fullName, email, password, confirmPassword } = state

    if (fullName.length < 3 || fullName.trim() === "") {
      return toastify("Enter full name", "error")
    }
    if (!isValidEmail(email)) {
      return toastify("Enter valid email", "error")
    }
    if (password.length < 6 || password.trim() === "") {
      return toastify("Enter password", "error")
    }
    if (confirmPassword !== password) {
      return toastify("password not match", "error")
    }

    const user = { fullName, email, password, confirmPassword }

    setLoading(true);

    await axios.post(`${VITE_AUTH_API_REGISTER}`, user)

      .then((res) => {
        const { status, data } = res;
        if (status === 201) {
          toastify(data.message || "user register", "success")
          navigate("/auth/login");
          return
        }
      })
      .catch((error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        if (status === 400) {
          return toastify(message || "fill all fields", "error");
        }
        if (status === 403) {
          return toastify(message || "User exist", "error");
        }
        if (status === 500) {
          return toastify(message || "Internal Server error", "error");
        }
        console.error("Error : ", error)
      })
      .finally(() => {
        setLoading(false);
      })


  }



  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Registration Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Create Account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Please fill in your details to register
          </p>
        </div>

        {/* Ant Design Form */}
        <Form layout="vertical" className="space-y-1">

          {/* Full Name */}
          <Item
            label={<span className="font-semibold text-slate-700">Full Name</span>}
          >
            <Input
              className="py-2.5 rounded-lg border-slate-300 text-slate-800 text-sm focus:border-blue-600"
              placeholder="Enter Full Name"
              size='large'
              name="fullName"
              onChange={handleChange}
            />
          </Item>

          {/* Email Address */}
          <Item
            label={<span className="font-semibold text-slate-700">Email Address</span>}
          >
            <Input
              className="py-2.5 rounded-lg border-slate-300 text-slate-800 text-sm focus:border-blue-600"
              placeholder="Enter email address"
              size='large'
              name="email"
              onChange={handleChange}
            />
          </Item>

          {/* Password */}
          <Item
            label={<span className="font-semibold text-slate-700">Password</span>}
          >
            <Input.Password
              className="py-2.5 rounded-lg border-slate-300 text-slate-800 text-sm focus:border-blue-600"
              placeholder="••••••••"
              size='large'
              name="password"
              onChange={handleChange}
            />
          </Item>

          {/* Confirm Password */}
          <Item
            label={<span className="font-semibold text-slate-700">Confirm Password</span>}
          >
            <Input.Password
              className="py-2.5 rounded-lg border-slate-300 text-slate-800 text-sm focus:border-blue-600"
              placeholder="••••••••"
              size='large'
              name="confirmPassword"
              onChange={handleChange}
            />
          </Item>

          {/* Submit Button with Loading */}
          <Button
            type="primary"
            block
            size='large'
            htmlType="submit"
            loading={loading}
            onClick={handlesubmit}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

        </Form>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;