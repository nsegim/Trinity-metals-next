// app/post/[id]/page.tsx
import ImageGallery from "@/components/common/ImageGallery";
import SocialShare from "@/components/common/SocialShare/SocialShare";
import SideBar from "@/components/layout/SideBar/SideBar";
import { fetchData } from "../../../../../lib/config/apiConfig";

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

interface SInglePostProps{
  params: Promise<{id:string}>
}

export default async function SinglePost({ params }: SInglePostProps) {
  let post: WPPost | null = null;
  let featuredImage: string | null = null;
  let allPosts: WPPost[] = [];
  let currentCategories: { [key: number]: string } = {};

   const {id} = await params;  
   


  try {
    // Fetch current post
    post = await fetchData(`posts/${id}`);


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
  // console.log("Test", currentPost)
   

  return (
    <>
       {/* Hero */}
      <div className="custom-hero single-post" style={heroStyle}>
        <div className="child-item-wrapper z-1">
          <h1 className="heading" dangerouslySetInnerHTML={{ __html: currentPost.title.rendered }} />
          <div className="published-date">
            <h4>{moment(currentPost.date).format("DD MMMM, YYYY")}</h4>
          </div>
        </div>
      </div>

      <div className="single-post-wrapper">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-md-8">
              <div className="post-details">
                <div className="post-content">
                  {/* Meta */}
                  <div className="post-meta-wrapper">
                    <ul className="post-meta">
                      <li>
                        <a href="#">
                          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Icon.svg" customClass="Admin-icon" imageName="Author" width={15} height={16} />
                          <p>Admin</p>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <ImageGallery imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Document-icon.svg" customClass="Category-icon" imageName="Category" width={15} height={16} />
                          <p>Industrial</p>
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Content */}
                  <div className="the_content" dangerouslySetInnerHTML={{ __html: currentPost.content.rendered }} />

                  {/* Share */}
                  <div className="share-the-post">
                    <SocialShare postUrl={currentPost.link} postTitle={currentPost.title.rendered} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-4">
              <SideBar
                
                currentCategories={currentCategories}
              />
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
}