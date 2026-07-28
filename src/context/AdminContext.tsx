"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type AdminContextType = {
  isAdmin: boolean;
  loginAdmin: (passcode: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
};

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  loginAdmin: async () => false,
  logoutAdmin: async () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verify true session cookie with backend API on mount
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.isAdmin) {
          setIsAdmin(true);
          localStorage.setItem("seoyoung_portfolio_admin", "true");
        } else {
          setIsAdmin(false);
          localStorage.removeItem("seoyoung_portfolio_admin");
        }
      })
      .catch(() => {
        setIsAdmin(false);
        localStorage.removeItem("seoyoung_portfolio_admin");
      });
  }, []);

  const loginAdmin = async (passcode: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passcode }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAdmin(true);
        localStorage.setItem("seoyoung_portfolio_admin", "true");
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logoutAdmin = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {}
    setIsAdmin(false);
    localStorage.removeItem("seoyoung_portfolio_admin");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
