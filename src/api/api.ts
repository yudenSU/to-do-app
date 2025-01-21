import { useQuery, useMutation } from "@tanstack/react-query";
import { INewToDo, IUpdateToDoRequest } from "../types/interfaces";
import { useAuth } from "../auth/hooks/useAuth";

const standardRetryLogic = (failureCount: number, error: Error): boolean => {
	if (failureCount < 3) {
	  if (error instanceof Error) {
		const statusCode = parseInt(error.message.split(" ")[3]);
		return statusCode !== 404 && statusCode !== 401;
	  }
	}
   // Stop retrying after 3 attempts or for non-retryable errors
	return false;
  };

const apiRequest = async (
	url: string,
	options: RequestInit = {},
	useAuthHook: ReturnType<typeof useAuth>
  ) => {
	const { refresh } = useAuthHook;
  
	try {
	  const res = await fetch(url, options);
  
	  if (res.status === 401) {
		// Attempt to refresh token
		try {
		  await refresh();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (refreshError) {
		  throw new Error("Session expired. Please log in again.");
		}
  
		// Retry the request after refreshing the token
		const retryRes = await fetch(url, options);
		if (!retryRes.ok) {
		  const errorText = await retryRes.text();
		  throw new Error(`Failed to fetch data after token refresh: ${errorText}`);
		}
		return retryRes.json();
	  }
  
	  if (!res.ok) {
		const errorText = await res.text();
		throw new Error(`API error: ${res.statusText} - ${errorText}`);
	  }
  
	  return res.json();
	} catch (error) {
	  console.error("API request failed:", error);
	  if (error instanceof Error) {
		throw new Error(`Something went wrong: ${error.message}`);
	  }
	  throw new Error("Unexpected error occurred.");
	}
  };
  

// Get all todos with pagination
export const useFetchUserTodos = (userId: number, limit = 10, skip = 0) => {
  const auth = useAuth();
  const user = auth.user;

  return useQuery({
    queryKey: ["todos", userId, limit, skip],
    queryFn: () =>
      apiRequest(
        `https://dummyjson.com/todos/user/${userId}?limit=${limit}&skip=${skip}`,
        {},
        auth
      ),
    enabled: !!user,
	retry: standardRetryLogic
  });
};

// Get a single todo by ID
export const useTodo = (id: number) => {
  const auth = useAuth();
  const user = auth.user;

  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => apiRequest(`https://dummyjson.com/todos/${id}`, {}, auth),
    enabled: !!user,
	retry: standardRetryLogic
  });
};

// Create a new todo
export const useCreateTodo = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["todo"],
    mutationFn: (newTodo: INewToDo) =>
      apiRequest(
        "https://dummyjson.com/todos/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        },
        auth
      ),
	  retry: standardRetryLogic

  });
};

// Update an existing todo
export const useUpdateTodo = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["todo"],
    mutationFn: (updateToDoRequest: IUpdateToDoRequest) => {
      const body = {
        completed: updateToDoRequest.completed,
        todo: updateToDoRequest.updatedTodo,
      };

      return apiRequest(
        `https://dummyjson.com/todos/${updateToDoRequest.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
        auth
      );
    },
	retry: standardRetryLogic

  });
};

// Delete a todo
export const useDeleteTodo = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["todo"],
    mutationFn: (id: number) =>
      apiRequest(
        `https://dummyjson.com/todos/${id}`,
        { method: "DELETE" },
        auth
      ),
	 retry: standardRetryLogic
  });
  
};
