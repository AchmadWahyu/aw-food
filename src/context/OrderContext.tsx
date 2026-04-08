'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react';
import { formatIDR } from '@/lib/utils';

const WHATSAPP_NUMBER = '628568056469';

export type OrderItem = {
  /** Stable id for this cart row (distinct from product id). */
  lineId: string;
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  notes: string;
  imgUrl?: string;
};

/** Payload for adding a line; `lineId` is assigned in the reducer. */
export type OrderItemInput = Omit<OrderItem, 'lineId'>;

type OrderState = {
  items: OrderItem[];
};

type OrderAction =
  | { type: 'ADD_ITEM'; payload: OrderItemInput }
  | { type: 'REMOVE_ITEM'; payload: { lineId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { lineId: string; quantity: number } }
  | { type: 'UPDATE_NOTES'; payload: { lineId: string; notes: string } }
  | { type: 'CLEAR_ORDER' };

const initialState: OrderState = { items: [] };

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const lineId = crypto.randomUUID();
      const notes = action.payload.notes ?? '';
      const item: OrderItem = { ...action.payload, lineId, notes };
      return { items: [...state.items, item] };
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((i) => i.lineId !== action.payload.lineId),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter((i) => i.lineId !== action.payload.lineId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.lineId === action.payload.lineId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case 'UPDATE_NOTES':
      return {
        items: state.items.map((i) =>
          i.lineId === action.payload.lineId
            ? { ...i, notes: action.payload.notes }
            : i
        ),
      };
    case 'CLEAR_ORDER':
      return initialState;
    default:
      return state;
  }
}

type OrderContextType = {
  items: OrderItem[];
  addItem: (item: OrderItemInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  updateNotes: (lineId: string, notes: string) => void;
  clearOrder: () => void;
  totalItems: number;
  totalQuantity: number;
  totalPrice: number;
  generateWhatsAppUrl: () => string;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addItem = useCallback((item: OrderItemInput) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { lineId } });
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { lineId, quantity } });
  }, []);

  const updateNotes = useCallback((lineId: string, notes: string) => {
    dispatch({ type: 'UPDATE_NOTES', payload: { lineId, notes } });
  }, []);

  const clearOrder = useCallback(() => {
    dispatch({ type: 'CLEAR_ORDER' });
  }, []);

  const totalItems = state.items.length;
  const totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const generateWhatsAppUrl = useCallback(() => {
    const lines = state.items.map(
      (i) =>
        `- ${i.name} ${i.quantity} pcs${i.notes ? ` (${i.notes})` : ''}`
    );
    const message = `Halo, saya mau pesan:\n${lines.join('\n')}\n\nTotal: ${formatIDR.format(totalPrice)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [state.items, totalPrice]);

  return (
    <OrderContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearOrder,
        totalItems,
        totalQuantity,
        totalPrice,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
}
