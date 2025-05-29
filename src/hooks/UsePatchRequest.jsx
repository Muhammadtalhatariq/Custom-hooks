import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchRequest = () => {
  const quertClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ url, body }) => {
      const res = await fetch(url, {
        method: "PATCH",
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
    isLoading: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
  };
};

export default usePatchRequest;
