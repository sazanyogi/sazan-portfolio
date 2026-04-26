"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const FAVOURITE = [
  "2J9A1444.jpg","2J9A1533.jpg","2J9A4458-01.jpeg","2J9A4704-01.jpeg",
  "2J9A5477.jpg","2J9A5568.jpg","2J9A5617.jpg","2J9A5623.jpg",
  "2J9A7876.jpg","558865190_122115230912992815_6176643607160459323_n.jpg",
];

const NEPAL_CUP = [
  "2J9A7237.jpg","2J9A7308.jpg","2J9A7333.jpg","2J9A7343.jpg","2J9A7352.jpg",
  "2J9A7363.jpg","2J9A7386.jpg","2J9A7392.jpg","2J9A7398.jpg","2J9A7483.jpg",
  "2J9A7484.jpg","2J9A7515.jpg","2J9A7522.jpg","2J9A7571.jpg","2J9A7572.jpg",
  "2J9A7579.jpg","2J9A7580.jpg","2J9A7596.jpg","2J9A7610.jpg","2J9A7619.jpg",
  "2J9A7620.jpg","2J9A7628.jpg","2J9A7719.jpg","2J9A7773.jpg","2J9A7775.jpg",
  "2J9A7778.jpg","2J9A7779.jpg","2J9A7781.jpg","2J9A7791.jpg","2J9A7805.jpg",
  "2J9A7806.jpg","2J9A7815.jpg","2J9A7968.jpg","2J9A7969.jpg","2J9A7972.jpg",
  "2J9A7977.jpg","2J9A8057.jpg","2J9A8355.jpg","2J9A8397.jpg","2J9A8432.jpg",
  "2J9A9375.jpg","2J9A9377.jpg","2J9A9505.jpg","2J9A9576.jpg","2J9A9831.jpg",
];

type Photo = { src: string; alt: string };

const ALL_PHOTOS: Photo[] = [
  ...FAVOURITE.map((f) => ({ src: `/photos/favourite/${f}`, alt: "Sajan Yogi Photography" })),
  ...NEPAL_CUP.map((f) => ({ src: `/photos/nepal-cup/${f}`, alt: "Nepal Cup" })),
];

const TABS = [
  { label: "All", photos: ALL_PHOTOS },
  { label: "Favourites", photos: FAVOURITE.map((f) => ({ src: `/photos/favourite/${f}`, alt: "Sajan Yogi Photography" })) },
  { label: "Nepal Cup", photos: NEPAL_CUP.map((f) => ({ src: `/photos/nepal-cup/${f}`, alt: "Nepal Cup" })) },
];

function Lightbox({ photos, index, onClose, onPrev, onNext }: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          background: "none",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          fontSize: "1.1rem",
          cursor: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{
          position: "absolute",
          left: "1.5rem",
          background: "none",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          fontSize: "1.2rem",
          cursor: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ←
      </button>

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "88vh",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Image
          src={photos[index].src}
          alt={photos[index].alt}
          width={1200}
          height={800}
          style={{
            maxWidth: "90vw",
            maxHeight: "88vh",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: "absolute",
          right: "1.5rem",
          background: "none",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          fontSize: "1.2rem",
          cursor: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        →
      </button>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "monospace",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.1em",
        }}
      >
        {index + 1} / {photos.length}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = TABS[activeTab].photos;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length)), [photos.length]);
  const nextPhoto = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % photos.length)), [photos.length]);

  return (
    <section
      id="photos"
      style={{
        padding: "8rem clamp(1.5rem, 6vw, 8rem)",
        background: "var(--surface)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <div
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "0.75rem",
            color: "var(--pink)",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          PHOTOGRAPHY
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "2rem",
          }}
        >
          Through the Lens
        </h2>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              style={{
                fontFamily: "var(--font-space-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                padding: "0.4rem 1rem",
                borderRadius: "2rem",
                border: "1px solid",
                borderColor: activeTab === i ? "var(--pink)" : "var(--border)",
                background: activeTab === i ? "var(--pink)" : "transparent",
                color: activeTab === i ? "var(--bg)" : "var(--text-sec)",
                cursor: "none",
                transition: "all 0.2s",
              }}
            >
              {tab.label} ({tab.photos.length})
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div
        style={{
          columns: "3 280px",
          gap: "12px",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            onClick={() => openLightbox(i)}
            style={{
              breakInside: "avoid",
              marginBottom: "12px",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "none",
              position: "relative",
              display: "block",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={600}
              height={400}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 0.4s ease, filter 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.85)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(1)";
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}
