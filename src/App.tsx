import { useEffect } from "react";
import { useColorScheme } from "@mui/joy";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import HomePage from "./pages/home/home";
import ProtectedRoute from "./utils/ProtectedRoute";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import { AuthProvider } from "./auth/context/AuthProvider";

function App() {
  const { setMode } = useColorScheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const systemMode = mediaQuery.matches ? 'dark' : 'light';
      setMode(systemMode);
    };

    handleChange();

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setMode]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Private Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
