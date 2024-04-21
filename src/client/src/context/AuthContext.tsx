import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  teamId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

const initialAuthState: AuthContextType = {
  isAuthenticated: false,
  teamId: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialAuthState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [teamId, setTeamId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const login = (teamId: string) => {
    // логика входа
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true.toString());
    setTeamId(teamId);
    localStorage.setItem("teamId", teamId);
  };

  const logout = () => {
    // логика выхода
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", false.toString());
    setTeamId(null);
    localStorage.removeItem("teamId");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, teamId,login, logout }}>
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
