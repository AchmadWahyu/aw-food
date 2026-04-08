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
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  notes: string;
  imgUrl?: string;
};

type OrderState = {
  items: OrderItem[];
};

type OrderAction =
  | { type: 'ADD_ITEM'; payload: OrderItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string | number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string | number; quantity: number } }
  | { type: 'UPDATE_NOTES'; payload: { id: string | number; notes: string } }
  | { type: 'CLEAR_ORDER' };

const initialState: OrderState = { items: [] };

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? {
                  ...i,
                  quantity: i.quantity + action.payload.quantity,
                  notes: action.payload.notes || i.notes,
                }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case 'UPDATE_NOTES':
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
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
  addItem: (item: OrderItem) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  updateNotes: (id: string | number, notes: string) => void;
  clearOrder: () => void;
  totalItems: number;
  totalQuantity: number;
  totalPrice: number;
  generateWhatsAppUrl: () => string;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const addItem = useCallback((item: OrderItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: string | number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }, []);

  const updateQuantity = useCallback((id: string | number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const updateNotes = useCallback((id: string | number, notes: string) => {
    dispatch({ type: 'UPDATE_NOTES', payload: { id, notes } });
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
