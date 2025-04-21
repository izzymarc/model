import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { blogPosts } from '../../data/blogData';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface BlogPostProps {
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug }) => {
  const { t } = useTranslation();
  
  // Find the post with the given slug
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">{t('blog.postNotFound', 'Post Not Found')}</h1>
          <p className="mb-8">{t('blog.postNotFoundDesc', 'The blog post you are looking for does not exist or has been removed.')}</p>
          <Link href="/blog">
            <a className="inline-block px-6 py-3 bg-black text-white dark:bg-white dark:text-black">
              {t('blog.backToBlog', 'Back to Blog')}
            </a>
          </Link>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  // For related posts, find other posts in the same category, excluding current post
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id && p.status === 'published')
    .slice(0, 3);
  
  return (
    <div className="min-h-screen pt-32 pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back to blog link */}
          <div className="mb-8">
            <Link href="/blog">
              <a className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                {t('blog.backToAllArticles', 'Back to all articles')}
              </a>
            </Link>
          </div>
          
          {/* Blog post header */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-md">
                {t(`blog.categories.${post.category}`, post.category)}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <span>{t('blog.by', 'By')} {post.author}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.publishDate)}</span>
            </div>
          </div>
          
          {/* Featured image */}
          <div className="mb-12 rounded-xl overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.title} 
              className="w-full h-auto object-cover max-h-[500px]" 
            />
          </div>
          
          {/* Blog content */}
          <div className="prose prose-lg max-w-none dark:prose-invert mb-16">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{t('blog.relatedPosts', 'Related Posts')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <a className="group">
                      <div className="rounded-lg overflow-hidden mb-4">
                        <img 
                          src={relatedPost.featuredImage} 
                          alt={relatedPost.title} 
                          className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:underline mb-2">{relatedPost.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(relatedPost.publishDate)}</p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost; 