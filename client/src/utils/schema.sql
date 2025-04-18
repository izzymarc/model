-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  title TEXT,
  bio TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  location TEXT,
  profile_image_url TEXT,
  website TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  facebook_url TEXT,
  linkedin_url TEXT,
  role TEXT DEFAULT 'user',
  height TEXT,
  bust TEXT,
  waist TEXT,
  hips TEXT,
  shoe_size TEXT,
  hair_color TEXT,
  eye_color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profiles" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Only admins can create profiles" 
  ON profiles FOR INSERT WITH CHECK (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Media Table
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  url TEXT NOT NULL,
  type TEXT,
  size INT,
  width INT,
  height INT,
  alt_text TEXT,
  caption TEXT,
  category TEXT,
  tags TEXT[],
  owner_id UUID REFERENCES auth.users ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security for Media
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Policies for Media
CREATE POLICY "Public media are viewable by everyone" 
  ON media FOR SELECT USING (true);

CREATE POLICY "Admins can insert media" 
  ON media FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update media" 
  ON media FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete media" 
  ON media FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  year INT,
  tags TEXT[],
  image_url TEXT,
  priority INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security for Portfolio
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

-- Policies for Portfolio
CREATE POLICY "Public published portfolio items are viewable by everyone" 
  ON portfolio FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all portfolio items" 
  ON portfolio FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can insert portfolio items" 
  ON portfolio FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update portfolio items" 
  ON portfolio FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete portfolio items" 
  ON portfolio FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  author_id UUID REFERENCES auth.users ON DELETE CASCADE,
  category TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security for Blog Posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for Blog Posts
CREATE POLICY "Public published blog posts are viewable by everyone" 
  ON blog_posts FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can view all blog posts" 
  ON blog_posts FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can insert blog posts" 
  ON blog_posts FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update blog posts" 
  ON blog_posts FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete blog posts" 
  ON blog_posts FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  project_type TEXT,
  project_date DATE,
  budget_range TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security for Contact Submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for Contact Submissions
CREATE POLICY "Anyone can insert contact submissions" 
  ON contact_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can select contact submissions" 
  ON contact_submissions FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update contact submissions" 
  ON contact_submissions FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete contact submissions" 
  ON contact_submissions FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security for Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for Site Settings
CREATE POLICY "Public site settings are viewable by everyone" 
  ON site_settings FOR SELECT USING (true);

CREATE POLICY "Only admins can update site settings" 
  ON site_settings FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Insert default site settings
INSERT INTO site_settings (name, value) 
VALUES ('general', '{"siteTitle": "Mirabel N. Udeagha", "description": "International Fashion & Editorial Model", "contactEmail": "contact@mirabelnudeagha.com"}')
ON CONFLICT (name) DO NOTHING;

INSERT INTO site_settings (name, value) 
VALUES ('social', '{"instagram": "https://instagram.com/mirabelnudeagha", "twitter": "https://twitter.com/mirabelnudeagha", "facebook": "https://facebook.com/mirabelnudeagha", "linkedin": "https://linkedin.com/in/mirabelnudeagha"}')
ON CONFLICT (name) DO NOTHING;

INSERT INTO site_settings (name, value) 
VALUES ('portfolio', '{"itemsPerPage": 9, "showCategories": true, "defaultCategory": "all"}')
ON CONFLICT (name) DO NOTHING;

-- Function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email, COALESCE(new.raw_user_meta_data->>'role', 'user'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); 