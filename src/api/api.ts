import { useQuery, useMutation } from '@tanstack/react-query';
import { INewToDo, IUpdateToDoRequest } from '../types/interfaces';
import { useAuth } from '../auth/hooks/useAuth'; // Assuming this is your custom auth hook

// Wrapper function to handle API requests
const apiRequest = async (url: string, options: RequestInit = {}, useAuthHook: ReturnType<typeof useAuth>) => {
  const { refresh } = useAuthHook;

  try {
    const res = await fetch(url, options);

    if (res.status === 401) {
      // Attempt to refresh token
      await refresh();

      // If refresh fails, an attempt refresh will reproduce the 401 error
      const retryRes = await fetch(url, options);
      if (!retryRes.ok) throw new Error(retryRes.statusText);
      return retryRes.json();
    }

    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Get all todos with pagination
export const useFetchUserTodos = (userId: number, limit = 10, skip = 0) => {
  const auth = useAuth();
  const user = auth.user

  return useQuery({
    queryKey: ['todos', userId, limit, skip],
    queryFn: () => apiRequest(`https://dummyjson.com/todos/user/${userId}?limit=${limit}&skip=${skip}`, {}, auth),
    enabled: !!user
  });
};

// Get a single todo by ID
export const useTodo = (id: number) => {
  const auth = useAuth();
  const user = auth.user

  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => apiRequest(`https://dummyjson.com/todos/${id}`, {}, auth),
    enabled: !!user
  });
};

// Create a new todo
export const useCreateTodo = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ['todo'],
    mutationFn: (newTodo: INewToDo) =>
      apiRequest(
        'https://dummyjson.com/todos/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        },
        auth
      ),
  });
};

// Update an existing todo
export const useUpdateTodo = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ['todo'],
    mutationFn: (updateToDoRequest: IUpdateToDoRequest) => {
      const body = {
        completed: updateToDoRequest.completed,
        todo: updateToDoRequest.updatedTodo,
      };

      return apiRequest(
        `https://dummyjson.com/todos/${updateToDoRequest.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
        auth
      );
    },
  });
};

// Delete a todo
export const useDeleteTodo = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ['todo'],
    mutationFn: (id: number) =>
      apiRequest(`https://dummyjson.com/todos/${id}`, { method: 'DELETE' }, auth),
  });
};
