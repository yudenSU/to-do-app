import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/auth/Login';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../auth/context/AuthProvider';

test('renders LoginPage correctly', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>
  );

  // Check if the main heading is rendered
  expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();

  // Check if the username input is rendered
  expect(screen.getByLabelText(/username or email address/i)).toBeInTheDocument();

  // Check if the password input is rendered (use getByRole for better precision)
  const passwordInput = screen.getByPlaceholderText('password');
  expect(passwordInput).toBeInTheDocument();


  // Check if the sign-in button is rendered
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});
