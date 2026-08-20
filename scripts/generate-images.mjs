/**
 * Generates SVG placeholder assets for GOULD GROUP ENTERPRISES LLC.
 * Prefer `npm run images:unsplash` for real photography.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

const colors = {
  primary: "#111827",
  secondary: "#DC2626",
  accent: "#F59E0B",
  soft: "#EFF3F8",
  white: "#FFFFFF",
  muted: "#64748B",
};

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 56" fill="none">
  <rect x="0" y="4" width="48" height="48" rx="10" fill="${colors.primary}"/>
  <text x="24" y="34" text-anchor="middle" fill="${colors.white}" font-family="system-ui, sans-serif" font-size="16" font-weight="800">GG</text>
  <rect x="40" y="40" width="8" height="8" rx="2" fill="${colors.secondary}"/>
  <text x="62" y="26" fill="${colors.primary}" font-family="system-ui, sans-serif" font-size="18" font-weight="800" letter-spacing="0.5">GOULD GROUP</text>
  <text x="62" y="44" fill="${colors.muted}" font-family="system-ui, sans-serif" font-size="11" font-weight="600" letter-spacing="1.8">ENTERPRISES LLC</text>
</svg>`;

fs.mkdirSync(path.join(PUBLIC, "logo"), { recursive: true });
fs.writeFileSync(path.join(PUBLIC, "logo", "logo.svg"), logoSvg);
console.log("Generated logo/logo.svg");
