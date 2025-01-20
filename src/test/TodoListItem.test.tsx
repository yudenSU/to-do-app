import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { vi } from 'vitest';
import { CssVarsProvider } from '@mui/joy';
import TodoListItem from '../components/todo/TodoListItem';

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
    BrowserRouter: vi.fn().mockImplementation((props) => props.children),
}));

const mockTodo = {
    id: 1,
    todo: "example",
    completed: false,
    userId: 1
};
// Mock the callback functions
const onToggleCompletion = vi.fn();
const onEditCompletion = vi.fn();
const onDelete = vi.fn();

test('renders TodoListItem correctly', () => {

    render(
        <CssVarsProvider>
            <BrowserRouter>
                <TodoListItem
                    todo={mockTodo}
                    onToggleCompletion={onToggleCompletion}
                    onEditCompletion={onEditCompletion}
                    onDelete={onDelete}
                />
            </BrowserRouter>
        </CssVarsProvider>
    );


    const content = screen.getByText(mockTodo.todo);
    const checkIcon = screen.getByTitle("check");
    const deleteIcon = screen.getByTitle("delete");

    expect(checkIcon).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
    expect(content).toBeInTheDocument();
});

test('successfully trigger callbacks', async () => {
    render(
        <CssVarsProvider>
            <BrowserRouter>
                <TodoListItem
                    todo={mockTodo}
                    onToggleCompletion={onToggleCompletion}
                    onEditCompletion={onEditCompletion}
                    onDelete={onDelete}
                />            
            </BrowserRouter>
        </CssVarsProvider>


    );

    const content = screen.getByText(mockTodo.todo);
    const checkIcon = screen.getByTitle("check");
    const deleteIcon = screen.getByTitle("delete");


    fireEvent.click(checkIcon);
    expect(onToggleCompletion).toHaveBeenCalledTimes(1);

    fireEvent.click(deleteIcon);
    expect(onDelete).toHaveBeenCalledTimes(1);

});

test('successfully edit', async () => {
    render(
        <CssVarsProvider>
            <BrowserRouter>
                <TodoListItem
                    todo={mockTodo}
                    onToggleCompletion={onToggleCompletion}
                    onEditCompletion={onEditCompletion}
                    onDelete={onDelete}
                />            
            </BrowserRouter>
        </CssVarsProvider>


    );

    const content = screen.getByText(mockTodo.todo);
    fireEvent.click(content);

    const editContent = screen.getByDisplayValue(mockTodo.todo);
    expect(editContent).toBeInTheDocument();


    const submit = screen.getByRole('button');
    fireEvent.click(submit);
    expect(onEditCompletion).toHaveBeenCalledTimes(1);



});
