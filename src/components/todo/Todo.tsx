import TodoListItem from "./TodoListItem";
import { useCreateTodo, useDeleteTodo, useFetchUserTodos, useUpdateTodo } from "../../api/api";
import { useEffect, useState } from "react";
import { INewToDo, ITodo, IUpdateToDoRequest } from "../../types/interfaces";
import Pagination from "../Pagination";
import { useAuth } from "../../auth/hooks/useAuth";
import Add from "@mui/icons-material/Add";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Alert from "@mui/joy/Alert";
import List from "@mui/joy/List";
import Typography from "@mui/joy/Typography";
import LinearProgress from "@mui/joy/LinearProgress";
import Warning from "@mui/icons-material/Warning";

export default function Todo() {
    const limit = 10;
    const [skip, setSkip] = useState<number>(0); // Tracks the starting index for pagination
    const [open, setOpen] = useState<boolean>(false);
    const [newTodoContent, setNewTodoContent] = useState<string>(""); // Local state for the new todo title
    const [alertMessage, setAlertMessage] = useState<string | null>(null); // Alert message state
    const { mutate: createTodo } = useCreateTodo();
    const { mutate: deleteTodo } = useDeleteTodo();
    const { mutate: updateTodo } = useUpdateTodo();
    const [alertColor, setAlertColor] = useState<"success" | "danger">("success")
    const { user } = useAuth();
    const userId = Number(user?.id);

    const showAlert = (message: string, color: "success" | "danger") => {
        setAlertColor(color)
        setAlertMessage(message);
        setTimeout(() => {
            setAlertMessage(null);
        }, 5000);
    };

    // Use useQuery for fetching data with pagination
    const {
        data: fetchData,
        isLoading: isFetchLoading,
        isError: isFetchError,
        refetch,
    } = useFetchUserTodos(userId, limit, skip);

    // Convert entries to pages
    function entriesToPageConversion(entries: number, pageSize: number): number {
        return Math.ceil(entries / pageSize);
    }

    // Pagination handlers
    const handlePrev = () => {
        setSkip((prevSkip) => Math.max(prevSkip - limit, 0));
    };

    const handleNext = () => {
        if (fetchData && skip + limit < fetchData.total) {
            setSkip((prevSkip) => prevSkip + limit);
        }
    };

    // Trigger refetch whenever skip or limit changes
    useEffect(() => {
        refetch();
    }, [skip, limit, refetch]);

    // Handle form submit for adding a new todo
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newTodoContent.trim() === "") return; // Don't submit if the title is empty

        const newTodo: INewToDo = {
            todo: newTodoContent,
            completed: false,
            userId: userId
        };

        // Update the list locally
        setOpen(false); // Close the form after submission
        setNewTodoContent(""); // Clear the input field


        createTodo(newTodo, {
            onSuccess: () => {
                refetch();
                showAlert("Task created successfully: Changes are not reflected, as DummyJSON does not allow Create, Update and Delete operations.", "success");
            },
            onError: () => {
                showAlert("Oops there was an error creating a new task.", "danger");
            },
        });
    };

    // Callback to handle delete and log the todo item
    const handleDeleteTodo = (id: number) => {
        deleteTodo(id, {
            onSuccess: () => {
                refetch();
                showAlert("Task deleted successfully: Changes are not reflected, as DummyJSON does not allow Create, Update and Delete operations.", "success");

            },
            onError: () => {
                showAlert("Oops there was an error deleting the task.", "danger");
            },
        })
    };

    const handleUpdateTodo = (updateTodoItem: IUpdateToDoRequest) => {
        updateTodo(updateTodoItem, {
            onSuccess: () => {
                refetch();
                showAlert("Task updated successfully: Changes are not reflected, as DummyJSON does not allow Create, Update and Delete operations.", "success");

            },
            onError: () => {
                showAlert("Oops there was an error updating the task.", "danger");
            },
        })
    };

    return (
        <>
            <Box
                sx={{
                    mt: 2,
                    width: {
                        xs: "90vw",
                        sm: "65vw",
                        md: "65vw",
                        lg: "50vw",
                    },
                }}
            >
                <Button
                    size="lg"
                    endDecorator={<Add />}
                    variant="soft"
                    disabled={open}
                    onClick={() => setOpen(true)}
                >
                    Add task
                </Button>

                {open && (
                    <Box
                        component={"form"}
                        sx={{
                            mt: 2,
                            mb: 2,
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            value={newTodoContent}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodoContent(e.target.value)}
                            placeholder="Enter task"
                            fullWidth
                            required
                            size="md"
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 1,
                                mt: 1,
                            }}
                        >
                            <Button
                                sx={{
                                    flex: 1,
                                }}
                                variant="soft"
                                size="lg"
                                color="neutral"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                sx={{
                                    flex: 1, // Allow the button to take the full width of its container
                                }}
                                type="submit"
                                variant="soft"
                                size="lg"
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>
                )}
                {alertMessage && (
                    <Alert
                        sx={{ my: 2 }}
                        variant="soft"
                        color={alertColor}
                    >
                        {alertMessage}
                    </Alert>
                )}
                <List sx={{ marginBottom: 2 }}>
                    {isFetchLoading ? (
                        <LinearProgress />
                    ) : isFetchError ? (

                        <Alert 
                        color="danger" 
                        variant="soft" 
                        startDecorator={<Warning/>}>
                            Oops! Something went wrong.
                        </Alert>
                    ) : fetchData?.todos?.length > 0 ? (
                        fetchData.todos.map((todo: ITodo) => (
                            <TodoListItem
                                key={todo.id}
                                todo={todo}
                                onDelete={handleDeleteTodo}
                                onToggleCompletion={
                                    handleUpdateTodo
                                }
                                onEditCompletion={
                                    handleUpdateTodo
                                }
                            />))
                    ) : (
                        <Typography>No todos available.</Typography>
                    )}
                </List>
                {fetchData && (
                    <Pagination
                        current={entriesToPageConversion(skip, limit) + 1}
                        total={entriesToPageConversion(fetchData.total, limit)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </Box>
        </>
    );
}
