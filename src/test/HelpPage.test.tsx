import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import HelpPage from '../pages/HelpPage';
import { AuthProvider } from '../auth/context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';

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

vi.mock('@mui/joy/styles', () => ({
    ...vi.importActual('@mui/joy/styles'),
    useColorScheme: () => ({ mode: 'light', setMode: vi.fn() }),
}));

vi.mock('react-router-dom', () => ({
    useParams: () => ({
        articleId: '63d466ca3d00b50db15aed93',
    }),
    Link: vi.fn(),
    useNavigate: vi.fn(),
    BrowserRouter: vi.fn().mockImplementation((props) => props.children),
}));

test('Test pagination renders succesfully', () => {
    render(
        <CssVarsProvider>
            <BrowserRouter>
                <AuthProvider>
                    <HelpPage />
                </AuthProvider>
            </BrowserRouter>
        </CssVarsProvider>
    );

    const createText = screen.getByText('To add to-do items:');
    const editText = screen.getByText('To edit to-do items:');
    const deleteText = screen.getByText('To delete to-do items:');
    const checkText = screen.getByText('To check-off to-do items:');

    expect(createText).toBeInTheDocument();
    expect(editText).toBeInTheDocument();
    expect(deleteText).toBeInTheDocument();
    expect(checkText).toBeInTheDocument();

});

