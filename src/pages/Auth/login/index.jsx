import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useAuthContext } from '@/context/AuthContext';
import "@/config/global";
import axios from 'axios';

const initialState = { email: "", password: "" };

const Login = () => {

  const VITE_AUTH_API_LOGIN = import.meta.env.VITE_AUTH_API_LOGIN

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const readProfile = useAuthContext();

  const handleChange = (e) => {
    setState((preState) => ({ ...preState, [e.target.name]: e.target.value }))
  }

  const handlesubmit = async (e) => {

    const { email, password } = state;

    const user = { email, password };

    setLoading(true);

    await axios.post(`${VITE_AUTH_API_LOGIN}`, user)

      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          console.log("User => ", user)
          console.log("Token => ", data.token)
          localStorage.setItem("jwt", data.token)
          
          toastify(data.message || "user login", "success");
          navigate("/");
          return
        }
      })
      .catch((error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message;
        if (status === 400) {
          return toastify(message || "fill all fields", "error");
        }
        if (status === 401) {
          return toastify(message || "Invlaid Credential", "error");
        }
        if (status === 404) {
          return toastify(message || "User not found", "error");
        }
        if (status === 500) {
          return toastify(message || "Internal Server error", "error");
        }
        console.error("Error : ", error)
      })
      .finally(() => {
        setLoading(false);
      })
  };


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Registration / Login Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Login Account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Please fill in your details to Login
          </p>
        </div>

        {/* Ant Design Form */}
        <Form
          layout="vertical"
          className="space-y-2"
        >
          {/* Email Address */}
          <Form.Item
            label={<span className="font-semibold text-slate-700">Email Address</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address!' },
            ]}
          >
            <Input
              name="email"
              placeholder="Enter email address"
              size='large'
              className="py-2.5 rounded-lg border-slate-300 text-slate-800 text-sm focus:border-blue-600"
              onChange={handleChange}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={<span className="font-semibold text-slate-700">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="••••••••"
              size='large'
              name="password"
              className="py-2.5 rounded-lg border-slate-300 text-slate-800 text-sm focus:border-blue-600"
              onChange={handleChange}
            />
          </Form.Item>

          {/* Submit Button with Loading */}
          <Form.Item className="pt-2">
            <Button
              size='large'
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              onClick={handlesubmit}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>
        </Form>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-600 mt-4">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;