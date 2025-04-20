export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'behindTheScenes' | 'sustainability' | 'careerAdvice';
  publishDate: string;
  status: 'draft' | 'published';
  featuredImage: string;
  author: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Behind the Scenes: A Day in the Life of a Fashion Model',
    excerpt: 'Get an exclusive look at what really happens during a typical photoshoot day, from early morning prep to the final shot.',
    content: `
      The alarm rings at 4:30 AM. Most people are still fast asleep, but for models working on major campaigns, this is when the day begins.

      ## Morning Preparations
      
      By 5:30 AM, I'm already in the makeup chair. The makeup artist and hairstylist work simultaneously, transforming my look according to the creative direction for the shoot. This process typically takes 1-2 hours, depending on the complexity of the look.

      During this time, I'm reviewing the mood board, discussing poses with the photographer's assistant, and mentally preparing for the characters I'll embody throughout the day.

      ## On Set
      
      Once on set, there's a flurry of activity that most people don't see in the final images. Lighting technicians are constantly adjusting equipment, stylists are steaming garments and preparing accessories, and the photographer is testing angles and compositions.

      For outdoor shoots, we're racing against changing light conditions. For studio work, we're often shooting with music blasting to keep energy levels high after hours of holding challenging poses.

      ## The Reality Behind Perfect Images
      
      What many don't realize is that for every stunning image in a magazine, there might be hundreds of shots taken. The physical demands can be intense - holding unnatural poses that look effortless in a still image, working in extreme temperatures, and maintaining expressiveness even when uncomfortable.

      By the end of a 12-hour shoot day, I've likely changed outfits 8-10 times, worked with multiple lighting setups, and embodied different emotional states for each look.

      ## The Collaborative Art
      
      Despite the challenges, what makes this work so rewarding is the collaborative creativity. Every person on set brings their expertise to create something beautiful. When you see that final image that captures exactly what the creative team envisioned, there's nothing quite like that sense of collective accomplishment.
    `,
    category: 'behindTheScenes',
    publishDate: '2024-04-10',
    status: 'published',
    featuredImage: '/images/blog/behind-scenes.jpg',
    author: 'Mirabel N. Udeagha',
    slug: 'behind-the-scenes-day-in-life'
  },
  {
    id: '2',
    title: 'Sustainable Fashion: Small Changes Making Big Impacts',
    excerpt: 'How the fashion industry is evolving toward sustainability and what consumers can do to support ethical practices.',
    content: `
      The fashion industry is one of the largest polluters in the world, responsible for about 10% of global carbon emissions and nearly 20% of wastewater. But a revolution is underway, and as someone working within this industry, I've witnessed both concerning practices and inspiring changes.

      ## Industry Transformation
      
      Major fashion houses are increasingly committed to sustainable practices - from using recycled materials to reducing water consumption in manufacturing processes. Brands like Stella McCartney and Eileen Fisher have been pioneers, but now even fast fashion companies are being forced to reconsider their approaches.

      During a recent campaign shoot, I was impressed to find that all the garments were made from either organic cotton, recycled polyester, or innovative materials like fabric created from ocean plastic. Five years ago, this would have been rare for a mainstream brand.

      ## Models as Advocates
      
      Many models are now using their platforms to advocate for sustainability. Some refuse to work with brands that don't meet certain ethical standards. Others, like me, try to have conversations with designers and creative directors about incorporating sustainable elements into shoots and campaigns.

      When I'm on set, I notice more conversations happening about reducing waste - from eliminating single-use plastics to repurposing set materials instead of discarding them.

      ## What Consumers Can Do
      
      The most powerful force for change is consumer demand. Here are some ways to make a difference:

      1. Research brands before purchasing and support those with transparent supply chains
      2. Invest in fewer, higher-quality pieces that will last longer
      3. Consider secondhand and vintage options
      4. Look for certification labels like Global Organic Textile Standard (GOTS) or Bluesign
      5. Care for your clothes properly to extend their life

      ## The Path Forward
      
      Sustainability isn't just a trend but a necessary evolution of the fashion industry. By making conscious choices as both industry professionals and consumers, we can collectively push for a more environmentally responsible and ethically sound fashion future.
    `,
    category: 'sustainability',
    publishDate: '2024-03-22',
    status: 'published',
    featuredImage: '/images/blog/sustainability-fashion.jpg',
    author: 'Mirabel N. Udeagha',
    slug: 'sustainable-fashion-small-changes'
  },
  {
    id: '3',
    title: 'Career Advice: Building a Professional Modeling Portfolio',
    excerpt: 'Essential tips for emerging models on creating a standout portfolio that showcases versatility and attracts the right opportunities.',
    content: `
      A strong modeling portfolio is your most important marketing tool in this competitive industry. Having worked with numerous photographers, agencies, and clients over the years, I've learned what makes a portfolio stand out to industry professionals.

      ## Quality Over Quantity
      
      The biggest mistake I see aspiring models make is including too many similar images. Your portfolio should tell a story about your versatility and range. 8-12 exceptional images are much more effective than 30 mediocre ones.

      Each image should serve a purpose - showcasing different expressions, styles, lighting scenarios, and demonstrating your ability to embody various concepts.

      ## Essential Components
      
      A well-rounded portfolio typically includes:

      1. **Clean beauty shots** - Simple, well-lit images that clearly show your features
      2. **Editorial work** - More artistic, conceptual images that tell a story
      3. **Commercial examples** - Friendly, approachable images that showcase marketability
      4. **Full-body shots** - Demonstrating your ability to pose and work with your physique
      5. **Movement images** - Showing dynamic range beyond static poses

      ## Working With Photographers
      
      Choosing the right photographers is crucial. When starting out, research photographers whose style aligns with your career goals. Many established photographers offer test shoots (TFP - Time for Prints) with new models to expand their own portfolios.

      Before any shoot, study poses, practice expressions in the mirror, and create a mood board to communicate your vision clearly. The most successful shoots come from clear communication and collaborative creativity.

      ## Digital Presence
      
      In today's industry, your online portfolio is equally important. A professional Instagram account, website, or digital portfolio site helps clients find you easily. Keep these platforms updated, professionally curated, and aligned with your brand as a model.

      ## Continual Evolution
      
      Your portfolio should evolve as your career progresses. Regularly update with your best new work and remove older images that no longer represent your current look or abilities.

      Remember that your portfolio isn't just showing your appearance - it's demonstrating your professionalism, versatility, and understanding of the industry. Each image should reflect your potential as a creative collaborator who can bring concepts to life.
    `,
    category: 'careerAdvice',
    publishDate: '2024-02-14',
    status: 'published',
    featuredImage: '/images/blog/career-advice.jpg',
    author: 'Mirabel N. Udeagha',
    slug: 'career-advice-modeling-portfolio'
  }
]; 