import { NewsItem } from "@/types/posts";
import axios from "axios";

const BASE_URL = "https://contents.trinity-metals.com/wp-json/wp/v2";

export const fetchPosts = async () => {
  const res = await axios.get(`${BASE_URL}/posts?_embed&per_page=9`);
  return res.data;
};

// export const fetchPostBySlug = async (slug: string) => {
//   const res = await axios.get(`${BASE_URL}/posts?slug=${slug}&_embed`);
//   return res.data[0];
// };


export async function fetchPostBySlug(slug: string):Promise<NewsItem| null>{
  const res = await axios.get(`${BASE_URL}/posts?slug=${slug}&_embed`);
  return res.data[0] || null;
}



export const fetchCategories = async () => {
  const res = await axios.get(`${BASE_URL}/categories?per_page=50`);
  return res.data;
};

// export const fetchPostBySlug = async (slug: string) => {
//   const res = await axios.get(${BASE_URL}/posts?slug=${slug}&_embed);
//   if (!res.data.length) throw new Error("Post not found");
//   return res.data[0];
// };