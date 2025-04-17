import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import BlogEditor from './BlogEditor';
import BlogPreview from './BlogPreview';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishDate: string;
  status: 'draft' | 'published';
  featuredImage?: string;
}

const BlogManager: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Behind the Scenes: Summer Collection',
      excerpt: 'Get an exclusive look at our latest summer collection shoot...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo euismod, tincidunt nisi vel, varius eros.\n\nProin eget justo vel mi finibus interdum. Nulla facilisi. Cras fermentum diam nec facilisis feugiat. In hac habitasse platea dictumst. Cras non magna sed quam facilisis varius eget ut dolor.',
      category: 'behindTheScenes',
      publishDate: '2024-04-15',
      status: 'published',
      featuredImage: '/images/portfolio/fashion1.jpg',
    },
    {
      id: '2',
      title: "Sustainable Fashion: A Model's Perspective",
      excerpt: "How sustainability is changing the fashion industry from a model's viewpoint...",
      content: "The fashion industry is one of the largest polluters in the world. As someone who works within this industry, I've witnessed both the concerning practices and the inspiring changes happening.\n\nIn this article, I'll share my perspective on how models can advocate for sustainable practices and what changes I've observed in recent years that give me hope for a more sustainable fashion future.",
      category: 'sustainability',
      publishDate: '2024-03-22',
      status: 'published',
      featuredImage: '/images/portfolio/fashion4.jpg',
    },
    // More posts would be fetched from API in real app
  ]);

  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewingPost, setPreviewingPost] = useState<BlogPost | null>(null);

  const handleAdd = () => {
    setIsCreating(true);
  };

  const handleEdit = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setEditingPost(post);
    }
  };

  const handleDelete = (id: string) => {
    // In real app, would call API to delete
    if (window.confirm(t('admin.blog.confirmDelete', 'Are you sure you want to delete this post?'))) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handlePreview = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setPreviewingPost(post);
    }
  };

  const handleSave = (post: BlogPost) => {
    // In real app, would call API to save
    if (post.id) {
      // Update existing post
      setPosts(posts.map(p => p.id === post.id ? post : p));
      setEditingPost(null);
    } else {
      // Create new post
      const newPost = {
        ...post,
        id: Date.now().toString(), // Generate temporary ID
      };
      setPosts([newPost, ...posts]);
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
  };

  if (previewingPost) {
    return <BlogPreview post={previewingPost} onClose={() => setPreviewingPost(null)} />;
  }

  if (editingPost) {
    return <BlogEditor initialPost={editingPost} onSave={handleSave} onCancel={handleCancel} />;
  }

  if (isCreating) {
    return <BlogEditor onSave={handleSave} onCancel={handleCancel} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {t('admin.blog.title', 'Blog Management')}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <FaPlus />
          <span>{t('admin.blog.addNew', 'Add New Post')}</span>
        </motion.button>
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            {t('admin.blog.noPosts', 'No blog posts yet. Create your first post!')}
          </p>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {post.featuredImage && (
                    <div className="hidden sm:block h-20 w-20 flex-shrink-0">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="h-full w-full object-cover rounded-md" 
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {t(`admin.blog.categories.${post.category}`)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {new Date(post.publishDate).toLocaleDateString()}
                      </span>
                      <span
                        className={`${
                          post.status === 'published'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-yellow-600 dark:text-yellow-400'
                        }`}
                      >
                        {t(`admin.blog.status.${post.status}`)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePreview(post.id)}
                    className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                    title={t('admin.blog.preview', 'Preview')}
                    aria-label={t('admin.blog.preview', 'Preview')}
                  >
                    <FaEye />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(post.id)}
                    className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                    title={t('admin.blog.edit', 'Edit')}
                    aria-label={t('admin.blog.edit', 'Edit')}
                  >
                    <FaEdit />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    title={t('admin.blog.delete', 'Delete')}
                    aria-label={t('admin.blog.delete', 'Delete')}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManager; 