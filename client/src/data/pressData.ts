export interface PressItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  publication: string;
  date: string;
  image: string;
  url: string;
}

export const pressData: PressItem[] = [
  {
    id: "1",
    titleKey: "press.vogue.title",
    descriptionKey: "press.vogue.description",
    publication: "Vogue",
    date: "2024-03-15",
    image: "/images/press/vogue.jpg",
    url: "https://www.vogue.com"
  },
  {
    id: "2",
    titleKey: "press.harpers.title",
    descriptionKey: "press.harpers.description",
    publication: "Harper's Bazaar",
    date: "2023-11-10",
    image: "/images/press/harpers.jpg",
    url: "https://www.harpersbazaar.com"
  },
  {
    id: "3",
    titleKey: "press.elle.title",
    descriptionKey: "press.elle.description",
    publication: "Elle Magazine",
    date: "2023-09-22",
    image: "/images/press/elle.jpg",
    url: "https://www.elle.com"
  }
];
