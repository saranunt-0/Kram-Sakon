/*
  MOCK CATALOGUE — placeholder products/collections for the first draft.
  Shaped like Shopify Storefront API results (§1.3 says to stub with mock data
  behind the same interface). Prices are in THB; the Price component converts for
  other Markets. Replace this file's data with live Storefront API calls — the
  client.ts interface is what the UI depends on, not these literals.
*/
import type { Collection, Product } from './types';

const thb = (amount: number) => ({ amount: amount.toFixed(2), currencyCode: 'THB' as const });

export const collections: Collection[] = [
  {
    handle: 'scarves',
    title: { en: 'Scarves', th: 'ผ้าพันคอ' },
    description: {
      en: 'Featherweight indigo, shibori-bound and dipped by hand.',
      th: 'ครามเนื้อเบา มัดย้อมและจุ่มด้วยมือ',
    },
    image: { seed: 'collection-scarves', altText: 'Indigo shibori scarf draped on cream' },
  },
  {
    handle: 'clothing',
    title: { en: 'Clothing', th: 'เสื้อผ้า' },
    description: {
      en: 'Easy, architectural pieces in living indigo.',
      th: 'เสื้อผ้าทรงเรียบง่ายในครามมีชีวิต',
    },
    image: { seed: 'collection-clothing', altText: 'Indigo-dyed jacket on a loom' },
  },
  {
    handle: 'homeware',
    title: { en: 'Homeware', th: 'ของตกแต่งบ้าน' },
    description: {
      en: 'Cloth for the home — woven, dyed, and meant to last.',
      th: 'ผ้าสำหรับบ้าน ทอและย้อมให้อยู่ได้นาน',
    },
    image: { seed: 'collection-homeware', altText: 'Folded indigo textiles for the home' },
  },
];

function img(seed: string, altText: string, kind: 'flat' | 'context' | 'process') {
  return { seed, altText, kind };
}

export const products: Product[] = [
  {
    id: 'gid://mock/Product/1',
    handle: 'spider-shibori-scarf',
    title: { en: 'Spider Shibori Scarf', th: 'ผ้าพันคอมัดย้อมลายใยแมงมุม' },
    description: {
      en: 'A featherlight cotton scarf, hand-bound in the spider shibori method and dipped in a cold natural indigo vat. The bloom at its centre is drawn out of the cloth by hand.',
      th: 'ผ้าพันคอฝ้ายเนื้อเบา มัดด้วยเทคนิคใยแมงมุมแล้วจุ่มในหม้อครามธรรมชาติหมักเย็น ลายตรงกลางเกิดจากการมัดด้วยมือ',
    },
    materials: { en: '100% handwoven cotton', th: 'ฝ้ายทอมือ 100%' },
    care: {
      en: 'Hand wash cold, separately. Dry in shade. Natural indigo softens beautifully with time.',
      th: 'ซักมือด้วยน้ำเย็นแยกชิ้น ตากในที่ร่ม ครามธรรมชาติจะนุ่มสวยขึ้นตามกาลเวลา',
    },
    dimensions: { en: '180 × 55 cm', th: '180 × 55 ซม.' },
    featuredImage: img('scarf-1-flat', 'Spider shibori indigo scarf, flat on cream', 'flat'),
    images: [
      img('scarf-1-flat', 'Spider shibori indigo scarf, flat on cream', 'flat'),
      img('scarf-1-context', 'Scarf worn over the shoulder', 'context'),
      img('scarf-1-process', 'Scarf being lifted from the indigo vat', 'process'),
    ],
    options: [{ name: 'Colour', values: ['Vat Indigo', 'First Dip'] }],
    variants: [
      {
        id: 'gid://mock/Variant/1-1',
        title: 'Vat Indigo',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Vat Indigo' }],
        price: thb(1800),
        swatch: '#243b5a',
      },
      {
        id: 'gid://mock/Variant/1-2',
        title: 'First Dip',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'First Dip' }],
        price: thb(1800),
        swatch: '#a9bbce',
      },
    ],
    tags: ['new'],
    collectionHandles: ['scarves'],
    publishedAt: '2026-06-01',
  },
  {
    id: 'gid://mock/Product/2',
    handle: 'itajime-wrap',
    title: { en: 'Itajime Fold Wrap', th: 'ผ้าคลุมมัดย้อมลายพับ' },
    description: {
      en: 'A generous wrap patterned by itajime — folded and clamped before dyeing so the resist falls in clean architectural bands.',
      th: 'ผ้าคลุมผืนใหญ่ลายอิตาจิเมะ พับและหนีบก่อนย้อมให้เกิดลายเส้นเรียบคม',
    },
    materials: { en: '100% handwoven cotton', th: 'ฝ้ายทอมือ 100%' },
    care: { en: 'Hand wash cold. Dry in shade.', th: 'ซักมือน้ำเย็น ตากในที่ร่ม' },
    dimensions: { en: '200 × 70 cm', th: '200 × 70 ซม.' },
    featuredImage: img('wrap-2-flat', 'Itajime fold indigo wrap, flat on cream', 'flat'),
    images: [
      img('wrap-2-flat', 'Itajime fold indigo wrap, flat on cream', 'flat'),
      img('wrap-2-context', 'Wrap draped around the shoulders', 'context'),
    ],
    options: [{ name: 'Colour', values: ['Night Indigo'] }],
    variants: [
      {
        id: 'gid://mock/Variant/2-1',
        title: 'Night Indigo',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Night Indigo' }],
        price: thb(2400),
        swatch: '#141e33',
      },
    ],
    tags: ['limited'],
    collectionHandles: ['scarves'],
    publishedAt: '2026-05-12',
  },
  {
    id: 'gid://mock/Product/3',
    handle: 'vat-indigo-haori',
    title: { en: 'Vat Indigo Haori Jacket', th: 'เสื้อคลุมฮาโอริครามเข้ม' },
    description: {
      en: 'An unstructured jacket cut from heavier handwoven cloth, dyed in repeated dips for a deep, saturated indigo that will fade to your own map of wear.',
      th: 'เสื้อคลุมทรงปล่อยจากผ้าทอมือเนื้อหนา ย้อมซ้ำหลายครั้งจนได้ครามเข้มลึก และจะค่อย ๆ ซีดตามการใช้งานของคุณ',
    },
    materials: { en: '100% handwoven cotton, brass closures', th: 'ฝ้ายทอมือ 100% กระดุมทองเหลือง' },
    care: { en: 'Hand wash cold, separately for the first few washes.', th: 'ซักมือน้ำเย็น แยกชิ้นในช่วงแรก' },
    dimensions: { en: 'One size · oversized', th: 'ไซซ์เดียว · ทรงโอเวอร์ไซซ์' },
    featuredImage: img('haori-3-flat', 'Indigo haori jacket on cream', 'flat'),
    images: [
      img('haori-3-flat', 'Indigo haori jacket on cream', 'flat'),
      img('haori-3-context', 'Haori jacket worn open', 'context'),
      img('haori-3-process', 'Cloth oxidising on the line, turning blue', 'process'),
    ],
    options: [{ name: 'Size', values: ['S/M', 'L/XL'] }],
    variants: [
      {
        id: 'gid://mock/Variant/3-1',
        title: 'S/M',
        availableForSale: true,
        selectedOptions: [{ name: 'Size', value: 'S/M' }],
        price: thb(5200),
      },
      {
        id: 'gid://mock/Variant/3-2',
        title: 'L/XL',
        availableForSale: false,
        selectedOptions: [{ name: 'Size', value: 'L/XL' }],
        price: thb(5200),
      },
    ],
    tags: ['new'],
    collectionHandles: ['clothing'],
    publishedAt: '2026-06-10',
  },
  {
    id: 'gid://mock/Product/4',
    handle: 'field-trouser',
    title: { en: 'Indigo Field Trouser', th: 'กางเกงครามทรงสบาย' },
    description: {
      en: 'A relaxed, wide-leg trouser in soft handwoven cotton, dyed a mid First-Dip blue that lightens gracefully.',
      th: 'กางเกงขากว้างทรงสบายจากฝ้ายทอมือเนื้อนุ่ม ย้อมครามโทนกลางที่ซีดลงอย่างงดงาม',
    },
    materials: { en: '100% handwoven cotton', th: 'ฝ้ายทอมือ 100%' },
    care: { en: 'Machine wash cold, gentle. Dry in shade.', th: 'ซักเครื่องโหมดถนอมผ้าน้ำเย็น ตากในที่ร่ม' },
    dimensions: { en: 'Sizes S–XL', th: 'ไซซ์ S–XL' },
    featuredImage: img('trouser-4-flat', 'Indigo wide-leg trousers on cream', 'flat'),
    images: [
      img('trouser-4-flat', 'Indigo wide-leg trousers on cream', 'flat'),
      img('trouser-4-context', 'Trousers worn, mid-stride', 'context'),
    ],
    options: [{ name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    variants: ['S', 'M', 'L', 'XL'].map((s, i) => ({
      id: `gid://mock/Variant/4-${i + 1}`,
      title: s,
      availableForSale: s !== 'XL',
      selectedOptions: [{ name: 'Size', value: s }],
      price: thb(3200),
    })),
    tags: [],
    collectionHandles: ['clothing'],
    publishedAt: '2026-04-20',
  },
  {
    id: 'gid://mock/Product/5',
    handle: 'shibori-cushion',
    title: { en: 'Shibori Cushion Cover', th: 'ปลอกหมอนมัดย้อม' },
    description: {
      en: 'A square cushion cover with a single shibori bloom at its heart — a quiet point of indigo for a room.',
      th: 'ปลอกหมอนทรงสี่เหลี่ยมกับลายมัดย้อมหนึ่งดอกตรงกลาง จุดครามเงียบ ๆ สำหรับห้องของคุณ',
    },
    materials: { en: '100% handwoven cotton, hidden zip', th: 'ฝ้ายทอมือ 100% ซิปซ่อน' },
    care: { en: 'Remove cover; hand wash cold.', th: 'ถอดปลอกออก ซักมือน้ำเย็น' },
    dimensions: { en: '45 × 45 cm', th: '45 × 45 ซม.' },
    featuredImage: img('cushion-5-flat', 'Indigo shibori cushion cover on cream', 'flat'),
    images: [
      img('cushion-5-flat', 'Indigo shibori cushion cover on cream', 'flat'),
      img('cushion-5-context', 'Cushion on a linen chair', 'context'),
    ],
    options: [{ name: 'Colour', values: ['Vat Indigo', 'First Dip'] }],
    variants: [
      {
        id: 'gid://mock/Variant/5-1',
        title: 'Vat Indigo',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Vat Indigo' }],
        price: thb(1400),
        swatch: '#243b5a',
      },
      {
        id: 'gid://mock/Variant/5-2',
        title: 'First Dip',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'First Dip' }],
        price: thb(1400),
        swatch: '#a9bbce',
      },
    ],
    tags: ['last-few'],
    collectionHandles: ['homeware'],
    publishedAt: '2026-03-30',
  },
  {
    id: 'gid://mock/Product/6',
    handle: 'indigo-table-runner',
    title: { en: 'Indigo Table Runner', th: 'ผ้าปูโต๊ะครามยาว' },
    description: {
      en: 'A long runner banded in itajime resist — the table dressed in living indigo.',
      th: 'ผ้าปูโต๊ะผืนยาวลายอิตาจิเมะ แต่งโต๊ะด้วยครามมีชีวิต',
    },
    materials: { en: '100% handwoven cotton', th: 'ฝ้ายทอมือ 100%' },
    care: { en: 'Hand wash cold. Iron warm on reverse.', th: 'ซักมือน้ำเย็น รีดอุ่นด้านหลัง' },
    dimensions: { en: '150 × 40 cm', th: '150 × 40 ซม.' },
    featuredImage: img('runner-6-flat', 'Indigo table runner, flat on cream', 'flat'),
    images: [
      img('runner-6-flat', 'Indigo table runner, flat on cream', 'flat'),
      img('runner-6-context', 'Runner on a wooden table', 'context'),
    ],
    options: [{ name: 'Colour', values: ['Night Indigo'] }],
    variants: [
      {
        id: 'gid://mock/Variant/6-1',
        title: 'Night Indigo',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Night Indigo' }],
        price: thb(2200),
        swatch: '#141e33',
      },
    ],
    tags: [],
    collectionHandles: ['homeware'],
    publishedAt: '2026-02-15',
  },
  {
    id: 'gid://mock/Product/7',
    handle: 'arashi-scarf',
    title: { en: 'Arashi Storm Scarf', th: 'ผ้าพันคอลายพายุอาราชิ' },
    description: {
      en: 'Pole-wrapped arashi shibori draws diagonal "storm" lines across this fine scarf — movement held still in cloth.',
      th: 'มัดย้อมอาราชิแบบพันเสา เกิดลายเส้นทแยงคล้ายพายุบนผ้าพันคอเนื้อดี การเคลื่อนไหวที่หยุดนิ่งในผืนผ้า',
    },
    materials: { en: '100% handwoven cotton', th: 'ฝ้ายทอมือ 100%' },
    care: { en: 'Hand wash cold, separately.', th: 'ซักมือน้ำเย็นแยกชิ้น' },
    dimensions: { en: '180 × 50 cm', th: '180 × 50 ซม.' },
    featuredImage: img('scarf-7-flat', 'Arashi storm-line indigo scarf on cream', 'flat'),
    images: [
      img('scarf-7-flat', 'Arashi storm-line indigo scarf on cream', 'flat'),
      img('scarf-7-context', 'Scarf knotted at the neck', 'context'),
    ],
    options: [{ name: 'Colour', values: ['Dip Blue'] }],
    variants: [
      {
        id: 'gid://mock/Variant/7-1',
        title: 'Dip Blue',
        availableForSale: true,
        selectedOptions: [{ name: 'Colour', value: 'Dip Blue' }],
        price: thb(1950),
        swatch: '#3c5c84',
      },
    ],
    tags: ['new', 'limited'],
    collectionHandles: ['scarves'],
    publishedAt: '2026-06-18',
  },
  {
    id: 'gid://mock/Product/8',
    handle: 'indigo-tunic',
    title: { en: 'Everyday Indigo Tunic', th: 'เสื้อตูนิกครามใส่ทุกวัน' },
    description: {
      en: 'A clean, collarless tunic in mid indigo — the piece you reach for first.',
      th: 'เสื้อตูนิกคอกลมทรงเรียบในโทนครามกลาง ชิ้นที่คุณหยิบก่อนเสมอ',
    },
    materials: { en: '100% handwoven cotton', th: 'ฝ้ายทอมือ 100%' },
    care: { en: 'Machine wash cold, gentle.', th: 'ซักเครื่องโหมดถนอมผ้าน้ำเย็น' },
    dimensions: { en: 'Sizes S–L', th: 'ไซซ์ S–L' },
    featuredImage: img('tunic-8-flat', 'Indigo tunic on cream', 'flat'),
    images: [
      img('tunic-8-flat', 'Indigo tunic on cream', 'flat'),
      img('tunic-8-context', 'Tunic worn with trousers', 'context'),
    ],
    options: [{ name: 'Size', values: ['S', 'M', 'L'] }],
    variants: ['S', 'M', 'L'].map((s, i) => ({
      id: `gid://mock/Variant/8-${i + 1}`,
      title: s,
      availableForSale: true,
      selectedOptions: [{ name: 'Size', value: s }],
      price: thb(2800),
    })),
    tags: [],
    collectionHandles: ['clothing'],
    publishedAt: '2026-05-28',
  },
];
