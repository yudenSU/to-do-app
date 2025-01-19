import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { getUser } = useAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await getUser();
        setIsAuthenticated(user != null);
      } catch (error: unknown) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [getUser]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Wait for authentication check
  }

  if (isAuthenticated === false && isAuthenticated != false) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
