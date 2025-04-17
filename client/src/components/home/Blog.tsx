import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import LazyImage from '../common/LazyImage';

// Sample blog data - in a real app, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: 'Behind the Scenes: Fashion Week 2024',
    excerpt: 'An inside look at the preparation, challenges, and highlights of Fashion Week 2024.',
    date: '2024-03-15',
    image: '/images/blog/fashion-week.jpg',
    category: 'behindTheScenes',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Sustainable Fashion: My Journey',
    excerpt: 'How I\'ve incorporated sustainable fashion practices into my content creation and personal life.',
    date: '2024-02-22',
    image: '/images/blog/sustainable-fashion.jpg',
    category: 'sustainability',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Tips for Aspiring Content Creators',
    excerpt: 'Essential advice for those looking to break into the content creation industry.',
    date: '2024-01-10',
    image: '/images/blog/modeling-tips.jpg',
    category: 'careerAdvice',
    readTime: '6 min read',
  },
];

const Blog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('blog.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <LazyImage
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  aspectRatio="aspect-[16/9]"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                  {t(`blog.categories.${post.category}`)}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <button
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="inline-flex items-center text-primary hover:underline font-medium"
                >
                  {t('blog.readMore')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            {t('blog.viewAll')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog; 