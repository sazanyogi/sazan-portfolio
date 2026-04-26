import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Photos — Sajan Yogi",
  description: "Photography by Sajan Yogi — favourites and Nepal Cup.",
};

export default function PhotosPage() {
  return (
    <main style={{ paddingTop: "64px" }}>
      <Gallery />
    </main>
  );
}
