import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginPage from '../pages/auth/Login';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../auth/context/AuthProvider';
import { expect, test, vi } from 'vitest';

// Mock the useAuth hook
vi.mock('../auth/hooks/useAuth', () => ({
  useAuth: () => ({
      user: { username: 'JohnDoe', email: 'john@example.com', image: '/path/to/image' },
      logout: vi.fn(),
      login: vi.fn().mockResolvedValue(true), // Mock login to resolve to true
      }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));


vi.mock('react-router-dom', () => ({
  useParams: () => ({
      articleId: '63d466ca3d00b50db15aed93',
  }),
  Link: vi.fn(), // Mock the useNavigate hook
  useNavigate: vi.fn(), // Mock the useNavigate hook
  BrowserRouter: vi.fn().mockImplementation((props) => props.children),
}));


test('renders LoginPage correctly', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
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

test('navigate on succefull sign in correctly', async () => {
  const navigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(navigate);
  render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  );

  // Check 
  const signInButton = screen.getByRole('button', { name: /sign in/i });
  fireEvent.click(signInButton)

      await waitFor(() => {
          expect(navigate).toHaveBeenCalledWith('/');
      });

});
