import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface BlogPreviewProps {
  post: {
    id?: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    publishDate: string;
    status: 'draft' | 'published';
    featuredImage?: string;
  };
  onClose: () => void;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ post, onClose }) => {
  const { t } = useTranslation();
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t('admin.blog.preview', 'Preview')}
        </h2>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          {t('common.cancel', 'Close')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {post.featuredImage && (
          <div className="relative w-full h-60">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-600 text-white">
                {t(`admin.blog.categories.${post.category}`)}
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl md:text-3xl font-bold"
            >
              {post.title}
            </motion.h1>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span>{formatDate(post.publishDate)}</span>
              <span className="mx-2">•</span>
              <span className={`${
                post.status === 'published'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}>
                {t(`admin.blog.status.${post.status}`)}
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <div className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {post.excerpt}
              </div>
              
              <div className="whitespace-pre-wrap">
                {post.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() ? (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ) : <br key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview; 