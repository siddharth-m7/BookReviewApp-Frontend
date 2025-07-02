import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import BookDetails from './pages/BookDetails';
import Profile from './pages/Profile';
import Home from './pages/Home'; // ✅ New import
import AboutPage from './pages/AboutPage'; // ✅ New import
import Footer from './components/Footer';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ✅ Public Home page */}
        <Route path="/" element={<Home />} />
        {/* ✅ About page */}
        <Route path="/about" element={<AboutPage />} />

        {/* ✅ Dashboards (admin/user) */}
        <Route path="/dashboard" element={
          user?.role === 'admin' ? <AdminDashboard /> :
          user?.role === 'user' ? <UserDashboard /> :
          <Navigate to="/login" />
        } />

        {/* ✅ Auth routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Other private routes */}
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
