import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { blogPosts } from '../../data/blogData';
import { format } from 'date-fns';

const BlogListPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts.filter(post => post.status === 'published'));
  
  // Get unique categories
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
  
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredPosts(blogPosts.filter(post => post.status === 'published'));
    } else {
      setFilteredPosts(
        blogPosts.filter(post => post.category === activeCategory && post.status === 'published')
      );
    }
  }, [activeCategory]);
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t('blog.title', 'Latest Articles')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('blog.subtitle', 'Insights, behind-the-scenes, and industry perspectives')}
        </p>
      </motion.div>

      <div className="mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category === 'all'
                ? t('portfolio.filters.all', 'All')
                : t(`blog.categories.${category}`, category)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="block group cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                          {t(`blog.categories.${post.category}`, post.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {formatDate(post.publishDate)}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{post.author}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:underline">
                          {t('blog.readMore', 'Read More')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-20"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('blog.noPosts', 'No posts found in this category.')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage; 