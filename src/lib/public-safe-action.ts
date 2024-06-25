import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";

export const publicActionClient = createSafeActionClient({
  // Can also be an async function.
  handleReturnedServerError(e) {
    // In this case, we can use the 'MyCustomError` class to unmask errors
    // and return them with their actual messages to the client.
    if (e instanceof Error) {
      return e.message;
    }

    // Every other error that occurs will be masked with the default message.
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
