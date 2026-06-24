export type TApiResponse<T> = {
  code: number;
  data: T;
};

export type TMutationParams = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export type TApiResponseMutation = {
  code: number;
};
