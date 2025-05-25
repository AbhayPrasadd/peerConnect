import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: 'Demo User' });
    navigate('/dashboard');
  };

  const handleGuestLogin = () => {
    setUser({ name: 'Guest User' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center px-4">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          {isLogin ? 'Login to PeerConnect' : 'Create an Account'}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          You can use the form below or continue as a guest.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <button
          onClick={handleGuestLogin}
          className="mt-4 w-full border border-indigo-500 text-indigo-600 font-semibold py-2 rounded-md hover:bg-indigo-50 transition"
        >
          Continue as Guest
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? 'New to PeerConnect?' : 'Already have an account?'}{' '}
          <button
            className="text-indigo-700 font-semibold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
