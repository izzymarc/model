import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface BlogEditorProps {
  initialPost?: {
    id?: string;
    title: string;
    content: string;
    excerpt: string;
    category: string;
    publishDate: string;
    status: 'draft' | 'published';
    featuredImage?: string;
  };
  onSave: (post: any) => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ initialPost, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [post, setPost] = useState(
    initialPost || {
      title: '',
      content: '',
      excerpt: '',
      category: 'behindTheScenes',
      publishDate: new Date().toISOString().split('T')[0],
      status: 'draft' as const,
      featuredImage: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(post);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {post.id ? t('admin.blog.editPost', 'Edit Post') : t('admin.blog.createPost', 'Create New Post')}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            {t('admin.blog.postTitle', 'Post Title')}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
            {t('admin.blog.excerpt', 'Excerpt')}
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={post.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            {t('admin.blog.content', 'Content')}
          </label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            rows={10}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              {t('admin.blog.category', 'Category')}
            </label>
            <select
              id="category"
              name="category"
              value={post.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="behindTheScenes">
                {t('admin.blog.categories.behindTheScenes', 'Behind the Scenes')}
              </option>
              <option value="sustainability">
                {t('admin.blog.categories.sustainability', 'Sustainability')}
              </option>
              <option value="careerAdvice">
                {t('admin.blog.categories.careerAdvice', 'Career Advice')}
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              {t('admin.blog.postStatus', 'Status')}
            </label>
            <select
              id="status"
              name="status"
              value={post.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="draft">{t('admin.blog.status.draft', 'Draft')}</option>
              <option value="published">{t('admin.blog.status.published', 'Published')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="publishDate" className="block text-sm font-medium mb-1">
              {t('admin.blog.publishDate', 'Publish Date')}
            </label>
            <input
              type="date"
              id="publishDate"
              name="publishDate"
              value={post.publishDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium mb-1">
              {t('admin.blog.featuredImage', 'Featured Image URL')}
            </label>
            <input
              type="text"
              id="featuredImage"
              name="featuredImage"
              value={post.featuredImage || ''}
              onChange={handleChange}
              placeholder="/images/blog/my-image.jpg"
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            {t('common.cancel', 'Cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            {t('common.save', 'Save')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BlogEditor; 