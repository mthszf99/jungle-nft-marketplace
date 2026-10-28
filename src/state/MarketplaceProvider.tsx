import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { NFT } from "../types/nft";
import { totalEth } from "../lib/eth";

type User = {
  name: string;
  email: string;
};

type Order = {
  id: string;
  items: NFT[];
  totalEth: string;
  createdAt: string;
  email: string;
};

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

type AccountData = {
  orders: Order[];
  wallets: string[];
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

function accountKey(email: string) {
  return `kurio-account:${email.trim().toLowerCase()}`;
}

function loadAccount(email: string): AccountData {
  return stored<AccountData>(accountKey(email), {
    orders: [],
    wallets: [],
  });
}

export function MarketplaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<NFT[]>(() =>
    stored("kurio-cart", []),
  );

  const [user, setUser] = useState<User | null>(() =>
    stored("kurio-user", null),
  );

  const [accounts, setAccounts] = useState<Record<string, AccountData>>(
    () => ({}),
  );

  const email = user?.email ?? null;

  const account = email
    ? (accounts[email] ?? loadAccount(email))
    : { orders: [], wallets: [] };

  const orders = account.orders;
  const wallets = account.wallets;

  useEffect(() => {
    localStorage.setItem("kurio-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("kurio-user", JSON.stringify(user));
  }, [user]);

  function updateAccount(
    targetEmail: string,
    updater: (current: AccountData) => AccountData,
  ) {
    setAccounts((previous) => {
      const current =
        previous[targetEmail] ?? loadAccount(targetEmail);

      const updated = updater(current);

      localStorage.setItem(
        accountKey(targetEmail),
        JSON.stringify(updated),
      );

      return {
        ...previous,
        [targetEmail]: updated,
      };
    });
  }

  const add = (nft: NFT) => {
    setCart((previous) =>
      previous.some((item) => item.id === nft.id)
        ? previous
        : [...previous, nft],
    );
  };

  const remove = (id: string) => {
    setCart((previous) =>
      previous.filter((item) => item.id !== id),
    );
  };

  const clear = () => {
    setCart([]);
  };

  const signIn = (name: string, userEmail: string) => {
    const normalizedEmail = userEmail.trim().toLowerCase();

    setUser({
      name,
      email: normalizedEmail,
    });
  };

  const signOut = () => {
    setUser(null);
  };

  const checkout = (idempotencyKey: string): Order => {
    if (!email) {
      throw new Error("Entre na sua conta para finalizar.");
    }

    const currentAccount =
      accounts[email] ?? loadAccount(email);

    const existing = currentAccount.orders.find(
      (order) => order.id === idempotencyKey,
    );

    if (existing) {
      return existing;
    }

    if (!cart.length) {
      throw new Error("Seu carrinho está vazio.");
    }

    const order: Order = {
      id: idempotencyKey,
      items: [...cart],
      totalEth: totalEth(
        cart.map((item) => item.priceEth),
      ),
      createdAt: new Date().toISOString(),
      email,
    };

    updateAccount(email, (current) => {
      if (
        current.orders.some(
          (item) => item.id === idempotencyKey,
        )
      ) {
        return current;
      }

      return {
        ...current,
        orders: [order, ...current.orders],
      };
    });

    setCart([]);

    return order;
  };

  const connectWallet = (address: string) => {
    if (!email) {
      return;
    }

    updateAccount(email, (current) => ({
      ...current,
      wallets: current.wallets.includes(address)
        ? current.wallets
        : [...current.wallets, address],
    }));
  };

  const disconnectWallet = (address: string) => {
    if (!email) {
      return;
    }

    updateAccount(email, (current) => ({
      ...current,
      wallets: current.wallets.filter(
        (item) => item !== address,
      ),
    }));
  };

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

  if (!context) {
    throw new Error("MarketplaceProvider ausente");
  }

  return context;
}