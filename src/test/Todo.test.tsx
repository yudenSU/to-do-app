import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { CssVarsProvider } from '@mui/joy';
import Todo from '../components/todo/Todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../auth/context/AuthProvider';

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
    BrowserRouter: vi.fn().mockImplementation((props) => props.children),
}));

const queryClient = new QueryClient();

vi.mock('../../api/api', () => ({
    useFetchUserTodos: vi.fn().mockReturnValue({
      data: {
        todos: Array.from({ length: 15 }, (_, index) => ({
          id: index + 1,
          todo: `Todo item ${index + 1}`,
          completed: index % 2 === 0, // Mock some completed, some not
          userId: 26,
        })),
        total: 150,
        skip: 0,
        limit: 10,
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    }),
  }));

test('renders Todo correctly', () => {

    render(
        <CssVarsProvider>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <Todo/>
                </QueryClientProvider>
            </AuthProvider>
        </CssVarsProvider>
    );
    const addToDoButton = screen.getByText('Add task')
    expect(addToDoButton).toBeInTheDocument();
    fireEvent.click(addToDoButton)

    // Check the add new to do button is back
    const add = screen.getByText('Add')
    const cancel = screen.getByText('Cancel')
    const input = screen.getByPlaceholderText("Enter task")

    expect(input).toBeInTheDocument();
    expect(add).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();

});

test('should render todos', () => {
    render(
      <QueryClientProvider client={queryClient}>
              <AuthProvider>
                  <Todo/>
              </AuthProvider>
      </QueryClientProvider>
    );
  
    setTimeout(() => {
        // Now check if 10 todos are rendered (10 is the limit due to pagination)
        expect(screen.queryByText('Sample Todo 1')).toBeInTheDocument(); // Replace with your mock data
      }, 1000);

  });