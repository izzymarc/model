import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Timestamp for initial data
const now = new Date();

// Helper function to create a collection if it doesn't exist
async function setupCollection(collectionName, initialData = []) {
  console.log(`Setting up ${collectionName} collection...`);
  
  try {
    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.limit(1).get();
    
    if (snapshot.empty && initialData.length > 0) {
      console.log(`Adding initial ${initialData.length} documents to ${collectionName}...`);
      
      const batch = db.batch();
      
      for (const data of initialData) {
        const docRef = collectionRef.doc();
        batch.set(docRef, {
          ...data,
          createdAt: now,
          updatedAt: now
        });
      }
      
      await batch.commit();
      console.log(`Successfully added initial data to ${collectionName}`);
    } else {
      console.log(`Collection ${collectionName} already has data, skipping initialization`);
    }
  } catch (error) {
    console.error(`Error setting up ${collectionName} collection:`, error);
  }
}

// Initial data for collections
const portfolioItems = [
  {
    title: 'Fashion Shoot 1',
    description: 'Professional photoshoot showcasing summer collection',
    imageUrl: '/images/portfolio/fashion1.jpg',
    category: 'fashion',
    tags: ['summer', 'professional', 'outdoor'],
    isPublished: true
  },
  {
    title: 'Portrait Session',
    description: 'Studio portrait photography',
    imageUrl: '/images/portfolio/model.jpg',
    category: 'portrait',
    tags: ['studio', 'portrait', 'professional'],
    isPublished: true
  }
];

const blogPosts = [
  {
    title: 'Getting Started in Modeling',
    slug: 'getting-started-in-modeling',
    content: 'Content goes here...',
    excerpt: 'A guide for beginners in the modeling industry',
    coverImage: '/images/portfolio/fashion2.jpg',
    category: 'career',
    tags: ['beginners', 'guide', 'modeling'],
    published: true,
    publishedAt: now,
    author: {
      name: 'Admin',
      imageUrl: '/images/admin-avatar.jpg'
    }
  }
];

const experiences = [
  {
    role: 'Professional Model',
    company: 'Elite Model Management',
    location: 'New York, NY',
    startDate: new Date('2021-01-01'),
    endDate: null,
    isCurrentPosition: true,
    description: 'Working with premium fashion brands and magazines',
    isHighlighted: true
  },
  {
    role: 'Brand Ambassador',
    company: 'Luxury Cosmetics',
    location: 'Los Angeles, CA',
    startDate: new Date('2020-03-15'),
    endDate: new Date('2020-12-31'),
    isCurrentPosition: false,
    description: 'Represented the brand at various events and promotional activities',
    isHighlighted: true
  }
];

const mediaItems = [
  {
    title: 'Fashion Week Highlights',
    description: 'Compilation of runway moments',
    url: '/images/portfolio/fashion3.jpg',
    type: 'image',
    category: 'portfolio',
    tags: ['fashion', 'runway', 'professional']
  },
  {
    title: 'Behind the Scenes',
    description: 'Studio photoshoot preparation',
    url: '/images/portfolio/fashion4.jpg',
    type: 'image',
    category: 'backstage',
    tags: ['studio', 'preparation', 'behind-the-scenes']
  }
];

// Main setup function
async function setupFirestore() {
  console.log('Starting Firestore setup...');
  
  // Setup collections with initial data
  await setupCollection('portfolio', portfolioItems);
  await setupCollection('blogPosts', blogPosts);
  await setupCollection('experiences', experiences);
  await setupCollection('media', mediaItems);
  
  console.log('Firestore setup completed!');
  process.exit(0);
}

// Run the setup
setupFirestore().catch(error => {
  console.error('Error during Firestore setup:', error);
  process.exit(1);
}); 