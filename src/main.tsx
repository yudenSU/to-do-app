import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CssVarsProvider, CssBaseline } from '@mui/joy'
import { theme } from './theme.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "./auth/context/AuthProvider";

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CssVarsProvider>
    </AuthProvider>
  </StrictMode>,
)
