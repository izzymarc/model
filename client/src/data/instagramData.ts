interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  postUrl: string;
  date: string;
}

// These direct image URLs may eventually expire as Instagram refreshes their CDN URLs
// In a production environment, we would integrate with Instagram Graph API or Basic Display API
// For demonstration purposes, we're using direct image URLs with fallbacks
export const instagramPosts: InstagramPost[] = [
  {
    id: '1',
    image: '/images/instagram/photo1.jpg',
    caption: 'Behind the scenes at the latest fashion shoot for summer collection. #fashionshoot #behindthescenes',
    postUrl: 'https://instagram.com/p/example1',
    date: '2024-03-15'
  },
  {
    id: '2',
    image: '/images/instagram/photo2.jpg',
    caption: 'Exploring new poses for the upcoming editorial. Always searching for that perfect angle. #editorial #modeling',
    postUrl: 'https://instagram.com/p/example2',
    date: '2024-03-10'
  },
  {
    id: '3',
    image: '/images/instagram/photo3.jpg',
    caption: 'Golden hour photoshoot for the spring campaign. Magic happens when the light is just right. #goldenhour #photoshoot',
    postUrl: 'https://instagram.com/p/example3',
    date: '2024-03-05'
  },
  {
    id: '4',
    image: '/images/instagram/photo4.jpg',
    caption: 'Casual street style moments between shows during fashion week. #streetstyle #fashionweek',
    postUrl: 'https://instagram.com/p/example4',
    date: '2024-02-28'
  },
  {
    id: '5',
    image: '/images/instagram/photo5.jpg',
    caption: 'Exploring new creative concepts with an amazing team. So grateful for these collaborations. #creativeprocess #photoshoot',
    postUrl: 'https://instagram.com/p/example5',
    date: '2024-02-20'
  },
  {
    id: '6',
    image: '/images/instagram/photo6.jpg',
    caption: 'Working with natural light and minimalist settings for this beauty campaign. #beauty #naturallight',
    postUrl: 'https://instagram.com/p/example6',
    date: '2024-02-15'
  }
];
