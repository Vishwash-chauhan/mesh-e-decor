"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductData {
  id: string;
  code: string;
  price: string;
  numericPrice: number;
  category: string;
  categories: string[];
  image: string;
  images?: string[];
  description?: string;
}

const AVAILABLE_CATEGORIES = [
  "Home Decor",
  "Festive Items",
  "New Arrivals",
  "Candle Wear",
  "Gift Boxes",
  "Photo Frames",
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("All");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);

  // Form Fields
  const [code, setCode] = useState("");
  const [numericPrice, setNumericPrice] = useState<number>(5000);
  const [price, setPrice] = useState("₹5,000");
  const [category, setCategory] = useState(AVAILABLE_CATEGORIES[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    AVAILABLE_CATEGORIES[0],
  ]);
  const [image, setImage] = useState(""); // Cover Image
  const [images, setImages] = useState<string[]>([]); // Rest of the images (Gallery)
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Upload States
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Hidden File Input Refs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Check auth and load products
  useEffect(() => {
    async function checkAuthAndLoad() {
      try {
        const authRes = await fetch("/api/admin/auth");
        if (!authRes.ok) {
          router.push("/admin/login");
          return;
        }

        await fetchProducts();
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndLoad();
  }, [router]);

  async function fetchProducts() {
    try {
      const res = await fetch(`/api/products?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setCode("");
    setNumericPrice(5000);
    setPrice("₹5,000");
    setCategory(AVAILABLE_CATEGORIES[0]);
    setSelectedCategories([AVAILABLE_CATEGORIES[0]]);
    setImage("");
    setImages([]);
    setDescription("");
    setFormError(null);
    setUploadError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: ProductData) => {
    setEditingProduct(p);
    setCode(p.code);
    setNumericPrice(p.numericPrice);
    setPrice(p.price);
    setCategory(p.category);
    setSelectedCategories(
      p.categories && p.categories.length > 0 ? p.categories : [p.category]
    );
    setImage(p.image);
    setImages(p.images && Array.isArray(p.images) ? p.images : []);
    setDescription(p.description || "");
    setFormError(null);
    setUploadError(null);
    setIsModalOpen(true);
  };

  const handleToggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length === 1) return; // Keep at least one
      const updated = selectedCategories.filter((c) => c !== cat);
      setSelectedCategories(updated);
      if (category === cat && updated.length > 0) {
        setCategory(updated[0]);
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };


  const handleNumericPriceChange = (num: number) => {
    setNumericPrice(num);
    setPrice(`₹${num.toLocaleString("en-IN")}`);
  };

  // Upload Cover Image Handler
  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
      } else {
        setUploadError(data.error || "Failed to upload cover image.");
      }
    } catch {
      setUploadError("Network error while uploading cover image.");
    } finally {
      setUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  // Upload Additional Gallery Images Handler
  const handleUploadGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && Array.isArray(data.urls)) {
        setImages((prev) => [...prev, ...data.urls]);
      } else {
        setUploadError(data.error || "Failed to upload additional gallery images.");
      }
    } catch {
      setUploadError("Network error while uploading gallery images.");
    } finally {
      setUploadingGallery(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!image.trim()) {
      setFormError("Please upload or provide a Cover Image for this specimen.");
      return;
    }

    setSubmitting(true);

    const formattedCode = code.trim().toUpperCase();
    const primaryCategory =
      selectedCategories.includes(category)
        ? category
        : (selectedCategories[0] || category);

    const payload = {
      code: formattedCode,
      price: price.trim(),
      numericPrice: Number(numericPrice),
      category: primaryCategory,
      categories: selectedCategories,
      image: image.trim(),
      images,
      description: description.trim(),
    };

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || "Failed to update specimen");
          setSubmitting(false);
          return;
        }
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || "Failed to create specimen");
          setSubmitting(false);
          return;
        }
      }

      await fetchProducts();
      setIsModalOpen(false);
    } catch {
      setFormError("Server request failed. Please check connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
      } else {
        alert("Failed to delete product. Please retry.");
      }
    } catch {
      alert("Error contacting database.");
    }
  };

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      selectedFilterCategory === "All" ||
      p.category.toLowerCase() === selectedFilterCategory.toLowerCase() ||
      (p.categories &&
        p.categories.some(
          (c) => c.toLowerCase() === selectedFilterCategory.toLowerCase()
        ));

    return matchesSearch && matchesCat;
  });

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + (p.numericPrice || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-alabaster flex items-center justify-center text-espresso">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[32px] animate-spin text-golddeep">
            progress_activity
          </span>
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-mute">
            Loading Atelier Archive...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alabaster text-espresso font-light flex flex-col">
      {/* Top Navigation Strip */}
      <header className="w-full bg-canvas border-b border-borderdelicate/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <Image
                alt="Mesh 'E' Decor"
                className="h-7 sm:h-8 w-auto object-contain shrink-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqcGZ0BeH_fqgXUIEgQatWQTbaOWDHb5pQAYuFeAhW6-gZlEzfRkO1G8yjEw3HYRnAfS90zEz6gW4kGljiX8xHJFjPOeaV5atYaQEdHrQCbDmoS1COfeyrNcALBpTiK1Ufv0DTY1dNd2X1CxxcJheAgmzGoW3LEA79f22kOUt7KUckcK1QzwuhHlvbXrUr7TPMLQFYbDEbY1b55MwJ-doRzDxPeXmhXZy9VrVUPFADPQ9xNCdhWD6"
                width={32}
                height={32}
                unoptimized
              />
              <div className="border-l border-borderdelicate pl-2.5 sm:pl-3 truncate">
                <span className="serif-display text-sm sm:text-lg tracking-[0.12em] sm:tracking-[0.14em] uppercase text-espresso block leading-tight truncate">
                  Mesh ‘E’ Decor
                </span>
                <span className="text-[8.5px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-golddeep font-medium block">
                  Curator Dashboard
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            <Link
              href="/catalogue"
              target="_blank"
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-mute hover:text-espresso px-2.5 sm:px-3 py-1.5 sm:py-2 border border-borderdelicate hover:border-espresso transition-all flex items-center gap-1 min-h-[38px] sm:min-h-[40px]"
              title="View Live Boutique"
            >
              <span className="material-symbols-outlined text-[15px]">storefront</span>
              <span className="hidden xs:inline">Boutique</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-espresso hover:bg-espresso hover:text-alabaster px-2.5 sm:px-3.5 py-1.5 sm:py-2 border border-espresso transition-all flex items-center gap-1 cursor-pointer min-h-[38px] sm:min-h-[40px]"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[15px]">logout</span>
              <span className="hidden xs:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-12 py-6 sm:py-12 flex-grow">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div className="bg-canvas border border-borderdelicate/80 p-3.5 sm:p-5 shadow-2xs">
            <span className="block text-mute uppercase tracking-[0.18em] text-[8.5px] sm:text-[9px] mb-1 font-medium truncate">
              Total Specimens
            </span>
            <span className="serif-display text-2xl sm:text-4xl text-espresso font-normal">
              {products.length}
            </span>
            <span className="block text-[10px] sm:text-[11px] text-mute mt-0.5 sm:mt-1">In Database</span>
          </div>

          <div className="bg-canvas border border-borderdelicate/80 p-3.5 sm:p-5 shadow-2xs">
            <span className="block text-mute uppercase tracking-[0.18em] text-[8.5px] sm:text-[9px] mb-1 font-medium truncate">
              Collections
            </span>
            <span className="serif-display text-2xl sm:text-4xl text-golddeep font-normal">
              {AVAILABLE_CATEGORIES.length}
            </span>
            <span className="block text-[10px] sm:text-[11px] text-mute mt-0.5 sm:mt-1">Active Tags</span>
          </div>

          <div className="bg-canvas border border-borderdelicate/80 p-3.5 sm:p-5 shadow-2xs">
            <span className="block text-mute uppercase tracking-[0.18em] text-[8.5px] sm:text-[9px] mb-1 font-medium truncate">
              Catalog Value
            </span>
            <span className="serif-display text-lg sm:text-3xl text-espresso font-normal truncate block">
              ₹{totalInventoryValue.toLocaleString("en-IN")}
            </span>
            <span className="block text-[10px] sm:text-[11px] text-mute mt-0.5 sm:mt-1">Inventory Sum</span>
          </div>

          <div className="bg-canvas border border-borderdelicate/80 p-3.5 sm:p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="block text-mute uppercase tracking-[0.18em] text-[8.5px] sm:text-[9px] mb-1 font-medium truncate">
                Quick Action
              </span>
              <span className="text-[11px] sm:text-[12px] text-subdued font-light hidden sm:block">
                Add handcrafted piece
              </span>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="mt-2 sm:mt-3 w-full py-2 sm:py-2.5 bg-espresso text-alabaster hover:bg-golddeep text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[38px] sm:min-h-[40px]"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
              <span>+ Add Piece</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search, Category Filter, and Add Button */}
        <div className="bg-canvas border border-borderdelicate/80 p-3.5 sm:p-5 mb-6 sm:mb-8 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-grow">
            {/* Search Input */}
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-mute text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search specimen code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-borderdelicate pl-10 pr-9 py-2.5 text-[15px] sm:text-xs text-espresso focus:outline-none focus:border-espresso transition-colors placeholder:text-mute min-h-[42px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-mute hover:text-espresso text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="shrink-0">
              <select
                value={selectedFilterCategory}
                onChange={(e) => setSelectedFilterCategory(e.target.value)}
                className="w-full sm:w-auto bg-surface border border-borderdelicate px-3.5 py-2.5 text-[15px] sm:text-xs text-espresso focus:outline-none focus:border-espresso transition-colors cursor-pointer min-h-[42px]"
              >
                <option value="All">All Categories ({products.length})</option>
                {AVAILABLE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="py-3 px-5 bg-espresso text-alabaster hover:bg-golddeep text-[11px] uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0 min-h-[44px] w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>New Specimen</span>
          </button>
        </div>

        {/* MOBILE SPECIMEN CARDS (Visible on phone/tablet < md) */}
        <div className="md:hidden space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-canvas border border-borderdelicate/80 p-8 text-center text-subdued shadow-2xs">
              <span className="material-symbols-outlined text-[36px] text-mute block mb-2 mx-auto">
                inventory_2
              </span>
              <p className="text-sm text-espresso font-medium">No specimens found</p>
              <p className="text-xs text-mute mt-1">Try clearing your search query or filters</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-canvas border border-borderdelicate/90 p-3.5 shadow-xs relative flex flex-col gap-3 transition-all"
              >
                {/* Top row: 1:1 Cover Thumbnail + Details */}
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-20 aspect-square bg-espresso/5 border border-borderdelicate overflow-hidden shrink-0 shadow-2xs">
                    <Image
                      src={p.image}
                      alt={p.code}
                      fill
                      className="object-cover object-center"
                      unoptimized
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="font-mono text-base font-bold text-espresso tracking-wider block truncate">
                        {p.code}
                      </span>
                      <span className="serif-display text-base font-medium text-espresso shrink-0">
                        {p.price}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="inline-block px-2 py-0.5 bg-surface border border-borderdelicate text-[9px] uppercase tracking-wider text-espresso font-medium">
                        {p.category}
                      </span>

                      {p.images && p.images.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-mono text-golddeep font-medium bg-golddeep/10 px-1.5 py-0.5 border border-golddeep/20">
                          <span className="material-symbols-outlined text-[13px]">photo_library</span>
                          +{p.images.length}
                        </span>
                      )}
                    </div>

                    {p.categories && p.categories.filter((c) => c !== p.category).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.categories
                          .filter((c) => c !== p.category)
                          .map((cat) => (
                            <span
                              key={cat}
                              className="text-[8.5px] uppercase tracking-wider px-1.5 py-0.5 bg-alabaster border border-borderdelicate/60 text-mute"
                            >
                              {cat}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Full Touch Action Bar */}
                <div className="pt-2.5 border-t border-borderdelicate/70 flex items-center justify-between gap-2">
                  <Link
                    href={`/products/${p.code}`}
                    target="_blank"
                    className="flex-1 py-2 px-2.5 bg-surface border border-borderdelicate text-mute hover:text-espresso text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 min-h-[40px] active:bg-canvas"
                  >
                    <span className="material-symbols-outlined text-[15px]">visibility</span>
                    <span>Preview</span>
                  </Link>

                  <button
                    onClick={() => handleOpenEditModal(p)}
                    className="flex-1 py-2 px-2.5 bg-surface border border-espresso text-espresso hover:bg-espresso hover:text-alabaster text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 min-h-[40px] active:bg-espresso active:text-white cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">edit</span>
                    <span>Edit</span>
                  </button>

                  {deleteConfirmId === p.id ? (
                    <div className="flex-1 flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="flex-1 py-2 px-1 bg-red-600 text-white text-[9.5px] uppercase tracking-wider font-bold hover:bg-red-700 min-h-[40px] cursor-pointer"
                      >
                        Delete?
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="py-2 px-2 bg-surface border border-borderdelicate text-subdued text-[10px] min-h-[40px] cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="py-2 px-3 bg-surface border border-red-200 text-red-700 hover:bg-red-50 text-[10px] uppercase tracking-wider font-medium flex items-center justify-center gap-1 min-h-[40px] cursor-pointer"
                      title="Delete specimen"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* DESKTOP PRODUCTS TABLE (Visible on md+) */}
        <div className="hidden md:block bg-canvas border border-borderdelicate/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-borderdelicate bg-surface/80 text-[10px] uppercase tracking-[0.2em] text-mute font-medium">
                  <th className="py-4 px-4 sm:px-6">Cover (1:1)</th>
                  <th className="py-4 px-4">Product Code & Details</th>
                  <th className="py-4 px-4">Gallery</th>
                  <th className="py-4 px-4">Category & Tags</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderdelicate/60 text-espresso">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-subdued">
                      <span className="material-symbols-outlined text-[32px] text-mute block mb-2">
                        inventory_2
                      </span>
                      <span>No products matched the current filters.</span>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-surface/50 transition-colors group"
                    >
                      {/* Image Thumbnail (1:1 Square) */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="relative w-14 h-14 aspect-square bg-espresso/5 border border-borderdelicate overflow-hidden shrink-0 shadow-2xs">
                          <Image
                            src={p.image}
                            alt={p.code}
                            fill
                            className="object-cover object-center"
                            unoptimized
                          />
                        </div>
                      </td>

                      {/* Product Code & Details */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-sm sm:text-base text-espresso font-semibold tracking-wider">
                          {p.code}
                        </div>
                      </td>

                      {/* Gallery count & preview */}
                      <td className="py-3.5 px-4">
                        {p.images && p.images.length > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-golddeep">
                              photo_library
                            </span>
                            <span className="text-[11px] font-medium text-espresso">
                              +{p.images.length} views
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-mute italic">Cover only</span>
                        )}
                      </td>

                      {/* Category & Tags */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-0.5 bg-surface border border-borderdelicate text-[10px] uppercase tracking-wider text-espresso font-medium mb-1">
                          {p.category}
                        </span>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {p.categories
                            ?.filter((c) => c !== p.category)
                            .map((cat) => (
                              <span
                                key={cat}
                                className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-canvas border border-borderdelicate/70 text-subdued"
                              >
                                {cat}
                              </span>
                            ))}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4">
                        <span className="serif-display text-base font-medium text-espresso">
                          {p.price}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/products/${p.code}`}
                            target="_blank"
                            className="p-1.5 text-mute hover:text-espresso border border-transparent hover:border-borderdelicate transition-all"
                            title="Preview on Boutique"
                          >
                            <span className="material-symbols-outlined text-[17px]">
                              visibility
                            </span>
                          </Link>

                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 text-espresso hover:text-golddeep border border-transparent hover:border-borderdelicate transition-all cursor-pointer"
                            title="Edit Product"
                          >
                            <span className="material-symbols-outlined text-[17px]">
                              edit
                            </span>
                          </button>

                          {deleteConfirmId === p.id ? (
                            <div className="inline-flex items-center gap-1 bg-red-50 p-1 border border-red-200">
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="px-2 py-0.5 bg-red-600 text-white text-[10px] uppercase font-bold hover:bg-red-700 cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-0.5 text-subdued hover:text-espresso text-[10px] cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(p.id)}
                              className="p-1.5 text-mute hover:text-red-700 border border-transparent hover:border-borderdelicate transition-all cursor-pointer"
                              title="Delete Product"
                            >
                              <span className="material-symbols-outlined text-[17px]">
                                delete
                              </span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-espresso/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-alabaster border border-goldaccent/50 max-w-3xl w-full p-4 sm:p-7 relative shadow-2xl overflow-y-auto max-h-[94vh] flex flex-col">
            {/* Sticky Modal Header */}
            <div className="sticky top-0 bg-alabaster z-20 pb-3 border-b border-borderdelicate/80 mb-4 flex items-center justify-between gap-2">
              <div className="min-w-0 pr-2">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-golddeep font-semibold block truncate">
                  {editingProduct ? "Specimen Modification" : "New Collection Addition"}
                </span>
                <h3 className="serif-display text-xl sm:text-2xl text-espresso font-normal truncate">
                  {editingProduct ? `Edit ${editingProduct.code}` : "Add New Handcrafted Specimen"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-mute hover:text-espresso p-1.5 border border-borderdelicate hover:border-espresso cursor-pointer shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Ideal Image Dimension Guideline Alert */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-surface border border-goldaccent/40 rounded-none text-xs">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-golddeep shrink-0 mt-0.5">
                  aspect_ratio
                </span>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-espresso uppercase tracking-wider text-[10.5px] sm:text-[11px]">
                      Ideal Image Spec: 1:1 Aspect Ratio (Square)
                    </span>
                    <span className="px-1.5 py-0.5 bg-golddeep/15 text-golddeep border border-golddeep/30 text-[8.5px] font-semibold uppercase tracking-wider">
                      Recommended 1000 × 1000 px
                    </span>
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] text-subdued font-light leading-relaxed">
                    Square (1:1) images ensure your brassware specimens look impeccably framed and razor-sharp across boutique cards, catalog grids, and mobile screens.
                  </p>
                </div>
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                <span>{formError}</span>
              </div>
            )}

            {uploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] shrink-0">cloud_off</span>
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitProduct} className="flex flex-col gap-4 sm:gap-5 text-xs">
              {/* Product Code */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-mute mb-1 font-medium">
                  Product Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JGM-0140"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-surface border border-borderdelicate p-2.5 text-[16px] sm:text-xs text-espresso font-mono uppercase focus:outline-none focus:border-espresso min-h-[42px]"
                />
              </div>

              {/* Price & Primary Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-mute mb-1 font-medium">
                    Price (INR ₹) *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      min={100}
                      value={numericPrice}
                      onChange={(e) =>
                        handleNumericPriceChange(parseFloat(e.target.value) || 0)
                      }
                      className="w-full bg-surface border border-borderdelicate p-2.5 text-[16px] sm:text-xs text-espresso font-medium focus:outline-none focus:border-espresso min-h-[42px]"
                    />
                    <span className="px-3 py-2.5 bg-canvas border border-borderdelicate text-espresso whitespace-nowrap font-medium min-h-[42px] flex items-center text-xs">
                      {price}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-mute mb-1 font-medium">
                    Primary Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const newCat = e.target.value;
                      setCategory(newCat);
                      if (!selectedCategories.includes(newCat)) {
                        setSelectedCategories([...selectedCategories, newCat]);
                      }
                    }}
                    className="w-full bg-surface border border-borderdelicate p-2.5 text-[16px] sm:text-xs text-espresso focus:outline-none focus:border-espresso cursor-pointer min-h-[42px]"
                  >
                    {AVAILABLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Multi-category tags */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-mute mb-1.5 font-medium">
                  Additional Category Tags (Display in multiple collections)
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-canvas p-2.5 sm:p-3 border border-borderdelicate">
                  {AVAILABLE_CATEGORIES.map((cat) => {
                    const active = selectedCategories.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => handleToggleCategory(cat)}
                        className={`px-2.5 sm:px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium border transition-all cursor-pointer min-h-[36px] flex items-center gap-1 ${
                          active
                            ? "bg-espresso text-alabaster border-espresso"
                            : "bg-surface text-mute border-borderdelicate hover:text-espresso"
                        }`}
                      >
                        <span>{active ? "✓ " : "+ "}</span>
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COVER IMAGE SECTION (1:1 Primary) */}
              <div className="p-3.5 sm:p-4 bg-canvas border border-borderdelicate/90 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-espresso block">
                      1. Cover Image * (1:1 Ratio)
                    </span>
                    <span className="text-[11px] text-mute font-light block">
                      Primary showcase image shown on catalogue cards and hero views.
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono bg-surface border border-borderdelicate text-golddeep shrink-0">
                    1:1 Required
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 sm:gap-4">
                  {/* Square Cover Preview Container */}
                  <div className="relative w-28 h-28 aspect-square bg-surface border-2 border-dashed border-borderdelicate flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                    {image ? (
                      <Image
                        src={image}
                        alt="Cover Preview"
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                    ) : (
                      <div className="text-center p-2 text-mute">
                        <span className="material-symbols-outlined text-[24px] block mb-1">
                          image
                        </span>
                        <span className="text-[9px] uppercase tracking-wider block">
                          1:1 Cover
                        </span>
                      </div>
                    )}
                    {uploadingCover && (
                      <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[20px] animate-spin">
                          progress_activity
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex-grow space-y-2 w-full">
                    <input
                      type="file"
                      ref={coverInputRef}
                      onChange={handleUploadCover}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="flex flex-col xs:flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={uploadingCover}
                        className="w-full xs:w-auto py-2.5 px-4 bg-espresso text-alabaster hover:bg-golddeep text-[10px] uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 min-h-[42px]"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          cloud_upload
                        </span>
                        <span>{image ? "Replace Cover Image" : "Upload Cover Image (1:1)"}</span>
                      </button>

                      {image && (
                        <button
                          type="button"
                          onClick={() => setImage("")}
                          className="w-full xs:w-auto py-2.5 px-3 border border-red-300 text-red-700 hover:bg-red-50 text-[10px] uppercase tracking-wider font-medium cursor-pointer min-h-[42px]"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* REST OF THE IMAGES SECTION (Gallery / Additional Views) */}
              <div className="p-3.5 sm:p-4 bg-canvas border border-borderdelicate/90 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-espresso block">
                      2. Additional Specimen Images (Gallery Views)
                    </span>
                    <span className="text-[11px] text-mute font-light block">
                      Angles, engravings, boxes, or details (1:1 Square).
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono bg-surface border border-borderdelicate text-subdued shrink-0">
                    {images.length} {images.length === 1 ? "Image" : "Images"}
                  </span>
                </div>

                <input
                  type="file"
                  ref={galleryInputRef}
                  onChange={handleUploadGallery}
                  accept="image/*"
                  multiple
                  className="hidden"
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={uploadingGallery}
                    className="w-full xs:w-auto py-2.5 px-4 bg-surface border border-espresso text-espresso hover:bg-espresso hover:text-alabaster text-[10px] uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[42px]"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      add_photo_alternate
                    </span>
                    <span>
                      {uploadingGallery ? "Uploading Views..." : "+ Upload Additional Images (1:1)"}
                    </span>
                  </button>
                </div>

                {/* Uploaded Gallery Grid */}
                {images.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 pt-2">
                    {images.map((imgUrl, index) => (
                      <div
                        key={index}
                        className="relative aspect-square bg-surface border border-borderdelicate group overflow-hidden shadow-2xs"
                      >
                        <Image
                          src={imgUrl}
                          alt={`Angle ${index + 1}`}
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                        <div className="absolute top-1 left-1 bg-espresso/80 text-white text-[8px] px-1 py-0.5 font-mono">
                          #{index + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white w-6 h-6 min-h-[24px] min-w-[24px] flex items-center justify-center text-xs font-bold shadow-xs cursor-pointer opacity-90 group-hover:opacity-100"
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 border border-dashed border-borderdelicate/70 bg-surface/50 text-center text-mute text-[11px]">
                    No additional images uploaded yet. You can upload multiple detail angles.
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-mute mb-1 font-medium">
                  Artisanal Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Details on foundry casting, silver electroplating bath, or lapidary work..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface border border-borderdelicate p-2.5 text-[16px] sm:text-xs text-espresso focus:outline-none focus:border-espresso min-h-[80px]"
                />
              </div>

              {/* Sticky Modal Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-3.5 border-t border-borderdelicate sticky bottom-0 bg-alabaster z-20 mt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 sm:py-2.5 border border-borderdelicate text-[11px] uppercase tracking-[0.18em] text-mute hover:text-espresso cursor-pointer min-h-[44px] flex items-center justify-center active:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingCover || uploadingGallery}
                  className="w-full sm:w-auto px-7 py-3 sm:py-2.5 bg-espresso text-alabaster hover:bg-golddeep text-[11px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {submitting && (
                    <span className="material-symbols-outlined text-[15px] animate-spin">
                      progress_activity
                    </span>
                  )}
                  <span>{editingProduct ? "Save Changes" : "Create Specimen"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
