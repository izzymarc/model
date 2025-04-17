import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { instagramData } from '../../data/instagramData';
import LazyImage from '../common/LazyImage';

const Instagram: React.FC = () => {
  const { t } = useTranslation();
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => [...prev, index]);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('instagram.title', 'Instagram')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('instagram.subtitle', 'Follow my latest work and behind-the-scenes moments')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {instagramData.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden group"
            >
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
                aria-label={t('instagram.post', 'Instagram post {{number}}', { number: index + 1 })}
              >
                <LazyImage
                  src={post.image}
                  alt={post.caption || t('instagram.post', 'Instagram post {{number}}', { number: index + 1 })}
                  fallbackImage={post.fallbackImage}
                  className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                  aspectRatio="aspect-[4/5]"
                  objectFit="cover"
                  onLoad={() => handleImageLoad(index)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm md:text-base font-medium">
                    {t('instagram.viewPost', 'View on Instagram')}
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            {t('instagram.followMe', 'Follow Me')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Instagram;
