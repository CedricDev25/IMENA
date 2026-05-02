import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";
import { Transaction } from "./types";

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id" | "date">) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem("finai_user_email");
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem("finai_transactions");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load transactions", e);
      return [];
    }
  });

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem("finai_user_email", userEmail);
    } else {
      localStorage.removeItem("finai_user_email");
    }
  }, [userEmail]);

  useEffect(() => {
    localStorage.setItem("finai_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx: Omit<Transaction, "id" | "date">) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const { totalIncome, totalExpenses } = useMemo(() => {
    return transactions.reduce(
      (acc, tx) => {
        if (tx.type === "income") {
          acc.totalIncome += tx.amount;
        } else {
          acc.totalExpenses += tx.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpenses: 0 }
    );
  }, [transactions]);

  const netProfit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        netProfit,
        profitMargin,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
