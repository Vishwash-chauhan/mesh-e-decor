"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import { useCart } from "@/context/CartContext";

const INDIAN_STATES = [
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Haryana",
  "Uttar Pradesh",
  "Tamil Nadu",
  "Telangana",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Punjab",
  "Kerala",
  "Andhra Pradesh",
  "Madhya Pradesh",
  "Bihar",
  "Odisha",
  "Assam",
  "Goa",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Uttarakhand",
  "Jharkhand",
  "Chhattisgarh",
  "Puducherry",
  "Other State / UT",
];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } =
    useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderDetails, setConfirmedOrderDetails] = useState<{
    orderId: string;
    items: typeof cart;
    fullName: string;
    phone: string;
    address: string;
    totalPrice: number;
    totalItems: number;
    orderDate: string;
  } | null>(null);

  // Standard Indian Customer & Address Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [flatBuilding, setFlatBuilding] = useState("");
  const [streetArea, setStreetArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Delhi");
  const [pincode, setPincode] = useState("");

  const handleOpenConciergeModal = () => {
    setModalOpen(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    const formattedAddress = [
      flatBuilding,
      streetArea,
      landmark ? `Landmark: ${landmark}` : null,
      `${city}, ${state} - ${pincode}`,
    ]
      .filter(Boolean)
      .join(", ");

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const generatedOrderId = `MED-2026-${randomNum}`;

    const newOrder = {
      orderId: generatedOrderId,
      items: [...cart],
      fullName,
      phone,
      address: formattedAddress,
      totalPrice,
      totalItems,
      orderDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    const itemsSummary = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.code} (Qty: ${item.quantity}) - ₹${(
            item.product.numericPrice * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    const message = `Hello Mesh ‘E’ Decor, I would like to place an order from my cart:

*Order ID:* ${generatedOrderId}
*Customer Name:* ${fullName}
*Phone:* ${phone}
*Delivery Address:* ${formattedAddress}

*Items:*
${itemsSummary}

*Total Order Value:* ₹${totalPrice.toLocaleString("en-IN")}

Kindly confirm my order and share dispatch instructions. Thank you!`;

    const whatsappUrl = `https://wa.me/917042005637?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setConfirmedOrderDetails(newOrder);
    setOrderConfirmed(true);
    clearCart();
  };

  return (
    <div className="min-h-screen flex flex-col bg-alabaster text-espresso font-light">
      {/* Main Header */}
      <Navbar onOpenConcierge={handleOpenConciergeModal} />

      {/* Main Cart Content */}
      <main className="w-full flex-grow py-12 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="border-b border-borderdelicate/80 pb-6 sm:pb-8 mb-10 sm:mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-golddeep font-medium block mb-2">
              Online Checkout
            </span>
            <h1 className="serif-display text-3xl sm:text-5xl text-espresso font-normal tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-[13px] sm:text-[14px] text-subdued font-light mt-2 max-w-xl">
              Review your items and provide your delivery details to complete your purchase.
            </p>
          </div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Cart Item List */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="divide-y divide-borderdelicate/60 border-t border-b border-borderdelicate/80">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                      {/* Product Thumbnail & Details */}
                      <div className="flex items-center gap-4 sm:gap-6 flex-grow">
                        <Link
                          href={`/products/${item.product.code}`}
                          className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 bg-canvas border border-borderdelicate/80 block hover:opacity-90 transition-opacity"
                        >
                          <Image
                            src={item.product.image}
                            alt={item.product.code}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </Link>

                        <div className="flex flex-col">
                          <Link href={`/products/${item.product.code}`}>
                            <h3 className="serif-display text-lg sm:text-xl text-espresso font-normal leading-snug mb-1 hover:text-golddeep transition-colors">
                              {item.product.code}
                            </h3>
                          </Link>
                          <span className="text-xs text-subdued font-medium mb-1">
                            {item.product.price} each
                          </span>
                          {item.product.material && (
                            <span className="text-[11px] text-mute font-light hidden sm:inline">
                              {item.product.material}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controller & Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-borderdelicate/40">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-9 h-9 border border-borderdelicate bg-surface text-espresso font-medium flex items-center justify-center hover:bg-espresso hover:text-alabaster transition-colors cursor-pointer text-sm"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="serif-display text-base font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-9 h-9 border border-borderdelicate bg-surface text-espresso font-medium flex items-center justify-center hover:bg-espresso hover:text-alabaster transition-colors cursor-pointer text-sm"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <div className="text-right min-w-[5rem]">
                          <span className="serif-display text-lg sm:text-xl text-espresso font-medium block">
                            ₹
                            {(
                              item.product.numericPrice * item.quantity
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-mute hover:text-crimson transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            close
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-4">
                  <Link
                    href="/catalogue"
                    className="text-[11px] uppercase tracking-[0.2em] text-subdued hover:text-espresso transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_back
                    </span>
                    <span>Continue Shopping</span>
                  </Link>

                  <button
                    onClick={clearCart}
                    className="text-[10px] uppercase tracking-[0.2em] text-mute hover:text-crimson transition-colors underline cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Right Column: Standard Indian Format Checkout Card */}
              <div className="lg:col-span-5 bg-canvas border border-borderdelicate/90 p-6 sm:p-8 sticky top-28 shadow-xs">
                <span className="text-[10px] uppercase tracking-[0.28em] text-golddeep font-medium block mb-2">
                  Order Summary
                </span>
                <h2 className="serif-display text-2xl text-espresso font-normal mb-6">
                  Checkout &amp; Shipping
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-3.5 text-xs font-light border-b border-borderdelicate/80 pb-6 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-subdued">
                      Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""})
                    </span>
                    <span className="font-medium text-espresso serif-display text-base">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-subdued">Express Delivery</span>
                    <span className="text-golddeep font-medium uppercase tracking-wider">
                      Free
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-subdued">Estimated Taxes</span>
                    <span className="text-subdued">Included</span>
                  </div>
                </div>

                {/* Total Price Row */}
                <div className="flex items-baseline justify-between mb-8 pb-6 border-b border-borderdelicate/80">
                  <span className="uppercase tracking-[0.2em] text-xs font-semibold text-espresso">
                    Total Amount
                  </span>
                  <span className="serif-display text-3xl font-normal text-espresso">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Standard Indian Address & Contact Form */}
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 mb-6">
                  {/* Full Name & Phone */}
                  <div>
                    <label className="block uppercase tracking-[0.18em] text-mute text-[10px] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Devika Singh"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-surface border border-borderdelicate p-3 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-[0.18em] text-mute text-[10px] mb-1 font-medium">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-surface border border-borderdelicate p-3 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors"
                    />
                  </div>

                  {/* Address Line 1 */}
                  <div>
                    <label className="block uppercase tracking-[0.18em] text-mute text-[10px] mb-1 font-medium">
                      Flat, House No., Building, Apartment *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 402, Royal Oak Apartments"
                      value={flatBuilding}
                      onChange={(e) => setFlatBuilding(e.target.value)}
                      className="w-full bg-surface border border-borderdelicate p-3 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors"
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div>
                    <label className="block uppercase tracking-[0.18em] text-mute text-[10px] mb-1 font-medium">
                      Area, Street, Sector, Village *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Golf Course Road, Sector 54"
                      value={streetArea}
                      onChange={(e) => setStreetArea(e.target.value)}
                      className="w-full bg-surface border border-borderdelicate p-3 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors"
                    />
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="block uppercase tracking-[0.18em] text-mute text-[10px] mb-1 font-medium">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Metro Station / Opposite Central Park"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full bg-surface border border-borderdelicate p-3 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block uppercase tracking-[0.18em] text-mute text-[10px] mb-1 font-medium">
                      Town / City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gurugram / New Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-surface border border-borderdelicate p-3 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors"
                    />
                  </div>

                  {/* State & Pincode */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase tracking-[0.18em] text-mute text-[10px] mb-1 font-medium">
                        State *
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full bg-surface border border-borderdelicate p-3 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors cursor-pointer"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase tracking-[0.18em] text-mute text-[10px] mb-1 font-medium">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        placeholder="6-digit PIN"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full bg-surface border border-borderdelicate p-3 text-xs text-espresso focus:outline-none focus:border-espresso transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] uppercase tracking-[0.24em] font-medium transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm hover:shadow-md active:scale-[0.99] min-h-[48px] mt-6"
                  >
                    <svg
                      className="w-4 h-4 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 0 1-5.82 2.41h-.01c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.14.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
                    </svg>
                    <span>Order on WhatsApp</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Empty Cart View */
            <div className="py-20 text-center flex flex-col items-center max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-canvas border border-borderdelicate flex items-center justify-center mb-6 text-golddeep">
                <span className="material-symbols-outlined text-[36px]">
                  shopping_bag
                </span>
              </div>
              <h2 className="serif-display text-3xl text-espresso font-normal mb-3">
                Your Shopping Cart is Empty
              </h2>
              <p className="text-[13px] text-subdued font-light leading-relaxed mb-8">
                Explore our collection of handcrafted brassware, silver-plated urulis, and artisanal decor.
              </p>
              <Link
                href="/catalogue"
                className="px-8 py-4 bg-espresso text-alabaster hover:bg-[#2A2622] text-[11px] uppercase tracking-[0.24em] font-medium transition-all shadow-sm min-h-[48px] flex items-center justify-center gap-2"
              >
                <span>Explore Catalogue</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Order Confirmation Screen / Modal */}
      {orderConfirmed && confirmedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-alabaster border border-goldaccent/40 max-w-2xl w-full p-6 sm:p-10 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="text-center pb-6 border-b border-borderdelicate/80 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 0 1-5.82 2.41h-.01c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.14.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#25D366] font-semibold block mb-1">
                Final Step
              </span>
              <h2 className="serif-display text-3xl sm:text-4xl text-espresso font-normal mb-2">
                Complete Your Order on WhatsApp
              </h2>
              <p className="text-xs text-subdued font-light">
                We have generated your order details, <span className="font-medium text-espresso">{confirmedOrderDetails.fullName}</span>. Please send the message on WhatsApp to finalize payment and dispatch.
              </p>
            </div>

            {/* Order Meta Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-canvas p-4 border border-borderdelicate/80 text-xs mb-6">
              <div>
                <span className="block text-mute uppercase tracking-wider text-[9px] mb-0.5">Order ID</span>
                <span className="font-medium text-espresso font-mono text-[11px]">{confirmedOrderDetails.orderId}</span>
              </div>
              <div>
                <span className="block text-mute uppercase tracking-wider text-[9px] mb-0.5">Order Date</span>
                <span className="font-medium text-espresso">{confirmedOrderDetails.orderDate}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-mute uppercase tracking-wider text-[9px] mb-0.5">Estimated Delivery</span>
                <span className="font-semibold text-golddeep">3 - 5 Business Days</span>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-6 pb-6 border-b border-borderdelicate/80 text-xs">
              <span className="block uppercase tracking-wider text-[10px] text-mute font-medium mb-1">
                Shipping Destination
              </span>
              <p className="text-espresso font-normal">{confirmedOrderDetails.fullName} ({confirmedOrderDetails.phone})</p>
              <p className="text-subdued font-light">{confirmedOrderDetails.address}</p>
            </div>

            {/* Items Purchased List */}
            <div className="mb-6">
              <span className="block uppercase tracking-wider text-[10px] text-mute font-medium mb-3">
                Items Purchased ({confirmedOrderDetails.totalItems})
              </span>
              <div className="divide-y divide-borderdelicate/60 max-h-48 overflow-y-auto pr-1">
                {confirmedOrderDetails.items.map((item) => (
                  <div key={item.product.id} className="py-3 flex items-center justify-between text-xs gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 shrink-0 bg-canvas border border-borderdelicate">
                        <Image src={item.product.image} alt={item.product.code} fill className="object-cover" unoptimized />
                      </div>
                      <div>
                        <h4 className="serif-display text-sm font-medium text-espresso">{item.product.code}</h4>
                        <span className="text-[10px] text-mute">Qty: {item.quantity} × {item.product.price}</span>
                      </div>
                    </div>
                    <span className="serif-display text-sm font-medium text-espresso whitespace-nowrap">
                      ₹{(item.product.numericPrice * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Paid */}
            <div className="flex items-center justify-between pt-4 border-t border-borderdelicate/80 mb-8">
              <span className="uppercase tracking-wider text-xs font-semibold text-espresso">Total Amount</span>
              <span className="serif-display text-2xl text-espresso font-normal">₹{confirmedOrderDetails.totalPrice.toLocaleString("en-IN")}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  const itemsSummary = confirmedOrderDetails.items
                    .map(
                      (item, idx) =>
                        `${idx + 1}. ${item.product.code} (Qty: ${item.quantity}) - ₹${(
                          item.product.numericPrice * item.quantity
                        ).toLocaleString("en-IN")}`
                    )
                    .join("\n");
                  const message = `Hello Mesh ‘E’ Decor, here are the details for my order:

*Order ID:* ${confirmedOrderDetails.orderId}
*Customer Name:* ${confirmedOrderDetails.fullName}
*Phone:* ${confirmedOrderDetails.phone}
*Delivery Address:* ${confirmedOrderDetails.address}

*Items:*
${itemsSummary}

*Total Amount:* ₹${confirmedOrderDetails.totalPrice.toLocaleString("en-IN")}

Kindly confirm my order. Thank you!`;
                  window.open(
                    `https://wa.me/917042005637?text=${encodeURIComponent(message)}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] uppercase tracking-[0.24em] font-medium transition-all text-center cursor-pointer min-h-[44px] flex items-center justify-center gap-2.5 shadow-sm"
              >
                <svg
                  className="w-4 h-4 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 0 1-5.82 2.41h-.01c-1.49 0-2.95-.4-4.23-1.16l-.3-.18-3.14.82.84-3.06-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.59.19 1.14.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
                </svg>
                <span>Complete Order on WhatsApp</span>
              </button>

              <Link
                href="/catalogue"
                onClick={() => setOrderConfirmed(false)}
                className="w-full py-3.5 bg-espresso text-alabaster hover:bg-golddeep text-[11px] uppercase tracking-[0.24em] font-medium transition-all text-center cursor-pointer min-h-[44px] flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Continue Shopping</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bespoke Inquiry Dossier Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={null}
      />
    </div>
  );
}
