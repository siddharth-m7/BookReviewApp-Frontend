import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';



export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileUser, setProfileUser] = useState({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // {console.log('Profile data:', res.data);}
      setProfileUser(res.data);
    } catch (err) {
      console.error('Failed to load user profile:', err);
    }
  };

  fetchProfile();
}, [user]);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 group"
          >
            <span className="text-2xl sm:text-3xl group-hover:animate-bounce">📚</span>
            <span className="hidden xs:block sm:block">BookReview</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">

            <Link 
              to="/" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {user && (
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
              >
                Profile
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </div>

          {/* Desktop Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">

                {/* User avatar/indicator */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                 <Link to="/profile" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group"
              >
                  <span className="text-gray-700 font-medium hidden lg:block">
                    {profileUser?.name || profileUser?.email || 'User'}
                  </span>
                  </Link>
                </div>

                
                <button 
                  onClick={logout} 
                  className="text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden lg:block">Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/50 backdrop-blur-sm rounded-lg mt-2">
            {/* Mobile Navigation Links */}
            <Link 
              to="/about" 
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              About
            </Link>

            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              Home
            </Link>
            
            {user && (
              <Link 
                to="/profile" 
                onClick={closeMobileMenu}
                className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200"
              >
                Profile
              </Link>
            )}

            {/* Mobile Authentication */}
            <div className="border-t border-gray-200 pt-4">
              {!user ? (
                <div className="space-y-2">
                  <Link 
                    to="/login" 
                    onClick={closeMobileMenu}
                    className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-indigo-50 transition-all duration-200 text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={closeMobileMenu}
                    className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md text-center mx-4"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* User info in mobile */}
                  <div className="flex items-center px-4 py-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium text-sm">
                      {/* {console.log('Profile User:', profileUser.name)} */}
                      {profileUser?.name || profileUser?.email || 'User'}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full text-left text-red-500 hover:text-red-600 font-medium py-3 px-4 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}