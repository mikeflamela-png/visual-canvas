import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { campaigns } from "@/lib/site-data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: async () => {
    const paths = [
      "/", "/campaign-builder", "/preview-reality", "/productions",
      "/case-studies", "/about", "/contact",
      ...campaigns.map((c) => `/case-studies/${c.slug}`),
    ];
    const urls = paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`).join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
    return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
  }}},
});
