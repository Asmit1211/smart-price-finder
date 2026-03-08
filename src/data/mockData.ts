import productsJson from "../../public/products.json";

import blinkitLogo from "@/logos/Blinkit.png";
import flipkartMinLogo from "@/logos/FlipkartMin.png";
import instamartLogo from "@/logos/Instamart.png";
import zeptoLogo from "@/logos/Zepto.png";

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
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
}

export const platforms: Platform[] = [
  { id: "blinkit", name: "Blinkit", color: "145 60% 45%", logo: blinkitLogo },
  { id: "flipkartMinutes", name: "Flipkart Minutes", color: "210 80% 55%", logo: flipkartMinLogo },
  { id: "swiggyInstamart", name: "Swiggy Instamart", color: "24 95% 53%", logo: instamartLogo },
  { id: "zepto", name: "Zepto", color: "260 60% 58%", logo: zeptoLogo },
];

// Platform key mapping: platform id → JSON field name
const platformKeyMap: Record<string, string> = {
  blinkit: "blinkit",
  flipkartMinutes: "flipkart_minutes",
  swiggyInstamart: "instamart",
  zepto: "zepto",
};

// Map product names to categories (case-insensitive)
const productCategoryMap: Record<string, string> = {
  "amul toned milk": "dairy-beverages",
  "mother dairy classic curd": "dairy-beverages",
  "amul butter": "dairy-beverages",
  "coca cola zero sugar": "tea-coffee",
  "smoodh": "tea-coffee",
  "onion": "fruits-vegetables",
  "potato": "fruits-vegetables",
  "tomato": "fruits-vegetables",
  "banana": "fruits-vegetables",
  "tata salt": "pantry-staples",
  "fortune sugar": "pantry-staples",
  "basmati rice": "pantry-staples",
  "fresh white eggs": "pantry-staples",
  "nescafe classic instant coffee": "tea-coffee",
  "red label tea": "tea-coffee",
  "real fruit power pomegranate": "tea-coffee",
  "kitkat": "chocolates-snacks",
  "kinder joy": "chocolates-snacks",
  "snickers": "chocolates-snacks",
  "dettol liquid handwash": "household-cleaning",
  "surf excel matic liquid": "household-cleaning",
};

// Product image imports
import imgAmulMilk from "@/product-img/Amul Toned Milk.png";
import imgCurd from "@/product-img/Mother Dairy Classic Curd.png";
import imgButter from "@/product-img/amulbutter.png";
import imgCocaCola from "@/product-img/Coca Cola Zero Sugar.png";
import imgSmoodh from "@/product-img/Smoodh.png";
import imgOnion from "@/product-img/Onion.png";
import imgPotato from "@/product-img/Potato.png";
import imgTomato from "@/product-img/Tomato.png";
import imgBanana from "@/product-img/Banana.png";
import imgSalt from "@/product-img/Tata Salt.png";
import imgSugar from "@/product-img/Fortune Sugar.png";
import imgRice from "@/product-img/Basmati Rice.png";
import imgEggs from "@/product-img/Fresh White Eggs.png";
import imgNescafe from "@/product-img/Nescafe Classic Instant Coffee.png";
import imgRedLabel from "@/product-img/Red Label Tea.png";
import imgPomegranate from "@/product-img/Real Fruit Power Pomegranate.png";
import imgKitKat from "@/product-img/KitKat.png";
import imgKinderJoy from "@/product-img/Kinder Joy.png";
import imgDettol from "@/product-img/Dettol Liquid Handwash.png";
import imgSurfExcel from "@/product-img/Surf Excel Matic Liquid.png";
import imgSnickers from "@/product-img/snickers.png";

// Product image mapping
const productImageMap: Record<string, string> = {
  "amul toned milk": imgAmulMilk,
  "mother dairy classic curd": imgCurd,
  "amul butter": imgButter,
  "coca cola zero sugar": imgCocaCola,
  "smoodh": imgSmoodh,
  "onion": imgOnion,
  "potato": imgPotato,
  "tomato": imgTomato,
  "banana": imgBanana,
  "tata salt": imgSalt,
  "fortune sugar": imgSugar,
  "basmati rice": imgRice,
  "fresh white eggs": imgEggs,
  "nescafe classic instant coffee": imgNescafe,
  "red label tea": imgRedLabel,
  "real fruit power pomegranate": imgPomegranate,
  "kitkat": imgKitKat,
  "kinder joy": imgKinderJoy,
  "dettol liquid handwash": imgDettol,
  "surf excel matic liquid": imgSurfExcel,
  "snickers": imgSnickers,
};

export const searchSuggestions: string[] = productsJson
  .map((p: { product_name: string }) => p.product_name)
  .filter(Boolean);

// Build product groups from the JSON data (new structure with nested platforms)
export const mockProductGroups: ProductGroup[] = productsJson
  .filter((p: { product_name: string }) => p.product_name)
  .map((product: Record<string, unknown>, idx: number) => {
    const name = (product.product_name as string).trim();
    const platformsData = product.platforms as Record<string, { link: string | null; price: number }>;
    const productImage = productImageMap[name.toLowerCase()] || "";

    const results: ProductResult[] = platforms.map((platform, pIdx) => {
      const jsonKey = platformKeyMap[platform.id];
      const platformInfo = platformsData?.[jsonKey];
      const link = platformInfo?.link;
      const price = platformInfo?.price ?? 0;
      const hasLink = typeof link === "string" && link.length > 0;

      return {
        id: `${idx}-${pIdx}`,
        name,
        image: productImage,
        platform: platform.id,
        price,
        rating: 0,
        ratingCount: 0,
        buyLink: hasLink ? link : "",
        inStock: hasLink,
      };
    });

    return {
      query: name,
      image: productImage,
      results,
      category: productCategoryMap[name.toLowerCase()] || "other",
    };
  });

// Build categories with counts
const categoryCounts: Record<string, number> = {};
mockProductGroups.forEach((g) => {
  categoryCounts[g.category] = (categoryCounts[g.category] || 0) + 1;
});

export const categories: Category[] = [
  {
    id: "dairy-beverages",
    name: "Dairy & Beverages",
    icon: "🥛",
    description: "Milk, curd, butter, cold drinks & more",
    productCount: categoryCounts["dairy-beverages"] || 0,
  },
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    icon: "🥬",
    description: "Fresh fruits, vegetables & greens",
    productCount: categoryCounts["fruits-vegetables"] || 0,
  },
  {
    id: "pantry-staples",
    name: "Pantry Staples",
    icon: "🍚",
    description: "Salt, sugar, rice, eggs & essentials",
    productCount: categoryCounts["pantry-staples"] || 0,
  },
  {
    id: "tea-coffee",
    name: "Beverages, Tea & Coffee",
    icon: "☕",
    description: "Cold drinks, coffee, tea & fruit juices",
    productCount: categoryCounts["tea-coffee"] || 0,
  },
  {
    id: "chocolates-snacks",
    name: "Chocolates & Snacks",
    icon: "🍫",
    description: "Chocolates, candies & treats",
    productCount: categoryCounts["chocolates-snacks"] || 0,
  },
  {
    id: "household-cleaning",
    name: "Household & Cleaning",
    icon: "🧹",
    description: "Handwash, detergents & cleaners",
    productCount: categoryCounts["household-cleaning"] || 0,
  },
];
