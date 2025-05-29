import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteRequest = () => {
  const quertClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ url }) => {
      const res = await fetch(url, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return { message: "Post deleted successfully" };
    },
    onSuccess: () => {
      quertClient.invalidateQueries("Posts");
    },
  });
  return {
    execute: (url) => mutation.mutate({ url }),
    isLoading: mutation.isLoading,
    data: mutation.data,
    error: mutation.error,
  };
};

export default useDeleteRequest;
