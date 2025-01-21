import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/hooks/useAuth';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

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
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated === false && isAuthenticated != null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
