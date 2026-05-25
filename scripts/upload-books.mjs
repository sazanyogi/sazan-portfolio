import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { resolve, basename } from "path";

// load .env.local — strips quotes and export prefix
readFileSync(resolve(import.meta.dirname, "../.env.local"), "utf8")
  .split("\n")
  .forEach(line => {
    const clean = line.replace(/^export\s+/, "").trim();
    const eq = clean.indexOf("=");
    if (eq > 0) {
      const key = clean.slice(0, eq).trim();
      let val = clean.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (key) process.env[key] = val;
    }
  });

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN not found in .env.local");
  process.exit(1);
}

const files = [
  "../Books/Goodbye, Things_ On Minimalist Living.pdf",
  "../Books/Rich Dad, Poor Dad.pdf",
];

for (const rel of files) {
  const abs = resolve(import.meta.dirname, rel);
  const name = basename(abs);
  const data = readFileSync(abs);
  console.log(`Uploading ${name}...`);
  const blob = await put(`books/${name}`, data, { access: "public" });
  console.log(`  → ${blob.url}\n`);
}
