/**
 * Downloads unique Unsplash images for homepage-only slots:
 * the 18 category tiles, the 3 marketing banners, and the 6 shop-by-need tiles.
 * Does NOT touch hero or product images, and skips any photo whose bytes already
 * exist under public/products or public/hero.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

/** Preferred photo per slot, matched to the category or need it represents */
const TARGETS = [
  { file: "categories/home.jpg", width: 800, photoId: "photo-1600607687920-4e2a09cf159d" },
  { file: "categories/kitchen.jpg", width: 800, photoId: "photo-1556912172-45b7abe8b7e1" },
  { file: "categories/bathroom.jpg", width: 800, photoId: "photo-1552321554-5fefe8c9ef14" },
  { file: "categories/electronics.jpg", width: 800, photoId: "photo-1519389950473-47ba0277781c" },
  { file: "categories/office.jpg", width: 800, photoId: "photo-1497366811353-6870744d04b2" },
  { file: "categories/workspace.jpg", width: 800, photoId: "photo-1593062096033-9a26b09da705" },
  { file: "categories/beauty.jpg", width: 800, photoId: "photo-1596462502278-27bfdc403348" },
  { file: "categories/sports.jpg", width: 800, photoId: "photo-1571019614242-c5c5dee9f50b" },
  { file: "categories/gaming.jpg", width: 800, photoId: "photo-1542751371-adc38448a05e" },
  { file: "categories/fashion.jpg", width: 800, photoId: "photo-1483985988355-763728e1935b" },
  { file: "categories/baby.jpg", width: 800, photoId: "photo-1519689680058-324335c77eba" },
  { file: "categories/pet.jpg", width: 800, photoId: "photo-1450778869180-41d0601e046e" },
  { file: "categories/health.jpg", width: 800, photoId: "photo-1544367567-0f2fcb009e0b" },
  { file: "categories/outdoor.jpg", width: 800, photoId: "photo-1600566753086-00f18fb6b3ea" },
  { file: "categories/travel.jpg", width: 800, photoId: "photo-1469854523086-cc02fe5d8800" },
  { file: "categories/educational-toys.jpg", width: 800, photoId: "photo-1503454537195-1dcabb73ffb9" },
  { file: "categories/storage.jpg", width: 800, photoId: "photo-1595428774223-ef52624120d2" },
  { file: "categories/lighting.jpg", width: 800, photoId: "photo-1507473885765-e6ed057f782c" },
  { file: "banners/lifestyle.jpg", width: 1600, photoId: "photo-1618220179428-22790b461013" },
  { file: "banners/featured.jpg", width: 1600, photoId: "photo-1600607687939-ce8a6c25118c" },
  { file: "banners/about.jpg", width: 1600, photoId: "photo-1600566753190-17f0baa2a6c3" },
  { file: "banners/need-organize.jpg", width: 1600, photoId: "photo-1616046229478-9901c5536a45" },
  { file: "banners/need-workspace.jpg", width: 1600, photoId: "photo-1486312338219-ce68d2c6f44d" },
  { file: "banners/need-kitchen.jpg", width: 1600, photoId: "photo-1556911220-e15b29be8c8f" },
  { file: "banners/need-outdoor.jpg", width: 1600, photoId: "photo-1510312305653-8ed496efae75" },
  { file: "banners/need-tech.jpg", width: 1600, photoId: "photo-1518770660439-4636190af475" },
  { file: "banners/need-family.jpg", width: 1600, photoId: "photo-1503676260728-1c00da094a0b" },
];

/** Backup photos used whenever a preferred one fails or collides */
const PHOTO_POOL = [
  "photo-1600210491892-03d54c0aaf87",
  "photo-1600210492493-0946911123ea",
  "photo-1600566752355-35792bedcfea",
  "photo-1600585154363-67eb9e2e2099",
  "photo-1600585154084-4e5fe7c39198",
  "photo-1600573472550-8090b5e0745e",
  "photo-1600566753376-12c8ab7fb75b",
  "photo-1600607686527-6fb886090705",
  "photo-1604014237800-1c9102c219da",
  "photo-1602658327972-85bb6521a086",
  "photo-1603400522537-35e25a14bc1e",
  "photo-1596683705523-eb49540c3934",
  "photo-1589898362790-edba11d34869",
  "photo-1590439471364-192aa70c0b53",
  "photo-1587043862100-01920db231ba",
  "photo-1595182939836-5d4ba24ae7bf",
  "photo-1581578731548-c64695cc6952",
  "photo-1574421233376-06f2ccf017f7",
  "photo-1571896349842-33c89424de2d",
  "photo-1560185127-6ed189bf02f4",
  "photo-1560185007-cde436f6a4d0",
  "photo-1558505780-1e584fab3ede",
  "photo-1556229010-6c3f2c9ca5f8",
  "photo-1556228578-8c89e6adf883",
  "photo-1540555700478-4be289fbecef",
  "photo-1505691938895-1758d7feb511",
  "photo-1496890185067-72d7d9af66b1",
  "photo-1484154218962-a197022b5858",
  "photo-1507652313519-d4e9174996dd",
  "photo-1617806118233-18e1de247200",
  "photo-1617811449482-31093c8cee16",
  "photo-1616627502968-858f7b39f574",
  "photo-1616663717839-2fea42e1a1f6",
  "photo-1615529328331-f8917597711f",
  "photo-1615529182904-14819c35db37",
  "photo-1619263719761-165c773ee5df",
  "photo-1620000190821-abd8f262b86f",
  "photo-1621468644541-deea173bd43e",
  "photo-1630381260593-45e8f922997b",
  "photo-1638232928539-6e91c47ddec5",
  "photo-1608651061499-ff031fbf6645",
  "photo-1609840112990-4265448268d1",
  "photo-1639298107786-fc9e5880016f",
  "photo-1639298107851-058984903954",
  "photo-1639298108944-76a403a7c38d",
  "photo-1639298109207-5a9ccc254481",
  "photo-1650481093978-6cc58e4649f4",
  "photo-1664881353843-769f951ff470",
  "photo-1666934209606-a955a12edd63",
  "photo-1674924389976-005a3dba2896",
  "photo-1687951812646-efa29195a80d",
  "photo-1700590906201-2739ba9efbe9",
  "photo-1707291173710-10514ef55814",
  "photo-1716078103276-133ae3e98424",
  "photo-1724847885015-be191f1a47ef",
  "photo-1758192496546-dc59dd3baa59",
  "photo-1758239873506-82d0e76244f6",
  "photo-1760722974657-f64bce2f9cc5",
  "photo-1761992157695-f0dd8d6d2db6",
  "photo-1764551355886-d5b25e4b90b6",
  "photo-1764551385451-81fbf705e64c",
  "photo-1766727923581-d4df2f4e9308",
  "photo-1766727923586-b37a346bfc76",
  "photo-1766727923624-2e8eede5aa8c",
  "photo-1766727923650-951353d8255f",
  "photo-1766727923667-4686db7e9bcb",
  "photo-1766727923683-8cc366dfe23b",
  "photo-1766727923864-730fd98dcce2",
  "photo-1769028715040-16cb345ced84",
  "photo-1769770639042-05e6b54a70cb",
  "photo-1769770648224-114810619496",
  "photo-1772476361253-90a9be5e0c19",
  "photo-1773867567838-3292f16e4aca",
];

function unsplashUrl(photoId, width) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&q=85&w=${width}&auto=format&fit=crop`;
}

function loadExistingHashes() {
  const hashes = new Set();
  const patterns = ["products/*-1.jpg", "products/*-2.jpg", "hero/*.jpg"];
  for (const pattern of patterns) {
    const dir = pattern.split("/")[0];
    const glob = pattern.replace(`${dir}/`, "");
    const folder = path.join(PUBLIC, dir);
    if (!fs.existsSync(folder)) continue;
    for (const name of fs.readdirSync(folder)) {
      if (!name.endsWith(".jpg")) continue;
      if (glob.startsWith("*") && !name.endsWith(glob.slice(1))) continue;
      const buf = fs.readFileSync(path.join(folder, name));
      hashes.add(crypto.createHash("sha256").update(buf).digest("hex"));
    }
  }
  return hashes;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "GouldGroupEnterprisesLLC/1.0 (homepage-images)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("File too small");
  return buf;
}

async function main() {
  const existingHashes = loadExistingHashes();
  console.log(`Loaded ${existingHashes.size} existing product/hero hashes to avoid.`);
  console.log(`Downloading ${TARGETS.length} homepage images...\n`);

  const pool = [...new Set(PHOTO_POOL)];
  const usedPhotoIds = new Set();
  const usedHashes = new Set();
  const failedIds = new Set();
  let poolIndex = 0;

  const getNextPhoto = () => {
    while (poolIndex < pool.length) {
      const id = pool[poolIndex++];
      if (!usedPhotoIds.has(id) && !failedIds.has(id)) return id;
    }
    throw new Error("Ran out of unique photos in pool");
  };

  let success = 0;
  let failed = 0;

  for (const target of TARGETS) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    let saved = false;
    let attempts = 0;
    let preferred = target.photoId;

    while (!saved && attempts < 30) {
      attempts++;
      let photoId = preferred;
      preferred = null;

      if (!photoId || usedPhotoIds.has(photoId) || failedIds.has(photoId)) {
        try {
          photoId = getNextPhoto();
        } catch {
          break;
        }
      }

      try {
        const buf = await download(unsplashUrl(photoId, target.width));
        const hash = crypto.createHash("sha256").update(buf).digest("hex");

        if (usedHashes.has(hash) || existingHashes.has(hash)) {
          usedPhotoIds.add(photoId);
          continue;
        }

        fs.writeFileSync(dest, buf);
        usedPhotoIds.add(photoId);
        usedHashes.add(hash);
        saved = true;
        success++;
        console.log(`✓ ${target.file} ← ${photoId}`);
      } catch (err) {
        failedIds.add(photoId);
        console.warn(`  retry ${target.file} (${photoId}): ${err.message}`);
      }
    }

    if (!saved) {
      failed++;
      console.error(`✗ failed: ${target.file}`);
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
