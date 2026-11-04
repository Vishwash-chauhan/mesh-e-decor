export interface ProductItem {
  id: string;
  code: string;
  price: string;
  numericPrice: number;
  category: string;
  categories?: string[];
  image: string;
  images?: string[];
  description?: string;
}

export const CATEGORIES = [
  "All Collections",
  "Home Decor",
  "Festive Items",
  "New Arrivals",
  "Candle Wear",
  "Gift Boxes",
  "Photo Frames",
];

export const CATEGORY_MAP: Record<string, string> = {
  "Sterling-Dipped Brass": "Home Decor",
  "Antique Brass": "Home Decor",
  "Mother-of-Pearl & Onyx": "Gift Boxes",
  "Sanctum Luminaria": "Festive Items",
  "Sterling & Silverplate": "Home Decor",
  "Antiqued Accents": "Home Decor",
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
    "id": "cmvkyyg6g0000v6cw1thjnevh",
    "code": "JGM-0076",
    "price": "₹7,000",
    "numericPrice": 7000,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCRYTUlGuWsEJyS4OCvh1DArBogJinb33y_ZR4sBkobZ6pm4Eb8tE5y262YCJQNYY95F8nHuNAw8x9vtwdVOZvgsxpybwkyHeS9uwwvYfWXUcKdgtNVJ5kTZ92g2q9CA6b8kJW6UW_76IP_ECi_pQNcsD2x1AU76kQLEtI6_yY2AGlJ8YZyXMvzwRkN-xu8M4sLR4JIK4Tf1Z0lOhccP4aCmr8p6FcV9-jf0mfv5W-YKL3I_xSyxxPYgZBQ2lt1-y8QGg",
    "images": [
      "/uploads/132_JPG_1792852081584_xm7de.jpg"
    ],
    "description": "Solid hand-cast brass urli with triple silver electro-plating, sculpted with royal equine handles for floral immersion."
  },
  {
    "id": "cmvkyyg720001v6cw0xgcw9gx",
    "code": "JGM-0078",
    "price": "₹7,500",
    "numericPrice": 7500,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD3Q2JdvFXcxYozJa1RkvXtRQb7VzArice0JTPokhyyhtT-uXM_EoeKJSRNsora9nGBgF2BiPUwznnD-onSQAvpc3RHHBxQoRhSsjYdMpKmjUenG_gw6WqOmLLpRVB1XCyxpXqoCU8PO4eGvbGrEkwpBCUhlXwSy5kmIq0jzqMymzsbzHgRcSIZoH-ApkafEbuuX4r7_lwmHWHL8ZNM76_pJHvUcXUJ372scy27yxGAe3YoKkwnN7qqiw9_LZ0lHFehSg",
    "images": [],
    "description": "Deep floral basin featuring high-relief steed repoussé and specular silver polish for grand banquet receptions."
  },
  {
    "id": "cmvkyyg790002v6cwgpao4697",
    "code": "JGM-0105",
    "price": "₹12,500",
    "numericPrice": 12500,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCJctgP-2izCHGcZFhaOMVjvnKEkNkMC0bRK7EIbN7KJwGnNzfmOe_s9sW_5zWns3-rweL9Wgu9_ARfAEbkVi37NC3irDnz2GFyB5RgZtYjKIDg_Rqy9ZsEOX3e5u9ODNVKuCzUbGJsEOGsl7YN54OfQNJwqTESPCOvTV0ptIJihmB5J97iwm5okkTEC-LKevNFSe6tNRI8P4oUjFirSxtoiYiuJcgBmoRraDIThhZOienUMp8OmBDi4DU58ROzDxKy6w",
    "images": [],
    "description": "Cold-chiselled dual ram statuettes coated in oil-rubbed antique bronze lacquer, symbolizing resilience and majesty."
  },
  {
    "id": "cmvkyyg7h0003v6cwmq21ggl7",
    "code": "JGM-0053",
    "price": "₹8,400",
    "numericPrice": 8400,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBjwFsxUDaeppa7-xv1k5jULrSF2OhRD4T2Y8s_2bH1IHFxQ0VyV8j0AsjuqBAzgGQcTooHf7xRqNCsjmgl4ibX6TJVXWrVfSfVxXyXmXP0jjTUQlew16PG2Ymd5higpC_SXYynzGMWNhyBCdHJLKPj5yTlt5UfH5lxiRUjD3Y2rQSh6SI5TdhDNmfFvwe_3QzCgSD_9x6pLojI04dRx6RRD1o-wUMBRQNIWnUN_vni1fzGiYAGQ9QBl39V7IMNjm6yiA",
    "images": [],
    "description": "Opulent presentation casket inlaid with natural iridescence mother-of-pearl lapidary and filigree brass trim."
  },
  {
    "id": "cmvkyyg7s0005v6cwstkry7b2",
    "code": "JGM-0084",
    "price": "₹18,500",
    "numericPrice": 18500,
    "category": "Festive Items",
    "categories": [
      "Festive Items",
      "Home Decor"
    ],
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCuytQCglDLRCOEWKN3wrOz2nUqBIenGwIbZUsRakZqT2qWEzNuCsLw2jYdsuVJNDvr3hj1Wt0XcDUMXNAbpCE4CqDKRChStGQfK5ChUcurMlbC_nAy2jLV-CQ7vRUbzxQqR7ZsBQdD8nd-m4o6XU2fXcj6v-gmwxj4nncQ4YbgJ16lkx6K_MUf5hccx_op9EWgInVnBzuPaXHpTKTtxPwAvzmSPz4nRh6UpGuRsFoYF7Ny_Y53Y1cRMzYy9cuKgK__tw",
    "images": [],
    "description": "Sacred sanctum vessel engraved with eight form Ashtalakshmi iconography and high-luster tarnish micro-lacquer."
  },
  {
    "id": "cmvkyyg7w0006v6cwp5p4rqd0",
    "code": "JGM-0091",
    "price": "₹4,600",
    "numericPrice": 4600,
    "category": "Gift Boxes",
    "categories": [
      "Home Decor",
      "Gift Boxes",
      "Festive Items"
    ],
    "image": "/catalog/JGM-0091.png",
    "images": [
      "/catalog/JGM-0091.png"
    ],
    "description": "Bold columnar candle pillar stand combining brutalist geometry with the warm sheen of brushed brass."
  },
  {
    "id": "cmvkyyg830007v6cwaggixlco",
    "code": "JGM-0034",
    "price": "₹3,900",
    "numericPrice": 3900,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0034.png",
    "images": [
      "/catalog/JGM-0034.png"
    ],
    "description": "Refined dual-height candleholders with weighted circular bases, elevating dinner tables with understated grace."
  },
  {
    "id": "cmvqmyj030000v6jsljadd1ib",
    "code": "JG-LFSET-0009-I",
    "price": "₹2,999",
    "numericPrice": 2999,
    "category": "New Arrivals",
    "categories": [
      "Home Decor",
      "New Arrivals"
    ],
    "image": "/catalog/JG-LFSET-0009-I.png",
    "images": [
      "/catalog/JG-LFSET-0009-I.png"
    ],
    "description": "Artisanal metal lantern designed with intricate geometric cutouts and a warm metallic finish, casting evocative luminous patterns across living spaces."
  },
  {
    "id": "cmvqmyj0e0001v6js20qtzkrg",
    "code": "JG-LFSET-0009-H",
    "price": "₹5,299",
    "numericPrice": 5299,
    "category": "New Arrivals",
    "categories": [
      "Home Decor",
      "New Arrivals"
    ],
    "image": "/catalog/JG-LFSET-0009-H.png",
    "images": [
      "/catalog/JG-LFSET-0009-H.png"
    ],
    "description": "Gracefully styled ambient lantern featuring delicate openwork mesh motifs, engineered for atmospheric candlelight dinners and celebratory evenings."
  },
  {
    "id": "cmvqmyj0n0002v6js3sy1w6mz",
    "code": "JG-LFSET-0009-G",
    "price": "₹4,999",
    "numericPrice": 4999,
    "category": "New Arrivals",
    "categories": [
      "Home Decor",
      "New Arrivals"
    ],
    "image": "/catalog/JG-LFSET-0009-G.png",
    "images": [
      "/catalog/JG-LFSET-0009-G.png"
    ],
    "description": "Statement cylindrical metal lantern featuring delicate perforated motifs that radiate enchanting light across interior corridors and verandas."
  },
  {
    "id": "cmvqmyj0v0003v6jszimabkm0",
    "code": "JG-GIFTBOX-0369-WHITE",
    "price": "₹3,200",
    "numericPrice": 3200,
    "category": "Photo Frames",
    "categories": [
      "Photo Frames",
      "Home Decor"
    ],
    "image": "/catalog/JG-GIFTBOX-0369 White.png",
    "images": [
      "/catalog/JG-GIFTBOX-0369 White.png"
    ],
    "description": "Exquisite white gift box detailed with intricate filigree borders and gold metallic accents, crafted for celebratory hampers and wedding gifting."
  },
  {
    "id": "cmvqmyj150004v6jsflrie4sj",
    "code": "JG-GIFTBOX-0369-GOLD",
    "price": "₹3,200",
    "numericPrice": 3200,
    "category": "Photo Frames",
    "categories": [
      "Photo Frames",
      "Home Decor"
    ],
    "image": "/catalog/JG-GIFTBOX-0369 Gold.png",
    "images": [
      "/catalog/JG-GIFTBOX-0369 Gold.png"
    ],
    "description": "Opulent celebration gift box adorned with radiant gold sheen and ceremonial ornamentation, reflecting pure festive grandeur."
  },
  {
    "id": "cmvqmyj1c0005v6jsij4zzhbt",
    "code": "JG-GIFTBOX-0375",
    "price": "₹2,599",
    "numericPrice": 2599,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JG-GIFTBOX-0375 Orange.png",
    "images": [
      "/catalog/JG-GIFTBOX-0375 Orange.png"
    ],
    "description": "Vibrant festive presentation box adorned in auspicious saffron orange, ideal for gourmet sweets, dry fruits, and festive gifting."
  },
  {
    "id": "cmvqmyj1m0006v6js6jkfnpt5",
    "code": "JG-GIFTBOX-0371-ORANGE",
    "price": "₹5,100",
    "numericPrice": 5100,
    "category": "Festive Items",
    "categories": [
      "Festive Items"
    ],
    "image": "/catalog/JG-GIFTBOX-0371 Orange.png",
    "images": [
      "/catalog/JG-GIFTBOX-0371 Orange.png"
    ],
    "description": "Spacious luxury trunk gift box in rich celebratory orange with bespoke vintage latch hardware and compartmentalized interior."
  },
  {
    "id": "cmvqmyj1v0007v6js5ff99wmx",
    "code": "JG-GIFTBOX-0371-WHITE",
    "price": "₹5,100",
    "numericPrice": 5100,
    "category": "Festive Items",
    "categories": [
      "Festive Items"
    ],
    "image": "/catalog/JG-GIFTBOX-0371 White.png",
    "images": [
      "/catalog/JG-GIFTBOX-0371 White.png"
    ],
    "description": "Stately ivory keepsake gift trunk tailored for grand festive hampers, bespoke luxury sets, and corporate gifting."
  },
  {
    "id": "cmvqmyj200008v6jsjtmmqli1",
    "code": "JG-GIFTBOX-0276",
    "price": "₹999",
    "numericPrice": 999,
    "category": "New Arrivals",
    "categories": [
      "Home Decor",
      "New Arrivals"
    ],
    "image": "/catalog/JG-GIFTBOX-0276.png",
    "images": [
      "/catalog/JG-GIFTBOX-0276.png"
    ],
    "description": "Charming compact gift box handcrafted with artisanal detailing, perfect for wedding favors, silver coins, and delicate keepsakes."
  },
  {
    "id": "cmvqmyj250009v6jsxuk2g3ho",
    "code": "JG-GIFTBOX-0384-WHITE",
    "price": "₹2,499",
    "numericPrice": 2499,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JG-GIFTBOX-0384 White.png",
    "images": [
      "/catalog/JG-GIFTBOX-0384 White.png"
    ],
    "description": "Classic ivory confectionery gift box featuring clean geometric lines, embossed gold details, and festive presentation."
  },
  {
    "id": "cmvqmyj2a000av6js6cibot49",
    "code": "JG-GIFTBOX-0384-PINK",
    "price": "₹2,499",
    "numericPrice": 2499,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JG-GIFTBOX-0384 Pink.png",
    "images": [
      "/catalog/JG-GIFTBOX-0384 Pink.png"
    ],
    "description": "Soft pastel pink gift box with romantic floral borders, designed for bridal showers, weddings, and auspicious ceremonies."
  },
  {
    "id": "cmvqmyj2e000bv6jsve3p82tr",
    "code": "JG-GIFTBOX-0384-ORANGE",
    "price": "₹2,499",
    "numericPrice": 2499,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JG-GIFTBOX-0384 Orange.png",
    "images": [
      "/catalog/JG-GIFTBOX-0384 Orange.png"
    ],
    "description": "Sunburst orange gift box radiating festive cheer, ideal for dry fruits, ceremonial mithai, and festival tokens."
  },
  {
    "id": "cmvqmyj2j000cv6jsx8ajiy9s",
    "code": "JG-1011",
    "price": "₹2,450",
    "numericPrice": 2450,
    "category": "Candle Wear",
    "categories": [
      "Home Decor",
      "Candle Wear",
      "Festive Items"
    ],
    "image": "/catalog/JG-1011.png",
    "images": [
      "/catalog/JG-1011.png"
    ],
    "description": "Graceful traditional floating flower bowl designed for rose petals and tea lights at entryways and prayer alcoves."
  },
  {
    "id": "cmvqmyj2p000dv6jsr9q6lglg",
    "code": "JG-GIFTBOX-0383-PINK",
    "price": "₹5,399",
    "numericPrice": 5399,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JG-GIFTBOX-0383 Pink.png",
    "images": [
      "/catalog/JG-GIFTBOX-0383 Pink.png"
    ],
    "description": "Sumptuous multi-tier pink velvet keepsake box with handcrafted brass ornamentation and royal interior finishing."
  },
  {
    "id": "cmvqmyj2v000ev6js53bspmkb",
    "code": "JG-GIFTBOX-0383-WHITE",
    "price": "₹5,399",
    "numericPrice": 5399,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JG-GIFTBOX-0383 White.png",
    "images": [
      "/catalog/JG-GIFTBOX-0383 White.png"
    ],
    "description": "Regal pearl-white keepsake trunk with antique gold hardware, plush interior lining, and luxury presentation charm."
  },
  {
    "id": "cmvqmyj32000fv6jsizww473i",
    "code": "JG-1012",
    "price": "₹1,600",
    "numericPrice": 1600,
    "category": "Candle Wear",
    "categories": [
      "Candle Wear",
      "Home Decor"
    ],
    "image": "/catalog/JG-1012.png",
    "images": [
      "/catalog/JG-1012.png"
    ],
    "description": "Sleek metallic candle stand crafted with a balanced silhouette for intimate table settings, consoles, and mantle displays."
  },
  {
    "id": "cmvqmyj38000gv6js6c31qgsr",
    "code": "JG-1013",
    "price": "₹12,000",
    "numericPrice": 12000,
    "category": "Candle Wear",
    "categories": [
      "Candle Wear",
      "Home Decor"
    ],
    "image": "/catalog/JG-1013.png",
    "images": [
      "/catalog/JG-1013.png"
    ],
    "description": "Monumental 10-inch designer hurricane pillar featuring thick clarity glass and majestic solid brass casting."
  },
  {
    "id": "cmvqmyj3f000hv6jsxx9ai2kk",
    "code": "JG-1014",
    "price": "₹12,000",
    "numericPrice": 12000,
    "category": "Candle Wear",
    "categories": [
      "Candle Wear",
      "Home Decor"
    ],
    "image": "/catalog/JG-1014.png",
    "images": [
      "/catalog/JG-1014.png"
    ],
    "description": "Sculptural ceremonial candle centerpiece crafted with architectural precision for grand dining environments and halls."
  },
  {
    "id": "cmvqmyj3k000iv6jsac58npqd",
    "code": "JG-1015",
    "price": "₹5,600",
    "numericPrice": 5600,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "Festive Items"
    ],
    "image": "/catalog/JG-1015.png",
    "images": [
      "/catalog/JG-1015.png"
    ],
    "description": "Hand-hammered fluted bowl with scalloped perimeter, ideal for floating blossoms and floating tea-lights."
  },
  {
    "id": "cmvqmyj3r000jv6jsxl1o6eke",
    "code": "JGM-0046-SILVER-PLATED",
    "price": "₹9,100",
    "numericPrice": 9100,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0046 Silver Plated.png",
    "images": [
      "/catalog/JGM-0046 Silver Plated.png"
    ],
    "description": "Grand ceremonial centerpiece urli coated in electro-plated sterling silver with regal handles and mirror polish."
  },
  {
    "id": "cmvqmyj3w000kv6jsqg7o8z5x",
    "code": "JGM-0046-COPPER-PLATED",
    "price": "₹9,100",
    "numericPrice": 9100,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0046 Copper Plated.png",
    "images": [
      "/catalog/JGM-0046 Copper Plated.png"
    ],
    "description": "Warm-toned statement pedestal bowl finished in high-polish rose copper plating for grand welcoming spaces."
  },
  {
    "id": "cmvqmyj41000lv6jsedxlrnqv",
    "code": "JGM-0834",
    "price": "₹3,200",
    "numericPrice": 3200,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0834 Brass Plated.png",
    "images": [
      "/catalog/JGM-0834 Brass Plated.png"
    ],
    "description": "Versatile decorative vanity and serving platter featuring sculpted rim detailing and durable brass plating."
  },
  {
    "id": "cmvqmyj46000mv6js16pr7x8w",
    "code": "JG-1018",
    "price": "₹3,600",
    "numericPrice": 3600,
    "category": "Photo Frames",
    "categories": [
      "Home Decor",
      "Photo Frames",
      "Festive Items"
    ],
    "image": "/catalog/JG-1018.png",
    "images": [
      "/catalog/JG-1018.png"
    ],
    "description": "Deluxe serving set designed with polished brass accents, blending functional hospitality with timeless luxury."
  },
  {
    "id": "cmvqmyj4a000nv6js8q77ipgz",
    "code": "JG-GIFTBOX-0834",
    "price": "₹3,299",
    "numericPrice": 3299,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "New Arrivals"
    ],
    "image": "/catalog/JG-GIFTBOX-0834.png",
    "images": [
      "/catalog/JG-GIFTBOX-0834.png"
    ],
    "description": "Hand-finished decorative gift casket with embossed metallic foil and velvet-lined compartments."
  },
  {
    "id": "cmvqmyj4e000ov6jse1yon3ou",
    "code": "JG-002",
    "price": "₹4,000",
    "numericPrice": 4000,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JG-002.png",
    "images": [
      "/catalog/JG-002.png"
    ],
    "description": "Modernist decorative accent piece designed with clean lines and warm brushed gold surface reflections."
  },
  {
    "id": "cmvqmyj4k000pv6jsgaar2dw9",
    "code": "JGM-0032",
    "price": "₹8,000",
    "numericPrice": 8000,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0032.png",
    "images": [
      "/catalog/JGM-0032.png"
    ],
    "description": "Paired ornamental art sculptures featuring flowing organic forms, curated as a distinguished tabletop focal point."
  },
  {
    "id": "cmvqmyj4o000qv6jspfxg4q1t",
    "code": "JGM-0064",
    "price": "₹2,550",
    "numericPrice": 2550,
    "category": "Candle Wear",
    "categories": [
      "Home Decor",
      "Candle Wear"
    ],
    "image": "/catalog/JGM-0064.png",
    "images": [
      "/catalog/JGM-0064.png"
    ],
    "description": "Compact sculpted decor piece finished in antiqued bronze, adding character to bookshelves and credenzas."
  },
  {
    "id": "cmvqmyj4s000rv6jsp2q0gxc5",
    "code": "JGM-007-PEACH",
    "price": "₹2,600",
    "numericPrice": 2600,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-007 Peach.png",
    "images": [
      "/catalog/JGM-007 Peach.png"
    ],
    "description": "Enamelled blossom bowl in soothing peach pastel with gleaming gold trim for delicate floral accents."
  },
  {
    "id": "cmvqmyj55000sv6jskfujr5t2",
    "code": "JGM-0097",
    "price": "₹4,300",
    "numericPrice": 4300,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0097.png",
    "images": [
      "/catalog/JGM-0097.png"
    ],
    "description": "Striking geometric flower vessel sculpted with faceted angles that catch the light from every perspective."
  },
  {
    "id": "cmvqmyj5a000tv6jsz5f7y81x",
    "code": "JGM-0072",
    "price": "₹3,900",
    "numericPrice": 3900,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0072.png",
    "images": [
      "/catalog/JGM-0072.png"
    ],
    "description": "Richly ornamented photo frame with intricate openwork scrolls, preserving cherished memories in heirloom style."
  },
  {
    "id": "cmvqmyj5e000uv6jsb7ry8wx2",
    "code": "JGM-0082-PINK",
    "price": "₹2,350",
    "numericPrice": 2350,
    "category": "Photo Frames",
    "categories": [
      "Photo Frames",
      "Home Decor"
    ],
    "image": "/catalog/JGM-0082 Pink.png",
    "images": [
      "/catalog/JGM-0082 Pink.png"
    ],
    "description": "Dainty enamel tabletop picture frame in powdered rose blush accented with beaded brass border."
  },
  {
    "id": "cmvqmyj5i000vv6js9wftcvt3",
    "code": "JGM-0081-WHITE",
    "price": "₹2,350",
    "numericPrice": 2350,
    "category": "Festive Items",
    "categories": [
      "Festive Items",
      "Home Decor"
    ],
    "image": "/catalog/JGM-0081 White.png",
    "images": [
      "/catalog/JGM-0081 White.png"
    ],
    "description": "Ivory enamel photo frame framed in classic gold wire beading, suited for bridal portraits and bedside displays."
  },
  {
    "id": "cmvqmyj5n000wv6jsv2b06rvh",
    "code": "JGM-0028",
    "price": "₹2,550",
    "numericPrice": 2550,
    "category": "Festive Items",
    "categories": [
      "Home Decor",
      "Festive Items"
    ],
    "image": "/catalog/JGM-0028.png",
    "images": [
      "/catalog/JGM-0028.png"
    ],
    "description": "Distinctive portrait frame detailed with subtle equestrian relief engravings and a warm aged brass luster."
  },
  {
    "id": "cmvqmyj5s000xv6jsmuk2vjtk",
    "code": "JGM-0029",
    "price": "₹6,800",
    "numericPrice": 6800,
    "category": "Photo Frames",
    "categories": [
      "Photo Frames",
      "Home Decor"
    ],
    "image": "/catalog/JGM-0029.png",
    "images": [
      "/catalog/JGM-0029.png"
    ],
    "description": "Heavyweight double-moulded photo frame featuring high-relief heraldic accents and polished gold finish."
  },
  {
    "id": "cmvqmyj5w000yv6js8mkqsc4z",
    "code": "JGM-0036",
    "price": "₹6,800",
    "numericPrice": 6800,
    "category": "Photo Frames",
    "categories": [
      "Photo Frames",
      "Home Decor"
    ],
    "image": "/catalog/JGM-0036.png",
    "images": [
      "/catalog/JGM-0036.png"
    ],
    "description": "Dramatic sunburst ray picture frame inspired by Deco opulence, making any portrait an art exhibition piece."
  },
  {
    "id": "cmvqmyj61000zv6jsraty46aq",
    "code": "JGM-0077",
    "price": "₹9,100",
    "numericPrice": 9100,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0077.png",
    "images": [
      "/catalog/JGM-0077.png"
    ],
    "description": "Statement gallery-grade photo frame adorned with intricately engraved foliage motifs and triple-dipped gilding."
  },
  {
    "id": "cmvqmyj660010v6js5d5z6f6k",
    "code": "JGM-0010-SILVER",
    "price": "₹7,100",
    "numericPrice": 7100,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "Festive Items"
    ],
    "image": "/catalog/JGM-0010 Silver Finish.png",
    "images": [
      "/catalog/JGM-0010 Silver Finish.png"
    ],
    "description": "Gleaming silver-finished centerpiece bowl reflecting ambient light with crystalline clarity."
  },
  {
    "id": "cmvqmyj690011v6jsmqvao0i4",
    "code": "JGM-0011-BRASS",
    "price": "₹6,100",
    "numericPrice": 6100,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "Festive Items"
    ],
    "image": "/catalog/JGM-0011 Brass Finish.png",
    "images": [
      "/catalog/JGM-0011 Brass Finish.png"
    ],
    "description": "Warm spun brass decor basin with hand-burnished rim, welcoming good fortune and serenity."
  },
  {
    "id": "cmvqmyj6i0012v6js536gl0c3",
    "code": "JGM-0093",
    "price": "₹999",
    "numericPrice": 999,
    "category": "Candle Wear",
    "categories": [
      "Candle Wear",
      "Home Decor"
    ],
    "image": "/catalog/JGM-0093.png",
    "images": [
      "/catalog/JGM-0093.png"
    ],
    "description": "Minimalist tea-light cup crafted for versatile cluster arrangements or delicate accent placement."
  },
  {
    "id": "cmvqmyj6m0013v6jszsw5czyi",
    "code": "JGM-0075",
    "price": "₹6,300",
    "numericPrice": 6300,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "Festive Items"
    ],
    "image": "/catalog/JGM-0075.png",
    "images": [
      "/catalog/JGM-0075.png"
    ],
    "description": "Sculpted blooming lotus bowl with layered petal fluting, ideal for floating candles and jasmine blossoms."
  },
  {
    "id": "cmvqmyj6q0014v6jsrlxagwve",
    "code": "JGM-0094",
    "price": "₹6,300",
    "numericPrice": 6300,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "Festive Items"
    ],
    "image": "/catalog/JGM-0094.png",
    "images": [
      "/catalog/JGM-0094.png"
    ],
    "description": "Contemporary wide-rim vessel engineered for dramatic floral floating arrangements in reception foyers."
  },
  {
    "id": "cmvqmyj6u0015v6js2s7k19di",
    "code": "JGM-0010-SET",
    "price": "₹7,000",
    "numericPrice": 7000,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0010 Set Of Two.png",
    "images": [
      "/catalog/JGM-0010 Set Of Two.png"
    ],
    "description": "Graduated pair of hand-turned metal bowls designed for balanced symmetrical entry styling."
  },
  {
    "id": "cmvqmyj6y0016v6jsk3ynd9nd",
    "code": "JGM-0037",
    "price": "₹1,790",
    "numericPrice": 1790,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0037.png",
    "images": [
      "/catalog/JGM-0037.png"
    ],
    "description": "Textured organic leaf-form dish perfect for rings, keys, or dry aromatics on dressing consoles."
  },
  {
    "id": "cmvqmyj730017v6js8sycih49",
    "code": "JGM-GIFTCANDLE-328",
    "price": "₹1,899",
    "numericPrice": 1899,
    "category": "Candle Wear",
    "categories": [
      "Candle Wear",
      "Home Decor"
    ],
    "image": "/catalog/JGM-GIFTCANDLE-328.png",
    "images": [
      "/catalog/JGM-GIFTCANDLE-328.png"
    ],
    "description": "Fragrant soy-wax candle poured into an ornamental embossed vessel with a custom metal snuffer lid."
  },
  {
    "id": "cmvqmyj770018v6jsvw5whsd7",
    "code": "JGM-GIFTCANDLE-333",
    "price": "₹1,499",
    "numericPrice": 1499,
    "category": "Candle Wear",
    "categories": [
      "Candle Wear",
      "Home Decor"
    ],
    "image": "/catalog/JGM-GIFTCANDLE-333.png",
    "images": [
      "/catalog/JGM-GIFTCANDLE-333.png"
    ],
    "description": "Aromatherapeutic artisanal candle infused with woody oriental notes, presented in a reusable keepsake container."
  },
  {
    "id": "cmvqmyj7c0019v6jsof2m8nhy",
    "code": "JGM-GIFTCANDLE-332",
    "price": "₹1,899",
    "numericPrice": 1899,
    "category": "Candle Wear",
    "categories": [
      "Candle Wear",
      "Home Decor"
    ],
    "image": "/catalog/JGM-GIFTCANDLE-332.png",
    "images": [
      "/catalog/JGM-GIFTCANDLE-332.png"
    ],
    "description": "Hand-poured luxury botanical wax candle with long burn time, casting soothing fragrance and gentle warmth."
  },
  {
    "id": "cmvqmyj7g001av6jstzju2pxn",
    "code": "JG-1016",
    "price": "₹16,000",
    "numericPrice": 16000,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "New Arrivals"
    ],
    "image": "/catalog/JG-1016.png",
    "images": [
      "/catalog/JG-1016.png"
    ],
    "description": "Magnificent heavy brass urli bowl crowned with intricately sculpted royal horse head handles."
  },
  {
    "id": "cmvqmyj7l001bv6js4mf7woxh",
    "code": "JG-1017",
    "price": "₹8,100",
    "numericPrice": 8100,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "Festive Items"
    ],
    "image": "/catalog/JG-1017.png",
    "images": [
      "/catalog/JG-1017.png"
    ],
    "description": "12-inch hand-sculpted brass urli with regal equine ornamentation, ideal for opulent floral immersions."
  },
  {
    "id": "cmvqmyj7p001cv6jsnga3trzv",
    "code": "JGM-002",
    "price": "₹7,500",
    "numericPrice": 7500,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-002.png",
    "images": [
      "/catalog/JGM-002.png"
    ],
    "description": "Timeless handcrafted floating basin with flared rim and ceremonial engraving, a cornerstone of traditional decor."
  },
  {
    "id": "cmvqmyj7t001dv6jsdcq3zs2a",
    "code": "JGM-0026-A",
    "price": "₹2,050",
    "numericPrice": 2050,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0026-1.png",
    "images": [
      "/catalog/JGM-0026-1.png"
    ],
    "description": "Hand-hammered decorative goblet with artisanal dimple textures and lustrous golden finish."
  },
  {
    "id": "cmvqmyj80001ev6js7wxg2q6f",
    "code": "JGM-0027",
    "price": "₹2,350",
    "numericPrice": 2350,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0027.png",
    "images": [
      "/catalog/JGM-0027.png"
    ],
    "description": "Gracefully proportioned fluted decorative chalice, ideal for dry floral accents or dining display."
  },
  {
    "id": "cmvqmyj84001fv6jsrxsbzlko",
    "code": "JGM-0026-B",
    "price": "₹2,050",
    "numericPrice": 2050,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "New Arrivals",
      "Candle Wear"
    ],
    "image": "/catalog/JGM-0026-2.png",
    "images": [
      "/catalog/JGM-0026-2.png"
    ],
    "description": "Handcrafted brass pedestal accent offering timeless elegance to tablescapes and console styling."
  },
  {
    "id": "cmvqmyj9d001pv6jso98q4dgg",
    "code": "JGM-0030",
    "price": "₹7,100",
    "numericPrice": 7100,
    "category": "Home Decor",
    "categories": [
      "Home Decor",
      "Festive Items"
    ],
    "image": "/catalog/JGM-0030.png",
    "images": [
      "/catalog/JGM-0030.png"
    ],
    "description": "Grand ceremonial centerpiece urli featuring handcrafted equine side handles and polished antique brass finish."
  },
  {
    "id": "cmvqmyj9h001qv6jscwgmjp8g",
    "code": "JGM-0076-I",
    "price": "₹6,300",
    "numericPrice": 6300,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0076 10 Inch Brass Finish - I.png",
    "images": [
      "/catalog/JGM-0076 10 Inch Brass Finish - I.png"
    ],
    "description": "10-inch solid hand-cast brass urli with sculpted royal equine handles, designed for floating floral displays."
  },
  {
    "id": "cmvqmyj9m001rv6jsb4r5hss6",
    "code": "JGM-0076-II",
    "price": "₹7,000",
    "numericPrice": 7000,
    "category": "Home Decor",
    "categories": [
      "Home Decor"
    ],
    "image": "/catalog/JGM-0076 10 Inch Brass Finish - II.png",
    "images": [
      "/catalog/JGM-0076 10 Inch Brass Finish - II.png"
    ],
    "description": "High-depth 10-inch brass urli with ornate equine repoussé craftsmanship and mirror-polished surface."
  }
];
