import React, { useState, useEffect } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';
import { fadeIn } from '../utils/animations';
import LazyImage from '../components/common/LazyImage';
import BlogListPage from '../components/blog/BlogListPage';
import BlogPost from '../components/blog/BlogPost';

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [match, params] = useRoute('/blog/:slug');
  const [location] = useLocation();
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    // Extract unique categories from blog posts
    const uniqueCategories = Array.from(
      new Set(blogPosts.map((post) => post.category))
    );
    setCategories(uniqueCategories);
    
    console.log('Blog component mounted or updated');
    console.log('Current location:', location);
    console.log('Route match:', match);
    console.log('Route params:', params);
  }, [location, match, params]);

  // Extract the slug directly from the path if we're on a blog post page
  if (match && params?.slug) {
    console.log('Found blog post with slug:', params.slug);
    // Check if the post exists
    const post = blogPosts.find(p => p.slug === params.slug);
    if (post) {
      console.log('Blog post found:', post.title);
      return <BlogPost slug={params.slug} />;
    } else {
      console.log('Blog post not found for slug:', params.slug);
    }
  }
  
  // Fallback for direct URL access
  if (location.startsWith('/blog/') && location !== '/blog/') {
    const directSlug = location.replace('/blog/', '');
    console.log('Extracting slug from direct URL:', directSlug);
    return <BlogPost slug={directSlug} />;
  }

  // Otherwise, show the blog list page
  console.log('Showing blog list page');
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Blog Header Section */}
      <motion.section 
        className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-32 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("blog.title", "Latest Articles")}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("blog.subtitle", "Insights, behind-the-scenes, and industry perspectives")}
            </motion.p>
            
            {/* Featured Posts Indicator */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <svg 
                className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Blog Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BlogListPage />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog; 