import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePostRequest = () => {
  const quertClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    },
    onSuccess: () => {
      quertClient.invalidateQueries("Posts");
    },
  });
  return {
    execute: (body) => mutation.mutate(body),
    isLoading: mutation.isLoading,
    data: mutation.data,
    error: mutation.error,
  };
};

export default usePostRequest;
