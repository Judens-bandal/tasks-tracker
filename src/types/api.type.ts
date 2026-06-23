export type TApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};
