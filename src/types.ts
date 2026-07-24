export interface DrinkImage {
  alt: string;
  align?: string;
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
  content: string;
  sweetness?: number;
  booziness?: number;
}
