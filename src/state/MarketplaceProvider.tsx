import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { NFT } from "../types/nft";
import { totalEth } from "../lib/eth";

type User = { name: string; email: string };
type Order = { id: string; items: NFT[]; totalEth: string; createdAt: string; email: string };
type Store = {
  cart: NFT[];
  user: User | null;
  orders: Order[];
  wallets: string[];
  add: (nft: NFT) => void;
  remove: (id: string) => void;
  clear: () => void;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  checkout: (idempotencyKey: string) => Order;
  connectWallet: (address: string) => void;
  disconnectWallet: (address: string) => void;
};
const Context = createContext<Store | null>(null);
function stored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<NFT[]>(() => stored("kurio-cart", []));
  const [user, setUser] = useState<User | null>(() => stored("kurio-user", null));
  const [orders, setOrders] = useState<Order[]>(() => stored("kurio-orders", []));
  const [wallets, setWallets] = useState<string[]>(() => stored("kurio-wallets", []));
  useEffect(() => {
    localStorage.setItem("kurio-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("kurio-user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem("kurio-orders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem("kurio-wallets", JSON.stringify(wallets));
  }, [wallets]);
  const add = (nft: NFT) =>
    setCart((prev) => (prev.some((item) => item.id === nft.id) ? prev : [...prev, nft]));
  const remove = (id: string) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clear = () => setCart([]);
  const signIn = (name: string, email: string) => setUser({ name, email: email.toLowerCase() });
  const signOut = () => {
    setUser(null);
    setWallets([]);
  };
  const checkout = (idempotencyKey: string): Order => {
    if (!user) throw new Error("Entre na sua conta para finalizar.");
    const existing = orders.find((order) => order.id === idempotencyKey);
    if (existing) return existing;
    if (!cart.length) throw new Error("Seu carrinho está vazio.");
    const order = {
      id: idempotencyKey,
      items: [...cart],
      totalEth: totalEth(cart.map((item) => item.priceEth)),
      createdAt: new Date().toISOString(),
      email: user.email,
    };
    setOrders((prev) =>
      prev.some((item) => item.id === idempotencyKey) ? prev : [order, ...prev],
    );
    setCart([]);
    return order;
  };
  const connectWallet = (address: string) =>
    setWallets((prev) => (prev.includes(address) ? prev : [...prev, address]));
  const disconnectWallet = (address: string) =>
    setWallets((prev) => prev.filter((item) => item !== address));
  return (
    <Context.Provider
      value={{
        cart,
        user,
        orders,
        wallets,
        add,
        remove,
        clear,
        signIn,
        signOut,
        checkout,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Context.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useMarketplace() {
  const context = useContext(Context);
  if (!context) throw new Error("MarketplaceProvider ausente");
  return context;
}
