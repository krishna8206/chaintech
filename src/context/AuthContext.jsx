import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load session from localStorage on mount
    const user = localStorage.getItem('currentUser');
    const expires = localStorage.getItem('sessionExpiresAt');

    if (user && expires) {
      if (Date.now() > Number(expires)) {
        logout();
      } else {
        setCurrentUser(JSON.parse(user));
        setSessionExpiresAt(Number(expires));
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Check session timeout every second
    if (!sessionExpiresAt) return;

    const interval = setInterval(() => {
      if (Date.now() > sessionExpiresAt) {
        logout();
        navigate('/login');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionExpiresAt, navigate]);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
      localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
      localStorage.setItem('sessionExpiresAt', expires.toString());
      setCurrentUser({ name: user.name, email: user.email });
      setSessionExpiresAt(expires);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionExpiresAt');
    setCurrentUser(null);
    setSessionExpiresAt(null);
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      return false; // Email exists
    }
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };
  
  const updateProfile = (name, email, password) => {
     // updates the current user and list of users.
     const users = JSON.parse(localStorage.getItem('users') || '[]');
     const index = users.findIndex(u => u.email === currentUser.email);
     if (index !== -1) {
       users[index] = { name, email, password: password || users[index].password };
       localStorage.setItem('users', JSON.stringify(users));
       
       const updatedUser = { name, email };
       localStorage.setItem('currentUser', JSON.stringify(updatedUser));
       setCurrentUser(updatedUser);
       return true;
     }
     return false;
  };

  return (
    <AuthContext.Provider value={{ currentUser, sessionExpiresAt, isLoading, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
