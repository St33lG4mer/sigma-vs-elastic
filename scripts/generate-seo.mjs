import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const packageJsonPath = resolve(projectRoot, "package.json");
const robotsPath = resolve(projectRoot, "public", "robots.txt");
const sitemapPath = resolve(projectRoot, "public", "sitemap.xml");

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const fallbackUrl = packageJson.homepage || "https://sigma-vs-elastic.kaspergissel.dk";
const rawSiteUrl = process.env.VITE_SITE_URL || fallbackUrl;
const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, "");

let siteUrl;

try {
  siteUrl = new URL(normalizedSiteUrl).toString().replace(/\/+$/, "");
} catch (error) {
  throw new Error(`Invalid site URL "${rawSiteUrl}". Set VITE_SITE_URL or package.json.homepage.`);
}

const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n</urlset>\n`;

writeFileSync(robotsPath, robotsTxt, "utf8");
writeFileSync(sitemapPath, sitemapXml, "utf8");
