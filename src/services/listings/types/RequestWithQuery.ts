export interface CustomRequestWithQuery<T> extends Request {
  query: T;
};