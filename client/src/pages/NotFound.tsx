import React from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const currentPath = window.location.pathname;
  const isBlogPost = currentPath.startsWith('/blog/');
  
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center">
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold mb-6 text-gray-900 dark:text-white">404</h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {isBlogPost 
            ? t('blog.postNotFound', 'Post Not Found') 
            : t('notFound.title', 'Page Not Found')}
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {isBlogPost 
            ? t('blog.postNotFoundDesc', 'The blog post you are looking for does not exist or has been removed.') 
            : t('notFound.description', 'The page you are looking for might have been removed or is temporarily unavailable.')}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={isBlogPost ? '/blog' : '/'}>
            <a className="inline-block px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              {isBlogPost 
                ? t('blog.backToBlog', 'Back to Blog') 
                : t('notFound.backHome', 'Back to Home')}
            </a>
          </Link>
          
          {!isBlogPost && (
            <Link href="/contact">
              <a className="inline-block px-6 py-3 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                {t('notFound.contactUs', 'Contact Us')}
              </a>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound; 