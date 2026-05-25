import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { SESSION_SECRET } from "@/config/auth";

export async function POST(request: Request) {
  const jar = await cookies();
  if (jar.get("me_session")?.value !== SESSION_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file") as File | null;

  if (!file || file.type !== "application/pdf") {
    return Response.json({ error: "PDF file required" }, { status: 400 });
  }

  const blob = await put(`books/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return Response.json({ url: blob.url });
}
