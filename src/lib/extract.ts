import { NewsItem } from "@/types/posts";

export const getFeaturedImage = (articleData: NewsItem) => {
    
    if (!articleData) return null;
    
    // Check if _embedded data exists and has featured media
    const featuredMedia = articleData._embedded?.['wp:featuredmedia']?.[0];
    
    if (featuredMedia?.source_url) {
        return featuredMedia.source_url;
    }
    
    // Fallback: Check if there's a featured_media ID but no embedded data
    if (articleData.featured_media && !featuredMedia) {
        console.warn('Featured media ID exists but no embedded data. Consider adding _embed to API call.');
    }
    
    return null;
}