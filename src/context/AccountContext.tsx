import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  mockOrders,
  savedAddresses as seedAddresses,
  type Address,
  type Order,
} from "@/data/orders";

export type AccountUser = { name: string; email: string; phone: string };

type AccountState = {
  user: AccountUser | null;
  signedIn: boolean;
  signIn: (email: string) => void;
  signUp: (user: AccountUser) => void;
  signOut: () => void;
  addresses: Address[];
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
  placeOrder: (order: Order) => void;
};

const AccountContext = createContext<AccountState | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [addresses, setAddresses] = useState<Address[]>(seedAddresses);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  // Prototype auth: any input succeeds, nothing is validated or persisted.
  const signIn = useCallback((email: string) => {
    setUser({ name: "Samarth Shetty", email, phone: "+91 98450 22110" });
  }, []);
  const signUp = useCallback((next: AccountUser) => setUser(next), []);
  const signOut = useCallback(() => setUser(null), []);

  const addAddress = useCallback((address: Address) => {
    setAddresses((list) => [...list, address]);
  }, []);
  const removeAddress = useCallback((id: string) => {
    setAddresses((list) => list.filter((a) => a.id !== id));
  }, []);

  const placeOrder = useCallback((order: Order) => {
    setOrders((list) => [order, ...list]);
  }, []);

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  const value = useMemo<AccountState>(
    () => ({
      user,
      signedIn: user !== null,
      signIn,
      signUp,
      signOut,
      addresses,
      addAddress,
      removeAddress,
      orders,
      getOrder,
      placeOrder,
    }),
    [user, signIn, signUp, signOut, addresses, addAddress, removeAddress, orders, getOrder, placeOrder],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used inside AccountProvider");
  return ctx;
}
