import { useQuery } from "@tanstack/react-query";

export default function useGetRequest(url) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["Posts"],
    queryFn: async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
    staleTime: 5000,
  });
  return { isLoading, error, data };
}
