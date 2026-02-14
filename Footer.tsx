import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Watch, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (watch: Watch) => void;
  removeFromCart: (watchId: number) => void;
  updateQuantity: (watchId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((watch: Watch) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === watch.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === watch.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...watch, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((watchId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== watchId));
  }, []);

  const updateQuantity = useCallback((watchId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(watchId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === watchId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
