"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const LAST_UPDATED = "May 2026";

const MY_GEAR = [
  {
    id: "core-tent",
    name: "CORE 6 Person Instant Cabin Tent",
    category: "Shelter",
    icon: "⛺",
    color: "var(--cyan)",
    image: "https://www.coreequipment.com/cdn/shop/files/core-6-person-instant-cabin-tent-dark-gray-main.png?v=1762467508",
    specs: [
      "Full rainfly — H2O Block Technology",
      "60-second instant setup",
      "Multi-room cabin layout, fits 6",
      "Includes carry bag + gear loft",
    ],
    url: "https://www.amazon.ca/Rainfly-Weather-Protection-Accessories-Portable/dp/B0BF7GDSP7/",
    where: "Amazon.ca",
  },
  {
    id: "bluetti",
    name: "BLUETTI Elite 30 V2 Power Station",
    category: "Power",
    icon: "⚡",
    color: "var(--purple)",
    image: "https://cdn.shopify.com/s/files/1/0536/3390/8911/files/Elite30v2_1x_5b1256c8-be35-4ed1-a41c-d2ec6fac98f0.webp",
    specs: [
      "288Wh LiFePO4 — 3,000+ charge cycles",
      "600W output, 1500W power lift mode",
      "0–100% in ~70 min via AC",
      "4.3 kg · 5-year warranty",
    ],
    url: "https://www.amazon.ca/dp/B0F42HLLSC",
    where: "Amazon.ca",
  },
  {
    id: "heeta",
    name: "HEETA Waterproof Dry Bag — 2-Pack",
    category: "Protection",
    icon: "💧",
    color: "var(--pink)",
    image: "https://www.kinzd.com/cdn/shop/files/72833ad6606fbf6aefffefe1d3c1e450_1500x.jpg?v=1749481635",
    specs: [
      "IPX8 — waterproof to 32 ft for 1 hr",
      "Triple seal (3 zips + Velcro fold)",
      "Touch-screen-sensitive window",
      "Floatable · fits 22–33\" waist",
    ],
    url: "https://www.amazon.ca/dp/B07B8DVJHM",
    where: "Amazon.ca",
  },
];

const GEAR_CATEGORIES = [
  {
    label: "SHELTER & SLEEP",
    icon: "⛺",
    color: "var(--cyan)",
    items: [
      { id: "tent", text: "Tent", where: "MEC / REI", note: "2-person min, check rain rating" },
      { id: "sleeping-bag", text: "Sleeping bag or blanket", where: "MEC / Amazon", note: "Down or synthetic depending on humidity" },
      { id: "sleeping-pad", text: "Inflatable sleeping mattress or pad", where: "MEC / Canadian Tire", note: "Foam or inflatable" },
      { id: "pillow", text: "Camping pillow or stuff sack", where: "Amazon", note: null },
      { id: "tarp", text: "Tarp or rain fly", where: "Canadian Tire", note: "Extra cover for wet weather" },
      { id: "tent-stakes", text: "Extra tent stakes", where: "MEC / Canadian Tire", note: null },
    ],
  },
  {
    label: "COOKING & FOOD",
    icon: "🍳",
    color: "var(--purple)",
    items: [
      { id: "stove", text: "Camp stove", where: "MEC", note: "e.g. MSR PocketRocket" },
      { id: "fuel", text: "Fuel canisters (extra)", where: "MEC / Canadian Tire", note: "1 canister per 2–3 days" },
      { id: "cookset", text: "Pot & pan set", where: "MEC / Amazon", note: null },
      { id: "utensils", text: "Utensils — fork, knife & spoon", where: "MEC / Canadian Tire", note: "Plus cup and bowl" },
      { id: "lighter", text: "Waterproof matches", where: "Canadian Tire / Dollarama", note: null },
      { id: "cooler", text: "Cooler with ice", where: "Canadian Tire / Walmart", note: "Pre-chill before packing" },
      { id: "snacks", text: "Snacks", where: "Grocery store", note: "Plan meals per night + 1 emergency" },
      { id: "water-filter", text: "Water filter or purification tabs", where: "MEC", note: "Sawyer Squeeze or Lifestraw" },
      { id: "water-bottles", text: "Water bottles / hydration bladder", where: "MEC / Amazon", note: null },
      { id: "cutting-board", text: "Small cutting board + knife", where: "Walmart / Amazon", note: null },
      { id: "dishwashing", text: "Camp soap + scrubber", where: "MEC / Canadian Tire", note: "Biodegradable soap only" },
    ],
  },
  {
    label: "CLOTHING & LAYERS",
    icon: "🧥",
    color: "var(--pink)",
    items: [
      { id: "base-layer", text: "Moisture-wicking base layer", where: "MEC / Uniqlo", note: "Merino wool preferred" },
      { id: "mid-layer", text: "Fleece or down mid-layer", where: "MEC / REI", note: null },
      { id: "rain-jacket", text: "Waterproof rain jacket", where: "MEC", note: "Gore-Tex or similar" },
      { id: "rain-pants", text: "Rain pants", where: "MEC / Amazon", note: null },
      { id: "hiking-pants", text: "Hiking pants (2 pairs)", where: "MEC / Mountain Warehouse", note: null },
      { id: "hiking-boots", text: "Waterproof hiking boots", where: "MEC / SportChek", note: "Break them in before the trip" },
      { id: "camp-shoes", text: "Camp sandals or crocs", where: "Amazon / SportChek", note: "For around camp" },
      { id: "wool-socks", text: "Merino wool socks (multiple pairs)", where: "MEC / Costco", note: null },
      { id: "hat", text: "Sun hat + warm toque", where: "MEC / Amazon", note: null },
      { id: "gloves", text: "Lightweight gloves", where: "MEC / Amazon", note: "Nights can get cold" },
      { id: "sunglasses", text: "Sunglasses", where: "Any", note: null },
    ],
  },
  {
    label: "NAVIGATION & SAFETY",
    icon: "🧭",
    color: "var(--cyan)",
    items: [
      { id: "map", text: "Paper trail map", where: "Park visitor center / AllTrails", note: "Don't rely only on phone" },
      { id: "compass", text: "Compass", where: "MEC / Canadian Tire", note: null },
      { id: "first-aid", text: "First aid kit", where: "MEC / Shoppers Drug Mart", note: "Include blister pads" },
      { id: "headlamp", text: "Headlamp + extra batteries", where: "MEC / Canadian Tire", note: "Black Diamond or Petzl" },
      { id: "torch", text: "Handheld torch / flashlight", where: "Canadian Tire / Amazon", note: "Backup to headlamp" },
      { id: "whistle", text: "Emergency whistle", where: "MEC / Canadian Tire", note: "Clip to backpack" },
      { id: "fire-starter", text: "Fire starter / firestarter cubes", where: "Canadian Tire", note: null },
      { id: "emergency-blanket", text: "Emergency mylar blanket", where: "MEC / Amazon", note: null },
      { id: "multi-tool", text: "Multi-tool or pocket knife", where: "Canadian Tire / Amazon", note: null },
      { id: "phone-charger", text: "Portable battery pack", where: "Best Buy / Amazon", note: "20,000mAh minimum" },
    ],
  },
  {
    label: "WATER ACTIVITIES",
    icon: "🏊",
    color: "var(--cyan)",
    items: [
      { id: "life-jacket", text: "Life jacket / PFD", where: "MEC / Canadian Tire", note: "Required for any water activity" },
      { id: "water-whistle", text: "Waterproof whistle", where: "MEC / Amazon", note: "Keep on you at all times in water" },
      { id: "swimwear", text: "Swimwear (2 sets)", where: "SportChek / Any", note: "One to wear, one drying" },
      { id: "water-shoes", text: "Water shoes", where: "Amazon / SportChek", note: "For rocky shorelines" },
      { id: "rash-guard", text: "Rash guard / UV shirt", where: "MEC / Amazon", note: "Sun protection on the water" },
      { id: "waterproof-bag", text: "Waterproof bag for valuables", where: "Your gear (HEETA)", note: "Phone, keys, wallet" },
      { id: "quick-dry-towel", text: "Quick-dry towel", where: "MEC / Amazon", note: null },
    ],
  },
  {
    label: "CAMERA & TECH",
    icon: "📷",
    color: "var(--purple)",
    items: [
      { id: "sony-a6700", text: "Sony A6700 camera body", where: "Your gear", note: "Charge battery + bring spares" },
      { id: "nisi-filters", text: "NiSi colour filters", where: "Your gear", note: "ND / CPL — pack in hard case" },
      { id: "rs-mini", text: "DJI RS Mini gimbal", where: "Your gear", note: "Charge fully before leaving" },
      { id: "tripod", text: "Camera tripod / stand", where: "Your gear", note: "Check all screws are tight" },
      { id: "memory-cards", text: "Memory cards + card reader", where: "Best Buy / Amazon", note: "Bring at least 2 cards" },
      { id: "macbook", text: "MacBook Pro", where: "Your gear", note: "Laptop sleeve + charger" },
      { id: "ipad", text: "iPad", where: "Your gear", note: "Charger + Apple Pencil if needed" },
      { id: "ue-wonderboom", text: "UE Wonderboom 3 speaker", where: "Your gear", note: "Waterproof & floatable — charge before" },
      { id: "jbl-xtreme", text: "JBL Xtreme 3 speaker", where: "Your gear", note: "Waterproof — charge before leaving" },
      { id: "cables", text: "Charging cables for all devices", where: "Your gear", note: "USB-C, Lightning — pack extras" },
      { id: "powerbank-tech", text: "Power bank for devices", where: "Best Buy / Amazon", note: "Keep MacBook + camera topped up" },
    ],
  },
  {
    label: "HYGIENE & LEAVE NO TRACE",
    icon: "🌿",
    color: "var(--purple)",
    items: [
      { id: "toothbrush", text: "Toothbrush + toothpaste", where: "Anywhere", note: null },
      { id: "trowel", text: "Trowel (cat hole digging)", where: "MEC", note: "For backcountry bathroom" },
      { id: "toilet-paper", text: "Biodegradable toilet paper", where: "MEC / Amazon", note: "Pack it out or bury 6+ inches" },
      { id: "hand-sanitizer", text: "Hand sanitizer", where: "Shoppers / Dollarama", note: null },
      { id: "sunscreen", text: "Sunscreen SPF 50+", where: "Shoppers / Walmart", note: null },
      { id: "bug-spray", text: "Bug spray (DEET or Picaridin)", where: "Canadian Tire / Shoppers", note: "Picaridin is fabric-safe" },
      { id: "trash-bags", text: "Extra zip-lock bags + garbage bags", where: "Dollarama / Walmart", note: "Pack out all waste" },
      { id: "bear-canister", text: "Bear canister or hang bag", where: "MEC", note: "Required in some parks" },
      { id: "microfiber-towel", text: "Microfiber towel", where: "MEC / Amazon", note: null },
    ],
  },
  {
    label: "EXTRAS & NICE TO HAVE",
    icon: "✨",
    color: "var(--pink)",
    items: [
      { id: "camp-chair", text: "Lightweight camp chair", where: "Canadian Tire / MEC", note: "Helinox or Kijaro" },
      { id: "hammock", text: "Hammock + straps", where: "MEC / Amazon", note: "ENO SingleNest is great" },
      { id: "journal", text: "Journal + pen", where: "Your stuff", note: null },
      { id: "book", text: "Book or e-reader", where: "Your stuff", note: null },
      { id: "trekking-poles", text: "Trekking poles", where: "MEC / Amazon", note: "Knees will thank you" },
      { id: "dry-bags", text: "Dry bags for gear protection", where: "MEC / Amazon", note: "Keep electronics & clothes dry" },
      { id: "lantern", text: "Camp lantern (solar or battery)", where: "Canadian Tire / Amazon", note: null },
    ],
  },
];

const AFTER_CAMPING = [
  { id: "dry-tent", text: "Dry and air out tent completely", note: "Prevents mildew — never pack wet" },
  { id: "clean-cookware", text: "Clean all cookware + stove", note: "Soak stubborn residue first" },
  { id: "air-sleeping-bag", text: "Air out sleeping bag before storing", note: "Store uncompressed in large sack" },
  { id: "check-ticks", text: "Do a full tick check", note: "Common in Ontario trails — check armpits, scalp, behind knees" },
  { id: "restock-first-aid", text: "Restock first aid kit", note: "Note what you used" },
  { id: "charge-batteries", text: "Recharge all batteries + power banks", note: null },
  { id: "wash-clothes", text: "Wash all camping clothes", note: "Especially wool — air dry" },
  { id: "food-inventory", text: "Check leftover food — discard anything expired", note: null },
  { id: "repair-gear", text: "Inspect and repair any damaged gear", note: "Patch tent holes, fix zippers" },
  { id: "trip-notes", text: "Write trip notes while fresh", note: "Log trail conditions, what worked, what to leave next time" },
];

const WHERE_TO_BUY = [
  {
    name: "MEC (Mountain Equipment Co.)",
    url: "https://www.mec.ca",
    type: "Best for",
    note: "Core gear — sleeping bags, tents, packs, stoves. Lifetime return policy.",
    icon: "🏔",
  },
  {
    name: "Canadian Tire",
    url: "https://www.canadiantire.ca",
    type: "Best for",
    note: "Budget camping supplies, fire starters, coolers, basic tools. Watch for sales.",
    icon: "🍁",
  },
  {
    name: "Amazon Canada",
    url: "https://www.amazon.ca",
    type: "Best for",
    note: "Accessories, niche gear, good prices. Check reviews carefully.",
    icon: "📦",
  },
  {
    name: "SportChek",
    url: "https://www.sportchek.ca",
    type: "Best for",
    note: "Footwear, clothing layers, in-store try-on option.",
    icon: "👟",
  },
  {
    name: "Mountain Warehouse",
    url: "https://www.mountainwarehouse.com",
    type: "Best for",
    note: "Affordable hiking clothing and accessories. Good for budget layering.",
    icon: "⛰",
  },
  {
    name: "Dollarama / Walmart",
    url: "https://www.dollarama.com",
    type: "Best for",
    note: "Consumables — ziplock bags, garbage bags, lighters, soap.",
    icon: "🛒",
  },
];

type CheckedMap = Record<string, boolean>;

export default function CampingPage() {
  const [checked, setChecked] = useState<CheckedMap>({});
  const [afterChecked, setAfterChecked] = useState<CheckedMap>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleAfter = (id: string) =>
    setAfterChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalGear = GEAR_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);
  const checkedGear = Object.values(checked).filter(Boolean).length;
  const afterTotal = AFTER_CAMPING.length;
  const afterCheckedCount = Object.values(afterChecked).filter(Boolean).length;

  const resetAll = () => { setChecked({}); setAfterChecked({}); };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "120px clamp(1.5rem, 6vw, 8rem) 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <div style={{ position: "absolute", top: "10%", right: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "30%", left: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "960px" }}>
        {/* Back link */}
        <Link
          href="/"
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.72rem", color: "var(--text-sec)", textDecoration: "none", letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "3rem" }}
        >
          ← BACK HOME
        </Link>

        {/* Header */}
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: "1rem" }}>
          /CAMPING
        </div>
        <h1 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "1rem" }}>
          Camping
          <br />
          Gear & Checklist
        </h1>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "var(--text-sec)", marginBottom: "0.5rem", lineHeight: 1.7, maxWidth: "600px" }}>
          A personal reference for camping trips — gear I use, where to get it, and checklists for before and after the trip. Based in Ontario (Hamilton / Stoney Creek area).
        </p>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "var(--text-sec)", marginBottom: "3rem", opacity: 0.6 }}>
          Last updated: {LAST_UPDATED}
        </p>

        {/* Progress bar */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "1.5rem 2rem",
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.1em" }}>PRE-TRIP PACKED</span>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)" }}>{checkedGear} / {totalGear}</span>
            </div>
            <div style={{ height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(checkedGear / totalGear) * 100}%`, background: "var(--cyan)", borderRadius: "2px", transition: "width 0.3s ease" }} />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--purple)", letterSpacing: "0.1em" }}>POST-TRIP DONE</span>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--text-sec)" }}>{afterCheckedCount} / {afterTotal}</span>
            </div>
            <div style={{ height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(afterCheckedCount / afterTotal) * 100}%`, background: "var(--purple)", borderRadius: "2px", transition: "width 0.3s ease" }} />
            </div>
          </div>
          <button
            onClick={resetAll}
            style={{
              fontFamily: "var(--font-space-mono)",
              fontSize: "0.62rem",
              color: "var(--text-sec)",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              padding: "0.4rem 1rem",
              cursor: "none",
              letterSpacing: "0.08em",
              transition: "border-color 0.2s, color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--pink)"; e.currentTarget.style.color = "var(--pink)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-sec)"; }}
          >
            RESET ALL
          </button>
        </div>

        {/* My Gear */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--text-sec)", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
            MY GEAR
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="mygear-grid">
            {MY_GEAR.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
                {/* Image */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "var(--chip-bg)", overflow: "hidden" }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    unoptimized
                    style={{ objectFit: "contain", padding: "1rem" }}
                  />
                </div>
                {/* Info */}
                <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: item.color, letterSpacing: "0.12em", display: "block", marginBottom: "0.35rem" }}>
                      {item.icon} {item.category.toUpperCase()}
                    </span>
                    <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", lineHeight: 1.3 }}>
                      {item.name}
                    </span>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {item.specs.map((spec, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                        <span style={{ color: item.color, fontSize: "0.6rem", marginTop: "0.35em", flexShrink: 0 }}>▸</span>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.78rem", color: "var(--text-sec)", lineHeight: 1.5 }}>{spec}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)", letterSpacing: "0.08em" }}>{item.where}</span>
                    <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: item.color, marginLeft: "auto", letterSpacing: "0.08em" }}>VIEW →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Gear categories */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--text-sec)", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
            PRE-TRIP CHECKLIST
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))", gap: "1.25rem" }} className="camping-grid">
            {GEAR_CATEGORIES.map((cat) => {
              const catChecked = cat.items.filter((i) => checked[i.id]).length;
              return (
                <div
                  key={cat.label}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "1.5rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1rem" }}>{cat.icon}</span>
                      <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.62rem", color: cat.color, letterSpacing: "0.15em" }}>{cat.label}</span>
                    </div>
                    <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.6rem", color: "var(--text-sec)" }}>
                      {catChecked}/{cat.items.length}
                    </span>
                  </div>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {cat.items.map((item) => (
                      <li
                        key={item.id}
                        style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "none" }}
                        onClick={() => toggle(item.id)}
                      >
                        {/* Checkbox */}
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "4px",
                            border: `1.5px solid ${checked[item.id] ? cat.color : "var(--border)"}`,
                            background: checked[item.id] ? cat.color : "transparent",
                            flexShrink: 0,
                            marginTop: "0.15em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s ease",
                          }}
                        >
                          {checked[item.id] && (
                            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                              <path d="M1 3.5L3.5 6L8 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <span
                            style={{
                              fontFamily: "var(--font-dm-sans)",
                              fontSize: "0.88rem",
                              color: checked[item.id] ? "var(--text-sec)" : "var(--text)",
                              textDecoration: checked[item.id] ? "line-through" : "none",
                              lineHeight: 1.5,
                              transition: "color 0.15s, text-decoration 0.15s",
                              display: "block",
                            }}
                          >
                            {item.text}
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.15rem", flexWrap: "wrap" }}>
                            <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: cat.color, opacity: 0.7 }}>
                              {item.where}
                            </span>
                            {item.note && (
                              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "var(--text-sec)", opacity: 0.7 }}>
                                · {item.note}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* After camping */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--text-sec)", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
            POST-TRIP CHECKLIST
          </div>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1.75rem 2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--purple), transparent)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "1rem" }}>🏕</span>
              <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.65rem", color: "var(--purple)", letterSpacing: "0.15em" }}>AFTER YOU GET HOME</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "0.6rem" }} className="after-grid">
              {AFTER_CAMPING.map((item) => (
                <div
                  key={item.id}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "none", padding: "0.5rem 0" }}
                  onClick={() => toggleAfter(item.id)}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "4px",
                      border: `1.5px solid ${afterChecked[item.id] ? "var(--purple)" : "var(--border)"}`,
                      background: afterChecked[item.id] ? "var(--purple)" : "transparent",
                      flexShrink: 0,
                      marginTop: "0.15em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {afterChecked[item.id] && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.88rem",
                        color: afterChecked[item.id] ? "var(--text-sec)" : "var(--text)",
                        textDecoration: afterChecked[item.id] ? "line-through" : "none",
                        lineHeight: 1.5,
                        display: "block",
                        transition: "color 0.15s",
                      }}
                    >
                      {item.text}
                    </span>
                    {item.note && (
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "var(--text-sec)", opacity: 0.65 }}>
                        {item.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Where to buy */}
        <div>
          <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.7rem", color: "var(--text-sec)", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
            WHERE TO GET GEAR — ONTARIO
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }} className="store-grid">
            {WHERE_TO_BUY.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "1.25rem 1.5rem",
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--cyan)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                  <span style={{ fontSize: "1.1rem" }}>{store.icon}</span>
                  <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>{store.name}</span>
                </div>
                <span style={{ fontFamily: "var(--font-space-mono)", fontSize: "0.58rem", color: "var(--cyan)", letterSpacing: "0.1em", display: "block", marginBottom: "0.4rem" }}>
                  {store.type.toUpperCase()}
                </span>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.82rem", color: "var(--text-sec)", lineHeight: 1.6, margin: 0 }}>
                  {store.note}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mygear-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .mygear-grid { grid-template-columns: 1fr !important; }
          .camping-grid { grid-template-columns: 1fr !important; }
          .after-grid { grid-template-columns: 1fr !important; }
          .store-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
