import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">📚 BookReview</Link>
      <div className="flex gap-4">
        {user && <Link to="/profile" className="hover:text-blue-500">Profile</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && <button onClick={logout} className="text-red-500">Logout</button>}
      </div>
    </nav>
  );
}
