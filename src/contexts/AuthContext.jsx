import { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode'; // ✅ for CommonJS/ES compatibility

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        localStorage.setItem('token', token);
        setUser(decoded);
      }
    } catch (err) {
      console.error('Invalid token:', err);
      logout();
    }
  };

  const checkStoredToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      } catch {
        logout();
      }
    }
  };

  useEffect(() => {
    checkStoredToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
