import React from 'react';
import { useTranslation } from 'react-i18next';

interface BlogPostProps {
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug }) => {
  const { t } = useTranslation();
  
  // This would normally fetch the post data based on the slug
  const post = {
    id: slug,
    title: `Blog post for ${slug}`,
    excerpt: 'This is a sample blog post',
    content: '<p>This is the content of the blog post</p>',
    featuredImage: '/images/portfolio/fashion1.jpg',
    author: 'Mirabel N. Udeagha',
    publishDate: new Date().toISOString(),
    category: 'Behind the Scenes'
  };
  
  return (
    <div className="blog-post">
      <div className="featured-image">
        <img src={post.featuredImage} alt={post.title} />
      </div>
      <h1 className="title">{post.title}</h1>
      <div className="meta">
        <span className="author">{t('blog.by', 'By')} {post.author}</span>
        <span className="date">{new Date(post.publishDate).toLocaleDateString()}</span>
        <span className="category">{post.category}</span>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default BlogPost; 