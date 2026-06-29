/*
  MOCK CATALOGUE — placeholder products/collections for the first draft.
  Shaped like Shopify Storefront API results (§1.3 says to stub with mock data
  behind the same interface). Prices are in THB; the Price component converts for
  other Markets. Replace this file's data with live Storefront API calls — the
  client.ts interface is what the UI depends on, not these literals.

  Images now point at real static photography under `/public/images` via the
  `src` field. The cloth-placeholder `seed` is kept as a fallback/identity key.
*/
import type { Collection, Product } from './types';

const thb = (amount: number) => ({ amount: amount.toFixed(2), currencyCode: 'THB' as const });

export const collections: Collection[] = [
  {
    handle: 'clothing',
    title: { en: 'Clothing', th: 'เสื้อผ้า' },
    description: {
      en: 'Tees, scarves, and hats in living, hand-dyed indigo.',
      th: 'เสื้อยืด ผ้าพันคอ และหมวก ในครามมีชีวิตย้อมมือ',
    },
    image: {
      seed: 'collection-clothing',
      src: '/images/model_01.png',
      altText: 'Model wearing hand-dyed indigo clothing',
    },
  },
  {
    handle: 'accessories',
    title: { en: 'Accessories', th: 'ของใช้และเครื่องประดับ' },
    description: {
      en: 'Bags, caps, and covers — everyday pieces dipped in natural indigo.',
      th: 'กระเป๋า หมวก และปกสมุด ของใช้ประจำวันที่จุ่มครามธรรมชาติ',
    },
    image: {
      seed: 'collection-accessories',
      src: '/images/model_02.png',
      altText: 'Model with indigo accessories',
    },
  },
  {
    handle: 'homeware',
    title: { en: 'Home & Living', th: 'ของใช้ในบ้าน' },
    description: {
      en: 'Towels, blankets, and gifts — cloth for the home, made to last.',
      th: 'ผ้าเช็ดตัว ผ้าห่ม และของขวัญ ผ้าสำหรับบ้านที่อยู่ได้นาน',
    },
    image: {
      seed: 'collection-homeware',
      src: '/images/model_03.png',
      altText: 'Indigo homeware styled for the home',
    },
  },
];

function img(
  seed: string,
  src: string,
  altText: string,
  kind: 'flat' | 'context' | 'process'
) {
  return { seed, src, altText, kind };
}

export const products: Product[] = [
  /* — Clothing — */
  {
    id: 'gid://mock/Product/1',
    handle: 'dip-dye-indigo-tee',
    title: { en: 'Dip-Dye Indigo Tee', th: 'เสื้อยืดครามไล่เฉดสี' },
    description: {
      en: 'A soft cotton tee dipped by hand so the colour graduates from deep night-indigo at the shoulders to a pale first-dip blue at the hem. Each piece fades along its own line.',
      th: 'เสื้อยืดฝ้ายเนื้อนุ่ม จุ่มครามด้วยมือให้สีไล่จากครามเข้มที่ไหล่สู่ฟ้าจางที่ชายเสื้อ แต่ละตัวไล่เฉดไม่เหมือนกัน',
    },
    materials: { en: '100% cotton, natural indigo dye', th: 'ฝ้าย 100% ย้อมครามธรรมชาติ' },
    care: {
      en: 'Machine wash cold, gentle, separately for the first few washes. Dry in shade.',
      th: 'ซักเครื่องโหมดถนอมผ้าน้ำเย็น แยกชิ้นในช่วงแรก ตากในที่ร่ม',
    },
    dimensions: { en: 'Sizes S–XL', th: 'ไซซ์ S–XL' },
    featuredImage: img('tee-1-flat', '/images/cloth_01.jpg', 'Dip-dye indigo tee on a hanger', 'flat'),
    images: [
      img('tee-1-flat', '/images/cloth_01.jpg', 'Dip-dye indigo tee, front', 'flat'),
      img('tee-1-context', '/images/cloth_02.jpg', 'Dip-dye indigo tee detail', 'context'),
      img('tee-1-c', '/images/cloth_03.jpg', 'Indigo tee, gradient detail', 'flat'),
      img('tee-1-d', '/images/cloth_04.jpg', 'Indigo tee, fabric close-up', 'flat'),
      img('tee-1-e', '/images/cloth_05.jpg', 'Indigo tee, hem', 'flat'),
      img('tee-1-f', '/images/cloth_06.jpg', 'Indigo tee, full view', 'flat'),
    ],
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    variants: ['S', 'M', 'L', 'XL'].map((s, i) => ({
      id: `gid://mock/Variant/1-${i + 1}`,
      title: s,
      availableForSale: s !== 'XL',
      selectedOptions: [{ name: 'Size', value: s }],
      price: thb(1200),
    })),
    tags: ['new'],
    collectionHandles: ['clothing'],
    publishedAt: '2026-06-20',
  },
  {
    id: 'gid://mock/Product/2',
    handle: 'shibori-indigo-scarf',
    title: { en: 'Shibori Indigo Scarf', th: 'ผ้าพันคอครามมัดย้อม' },
    description: {
      en: 'A featherweight scarf hand-bound in shibori and dipped in a cold natural indigo vat. The white blooms are drawn out of the cloth by hand — a gift from the nature.',
      th: 'ผ้าพันคอเนื้อเบา มัดย้อมชิโบริด้วยมือแล้วจุ่มในหม้อครามธรรมชาติหมักเย็น ลายขาวเกิดจากการมัดด้วยมือ ของขวัญจากธรรมชาติ',
    },
    materials: { en: '100% cotton, natural indigo dye', th: 'ฝ้าย 100% ย้อมครามธรรมชาติ' },
    care: { en: 'Hand wash cold, separately. Dry in shade.', th: 'ซักมือน้ำเย็นแยกชิ้น ตากในที่ร่ม' },
    dimensions: { en: '180 × 55 cm', th: '180 × 55 ซม.' },
    featuredImage: img('scarf-2-flat', '/images/scarf_01.jpg', 'Shibori indigo scarves on hangers', 'flat'),
    images: [
      img('scarf-2-flat', '/images/scarf_01.jpg', 'Four shibori indigo scarves', 'flat'),
      img('scarf-2-context', '/images/scarf_02.jpg', 'Shibori scarf detail', 'context'),
      img('scarf-2-c', '/images/closeup_05.jpg', 'Indigo shibori bloom close-up', 'process'),
    ],
    options: [{ name: 'Colour', values: ['Vat Indigo'] }],
    variants: [
      {
        id: 'gid://mock/Variant/2-1',
        title: 'Vat Indigo',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Vat Indigo' }],
        price: thb(1800),
        swatch: '#243b5a',
      },
    ],
    tags: ['new', 'limited'],
    collectionHandles: ['clothing'],
    publishedAt: '2026-06-12',
  },
  {
    id: 'gid://mock/Product/3',
    handle: 'indigo-bucket-hat',
    title: { en: 'Indigo Bucket Hat', th: 'หมวกบักเก็ตคราม' },
    description: {
      en: 'A reversible bucket hat sewn from handwoven indigo cloth — stripes, checks, and plaids, each panel a different weave. No two hats are quite alike.',
      th: 'หมวกบักเก็ตใส่ได้สองด้าน เย็บจากผ้าทอมือย้อมคราม ลายทาง ลายตาราง และลายสก็อต แต่ละใบไม่เหมือนกัน',
    },
    materials: { en: '100% handwoven cotton, natural indigo', th: 'ฝ้ายทอมือ 100% ย้อมครามธรรมชาติ' },
    care: { en: 'Spot clean or hand wash cold. Dry in shape.', th: 'เช็ดเฉพาะจุดหรือซักมือน้ำเย็น ตากให้คงรูป' },
    dimensions: { en: 'One size · adjustable', th: 'ไซซ์เดียว · ปรับได้' },
    featuredImage: img('hat-3-flat', '/images/hat_01.jpg', 'Row of indigo bucket hats', 'flat'),
    images: [
      img('hat-3-flat', '/images/hat_01.jpg', 'Indigo bucket hats, woven patterns', 'flat'),
      img('hat-3-context', '/images/hat_02.jpg', 'Indigo bucket hat, side view', 'context'),
      img('hat-3-c', '/images/hat_03.jpg', 'Indigo bucket hat, top view', 'flat'),
    ],
    options: [{ name: 'Size', values: ['One size'] }],
    variants: [
      {
        id: 'gid://mock/Variant/3-1',
        title: 'One size',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: 'One size' }],
        price: thb(990),
      },
    ],
    tags: [],
    collectionHandles: ['clothing'],
    publishedAt: '2026-05-18',
  },

  /* — Accessories — */
  {
    id: 'gid://mock/Product/4',
    handle: 'shibori-canvas-tote',
    title: { en: 'Shibori Canvas Tote', th: 'กระเป๋าผ้าใบมัดย้อม' },
    description: {
      en: 'A roomy everyday tote in heavy cotton canvas, tie-dyed in natural indigo so a soft burst blooms from the base. Sturdy webbing handles, woven label.',
      th: 'กระเป๋าผ้าใบฝ้ายเนื้อหนาใบใหญ่ มัดย้อมครามธรรมชาติให้ลายบานนุ่ม ๆ จากด้านล่าง สายหนาทนทาน ป้ายทอ',
    },
    materials: { en: 'Heavy cotton canvas, natural indigo', th: 'ผ้าใบฝ้ายเนื้อหนา ย้อมครามธรรมชาติ' },
    care: { en: 'Hand wash cold. Dry in shade.', th: 'ซักมือน้ำเย็น ตากในที่ร่ม' },
    dimensions: { en: '19" × 13" × 5"', th: '19 × 13 × 5 นิ้ว' },
    featuredImage: img('tote-4-flat', '/images/bag_01.jpg', 'Indigo shibori canvas tote bag', 'flat'),
    images: [
      img('tote-4-flat', '/images/bag_01.jpg', 'Indigo shibori tote, front', 'flat'),
      img('tote-4-context', '/images/bag_02.jpg', 'Indigo tote, alternate view', 'context'),
      img('tote-4-c', '/images/bag_03.jpg', 'Indigo tote, detail', 'flat'),
      img('tote-4-d', '/images/bag_04.jpg', 'Indigo tote, handle detail', 'flat'),
    ],
    options: [{ name: 'Colour', values: ['Vat Indigo'] }],
    variants: [
      {
        id: 'gid://mock/Variant/4-1',
        title: 'Vat Indigo',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Vat Indigo' }],
        price: thb(1290),
        swatch: '#243b5a',
      },
    ],
    tags: ['new'],
    collectionHandles: ['accessories'],
    publishedAt: '2026-06-08',
  },
  {
    id: 'gid://mock/Product/5',
    handle: 'woven-indigo-cap',
    title: { en: 'Woven Indigo Cap', th: 'หมวกแก๊ปครามทอมือ' },
    description: {
      en: 'A six-panel cap cut from handwoven indigo check — the classic everyday cap in living blue, with an adjustable back.',
      th: 'หมวกแก๊ปหกชิ้นจากผ้าทอมือลายตารางคราม หมวกประจำวันในโทนครามมีชีวิต ปรับสายด้านหลังได้',
    },
    materials: { en: '100% handwoven cotton, natural indigo', th: 'ฝ้ายทอมือ 100% ย้อมครามธรรมชาติ' },
    care: { en: 'Spot clean or hand wash cold.', th: 'เช็ดเฉพาะจุดหรือซักมือน้ำเย็น' },
    dimensions: { en: 'One size · adjustable', th: 'ไซซ์เดียว · ปรับได้' },
    featuredImage: img('cap-5-flat', '/images/gap_01.jpg', 'Woven indigo check cap', 'flat'),
    images: [
      img('cap-5-flat', '/images/gap_01.jpg', 'Indigo check cap, side', 'flat'),
      img('cap-5-context', '/images/gap_02.jpg', 'Indigo cap, alternate view', 'context'),
      img('cap-5-c', '/images/gap_03.jpg', 'Indigo cap, front', 'flat'),
      img('cap-5-d', '/images/gap_04.jpg', 'Indigo cap, detail', 'flat'),
    ],
    options: [{ name: 'Size', values: ['One size'] }],
    variants: [
      {
        id: 'gid://mock/Variant/5-1',
        title: 'One size',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: 'One size' }],
        price: thb(890),
      },
    ],
    tags: [],
    collectionHandles: ['accessories'],
    publishedAt: '2026-04-26',
  },
  {
    id: 'gid://mock/Product/6',
    handle: 'indigo-book-cover',
    title: { en: 'Indigo Book Cover', th: 'ปกสมุดผ้าคราม' },
    description: {
      en: 'A handsome notebook bound in handwoven indigo cloth — a quiet companion for notes and sketches, refillable inside.',
      th: 'สมุดบันทึกหุ้มผ้าทอมือย้อมคราม เพื่อนคู่ใจสำหรับจดบันทึกและสเก็ตช์ เปลี่ยนไส้ในได้',
    },
    materials: { en: 'Handwoven cotton over board, paper insert', th: 'ผ้าฝ้ายทอมือหุ้มแข็ง ไส้กระดาษ' },
    care: { en: 'Keep dry. Wipe cover gently.', th: 'เก็บให้แห้ง เช็ดปกเบา ๆ' },
    dimensions: { en: 'A5 · 14.8 × 21 cm', th: 'A5 · 14.8 × 21 ซม.' },
    featuredImage: img('book-6-flat', '/images/book_04.jpg', 'Indigo cloth book cover', 'flat'),
    images: [
      img('book-6-flat', '/images/book_04.jpg', 'Indigo book cover, front', 'flat'),
      img('book-6-context', '/images/book_01.jpg', 'Indigo notebook, open', 'context'),
      img('book-6-c', '/images/book_02.jpg', 'Indigo notebook, detail', 'flat'),
      img('book-6-d', '/images/book_03.jpg', 'Indigo notebook, spine', 'flat'),
    ],
    options: [{ name: 'Colour', values: ['Vat Indigo'] }],
    variants: [
      {
        id: 'gid://mock/Variant/6-1',
        title: 'Vat Indigo',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Vat Indigo' }],
        price: thb(650),
        swatch: '#243b5a',
      },
    ],
    tags: ['last-few'],
    collectionHandles: ['accessories'],
    publishedAt: '2026-03-30',
  },

  /* — Home & Living — */
  {
    id: 'gid://mock/Product/7',
    handle: 'indigo-bath-towel-set',
    title: { en: 'Indigo Bath Towel Set', th: 'ชุดผ้าเช็ดตัวคราม' },
    description: {
      en: 'A three-piece towel set — bath, hand, and face — woven thick and absorbent, then tie-dyed in natural indigo with soft white blooms. Set TW-03.',
      th: 'ชุดผ้าเช็ดตัวสามชิ้น ผืนใหญ่ ผ้าเช็ดมือ และผ้าเช็ดหน้า ทอหนาซับน้ำดี มัดย้อมครามธรรมชาติพร้อมลายขาวนุ่มนวล รุ่น TW-03',
    },
    materials: { en: '100% cotton terry, natural indigo', th: 'ผ้าขนหนูฝ้าย 100% ย้อมครามธรรมชาติ' },
    care: { en: 'Machine wash cold, separately at first. Tumble dry low.', th: 'ซักเครื่องน้ำเย็น แยกชิ้นในช่วงแรก อบแห้งไฟอ่อน' },
    dimensions: { en: 'Bath 140 × 70 cm · Hand · Face', th: 'ผืนใหญ่ 140 × 70 ซม. · ผ้าเช็ดมือ · ผ้าเช็ดหน้า' },
    featuredImage: img('towel-7-flat', '/images/blanket_03.jpg', 'Indigo tie-dye towel set, rolled', 'flat'),
    images: [
      img('towel-7-flat', '/images/blanket_03.jpg', 'Indigo towel set TW-03', 'flat'),
      img('towel-7-context', '/images/blanket_01.jpg', 'Indigo towel, folded', 'context'),
      img('towel-7-c', '/images/blanket_02.jpg', 'Indigo towel, pattern detail', 'flat'),
      img('towel-7-d', '/images/blanket_04.jpg', 'Indigo towel, stack', 'flat'),
      img('towel-7-e', '/images/blanket_05.jpg', 'Indigo towel, close-up', 'flat'),
    ],
    options: [{ name: 'Set', values: ['Set of 3'] }],
    variants: [
      {
        id: 'gid://mock/Variant/7-1',
        title: 'Set of 3',
        availableForSale: true,
        selectedOptions: [{ name: 'Set', value: 'Set of 3' }],
        price: thb(1500),
      },
    ],
    tags: ['new'],
    collectionHandles: ['homeware'],
    publishedAt: '2026-06-02',
  },
  {
    id: 'gid://mock/Product/8',
    handle: 'indigo-teddy-bear',
    title: { en: 'Indigo Teddy Bear', th: 'ตุ๊กตาหมีคราม' },
    description: {
      en: 'A soft teddy bear sewn from offcuts of handwoven indigo cloth — a keepsake stitched from the same blue as everything we make. Each bear is one of a kind.',
      th: 'ตุ๊กตาหมีนุ่มนิ่ม เย็บจากเศษผ้าทอมือย้อมคราม ของที่ระลึกจากผ้าครามผืนเดียวกับทุกชิ้นของเรา แต่ละตัวไม่ซ้ำกัน',
    },
    materials: { en: 'Handwoven cotton, poly fill', th: 'ผ้าฝ้ายทอมือ ใยสังเคราะห์ข้างใน' },
    care: { en: 'Surface wash only. Dry in shade.', th: 'เช็ดทำความสะอาดผิวเท่านั้น ตากในที่ร่ม' },
    dimensions: { en: 'Approx. 30 cm tall', th: 'สูงประมาณ 30 ซม.' },
    featuredImage: img('bear-8-flat', '/images/bear_07.jpg', 'Indigo cloth teddy bear', 'flat'),
    images: [
      img('bear-8-flat', '/images/bear_07.jpg', 'Indigo teddy bear, seated', 'flat'),
      img('bear-8-context', '/images/bear_03.jpg', 'Indigo teddy bear, alternate', 'context'),
      img('bear-8-c', '/images/bear_05.jpg', 'Indigo teddy bear, detail', 'flat'),
    ],
    options: [{ name: 'Colour', values: ['Vat Indigo'] }],
    variants: [
      {
        id: 'gid://mock/Variant/8-1',
        title: 'Vat Indigo',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Vat Indigo' }],
        price: thb(1100),
        swatch: '#243b5a',
      },
    ],
    tags: ['limited'],
    collectionHandles: ['homeware'],
    publishedAt: '2026-05-05',
  },
];
