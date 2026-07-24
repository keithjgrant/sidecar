export interface DrinkImage {
  url?: string;
  alt?: string;
  align?: string;
  photographer?: string;
  creditUrl?: string;
}

export interface Drink {
  title: string;
  path: string;
  basename?: string;
  date?: string;
  glass: string;
  image?: DrinkImage;
  tags: string[];
  ingredients: string[];
  garnish?: string;
  intro?: string;
  content?: string;
  sweetness?: number;
  booziness?: number;
  featured?: boolean;
  family?: string;
}
