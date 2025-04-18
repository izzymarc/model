# Professional Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This portfolio showcases professional work, projects, and achievements with a beautiful and intuitive user interface.

## Features

- 🌐 Multi-language support (English)
- 🌓 Dark/Light mode
- 📱 Fully responsive design
- 🎨 Modern UI with animations
- 🖼️ Image optimization and lazy loading
- 📹 Video support with lazy loading
- 🔍 SEO optimized
- ⚡ Fast performance
- 🎯 Smooth scrolling
- 📧 Contact form
- 📱 Social media integration
- 🔒 Authentication with Supabase
- 💾 Database and storage with Supabase
- 👤 User registration and admin panel

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- i18next
- React Router
- Vite
- Supabase (Auth, Database, Storage)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/izzymarc/model.git
cd model
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new project on [Supabase](https://supabase.com)
   - Use the SQL schema file in `client/src/utils/schema.sql` to set up all necessary tables
   - Create storage buckets for media files
   - Configure authentication providers (Email/Password by default)
   - Add your Supabase URL and anon key to the `.env` file

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

### Environment Variables

The application uses environment variables for various configurations. Create a `.env` file in the root directory with the following variables:

```
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
VITE_API_URL=/api

# App Configuration
VITE_APP_NAME=Professional Portfolio

# Third-party Services (Optional)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_USER_ID=your_emailjs_user_id

# Analytics (Optional)
VITE_GA_TRACKING_ID=your_google_analytics_id
```

Note: Environment files (`.env`, `.env.local`) are excluded from git tracking for security purposes. You can use the provided `.env.example` file as a template.

## Authentication and User Management

This project uses Supabase Authentication for user management. The implementation includes:

1. **User Registration**: New users can register with email and password through the AdminRegister component.
2. **User Login**: Registered users can log in to access the admin panel.
3. **Role-Based Access**: The system supports different user roles (admin, user) with appropriate permissions.
4. **Profile Management**: User profiles are automatically created upon registration and can be updated.
5. **Session Management**: Authentication state is managed and persisted across browser sessions.

To set up the first admin user:

1. Access the registration page at `/admin`
2. Click on "Create account" to register a new admin user
3. Enter your email, name, and password
4. The first user created will automatically be granted admin privileges

For security reasons, you may want to disable public registration after creating the initial admin account by modifying the Supabase authentication settings.

## Database Schema

The complete database schema is available in the `client/src/utils/schema.sql` file. This file includes:

- Tables for profiles, portfolio items, blog posts, media, contact submissions, and site settings
- Row-level security policies for each table
- Database triggers for user registration
- Default data for site settings

### Core Tables

#### Profiles Table
```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT,
  title TEXT,
  bio TEXT,
  email TEXT UNIQUE,
  -- additional fields...
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Portfolio Table
```sql
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  year INT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Blog Posts Table
```sql
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
```

## Supabase Integration

This project uses Supabase for backend services:

1. **Authentication**: User registration, login/logout, and profile management are handled by Supabase Auth.
2. **Database**: Portfolio items, blog posts, user profiles, and other data are stored in Supabase PostgreSQL database.
3. **Storage**: Media files (images, videos) are uploaded to and served from Supabase Storage.
4. **Row-Level Security**: Database access is controlled through policies based on user roles.

To set up your project with Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Use the SQL editor to execute the schema file at `client/src/utils/schema.sql`
3. Create a storage bucket named "media" with public read access
4. Set up email/password authentication in the Authentication settings
5. Add your URL and anon key to the `.env` file

## Project Structure

```
├── client/
│   ├── public/
│   │   ├── images/
│   │   ├── videos/
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/       # Admin panel components
│   │   │   ├── common/      # Reusable components
│   │   │   ├── home/        # Home page components
│   │   │   └── ...
│   │   ├── contexts/        # React contexts including AuthContext
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── locales/
│   │   ├── pages/
│   │   ├── services/        # Supabase service functions
│   │   ├── utils/           # Utilities including Supabase client
│   │   └── ...
│   └── ...
└── ...
```

## Deployment

This project is configured for deployment on Netlify. Simply connect your GitHub repository to Netlify and it will automatically deploy your site.

### Netlify Configuration

The project includes a `netlify.toml` file with the following settings:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Mirabel N. Udeagha - [@izzymarc](https://github.com/izzymarc)

Project Link: [https://github.com/izzymarc/model](https://github.com/izzymarc/model) 