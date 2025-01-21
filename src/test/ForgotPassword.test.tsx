import { fireEvent, render, screen } from '@testing-library/react';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../auth/context/AuthProvider';
import { expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('../auth/hooks/useAuth', () => ({
  useAuth: () => ({
      user: { username: 'JohnDoe', email: 'john@example.com', image: '/path/to/image' },
      logout: vi.fn(),
      login: vi.fn().mockResolvedValue(true),
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


test('renders forgot password screen correctly', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <ForgotPasswordPage />
      </AuthProvider>
    </BrowserRouter>
  );

  expect(screen.getByRole('heading', { name: /Forgot your password/i })).toBeInTheDocument();

  const emailInput = screen.getByPlaceholderText('Please enter your email');
  expect(emailInput).toBeInTheDocument();

  await userEvent.type(emailInput, 'abc@gmail.com');

  const submit = screen.getByRole('button', { name: /reset/i });

  fireEvent.click(submit)
  const title = screen.getByText('Password reset requested');
  expect(title).toBeInTheDocument();
  const email = screen.getByText('A reset email has been sent to your email account: abc@gmail.com');
  expect(email).toBeInTheDocument();

});

