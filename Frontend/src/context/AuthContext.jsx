import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USER } from '../data/sampleAssessments';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('auramind_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(user));

  useEffect(() => {
    if (user) {
      localStorage.setItem('auramind_auth_user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('auramind_auth_user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email, password, remember = true) => {
    // Demonstration frontend login
    const newUser = {
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role: "Research Participant",
      institution: "College Department of CSE",
      id: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    };
    setUser(newUser);
    return { success: true };
  };

  const register = (formData) => {
    const newUser = {
      name: formData.fullName || "Student Researcher",
      email: formData.email,
      role: "Research Participant",
      institution: "Final-Year B.Tech Project Evaluator",
      id: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    };
    setUser(newUser);
    return { success: true };
  };

  const loginAsDemo = () => {
    setUser(DEMO_USER);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
