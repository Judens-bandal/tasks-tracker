import {
  TApiResponseMutation,
  TMutationParams,
} from "@/types/api-response.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAppMutation<TData>(
  mutationFn: (data: TData) => Promise<TApiResponseMutation>,
  messages: {
    loading: string;
    success: string;
    toastId: string;
    allowToast?: boolean;
  },
  { onSuccess, onError }: TMutationParams,
) {
  return useMutation<TApiResponseMutation, Error, TData, void>({
    mutationFn,
    onMutate: () => {
      if (messages.allowToast !== false) {
        toast.loading(messages.loading, { id: messages.toastId });
      }
    },

    onSuccess: (response) => {
      if (response.code === 0 && onSuccess) {
        if (messages.allowToast! == false) {
          toast.success(messages.success);
        }
      }
    },

    onError: (error) => {
      //   handleError(error);
      onError?.(error);
    },

    onSettled: () => {
      if (messages.allowToast !== false) {
        toast.dismiss(messages.toastId);
      }
    },
  });
}
