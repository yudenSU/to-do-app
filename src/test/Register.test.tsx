import { render, screen } from '@testing-library/react';
import RegisterPage from '../pages/auth/Register';
import { BrowserRouter } from 'react-router-dom';
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
  Link: vi.fn(),
  useNavigate: vi.fn(),
  BrowserRouter: vi.fn().mockImplementation((props) => props.children),
}));


test('renders register correctly', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    </BrowserRouter>
  );

  expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();

  expect(screen.getByPlaceholderText('username')).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText('password');
  expect(passwordInput).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
});

