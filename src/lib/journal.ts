/*
  MOCK JOURNAL — placeholder editorial entries (§7: Journal = Shopify blog).
  Replace with Storefront API blog/article queries. Shape kept simple and
  localised so the UI can render bilingual content today.
*/
import type { Locale } from './commerce/types';

export interface JournalPost {
  handle: string;
  seed: string;
  date: string;
  readingMinutes: number;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string[]>; // paragraphs
}

export const journalPosts: JournalPost[] = [
  {
    handle: 'reading-the-vat',
    seed: 'journal-vat',
    date: '2026-06-12',
    readingMinutes: 4,
    title: {
      en: 'Reading the vat each morning',
      th: 'อ่านหม้อครามในทุกเช้า',
    },
    excerpt: {
      en: 'How colour, scent, and the bloom on the surface tell us the vat is well.',
      th: 'สี กลิ่น และฟองบนผิวหน้า บอกเราว่าหม้อครามสบายดี',
    },
    body: {
      en: [
        'Before any cloth is dipped, the vat is read. A healthy indigo vat carries a coppery bloom on its surface and a particular, earthy sweetness.',
        'If the colour is dull or the scent turns, the vat is hungry. We feed it and wait. There is no rushing indigo — the vat keeps its own time.',
        'Raising an indigo vat is like raising a child: attention, patience, and the willingness to begin again tomorrow.',
      ],
      th: [
        'ก่อนจะจุ่มผ้าผืนใด เราจะอ่านหม้อครามก่อน หม้อครามที่แข็งแรงจะมีฟองสีทองแดงบนผิวหน้าและกลิ่นหวานอย่างดิน',
        'หากสีหม่นหรือกลิ่นเปลี่ยน แสดงว่าหม้อหิว เราจะป้อนอาหารและรอ ครามเร่งไม่ได้ หม้อมีเวลาของมันเอง',
        'การเลี้ยงหม้อครามเหมือนการเลี้ยงลูก ต้องใส่ใจ อดทน และพร้อมเริ่มใหม่ในวันพรุ่งนี้',
      ],
    },
  },
  {
    handle: 'fold-bind-dip',
    seed: 'journal-shibori',
    date: '2026-05-20',
    readingMinutes: 5,
    title: {
      en: 'Fold, bind, dip: the grammar of shibori',
      th: 'พับ มัด จุ่ม: ไวยากรณ์ของการมัดย้อม',
    },
    excerpt: {
      en: 'Every pattern begins as a decision made with thread and pressure.',
      th: 'ทุกลวดลายเริ่มจากการตัดสินใจด้วยเส้นด้ายและแรงกด',
    },
    body: {
      en: [
        'Shibori is resist-dyeing: wherever the cloth is bound, folded, or clamped, the indigo cannot reach, and white remains.',
        'A spider pattern is drawn out from a single bound point. Itajime falls in clean bands from folding and clamping between boards. Arashi wraps the cloth around a pole for diagonal rain.',
        'Because the binding is done by hand, the pattern is never quite repeatable — which is the point.',
      ],
      th: [
        'การมัดย้อมคือการกันสีย้อม ตรงไหนที่ผ้าถูกมัด พับ หรือหนีบ ครามจะเข้าไม่ถึง และคงสีขาวไว้',
        'ลายใยแมงมุมเกิดจากการมัดจุดเดียวแล้วดึงออก ลายอิตาจิเมะเป็นแถบเรียบจากการพับและหนีบระหว่างแผ่นไม้ ลายอาราชิพันผ้ารอบเสาให้เกิดเส้นฝนทแยง',
        'เพราะมัดด้วยมือ ลวดลายจึงไม่อาจซ้ำได้พอดี และนั่นคือหัวใจของมัน',
      ],
    },
  },
  {
    handle: 'world-craft-city',
    seed: 'journal-city',
    date: '2026-04-08',
    readingMinutes: 3,
    title: {
      en: 'Sakon Nakhon, a World Craft City',
      th: 'สกลนคร เมืองแห่งคราม',
    },
    excerpt: {
      en: 'What the World Crafts Council recognition means for a living tradition.',
      th: 'การยกย่องจากสภาหัตถกรรมโลกมีความหมายอย่างไรต่อประเพณีที่มีชีวิต',
    },
    body: {
      en: [
        'Sakon Nakhon is recognised by the World Crafts Council as a World Craft City for Natural Indigo — one of a small number of places where this craft is still practised at scale and by hand.',
        'For us the title is not a trophy but a responsibility: to keep the vats living, to train the next hands, and to let the cloth speak for the place.',
      ],
      th: [
        'สกลนครได้รับการยกย่องจากสภาหัตถกรรมโลกให้เป็นเมืองแห่งครามธรรมชาติ หนึ่งในไม่กี่แห่งที่ยังคงทำงานหัตถกรรมนี้ด้วยมือและในวงกว้าง',
        'สำหรับเรา ตำแหน่งนี้ไม่ใช่รางวัล แต่เป็นความรับผิดชอบ ที่จะรักษาหม้อครามให้มีชีวิต ฝึกมือรุ่นต่อไป และให้ผืนผ้าพูดแทนผืนแผ่นดิน',
      ],
    },
  },
];

export function getJournalPost(handle: string) {
  return journalPosts.find((p) => p.handle === handle) ?? null;
}
