export interface PortfolioItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: string;
  image: string;
  year: number;
  tags?: string[];
} 