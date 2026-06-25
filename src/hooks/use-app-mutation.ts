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

    // onSuccess: (response) => {
    //   if (response.code === 0 && onSuccess) {
    //     if (messages.allowToast! == false) {
    //       toast.success(messages.success);
    //     }
    //   }
    // },

    onSuccess: (response) => {
      if (response.code === 200) {
        if (messages.allowToast !== false) {
          toast.success(messages.success, {
            position: "top-right",
            duration: 2000,
          });
        }
        onSuccess?.();
      }
    },

    // onSuccess: (response) => {
    //   if (response.code === 0) {
    //     if (messages.allowToast !== false) {
    //       toast.success(messages.success, {
    //         position: "top-right",
    //         duration: 2000,
    //       });
    //     }
    //     onSuccess?.(); // ← this was missing
    //   }
    // },
    // onSuccess: (response) => {
    //   console.log("response:", response); // ← check code value
    //   if (response.code === 0) {
    //     if (messages.allowToast !== false) {
    //       toast.success(messages.success);
    //     }
    //     onSuccess?.();
    //   }
    // },

    // onError: (error) => {
    //   //   handleError(error);
    //   onError?.(error);
    // },
    // onError: (error) => {
    //   toast.error(error.message, {
    //     position: "top-right",
    //     duration: 3000,
    //   });
    //   onError?.(error);
    // },

    // [FIXED] removed error.response?.data (Error type has no response property)
    // error.message is already set by apiClient interceptor from backend response
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        duration: 3000,
      });
      onError?.(error);
    },

    onSettled: () => {
      if (messages.allowToast !== false) {
        toast.dismiss(messages.toastId);
      }
    },
  });
}
