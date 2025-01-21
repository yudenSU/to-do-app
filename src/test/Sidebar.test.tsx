import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { expect, test, vi } from 'vitest';
import { CssVarsProvider } from '@mui/joy';
import SideBar from '../components/SideBar';

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

test('renders Sidebar correctly', () => {
    render(
        <CssVarsProvider>
            <BrowserRouter>
                <SideBar/>
            </BrowserRouter>
        </CssVarsProvider>

    );

    const todoNavItem = screen.getByText('To do');
    const helpNavItem = screen.getByText('Help');

    expect(todoNavItem).toBeInTheDocument();
    expect(helpNavItem).toBeInTheDocument();
});

test('successful navigation to page', async () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);
    render(
        <CssVarsProvider>
            <BrowserRouter>
                <SideBar />
            </BrowserRouter>
        </CssVarsProvider>


    );

    // Simulate user clicking the avatar and opening the menu
    const todoNavItem = screen.getByText('To do');
    fireEvent.click(todoNavItem);

    await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/');
    });

    const helpNavItem = screen.getByText('Help');
    fireEvent.click(helpNavItem);

    await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('/help');
    });

});
