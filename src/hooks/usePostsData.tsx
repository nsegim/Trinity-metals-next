
import { useState, useEffect, useCallback } from "react";
import { fetchData } from "../../lib/config/apiConfig";

// Custom hook for optimized data fetching
export const usePostsData = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState({});
  const [postImages, setPostImages] = useState({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchData('posts?page=1&per_page=9');
      setData(response);

      // Fetch all categories and images in parallel
      const categoryPromises = response.map(async (item) => {
        if (item?.categories?.[0]) {
          try {
            const categoryName = await fetchData(`categories/${item.categories[0]}`);
            return { id: item.id, category: categoryName?.name };
          } catch (error) {
            console.error(`Failed to fetch category for post ${item.id}:`, error);
            return null;
          }
        }
        return null;
      });

      const imagePromises = response.map(async (item) => {
        if (item?.featured_media) {
          try {
            const imageData = await fetchData(`media/${item.featured_media}`);
            return { 
              id: item.id, 
              image: imageData?.media_details?.sizes?.medium_large?.source_url || 
                    imageData?.media_details?.sizes?.large?.source_url 
            };
          } catch (error) {
            console.error(`Failed to fetch image for post ${item.id}:`, error);
            return null;
          }
        }
        return null;
      });

      // Wait for all promises to resolve
      const [categoryResults, imageResults] = await Promise.all([
        Promise.all(categoryPromises),
        Promise.all(imagePromises)
      ]);

      // Batch update categories
      const newCategories = {};
      categoryResults.forEach(result => {
        if (result) {
          newCategories[result.id] = result.category;
        }
      });
      setCategories(newCategories);

      // Batch update images
      const newImages = {};
      imageResults.forEach(result => {
        if (result) {
          newImages[result.id] = result.image;
        }
      });
      setPostImages(newImages);

    } catch (error) {
      // setError(error);
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, categories, postImages, error, loading, getPosts };
};