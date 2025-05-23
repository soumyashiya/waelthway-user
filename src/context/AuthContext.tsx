import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// Define User Type
interface User {
  role: string;
  email: string;
  name?: string;
}
 
// Define AuthContext Type
interface AuthContextType {
  isAuthenticated: boolean | null;
  user: User | null;
  setIsAuthenticated: (auth: boolean) => void;
  setUser: (user: User | null) => void;
}
 
// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
interface AuthProviderProps {
  children: ReactNode;
}
 
// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
 
  // Fetch user authentication details when app loads
  useEffect(() => {
    axios
      .get("/api/v1/auth/check-auth", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
        setUser(response.data.user); // Assuming API returns { user: { role, email } }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
      });
  }, []);
 
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
 
// Custom Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
 