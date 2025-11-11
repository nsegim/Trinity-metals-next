import { useQuery } from "@tanstack/react-query";
import { fetchPostBySlug, fetchPosts } from "@/lib/api";



export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 2, // 2 min cache
  });
};


export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug),
    enabled: !!slug, // run only when slug exists
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};