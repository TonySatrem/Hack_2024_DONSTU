import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const initialAuthState: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem("isAuthenticated") === "true");

  const login = () => {
    // логика входа
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true.toString());
  };

  const logout = () => {
    // логика выхода
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", false.toString());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Создаем хук useAuth для использования в компонентах
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
