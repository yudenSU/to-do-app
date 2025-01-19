import { useQuery, useMutation } from '@tanstack/react-query';

//Interfaces for params
interface updateTodoParam {
    id: number,
    updatedTodo: string
}

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
    mutationFn: async (newTodo) => {
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
        mutationFn: async ({id, updatedTodo}: updateTodoParam) => {
            const res = await fetch(`https://dummyjson.com/todos/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedTodo),
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
        mutationFn: async (id) => {
            const res = await fetch(`https://dummyjson.com/todos/${id}`, {
              method: 'DELETE',
            });
            return res.json();
          }
    }
  );
};
