// src/pages/Home.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">📚 Book Review Platform</h1>

      <p className="text-gray-700 mb-6 text-lg">
        Welcome to our community of book lovers. Discover books, share your reviews, and explore what others think!
      </p>
      {user ? (
        <div className="bg-green-50 p-4 rounded shadow-sm mb-4">
          <p className="text-green-800 font-semibold mb-2">
            Already Logged in
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="space-x-4 mt-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
