import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF7F2",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const logoUrl = `${baseUrl}/logo.jpg`;

  const siteTitle = "Mesh ‘E’ Decor | Haute Artisanal Decor & Luxury Gifting";
  const siteDescription =
    "Purveyors of bespoke luxury gifts, handcrafted home accents, statement centerpieces, and artisanal decor objects for distinguished spaces.";

  return {
    metadataBase: new URL(baseUrl),
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
      url: baseUrl,
      siteName: "Mesh ‘E’ Decor",
      images: [
        {
          url: logoUrl,
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
      images: [logoUrl],
    },
  };
}

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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..400,0..1&display=swap"
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

