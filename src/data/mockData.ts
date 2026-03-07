export interface Platform {
  id: string;
  name: string;
  color: string;
  logo: string;
}

export interface ProductResult {
  id: string;
  name: string;
  image: string;
  platform: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  buyLink: string;
  inStock: boolean;
}

export interface ProductGroup {
  query: string;
  image: string;
  results: ProductResult[];
}

export const platforms: Platform[] = [
  { id: "amazon", name: "Amazon", color: "38 92% 50%", logo: "🛒" },
  { id: "flipkart", name: "Flipkart", color: "210 80% 55%", logo: "🛍️" },
  { id: "jiomart", name: "JioMart", color: "340 75% 50%", logo: "🏪" },
  { id: "blinkit", name: "Blinkit", color: "145 60% 45%", logo: "⚡" },
];

export const searchSuggestions = [
  "iPhone 15 Pro Max",
  "Samsung Galaxy S24 Ultra",
  "Sony WH-1000XM5",
  "MacBook Air M3",
  "iPad Air 2024",
  "AirPods Pro 2",
  "Nike Air Max 90",
  "Dyson V15 Detect",
  "PlayStation 5",
  "Kindle Paperwhite",
];

export const mockProductGroups: ProductGroup[] = [
  {
    query: "iPhone 15 Pro Max",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
    results: [
      { id: "1", name: "iPhone 15 Pro Max 256GB", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop", platform: "amazon", price: 134900, originalPrice: 159900, rating: 4.6, ratingCount: 12453, buyLink: "#", inStock: true },
      { id: "2", name: "iPhone 15 Pro Max 256GB", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop", platform: "flipkart", price: 131999, originalPrice: 159900, rating: 4.5, ratingCount: 8721, buyLink: "#", inStock: true },
      { id: "3", name: "iPhone 15 Pro Max 256GB", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop", platform: "jiomart", price: 136499, originalPrice: 159900, rating: 4.4, ratingCount: 3201, buyLink: "#", inStock: true },
      { id: "4", name: "iPhone 15 Pro Max 256GB", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop", platform: "blinkit", price: 0, rating: 0, ratingCount: 0, buyLink: "#", inStock: false },
    ],
  },
  {
    query: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop",
    results: [
      { id: "5", name: "Sony WH-1000XM5 Wireless", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop", platform: "amazon", price: 22990, originalPrice: 29990, rating: 4.5, ratingCount: 9823, buyLink: "#", inStock: true },
      { id: "6", name: "Sony WH-1000XM5 Wireless", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop", platform: "flipkart", price: 23490, originalPrice: 29990, rating: 4.4, ratingCount: 5612, buyLink: "#", inStock: true },
      { id: "7", name: "Sony WH-1000XM5 Wireless", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop", platform: "jiomart", price: 24990, originalPrice: 29990, rating: 4.3, ratingCount: 1120, buyLink: "#", inStock: true },
      { id: "8", name: "Sony WH-1000XM5 Wireless", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop", platform: "blinkit", price: 0, rating: 0, ratingCount: 0, buyLink: "#", inStock: false },
    ],
  },
];
