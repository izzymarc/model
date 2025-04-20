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
- 🔒 Authentication with Firebase
- 💾 Database and storage with Firebase
- 👤 User registration and admin panel

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- i18next
- React Router
- Vite
- Firebase (Auth, Database, Storage)

## Getting Started

### Prerequisites

- Node.js (v18.x)
- npm or yarn
- Firebase account (for backend services)

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

3. Set up Firebase:
   - Create a new project on [Firebase](https://firebase.google.com)
   - Set up Firebase Authentication (Email/Password)
   - Create Firestore collections for portfolio, blog posts, etc.
   - Configure Firebase Storage for media files
   - Add your Firebase configuration to the `.env` file

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
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

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

This project uses Firebase Authentication for user management. The implementation includes:

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

For security reasons, you may want to disable public registration after creating the initial admin account by modifying the Firebase Authentication settings.

## Database Structure

The application uses Firebase Firestore with the following collections:

### Core Collections

#### Users Collection
```javascript
{
  uid: string, // Firebase Auth user ID
  displayName: string,
  email: string,
  role: string, // 'admin' or 'user'
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Portfolio Collection
```javascript
{
  id: string,
  title: string,
  description: string,
  imageUrl: string,
  category: string,
  year: number,
  tags: array,
  isPublished: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Blog Posts Collection
```javascript
{
  id: string,
  title: string,
  slug: string,
  content: string,
  excerpt: string,
  imageUrl: string,
  authorId: string, // Reference to users collection
  category: string,
  tags: array,
  isPublished: boolean,
  publishedAt: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Firebase Integration

This project uses Firebase for backend services:

1. **Authentication**: User registration, login/logout, and profile management are handled by Firebase Auth.
2. **Database**: Portfolio items, blog posts, user profiles, and other data are stored in Firebase Firestore.
3. **Storage**: Media files (images, videos) are uploaded to and served from Firebase Storage.
4. **Security Rules**: Database and storage access is controlled through Firebase security rules based on user roles.

To set up your project with Firebase:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Set up Authentication, Firestore, and Storage services
3. Configure security rules for Firestore and Storage
4. Add your Firebase configuration to the `.env` file

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
│   │   ├── lib/             # Firebase configuration
│   │   ├── locales/
│   │   ├── pages/
│   │   ├── services/        # Firebase service functions
│   │   ├── utils/           # Utility functions
│   │   └── ...
│   └── ...
└── ...
```

## Deployment

This project is configured for deployment on Netlify or Firebase Hosting. 

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

### Firebase Hosting

To deploy to Firebase Hosting:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase: `firebase init` (select Hosting)
4. Build the project: `npm run build`
5. Deploy to Firebase: `firebase deploy`

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