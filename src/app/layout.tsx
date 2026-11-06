import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF7F2",
};

const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const siteTitle = "Mesh ‘E’ Decor | Haute Artisanal Decor & Luxury Gifting";
const siteDescription =
  "Purveyors of bespoke luxury gifts, handcrafted home accents, statement centerpieces, and artisanal decor objects for distinguished spaces.";

export const metadata: Metadata = {
  metadataBase: new URL(resolvedSiteUrl),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: resolvedSiteUrl,
    siteName: "Mesh ‘E’ Decor",
    images: [
      {
        url: "/logo.jpg",
        width: 512,
        height: 512,
        alt: "Mesh ‘E’ Decor Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.jpg"],
  },
};

const MATERIAL_SYMBOLS_URL =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,300,0,0&icon_names=add,add_circle,add_photo_alternate,arrow_back,arrow_downward,arrow_forward,arrow_outward,arrow_upward,aspect_ratio,check,check_circle,chevron_left,chevron_right,close,cloud_off,cloud_upload,delete,edit,error,handshake,image,inventory_2,local_shipping,lock_open,logout,menu,photo_library,progress_activity,search,send,shopping_bag,star,storefront,support_agent,swipe,upload_file,visibility,visibility_off&display=swap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href={MATERIAL_SYMBOLS_URL}
        />
        <link
          rel="stylesheet"
          href={MATERIAL_SYMBOLS_URL}
          media="all"
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-alabaster text-espresso sans-refined antialiased selection:bg-goldaccent/20 selection:text-espresso font-light"
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

