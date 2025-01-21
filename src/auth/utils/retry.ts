export const retryRequest = async (
    requestFn: () => Promise<Response>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<Response> => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await requestFn();
        
        // Check if the response is valid before returning it
        if (!response) {
          throw new Error('Response is undefined or null');
        }
  
        return response; // Return a valid response
      } catch (error) {
        lastError = error;
        if (attempt === retries) {
          // If it's the last retry, throw the error to ensure the return type is always handled
          throw lastError;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  
    throw new Error('Request failed after multiple attempts');
  };
  