import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { instagramPosts } from '../../data/instagramData';
import LazyImage from '../common/LazyImage';

const Instagram: React.FC = () => {
  const { t } = useTranslation();
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => [...prev, index]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 }}
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            {t('instagram.title', 'Instagram')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('instagram.subtitle', 'Follow my latest work and behind-the-scenes moments')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {instagramPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden group rounded-md shadow-sm dark:shadow-gray-800"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                aria-label={t('instagram.post', 'Instagram post {{number}}', { number: index + 1 })}
              >
                <LazyImage
                  src={post.image}
                  alt={post.caption || t('instagram.post', 'Instagram post {{number}}', { number: index + 1 })}
                  className="w-full h-full"
                  aspectRatio="aspect-[4/5]"
                  objectFit="cover"
                  onLoad={() => handleImageLoad(index)}
                  priority={index < 3} // Prioritize loading first 3 images
                />
                <motion.div 
                  className="absolute inset-0 bg-black flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 0.6 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 10
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-center px-4"
                  >
                    <p className="text-white font-medium mb-2">{post.caption}</p>
                    <span className="inline-block text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm">
                      {t('instagram.viewPost', 'View on Instagram')}
                    </span>
                  </motion.div>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com/mirabel.udeagha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            {t('instagram.followMe', 'Follow @mirabel.udeagha')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Instagram;
