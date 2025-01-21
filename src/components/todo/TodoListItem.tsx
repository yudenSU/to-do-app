import { useEffect, useState } from 'react';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { ITodo, IUpdateToDoRequest } from '../../types/interfaces';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import Close from '@mui/icons-material/Close';
import Modal from '@mui/joy/Modal';
import DialogTitle from '@mui/joy/DialogTitle/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

interface TodoListItemProps {
    todo: ITodo;
    onToggleCompletion: (updateTodoRequest: IUpdateToDoRequest) => void;
    onEditCompletion: (updateTodoRequest: IUpdateToDoRequest) => void;
    onDelete: (id: number) => void; 
}

export default function TodoListItem({ todo, onToggleCompletion, onDelete, onEditCompletion }: TodoListItemProps) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const [open, setOpen] = useState(false);
    const [newTask, setNewTask] = useState(todo.todo);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.matchMedia('(max-width: 600px)').matches);
            setIsMediumScreen(window.matchMedia('(max-width: 1024px)').matches);
        };

        // Initial check
        handleResize();

        // Add event listener on resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOpen(false); // Close the modal
        const updateTodoItem = {
            id: todo.id,
            completed: todo.completed,
            todo: newTask
        }

        onEditCompletion(updateTodoItem); // Pass the updated task to the parent
    };


    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog minWidth={isSmallScreen ? '90%' : '500px'}>
                    <DialogTitle>Edit task</DialogTitle>
                    <form onSubmit={handleEditSubmit} aria-labelledby="edit-task-modal">                        <Stack spacing={2}>
                            <FormControl>
                                <Input
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)} // Update the local state with the new value
                                    placeholder='Enter task'
                                    name='task'
                                    autoFocus
                                    required
                                    aria-describedby="task-input-description"
                                />                            
                            </FormControl>
                            <Button type="submit">Submit</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
            <ListItem
                sx={{
                    mt: 1
                }}
                key={todo.id} // Use todo.id as key, as it should be unique
                startAction={

                    <IconButton 
                        aria-label={todo.completed ? "Mark task as incomplete" : "Mark task as complete"}
                        title={todo.completed ? "uncheck" : "check"}
                        sx={{
                            pr: 1
                        }}
                        onClick={
                            () => onToggleCompletion({ id: todo.id, completed: !todo.completed })
                        }
                    >
                        {todo.completed ?
                            (<CheckBox />) : (<CheckBoxOutlineBlank />)}
                    </IconButton>
                }
                endAction={
                    <IconButton 
                        aria-label="Delete task"
                        title="delete"
                        onClick={() => onDelete(todo.id)} // Trigger the delete callback when the close button is clicked
                    >
                        <Close />
                    </IconButton>
                }
            >
                <ListItemButton
                    aria-label="Edit task"
                    onClick={() => { setOpen(true) }}
                    sx={{
                        borderRadius: 5,
                        border: '1px solid',
                        borderColor: 'neutral.300',
                        py: 1.5,
                    }}
                >
                    <Typography
                        maxWidth={isSmallScreen || isMediumScreen ? '90%' : '80%'}
                        noWrap
                        sx={{
                            textDecoration: `${todo.completed ? "line-through" : ""}`,
                            color: `${todo.completed ? "neutral.500" : ""}`
                        }}
                        textOverflow={'ellipsis'}
                        level={isSmallScreen || isMediumScreen ? 'body-sm' : 'body-lg'}
                    >
                        {todo.todo}
                    </Typography>
                </ListItemButton>
            </ListItem>
        </>
    );
}
