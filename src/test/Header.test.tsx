import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '../components/HeaderContent';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AuthProvider } from '../auth/context/AuthProvider';
import { expect, test, vi } from 'vitest';
import { CssVarsProvider } from '@mui/joy';
// Mock the useAuth hook
vi.mock('../auth/hooks/useAuth', () => ({
    useAuth: () => ({
        user: { username: 'JohnDoe', email: 'john@example.com', image: '/path/to/image' },
        logout: vi.fn(),
    }),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
  }));
  

vi.mock('react-router-dom', () => ({
    useParams: () => ({
        articleId: '63d466ca3d00b50db15aed93',
    }),
    useNavigate: vi.fn(), // Mock the useNavigate hook
    BrowserRouter: vi.fn().mockImplementation((props) => props.children),
}));

test('renders Header correctly', () => {
    render(
        <CssVarsProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </BrowserRouter>
        </CssVarsProvider>

    );

    // // Check if the color scheme toggle button is rendered
    // const toggleButton = screen.getByTitle('Change theme');
    // expect(toggleButton).toBeInTheDocument();

    // Check if the avatar is rendered with user image
    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', '/path/to/image');
    
    fireEvent.click(avatar);

    // Check if the logout menu item is available
    const logoutMenuItem = screen.getByText('Log out');
    expect(logoutMenuItem).toBeInTheDocument();
});

test('successful logout navigates to login page', async () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);
    render(
        <CssVarsProvider>
            <BrowserRouter>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </BrowserRouter>
        </CssVarsProvider>


    );

    // Simulate user clicking the avatar and opening the menu
    const avatarButton = screen.getByAltText('profile-picture');
    fireEvent.click(avatarButton);

    // Simulate user clicking the logout menu item
    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);

    // Wait for the logout function to be called and check navigation
    await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/login');
    });
});
