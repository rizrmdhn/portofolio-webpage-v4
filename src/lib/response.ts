export type ResponseFormatter<T> = {
  status: string;
  message: string;
  data?: T;
};

function response<T>(
  status: string,
  message: string,
  data?: T,
): ResponseFormatter<T> {
  return {
    status,
    message,
    data,
  };
}

export default response;
