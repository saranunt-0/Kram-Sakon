'use client';

/*
  Cart + region/currency state for the demo.

  - Cart lines persist to localStorage (a real build holds a Shopify cart id and
    syncs via the Storefront API; checkout then redirects to cart.checkoutUrl).
  - Region selection drives the mock currency conversion (§8.3 — real builds use
    Shopify Markets / @inContext(country)).
*/
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, CurrencyCode, Money, Product, ProductVariant } from '../commerce/types';

const CART_KEY = 'kram-cart';
const REGION_KEY = 'kram-region';

type Action =
  | { type: 'hydrate'; lines: CartLine[] }
  | { type: 'add'; line: CartLine }
  | { type: 'updateQty'; id: string; quantity: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'hydrate':
      return action.lines;
    case 'add': {
      const existing = state.find((l) => l.id === action.line.id);
      if (existing) {
        return state.map((l) =>
          l.id === action.line.id ? { ...l, quantity: l.quantity + action.line.quantity } : l
        );
      }
      return [...state, action.line];
    }
    case 'updateQty':
      return state
        .map((l) => (l.id === action.id ? { ...l, quantity: Math.max(0, action.quantity) } : l))
        .filter((l) => l.quantity > 0);
    case 'remove':
      return state.filter((l) => l.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

interface ShopContextValue {
  lines: CartLine[];
  count: number;
  subtotal: Money;
  region: CurrencyCode;
  setRegion: (c: CurrencyCode) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [region, setRegionState] = useState<CurrencyCode>('THB');
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once on mount.
  useEffect(() => {
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      if (rawCart) dispatch({ type: 'hydrate', lines: JSON.parse(rawCart) });
      const rawRegion = localStorage.getItem(REGION_KEY) as CurrencyCode | null;
      if (rawRegion) setRegionState(rawRegion);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const setRegion = (c: CurrencyCode) => {
    setRegionState(c);
    try {
      localStorage.setItem(REGION_KEY, c);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<ShopContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotalAmount = lines.reduce(
      (sum, l) => sum + parseFloat(l.price.amount) * l.quantity,
      0
    );
    return {
      lines,
      count,
      subtotal: { amount: subtotalAmount.toFixed(2), currencyCode: 'THB' },
      region,
      setRegion,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (product, variant, quantity = 1) => {
        dispatch({
          type: 'add',
          line: {
            id: variant.id,
            variantId: variant.id,
            productHandle: product.handle,
            title: product.title,
            variantTitle: variant.title,
            image: product.featuredImage,
            price: variant.price,
            quantity,
          },
        });
        setIsOpen(true);
      },
      updateQty: (id, quantity) => dispatch({ type: 'updateQty', id, quantity }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [lines, region, isOpen]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}
