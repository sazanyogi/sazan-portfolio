import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title");
  const year  = req.nextUrl.searchParams.get("year");
  const key   = process.env.TMDB_API_KEY;

  if (!key || !title) return NextResponse.json({ poster: "" });

  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(title)}&year=${year ?? ""}&include_adult=false&page=1`;
    const res  = await fetch(url, { next: { revalidate: 604800 } });
    const json = await res.json();
    const path = (json.results?.[0]?.poster_path as string) ?? "";
    return NextResponse.json({ poster: path ? `https://image.tmdb.org/t/p/w342${path}` : "" });
  } catch {
    return NextResponse.json({ poster: "" });
  }
}
