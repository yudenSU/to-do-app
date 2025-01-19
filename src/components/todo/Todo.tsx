import { Box, List, Typography } from "@mui/joy";
import TodoListItem from "./TodoListItem";
import { useFetchUserTodos } from "../../api/api";
import { useEffect, useState } from "react";
import { ITodo } from "../../types/interfaces";
import Pagination from "../Pagination";

export default function Todo() {
    const limit = 10
    const [skip, setSkip] = useState<number>(0); // Tracks the starting index for pagination

    // Use useQuery for fetching data with pagination
    const {
        data,
        isLoading,
        isError,
        refetch, // Get refetch function from useQuery
    } = useFetchUserTodos(1, limit, skip);

    function entriesToPageConversion(entries: number, pageSize: number): number {
        return Math.ceil(entries / pageSize);
    }

    const handlePrev = () => {
        setSkip((prevSkip) => Math.max(prevSkip - limit, 0));
    };

    const handleNext = () => {
        if (data && skip + limit < data.total) {
            setSkip((prevSkip) => prevSkip + limit);
        }
    };

    // Trigger refetch whenever skip or limit changes
    useEffect(() => {
        refetch();
    }, [skip, limit, refetch]);

    return (
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
            <List sx={{ marginBottom: 2 }}>
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : isError ? (
                    <Typography>Error: Something went wrong!</Typography>
                ) : data?.todos?.length > 0 ? (
                    data.todos.map((todo: ITodo) => (
                        <TodoListItem key={todo.id} todo={todo} />
                    ))
                ) : (
                    <Typography>No todos available.</Typography>
                )}
            </List>
            {data && (
                <Pagination
                    current={entriesToPageConversion(skip, limit) + 1}
                    total={entriesToPageConversion(data.total, limit)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </Box>
    );
}
