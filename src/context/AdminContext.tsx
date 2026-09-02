import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  canAccess,
  canEdit,
  type AdminRole,
  type AdminSection,
} from "@/data/admin";

type AdminState = {
  signedIn: boolean;
  email: string;
  role: AdminRole;
  signIn: (email: string, role: AdminRole) => void;
  setRole: (role: AdminRole) => void;
  signOut: () => void;
  can: (section: AdminSection) => boolean;
  mayEdit: (section: AdminSection) => boolean;
};

const AdminContext = createContext<AdminState | null>(null);

/** Prototype auth: any credentials work and nothing is persisted. */
export function AdminProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRoleState] = useState<AdminRole>("Director");

  const signIn = useCallback((nextEmail: string, nextRole: AdminRole) => {
    setEmail(nextEmail);
    setRoleState(nextRole);
    setSignedIn(true);
  }, []);
  const setRole = useCallback((next: AdminRole) => setRoleState(next), []);
  const signOut = useCallback(() => {
    setSignedIn(false);
    setEmail("");
  }, []);

  const value = useMemo<AdminState>(
    () => ({
      signedIn,
      email,
      role,
      signIn,
      setRole,
      signOut,
      can: (section) => canAccess(role, section),
      mayEdit: (section) => canEdit(role, section),
    }),
    [signedIn, email, role, signIn, setRole, signOut],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
