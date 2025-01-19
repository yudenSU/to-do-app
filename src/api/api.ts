import { useQuery, useMutation } from '@tanstack/react-query';
import { INewToDo, IUpdateToDoRequest } from '../types/interfaces';

//To do 401 err management

// Helper to fetch data from the DummyJSON API
const fetchUserTodos = async (userId: number, limit = 10, skip = 0) => {
  const res = await fetch(`https://dummyjson.com/todos/user/${userId}?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return data;
};

// Get all todos with pagination
export const useFetchUserTodos = (userId: number ,limit = 10, skip = 0) => {
  return useQuery(
    {
        queryKey: ['todos'],
        queryFn: () => fetchUserTodos(userId, limit, skip)
    });
};

// Get a single todo by ID
export const useTodo = (id: number) => {
  return useQuery(
    {
        queryKey: ['todo'],
        queryFn: async () => {
            const res = await fetch(`https://dummyjson.com/todos/${id}`);
            const data = await res.json();
            return data;
          }
    });
};

// Create a new todo
export const useCreateTodo = () => {
  return useMutation( {
    mutationKey: ["todo"],
    mutationFn: async (newTodo: INewToDo) => {
        const res = await fetch('https://dummyjson.com/todos/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        });
        return res.json();
      },
  }
  );
};

// Update an existing todo
export const useUpdateTodo = () => {
  return useMutation(
    {
        mutationKey: ["todo"],
        mutationFn: async (updateToDoRequest: IUpdateToDoRequest) => {
          
            const body = {
              completed: updateToDoRequest.completed,
              todo: updateToDoRequest.updatedTodo,
            }

            const res = await fetch(`https://dummyjson.com/todos/${updateToDoRequest.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            });
            return res.json();
          },
    }
  );
};

// Delete a todo
export const useDeleteTodo = () => {
  return useMutation(
    {
        mutationKey:["todo"],
        mutationFn: async (id: number) => {
            const res = await fetch(`https://dummyjson.com/todos/${id}`, {
              method: 'DELETE',
            });
            return res.json();
          }
    }
  );
};
