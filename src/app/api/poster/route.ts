import { NextRequest, NextResponse } from "next/server";

type WikiResponse = {
  query: {
    pages: Record<string, {
      thumbnail?: { source: string };
    }>;
  };
};

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title");
  const year  = req.nextUrl.searchParams.get("year");
  if (!title) return NextResponse.json({ poster: "" });

  // Try exact title first, then "Title film" variant
  const queries = [title, `${title} film`, year ? `${title} (${year} film)` : null].filter(Boolean) as string[];

  for (const q of queries) {
    try {
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(q)}&prop=pageimages&format=json&pithumbsize=400&origin=*`;
      const res  = await fetch(url, { next: { revalidate: 2592000 } });
      const json = await res.json() as WikiResponse;
      const pages = Object.values(json.query.pages);
      const poster = pages[0]?.thumbnail?.source ?? "";
      if (poster && !poster.includes("Red_pog") && !poster.includes("Commons-logo")) {
        return NextResponse.json({ poster });
      }
    } catch {
      continue;
    }
  }

  return NextResponse.json({ poster: "" });
}
