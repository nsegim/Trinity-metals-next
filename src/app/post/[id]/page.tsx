// app/post/[id]/page.tsx
import ImageGallery from "@/components/common/ImageGallery";
import SocialShare from "@/components/common/SocialShare/SocialShare";
import SideBar from "@/components/layout/SideBar/SideBar";
import { fetchData } from "../../../../lib/config/apiConfig";
import SiteHeader from "@/components/layout/Header/Header";
import SiteFooter from "@/components/layout/Footer/Footer";
import moment from "moment";
import "./styles.css";

interface WPRenderedText {
  rendered: string;
}
interface WPPost {
  id: number;
  date: string;
  link: string;
  title: WPRenderedText;
  excerpt: WPRenderedText;
  content: WPRenderedText;
  featured_media?: number;
  categories?: number[];
}
interface WPMedia {
  id: number;
  source_url: string;
  media_details?: {
    sizes?: {
      large?: { source_url: string };
      full?: { source_url: string };
    };
  };
}

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   try {
//     const post: WPPost = await fetchData(`posts/${params.id}`);
//     const plainText = post?.excerpt?.rendered?.replace(/<[^>]*>/g, "").slice(0, 160) || "Read the latest news.";
//     return {
//       title: post?.title?.rendered || "Post",
//       description: plainText,
//       openGraph: {
//         title: post?.title?.rendered,
//         description: plainText,
//         url: post?.link,
//         type: "article",
//       },
//     };
//   } catch {
//     return { title: "Post Not Found" };
//   }
// }

export default async function SinglePost({ params }: { params: { id: string } }) {
  let post: WPPost | null = null;
  let featuredImage: string | null = null;
  let allPosts: WPPost[] = [];
  let currentCategories: { [key: number]: string } = {};

   const currentPostId = params.id;  
   


  try {
    // Fetch current post
    post = await fetchData(`posts/${currentPostId}`);

      console.log(`posts:`, params.id)


    // Fetch featured image
    if (post?.featured_media) {
      const media: WPMedia = await fetchData(`media/${post.featured_media}`);
      featuredImage =
        media?.media_details?.sizes?.large?.source_url ||
        media?.media_details?.sizes?.full?.source_url ||
        media?.source_url;
    }

    // Fetch ALL posts for sidebar filtering
    allPosts = await fetchData(`posts?_embed&per_page=100`);

    // Build currentCategories map
    for (const p of allPosts) {
      if (p.categories?.[0]) {
        const cat = await fetchData(`categories/${p.categories[0]}`);
        currentCategories[p.id] = cat?.name || "Uncategorized";
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return (
      <div className="container py-5 text-center">
        <h2>Post not found</h2>
        <p>Sorry, we couldn't load this post.</p>
      </div>
    );
  }

  const heroStyle = {
    backgroundImage: featuredImage ? `url(${featuredImage})` : "linear-gradient(135deg, #1a1a1a, #333)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const currentPost = post!;

  return (
    <>
      {/* <SiteHeader /> */}
      <div>Hello</div>
      {/* <SiteFooter /> */}
    </>
  );
}