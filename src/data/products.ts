export interface ProductItem {
  id: string;
  code: string;
  name: string;
  price: string;
  numericPrice: number;
  category: string;
  categories?: string[];
  image: string;
  images?: string[];
  description?: string;
  material?: string;
  dimensions?: string;
}

export const CATEGORIES = [
  "All Collections",
  "Home Decor",
  "Festive Items",
  "New Arrivals",
  "Decor Items",
  "Candle Wear",
  "Gift Boxes",
  "Photo Frames",
];

export const CATEGORY_MAP: Record<string, string> = {
  "Sterling-Dipped Brass": "Home Decor",
  "Antique Brass": "Decor Items",
  "Mother-of-Pearl & Onyx": "Gift Boxes",
  "Sanctum Luminaria": "Festive Items",
  "Sterling & Silverplate": "Home Decor",
  "Antiqued Accents": "Decor Items",
  "Mother-of-Pearl & Inlay": "Gift Boxes",
  "Sanctum & Sacred Decor": "Festive Items",
};

export function getParentCategory(category: string): string {
  return CATEGORY_MAP[category] || category;
}

export function matchesCategory(
  productOrCategory: string | ProductItem,
  selectedCategory: string
): boolean {
  if (!selectedCategory || selectedCategory === "All Collections") return true;
  const target = selectedCategory.trim().toLowerCase();

  if (typeof productOrCategory === "string") {
    if (productOrCategory.trim().toLowerCase() === target) return true;
    const mapped = CATEGORY_MAP[productOrCategory];
    if (mapped && mapped.toLowerCase() === target) return true;
    return false;
  }

  const p = productOrCategory;
  if (p.category && p.category.trim().toLowerCase() === target) return true;
  if (p.categories && p.categories.some((c) => c.trim().toLowerCase() === target)) return true;
  const mapped = CATEGORY_MAP[p.category];
  if (mapped && mapped.toLowerCase() === target) return true;
  return false;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "1",
    code: "JGM-0076",
    name: "Imperial Steed Rajnigandha Urli",
    price: "₹7,000",
    numericPrice: 7000,
    category: "Festive Items",
    categories: ["Festive Items", "Home Decor", "New Arrivals"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRYTUlGuWsEJyS4OCvh1DArBogJinb33y_ZR4sBkobZ6pm4Eb8tE5y262YCJQNYY95F8nHuNAw8x9vtwdVOZvgsxpybwkyHeS9uwwvYfWXUcKdgtNVJ5kTZ92g2q9CA6b8kJW6UW_76IP_ECi_pQNcsD2x1AU76kQLEtI6_yY2AGlJ8YZyXMvzwRkN-xu8M4sLR4JIK4Tf1Z0lOhccP4aCmr8p6FcV9-jf0mfv5W-YKL3I_xSyxxPYgZBQ2lt1-y8QGg",
    description: "Solid hand-cast brass urli with triple silver electro-plating, sculpted with royal equine handles for floral immersion.",
    material: "Virgin Brass & Sterling Plating",
    dimensions: "14 in Diameter • 8.5 in Height",
  },
  {
    id: "2",
    code: "JGM-0078",
    name: "Royal Equine Aster Urli",
    price: "₹7,500",
    numericPrice: 7500,
    category: "Home Decor",
    categories: ["Home Decor", "Festive Items"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3Q2JdvFXcxYozJa1RkvXtRQb7VzArice0JTPokhyyhtT-uXM_EoeKJSRNsora9nGBgF2BiPUwznnD-onSQAvpc3RHHBxQoRhSsjYdMpKmjUenG_gw6WqOmLLpRVB1XCyxpXqoCU8PO4eGvbGrEkwpBCUhlXwSy5kmIq0jzqMymzsbzHgRcSIZoH-ApkafEbuuX4r7_lwmHWHL8ZNM76_pJHvUcXUJ372scy27yxGAe3YoKkwnN7qqiw9_LZ0lHFehSg",
    description: "Deep floral basin featuring high-relief steed repoussé and specular silver polish for grand banquet receptions.",
    material: "Virgin Brass Core • Silver Bath",
    dimensions: "16 in Diameter • 9.0 in Height",
  },
  {
    id: "3",
    code: "JGM-0105",
    name: "Twin Celestial Ram Sculptures",
    price: "₹12,500",
    numericPrice: 12500,
    category: "Decor Items",
    categories: ["Decor Items", "Home Decor", "New Arrivals"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJctgP-2izCHGcZFhaOMVjvnKEkNkMC0bRK7EIbN7KJwGnNzfmOe_s9sW_5zWns3-rweL9Wgu9_ARfAEbkVi37NC3irDnz2GFyB5RgZtYjKIDg_Rqy9ZsEOX3e5u9ODNVKuCzUbGJsEOGsl7YN54OfQNJwqTESPCOvTV0ptIJihmB5J97iwm5okkTEC-LKevNFSe6tNRI8P4oUjFirSxtoiYiuJcgBmoRraDIThhZOienUMp8OmBDi4DU58ROzDxKy6w",
    description: "Cold-chiselled dual ram statuettes coated in oil-rubbed antique bronze lacquer, symbolizing resilience and majesty.",
    material: "Hand-Cast Solid Brass",
    dimensions: "12 in Length • 10 in Height Each",
  },
  {
    id: "4",
    code: "JGM-0053",
    name: "Mayura Filigree Chased Casket",
    price: "₹8,400",
    numericPrice: 8400,
    category: "Gift Boxes",
    categories: ["Gift Boxes", "Home Decor"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjwFsxUDaeppa7-xv1k5jULrSF2OhRD4T2Y8s_2bH1IHFxQ0VyV8j0AsjuqBAzgGQcTooHf7xRqNCsjmgl4ibX6TJVXWrVfSfVxXyXmXP0jjTUQlew16PG2Ymd5higpC_SXYynzGMWNhyBCdHJLKPj5yTlt5UfH5lxiRUjD3Y2rQSh6SI5TdhDNmfFvwe_3QzCgSD_9x6pLojI04dRx6RRD1o-wUMBRQNIWnUN_vni1fzGiYAGQ9QBl39V7IMNjm6yiA",
    description: "Opulent presentation casket inlaid with natural iridescence mother-of-pearl lapidary and filigree brass trim.",
    material: "Mother-of-Pearl & Brass Armature",
    dimensions: "10 in x 6 in x 4.5 in",
  },
  {
    id: "5",
    code: "JGM-0122",
    name: "Sterling Imperial Chariot Steeds",
    price: "₹14,200",
    numericPrice: 14200,
    category: "Decor Items",
    categories: ["Decor Items", "New Arrivals", "Home Decor"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASP5L-bl7-6aQhmFXkaCdpE1q71Wjh16E9Sgkvjk7__NZcSSOSLR6YJfKSurxzz1RvGILPZV4VoMEp2wRuHnfPe2Ph2_gWg29jsWsQ_9HOZ25E_SEbZzJ4rXuRHxGyg4fSd7gKeEbVqK78I_kZPplowEBo94tTXlRLxbyZ8sAl-OZKYpvCuRW3qG4j3Sl-1o8eB58Bfb4xEs-PPGP7VcbvupASWNxm3sGEtsZZA8N81VTPnFxPOpHHjZCFBZ3Lbweq-Q",
    description: "Dual-toned chariot statuette featuring sterling silver immersion body with 24kt gold accent harness highlights.",
    material: "Virgin Brass • Sterling & Gold Bath",
    dimensions: "18 in Length • 11 in Height",
  },
  {
    id: "6",
    code: "JGM-0084",
    name: "Ashtalakshmi Sanctum Kalash",
    price: "₹18,500",
    numericPrice: 18500,
    category: "Festive Items",
    categories: ["Festive Items", "Home Decor"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuytQCglDLRCOEWKN3wrOz2nUqBIenGwIbZUsRakZqT2qWEzNuCsLw2jYdsuVJNDvr3hj1Wt0XcDUMXNAbpCE4CqDKRChStGQfK5ChUcurMlbC_nAy2jLV-CQ7vRUbzxQqR7ZsBQdD8nd-m4o6XU2fXcj6v-gmwxj4nncQ4YbgJ16lkx6K_MUf5hccx_op9EWgInVnBzuPaXHpTKTtxPwAvzmSPz4nRh6UpGuRsFoYF7Ny_Y53Y1cRMzYy9cuKgK__tw",
    description: "Sacred sanctum vessel engraved with eight form Ashtalakshmi iconography and high-luster tarnish micro-lacquer.",
    material: "Virgin Brass Sanctum Core",
    dimensions: "12 in Height • 8 in Base",
  },
  {
    id: "7",
    code: "JGM-0091",
    name: "Grandmaster Cast Brass Chess Suite",
    price: "₹22,000",
    numericPrice: 22000,
    category: "Home Decor",
    categories: ["Home Decor", "Decor Items", "Gift Boxes", "New Arrivals"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdfqm6If8g35fhsvukwePKHJdKvwbvtIyzh7O-pB-oeJSTrBJ6XT6CltSmUoEKwUQBmMsxtatvYYt6E3elbnEPqTEo6QP8GVT6RCVmkDOvcQx7ykuTZy4GI_wwJ4tfS_gaWcZRW4MB6iVf4439U1A6UtnryGpIn3T_dUvg40OUWbStUXHIq7bz33A--aaA-mdC9faP7TO30sjNCJZStcIBjM9GXVziGhLMJypWs7zXNaIAD6y6OWaUuOaRnloB8XPjrg",
    description: "Solid heavy-cast chess pieces with contrasting antiqued bronze and silver immersion finishes in velvet trunk.",
    material: "Heavy Solid Brass & Velvet Trunk",
    dimensions: "18 in x 18 in Board • 4 in King",
  },
  {
    id: "8",
    code: "JGM-0034",
    name: "Niyama Filigree Sanctum Diya",
    price: "₹6,200",
    numericPrice: 6200,
    category: "Candle Wear",
    categories: ["Candle Wear", "Festive Items", "Home Decor"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDY4D1MJ5qd2TW8kKY3g023RgzN3o7jc-1yQIJISyAQItsIRa2XPJcoPp2JBzIVHTuvmPwDODW5EjLfnKkgdkhj_F3NZ1RqnJXBS3ufwC8XfoNdZJI0sEg2g-Zmd5PZiTzS2jAxK3aVCCN5IXiYe3KNcjmmZY1H9Xg3PkIo_deWUbBjaiF1GxnHknWfMO7jD3cLTxJSCwbXo6Tcn-DSdjkkVAMBY4SSurDrdaLG7cJ1nnSiiIfqmWCC",
    description: "Precision-chiselled oil lamp designed for quiet sanctum illumination and ceremonial offerings.",
    material: "Foundry Brass Core",
    dimensions: "9 in Height • 6 in Base",
  },
  {
    id: "9",
    code: "JGM-0112",
    name: "Virasat Baroque Brass Photo Frame",
    price: "₹5,400",
    numericPrice: 5400,
    category: "Photo Frames",
    categories: ["Photo Frames", "Home Decor", "Gift Boxes", "New Arrivals"],
    image:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-cast vintage brass photo frame with ornate baroque filigree border and velvet easel back for family portraits.",
    material: "Hand-Cast Solid Brass & Velvet Easel",
    dimensions: "8 in x 10 in Display • 1.5 in Border",
  },
  {
    id: "10",
    code: "JGM-0045",
    name: "Mayur Chased Brass Candelabra",
    price: "₹6,800",
    numericPrice: 6800,
    category: "Candle Wear",
    categories: ["Candle Wear", "Home Decor", "Festive Items"],
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    description: "Three-tier artisanal brass candelabra with chiselled floral motifs and tapered candle cups for intimate evening ambiance.",
    material: "Virgin Brass Core • Antiqued Patina",
    dimensions: "14 in Height • 10 in Spread",
  },
];
