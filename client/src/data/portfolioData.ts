export interface PortfolioItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: "beauty" | "editorial" | "runway" | "commercial";
  image: string;
  year: number | string;
  tags?: string[];
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "p1",
    titleKey: "portfolio.items.luxury.title",
    descriptionKey: "portfolio.items.luxury.description",
    category: "beauty",
    image: "/images/portfolio/spring-collection.jpg",
    year: 2024,
    tags: ["beauty", "fragrance", "luxury"]
  },
  {
    id: "p2",
    titleKey: "portfolio.items.golden.title",
    descriptionKey: "portfolio.items.golden.description",
    category: "editorial",
    image: "/images/portfolio/summer-editorial.jpg",
    year: 2024,
    tags: ["editorial", "fashion-week", "print"]
  },
  {
    id: "p3",
    titleKey: "portfolio.items.contemporary.title",
    descriptionKey: "portfolio.items.contemporary.description",
    category: "commercial",
    image: "/images/portfolio/fashion2.jpg",
    year: 2023,
    tags: ["commercial", "catalog", "contemporary"]
  },
  {
    id: "p4",
    titleKey: "portfolio.items.executive.title",
    descriptionKey: "portfolio.items.executive.description",
    category: "commercial",
    image: "/images/portfolio/elegant-pose.jpg",
    year: 2023,
    tags: ["commercial", "business", "professional"]
  },
  {
    id: "p5",
    titleKey: "portfolio.items.geometric.title",
    descriptionKey: "portfolio.items.geometric.description",
    category: "editorial",
    image: "/images/portfolio/whitedress.jpg",
    year: 2023,
    tags: ["editorial", "couture", "avant-garde"]
  },
  {
    id: "p6",
    titleKey: "portfolio.items.scarlet.title",
    descriptionKey: "portfolio.items.scarlet.description",
    category: "runway",
    image: "/images/portfolio/reddress.jpg",
    year: 2022,
    tags: ["runway", "haute-couture", "statement"]
  },
  {
    id: "p7",
    titleKey: "portfolio.items.fashion1.title",
    descriptionKey: "portfolio.items.fashion1.description",
    category: "runway",
    image: "/images/portfolio/fashion1.jpg",
    year: "2024",
    tags: ["Runway", "Fashion Week", "Modern"]
  },
  {
    id: "p8",
    titleKey: "portfolio.items.fashion2.title",
    descriptionKey: "portfolio.items.fashion2.description",
    category: "runway",
    image: "/images/portfolio/fashion2.jpg",
    year: "2024",
    tags: ["Runway", "Fashion", "Contemporary"]
  },
  {
    id: "p9",
    titleKey: "portfolio.items.fashion3.title",
    descriptionKey: "portfolio.items.fashion3.description",
    category: "commercial",
    image: "/images/portfolio/fashion3.jpg",
    year: "2024",
    tags: ["Commercial", "Campaign", "Seasonal"]
  },
  {
    id: "p10",
    titleKey: "portfolio.items.fashion4.title",
    descriptionKey: "portfolio.items.fashion4.description",
    category: "editorial",
    image: "/images/portfolio/fashion4.jpg",
    year: "2024",
    tags: ["Editorial", "Fashion", "Luxury"]
  },
  {
    id: "p11",
    titleKey: "portfolio.items.fashion5.title",
    descriptionKey: "portfolio.items.fashion5.description",
    category: "editorial",
    image: "/images/portfolio/fashion5.jpg",
    year: "2025",
    tags: ["Editorial", "Fashion", "Campaign"]
  }
];
