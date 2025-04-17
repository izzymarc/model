import { InstagramPost } from "@/types";

// These direct image URLs may eventually expire as Instagram refreshes their CDN URLs
// In a production environment, we would integrate with Instagram Graph API or Basic Display API
// For demonstration purposes, we're using direct image URLs with fallbacks
export const instagramData: InstagramPost[] = [
  {
    // Direct post images from Instagram with fallback to local images
    image: "/images/instagram/perfume-campaign.jpg",
    fallbackImage: "/images/fallback/fashion.jpg",
    link: "https://www.instagram.com/p/C4nnF63NRLr/",
    caption: "New fragrance campaign"
  },
  {
    image: "/images/instagram/editorial-gold.jpg",
    fallbackImage: "/images/fallback/fashion.jpg",
    link: "https://www.instagram.com/p/CzV_BuFN3Sa/",
    caption: "Editorial shoot"
  },
  {
    image: "/images/instagram/blue-concept.jpg",
    fallbackImage: "/images/fallback/fashion.jpg",
    link: "https://www.instagram.com/p/CtLVXdhtrnO/",
    caption: "Blue concept"
  },
  {
    image: "/images/instagram/business-campaign.jpg",
    fallbackImage: "/images/fallback/fashion.jpg",
    link: "https://www.instagram.com/p/Ct86_hAtyAK/",
    caption: "Business campaign"
  },
  {
    image: "/images/instagram/white-collection.jpg",
    fallbackImage: "/images/fallback/fashion.jpg",
    link: "https://www.instagram.com/p/Cy6jqvINN9M/",
    caption: "White collection"
  },
  {
    image: "/images/instagram/red-carpet.jpg",
    fallbackImage: "/images/fallback/fashion.jpg",
    link: "https://www.instagram.com/p/CqLUNz9NMGk/",
    caption: "Red carpet ready"
  }
];
