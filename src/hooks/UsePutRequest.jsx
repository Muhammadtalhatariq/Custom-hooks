import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePutRequest = () => {
  const quertClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ url, body }) => {
      const res = await fetch(url, {
        method: "PUT",
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
    execute: (url, body) => mutation.mutate({ url, body }),
    isLoading: mutation.isLoading,
    data: mutation.data,
    error: mutation.error,
  };
};

export default usePutRequest;
