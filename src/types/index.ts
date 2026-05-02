export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  description?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
