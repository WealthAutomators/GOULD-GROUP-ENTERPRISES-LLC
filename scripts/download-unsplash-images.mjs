/**
 * Downloads unique Unsplash images for GOULD GROUP ENTERPRISES LLC.
 * Hero, categories, banners, shop-by-need tiles, products (×2), and review photos.
 * No API key required — uses the public images.unsplash.com CDN.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

/** Curated Unsplash photo IDs grouped by theme */
const POOLS = {
  hero: [
    "photo-1600585154526-990dced4db0d",
    "photo-1497366754035-f200968a6e72",
    "photo-1441986300917-64674bd600d8",
    "photo-1556912173-46c336c7fd55",
    "photo-1616046229478-9901c5536a45",
  ],
  home: [
    "photo-1600607687920-4e2a09cf159d",
    "photo-1600585152915-d208bec867a1",
    "photo-1618221381711-42ca8ab6e908",
    "photo-1578500494198-246f612d3b3d",
    "photo-1595526114035-0d45ed16cfbf",
    "photo-1592078615290-033ee584e267",
    "photo-1584100936595-c0654b55a2e2",
    "photo-1615874959474-d609969a20ed",
    "photo-1618220179428-22790b461013",
    "photo-1581783898377-1c85bf937427",
    "photo-1631889993959-41b4e9c6e3c5",
    "photo-1600585154084-4e5fe7c39198",
    "photo-1615529182904-14819c35db37",
    "photo-1600607686527-6fb886090705",
  ],
  kitchen: [
    "photo-1556912172-45b7abe8b7e1",
    "photo-1556910103-1c02745aae4d",
    "photo-1584568694244-14fbdf83bd30",
    "photo-1544787219-7f47ccb76574",
    "photo-1495474472287-4d71bcdd2085",
    "photo-1596040033229-a9821ebd058d",
    "photo-1556911220-e15b29be8c8f",
    "photo-1562967916-eb82221dfb92",
    "photo-1565183997392-2f6f122e5912",
    "photo-1571934811356-5cc061b6821f",
    "photo-1490818387583-1baba5e638af",
    "photo-1514432324607-a09d9b4aefdd",
    "photo-1517668808822-9ebb02f2a0e6",
    "photo-1600585154340-be6161a56a0c",
    "photo-1512621776951-a57141f2eefd",
    "photo-1414235077428-338989a2e8c0",
    "photo-1504674900247-0877df9cc836",
  ],
  bathroom: [
    "photo-1552321554-5fefe8c9ef14",
    "photo-1584622650111-993a426fbf0a",
    "photo-1616486338812-3dadae4b4ace",
    "photo-1620626011761-996317b8d101",
    "photo-1556228453-efd6c1ff04f6",
    "photo-1522338242992-e1a54906a8da",
  ],
  electronics: [
    "photo-1519389950473-47ba0277781c",
    "photo-1609081219090-a6d81d3085bf",
    "photo-1550009158-9ebf69173e03",
    "photo-1527443224154-c4a3942d3acf",
    "photo-1558002038-1055907df827",
    "photo-1588508065123-287b28e013da",
    "photo-1498049794561-7780e7231661",
    "photo-1625948515291-69613efd103f",
    "photo-1556656793-08538906a9f8",
    "photo-1593640408182-31c70c8268f5",
    "photo-1572569511254-d8f925fe2cbb",
    "photo-1588872657578-7efd1f1555ed",
    "photo-1518770660439-4636190af475",
  ],
  office: [
    "photo-1497366811353-6870744d04b2",
    "photo-1454165804606-c3d57bc86b40",
    "photo-1450101499163-c8848c66ca85",
    "photo-1586281380349-632531db7ed4",
    "photo-1484480974693-6ca0a78fb36b",
    "photo-1497366216548-37526070297c",
    "photo-1509042239860-f550ce710b93",
    "photo-1460925895917-afdab827c52f",
  ],
  workspace: [
    "photo-1593062096033-9a26b09da705",
    "photo-1527864550417-7fd91fc51a46",
    "photo-1524758631624-e2822e304c36",
    "photo-1497366754035-f200968a6e72",
    "photo-1496181133206-80ce9b88a853",
    "photo-1486312338219-ce68d2c6f44d",
    "photo-1517336714731-489689fd1ca8",
    "photo-1432888498266-38ffec3eaf0a",
    "photo-1531973576160-7125cd663d86",
    "photo-1497215728101-856f4ea42174",
    "photo-1498050108023-c5249f4df085",
  ],
  beauty: [
    "photo-1596462502278-27bfdc403348",
    "photo-1522338242992-e1a54906a8da",
    "photo-1512496015851-a90fb38ba796",
    "photo-1612817288484-6f916006741a",
    "photo-1522335789203-aabd1fc54bc9",
    "photo-1583241800698-e8ab01830a07",
    "photo-1519699047748-de8e457a634e",
    "photo-1522337660859-02fbefca4702",
    "photo-1571781926291-c477ebfd024b",
    "photo-1556228720-195a672e8a03",
  ],
  sports: [
    "photo-1571019614242-c5c5dee9f50b",
    "photo-1517836357463-d25dfeac3438",
    "photo-1602143407151-7111542de6e8",
    "photo-1601925260368-ae2f83cf8b7f",
    "photo-1523362628745-0c100150b504",
    "photo-1598289431512-b97b0917affc",
    "photo-1534438327276-14e5300c3a48",
    "photo-1518611012118-696072aa579a",
    "photo-1544367567-0f2fcb009e0b",
  ],
  health: [
    "photo-1544367567-0f2fcb009e0b",
    "photo-1540497077202-7c8a3999166f",
    "photo-1506126613408-eca07ce68773",
    "photo-1571019613454-1cb2f99b2d8b",
    "photo-1512621776951-a57141f2eefd",
  ],
  gaming: [
    "photo-1542751371-adc38448a05e",
    "photo-1606144042614-b2417e99c4e3",
    "photo-1612287230202-1ff1d85d1bdf",
    "photo-1538481199705-c710c4e965fc",
    "photo-1511512578047-dfb367046420",
    "photo-1550745165-9bc0b252726f",
  ],
  fashion: [
    "photo-1483985988355-763728e1935b",
    "photo-1553062407-98eeb64c6a62",
    "photo-1523275335684-37898b6baf30",
    "photo-1521369909029-2afed882baee",
    "photo-1590874103328-eac38a683ce7",
    "photo-1434389677669-e08b4cac3105",
    "photo-1519699047748-de8e457a634e",
  ],
  baby: [
    "photo-1519689680058-324335c77eba",
    "photo-1584100936595-c0654b55a2e2",
    "photo-1590874103328-eac38a683ce7",
    "photo-1503454537195-1dcabb73ffb9",
    "photo-1587654780291-39c9404d746b",
  ],
  pet: [
    "photo-1450778869180-41d0601e046e",
    "photo-1601758228041-f3b2795255f1",
    "photo-1583511655857-d19b40a7a54e",
    "photo-1583337130417-3346a1be7dee",
    "photo-1548199973-03cce0bbc87b",
    "photo-1587300003388-59208cc962cb",
  ],
  outdoor: [
    "photo-1600566753086-00f18fb6b3ea",
    "photo-1533759413974-9e15f3b745ac",
    "photo-1504280390367-361c6d9f38f4",
    "photo-1600210492486-724fe5c67fb0",
    "photo-1523987355523-c7b5b0dd90a7",
    "photo-1510312305653-8ed496efae75",
    "photo-1478131143081-80f7f84ca84d",
    "photo-1537905569824-f89f14cceb68",
    "photo-1493246507139-91e8fad9978e",
    "photo-1416879595882-3373a0480b5b",
  ],
  travel: [
    "photo-1469854523086-cc02fe5d8800",
    "photo-1565026057447-bc90a3dceb87",
    "photo-1583241800698-e8ab01830a07",
    "photo-1553062407-98eeb64c6a62",
    "photo-1523471826770-c437b4636fe6",
    "photo-1488646953014-85cb44e25828",
    "photo-1501555088652-021faa106b9b",
  ],
  toys: [
    "photo-1503454537195-1dcabb73ffb9",
    "photo-1588072432836-e10032774350",
    "photo-1587654780291-39c9404d746b",
    "photo-1566576912321-d58ddd7a6088",
    "photo-1606092195730-5d7b9af1efc5",
    "photo-1611532736597-de2d4265fba3",
    "photo-1503676260728-1c00da094a0b",
  ],
  storage: [
    "photo-1595428774223-ef52624120d2",
    "photo-1558618666-fcd25c85cd64",
    "photo-1505693416388-ac5ce068fe85",
    "photo-1616046229478-9901c5536a45",
    "photo-1594026112284-02bb6f3352fe",
    "photo-1600573472550-8090b5e0745e",
    "photo-1600566753376-12c8ab7fb75b",
  ],
  lighting: [
    "photo-1507473885765-e6ed057f782c",
    "photo-1507003211169-0a1dd7228f2d",
    "photo-1543198126-a8ad8e47fb22",
    "photo-1631049307264-da0ec9d70304",
    "photo-1513506003901-1e6a229e2d15",
    "photo-1524484485831-a92ffc0de03f",
    "photo-1581092160562-40aa08e78837",
  ],
  people: [
    "photo-1494790108377-be9c29b29330",
    "photo-1500648767791-00dcc994a43e",
    "photo-1438761681033-6461ffad8d80",
    "photo-1472099645785-5658abf4ff4e",
    "photo-1517841905240-472988babdf9",
    "photo-1534528741775-53994a69daeb",
    "photo-1506794778202-cad84cf45f1d",
    "photo-1544005313-94ddf0286df2",
    "photo-1521119989659-a83eee488004",
    "photo-1489424731084-a5d8b219a5bb",
    "photo-1524504388940-b1c1722653e1",
    "photo-1539571696357-5a69c17a67c6",
  ],
  lifestyle: [
    "photo-1600210491892-03d54c0aaf87",
    "photo-1600210492493-0946911123ea",
    "photo-1600566752355-35792bedcfea",
    "photo-1600585154363-67eb9e2e2099",
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
    "photo-1619263719761-165c773ee5df",
    "photo-1620000190821-abd8f262b86f",
    "photo-1621468644541-deea173bd43e",
    "photo-1630381260593-45e8f922997b",
    "photo-1638232928539-6e91c47ddec5",
    "photo-1608651061499-ff031fbf6645",
    "photo-1609840112990-4265448268d1",
    "photo-1581091226825-a6a2a5aee158",
    "photo-1581094794329-c8112a89af12",
    "photo-1581092918056-0c4c3acd3789",
    "photo-1530124566582-a618bc2615dc",
    "photo-1504917595217-d4dc5ebe6122",
    "photo-1572981779307-38b8cabb2407",
    "photo-1504148455328-c376907d081c",
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
  ],
};

/** Category slug (data/categories.ts) → themed pool used for secondary product shots */
const CATEGORY_SLUG_POOL = {
  home: POOLS.home,
  kitchen: POOLS.kitchen,
  bathroom: POOLS.bathroom,
  electronics: POOLS.electronics,
  office: POOLS.office,
  workspace: POOLS.workspace,
  beauty: POOLS.beauty,
  sports: POOLS.sports,
  gaming: POOLS.gaming,
  fashion: POOLS.fashion,
  baby: POOLS.baby,
  pet: POOLS.pet,
  health: POOLS.health,
  outdoor: POOLS.outdoor,
  travel: POOLS.travel,
  "educational-toys": POOLS.toys,
  storage: POOLS.storage,
  lighting: POOLS.lighting,
};

/** Hero slides — home, workspace, and shopping/deals lifestyle */
const HERO_IMAGES = {
  "hero/hero-1.jpg": "photo-1600585154526-990dced4db0d",
  "hero/hero-2.jpg": "photo-1497366754035-f200968a6e72",
  "hero/hero-3.jpg": "photo-1441986300917-64674bd600d8",
};

/** Category tile image per category slug */
const CATEGORY_IMAGES = {
  home: "photo-1600607687920-4e2a09cf159d",
  kitchen: "photo-1556912172-45b7abe8b7e1",
  bathroom: "photo-1552321554-5fefe8c9ef14",
  electronics: "photo-1519389950473-47ba0277781c",
  office: "photo-1497366811353-6870744d04b2",
  workspace: "photo-1593062096033-9a26b09da705",
  beauty: "photo-1596462502278-27bfdc403348",
  sports: "photo-1571019614242-c5c5dee9f50b",
  gaming: "photo-1542751371-adc38448a05e",
  fashion: "photo-1483985988355-763728e1935b",
  baby: "photo-1519689680058-324335c77eba",
  pet: "photo-1450778869180-41d0601e046e",
  health: "photo-1544367567-0f2fcb009e0b",
  outdoor: "photo-1600566753086-00f18fb6b3ea",
  travel: "photo-1469854523086-cc02fe5d8800",
  "educational-toys": "photo-1503454537195-1dcabb73ffb9",
  storage: "photo-1595428774223-ef52624120d2",
  lighting: "photo-1507473885765-e6ed057f782c",
};

/** Marketing banners plus the shop-by-need tiles on the homepage */
const BANNER_IMAGES = {
  "banners/lifestyle.jpg": "photo-1618220179428-22790b461013",
  "banners/featured.jpg": "photo-1600607687939-ce8a6c25118c",
  "banners/about.jpg": "photo-1600566753190-17f0baa2a6c3",
  "banners/need-organize.jpg": "photo-1616046229478-9901c5536a45",
  "banners/need-workspace.jpg": "photo-1486312338219-ce68d2c6f44d",
  "banners/need-kitchen.jpg": "photo-1556911220-e15b29be8c8f",
  "banners/need-outdoor.jpg": "photo-1510312305653-8ed496efae75",
  "banners/need-tech.jpg": "photo-1518770660439-4636190af475",
  "banners/need-family.jpg": "photo-1503676260728-1c00da094a0b",
};

/** Explicit primary image per product slug for visual relevance */
const PRODUCT_PRIMARY = {
  // home
  "modular-wall-shelf-system": "photo-1600585152915-d208bec867a1",
  "cushioned-entryway-bench": "photo-1618221381711-42ca8ab6e908",
  "rotating-entryway-valet": "photo-1578500494198-246f612d3b3d",
  "woven-decor-basket-trio": "photo-1595526114035-0d45ed16cfbf",
  // kitchen
  "precision-kitchen-scale": "photo-1556910103-1c02745aae4d",
  "glass-meal-prep-system": "photo-1584568694244-14fbdf83bd30",
  "gooseneck-temp-kettle": "photo-1544787219-7f47ccb76574",
  "conical-burr-coffee-mill": "photo-1495474472287-4d71bcdd2085",
  "pull-out-cabinet-organizer": "photo-1596040033229-a9821ebd058d",
  // bathroom
  "vanity-drawer-organizer-set": "photo-1556228453-efd6c1ff04f6",
  "touchless-foaming-dispenser": "photo-1584622650111-993a426fbf0a",
  "rustproof-shower-shelf-tower": "photo-1616486338812-3dadae4b4ace",
  // electronics
  "nine-port-charging-station": "photo-1609081219090-a6d81d3085bf",
  "usb-c-docking-hub": "photo-1550009158-9ebf69173e03",
  "portable-fhd-display": "photo-1527443224154-c4a3942d3acf",
  "mini-smart-plug-quad": "photo-1558002038-1055907df827",
  // office
  "tiered-document-organizer": "photo-1454165804606-c3d57bc86b40",
  "rolling-file-caddy": "photo-1450101499163-c8848c66ca85",
  "magnetic-whiteboard-kit": "photo-1586281380349-632531db7ed4",
  // workspace
  "foldable-laptop-riser": "photo-1527864550417-7fd91fc51a46",
  "monitor-shelf-with-drawer": "photo-1524758631624-e2822e304c36",
  // beauty
  "trifold-led-vanity-mirror": "photo-1522338242992-e1a54906a8da",
  "rotating-cosmetic-tower": "photo-1512496015851-a90fb38ba796",
  "travel-makeup-train-case": "photo-1612817288484-6f916006741a",
  // sports
  "speed-agility-training-kit": "photo-1517836357463-d25dfeac3438",
  "insulated-sport-bottle-32oz": "photo-1602143407151-7111542de6e8",
  "cork-yoga-block-strap-set": "photo-1601925260368-ae2f83cf8b7f",
  // health
  "percussion-massage-gun": "photo-1540497077202-7c8a3999166f",
  "acupressure-recovery-mat": "photo-1506126613408-eca07ce68773",
  // gaming
  "rgb-controller-charging-dock": "photo-1606144042614-b2417e99c4e3",
  "console-cooling-stand": "photo-1612287230202-1ff1d85d1bdf",
  // fashion
  "water-repellent-crossbody-sling": "photo-1553062407-98eeb64c6a62",
  "matte-polarized-sport-sunglasses": "photo-1523275335684-37898b6baf30",
  // baby
  "nursery-caddy-organizer": "photo-1584100936595-c0654b55a2e2",
  "stroller-console-organizer": "photo-1590874103328-eac38a683ce7",
  // pet
  "elevated-pet-feeding-station": "photo-1601758228041-f3b2795255f1",
  "low-noise-pet-grooming-kit": "photo-1583511655857-d19b40a7a54e",
  "collapsible-pet-travel-kit": "photo-1583337130417-3346a1be7dee",
  // outdoor
  "rotomolded-cooler-25qt": "photo-1533759413974-9e15f3b745ac",
  "rechargeable-camp-lantern": "photo-1504280390367-361c6d9f38f4",
  "folding-camp-table-organizer": "photo-1600210492486-724fe5c67fb0",
  // travel
  "compression-packing-cube-set": "photo-1565026057447-bc90a3dceb87",
  "hanging-travel-toiletry-case": "photo-1583241800698-e8ab01830a07",
  // educational-toys
  "stem-circuit-lab-kit": "photo-1588072432836-e10032774350",
  "magnetic-tile-builder-set": "photo-1587654780291-39c9404d746b",
  "montessori-activity-board": "photo-1566576912321-d58ddd7a6088",
  // storage
  "stackable-storage-bin-system": "photo-1558618666-fcd25c85cd64",
  "under-bed-storage-bag-set": "photo-1505693416388-ac5ce068fe85",
  // lighting
  "motion-sensor-light-bar": "photo-1507003211169-0a1dd7228f2d",
  "rgb-corner-floor-lamp": "photo-1543198126-a8ad8e47fb22",
};

function unsplashUrl(photoId, width) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&q=85&w=${width}&auto=format&fit=crop`;
}

function parseProducts() {
  const content = fs.readFileSync(path.join(ROOT, "data", "products.ts"), "utf8");
  const blocks = content.split(/\n  \{/);
  const products = [];

  for (const block of blocks.slice(1)) {
    const slug = block.match(/slug: "([^"]+)"/)?.[1];
    const categorySlug = block.match(/categorySlug: "([^"]+)"/)?.[1];
    if (slug && categorySlug) products.push({ slug, categorySlug });
  }

  return products;
}

function buildTargets() {
  const products = parseProducts();
  const targets = [];

  for (const [file, photoId] of Object.entries(HERO_IMAGES)) {
    targets.push({ file, width: 2000, photoId });
  }

  for (const [slug, photoId] of Object.entries(CATEGORY_IMAGES)) {
    targets.push({ file: `categories/${slug}.jpg`, width: 800, photoId });
  }

  for (const [file, photoId] of Object.entries(BANNER_IMAGES)) {
    targets.push({ file, width: 1600, photoId });
  }

  // Walk each category pool so sibling products get different second shots
  const poolCursor = {};

  for (const product of products) {
    const primaryId = PRODUCT_PRIMARY[product.slug];
    const pool = CATEGORY_SLUG_POOL[product.categorySlug] || POOLS.lifestyle;
    const start = poolCursor[product.categorySlug] ?? 0;
    let secondaryId = pool[start % pool.length];

    for (let i = 0; i < pool.length; i++) {
      const candidate = pool[(start + i) % pool.length];
      if (candidate !== primaryId) {
        secondaryId = candidate;
        poolCursor[product.categorySlug] = start + i + 1;
        break;
      }
    }

    targets.push({
      file: `products/${product.slug}-1.jpg`,
      width: 900,
      photoId: primaryId,
      categorySlug: product.categorySlug,
    });
    targets.push({
      file: `products/${product.slug}-2.jpg`,
      width: 900,
      photoId: secondaryId,
      categorySlug: product.categorySlug,
    });
  }

  const reviewPool = [...POOLS.people, ...POOLS.lifestyle];
  for (let i = 1; i <= 8; i++) {
    targets.push({
      file: `reviews/review-${i}.jpg`,
      width: 600,
      photoId: reviewPool[i - 1] || reviewPool[0],
    });
  }

  return targets;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "GouldGroupEnterprisesLLC/1.0 (image-setup)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("File too small");
  return buf;
}

function getFallbackPool() {
  return [...new Set(Object.values(POOLS).flat())];
}

async function main() {
  const targets = buildTargets();
  console.log(`Downloading ${targets.length} Unsplash images...\n`);

  const usedPhotoIds = new Set();
  const usedHashes = new Set();
  const failedPhotoIds = new Set();
  const fallbackPool = getFallbackPool();

  // Scans from the start each time so an unused candidate is never burned
  const getFallback = (exclude) => {
    for (const id of fallbackPool) {
      if (!usedPhotoIds.has(id) && !failedPhotoIds.has(id) && id !== exclude) return id;
    }
    return null;
  };

  let success = 0;
  let failed = 0;

  for (const target of targets) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    let saved = false;
    const tryIds = [target.photoId, getFallback(target.photoId)].filter(Boolean);

    for (const photoId of tryIds) {
      if (usedPhotoIds.has(photoId)) continue;

      try {
        const buf = await download(unsplashUrl(photoId, target.width));
        const hash = crypto.createHash("sha256").update(buf).digest("hex");

        if (usedHashes.has(hash)) {
          console.warn(`  skip duplicate: ${target.file}`);
          usedPhotoIds.add(photoId);
          continue;
        }

        fs.writeFileSync(dest, buf);
        usedPhotoIds.add(photoId);
        usedHashes.add(hash);
        saved = true;
        success++;
        console.log(`✓ ${target.file} ← ${photoId}`);
        break;
      } catch (err) {
        failedPhotoIds.add(photoId);
        console.warn(`  retry ${target.file} (${photoId}): ${err.message}`);
      }
    }

    if (!saved) {
      for (let attempt = 0; attempt < 20 && !saved; attempt++) {
        const photoId = getFallback();
        if (!photoId || usedPhotoIds.has(photoId)) continue;

        try {
          const buf = await download(unsplashUrl(photoId, target.width));
          const hash = crypto.createHash("sha256").update(buf).digest("hex");
          if (usedHashes.has(hash)) {
            usedPhotoIds.add(photoId);
            continue;
          }

          fs.writeFileSync(dest, buf);
          usedPhotoIds.add(photoId);
          usedHashes.add(hash);
          saved = true;
          success++;
          console.log(`✓ ${target.file} ← ${photoId} (fallback)`);
        } catch {
          failedPhotoIds.add(photoId);
        }
      }
    }

    if (!saved) {
      failed++;
      console.error(`✗ failed: ${target.file}`);
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed, ${usedPhotoIds.size} unique photos`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
