import { useEffect, useState } from 'react';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { Close, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Button, DialogTitle, FormControl, IconButton, Input, Modal, ModalDialog, Stack, Typography } from '@mui/joy';
import { ITodo, IUpdateToDoRequest } from '../../types/interfaces';

interface TodoListItemProps {
    todo: ITodo;
    onToggleCompletion: (updateTodoRequest: IUpdateToDoRequest) => void; // Callback for toggling the completion status
    onEditCompletion: (updateTodoRequest: IUpdateToDoRequest) => void; // Callback for editing the todo
    onDelete: (id: number) => void; // Callback for deleting the todo
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
                <ModalDialog minWidth={isSmallScreen ? '90%': '500px'}>
                    <DialogTitle>Edit task</DialogTitle>
                    <form onSubmit={handleEditSubmit}>
                        <Stack spacing={2}>
                            <FormControl>
                            <Input
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)} // Update the local state with the new value
                                    placeholder='Enter task'
                                    name='task'
                                    autoFocus
                                    required
                                />                            </FormControl>
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
                        onClick={() => onDelete(todo.id)} // Trigger the delete callback when the close button is clicked
                    >
                        <Close />
                    </IconButton>
                }
            >
                <ListItemButton
                    onClick={() => {setOpen(true)}}
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
