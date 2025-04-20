import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
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
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    // Extract unique categories from blog posts
    const uniqueCategories = Array.from(
      new Set(blogPosts.map((post) => post.category))
    );
    setCategories(uniqueCategories);
  }, []);

  // If a slug is provided, show the individual blog post
  if (match && params?.slug) {
    return <BlogPost slug={params.slug} />;
  }

  // Otherwise, show the blog list page
  return (
    <div className="bg-white dark:bg-gray-900 pt-24 pb-20">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t("blog.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("blog.subtitle")}
          </p>
        </motion.div>
        
        <BlogListPage />
      </div>
    </div>
  );
};

export default Blog; 