// All the shapes of data used in the app live here.

// "as const" makes TypeScript treat this as a fixed list of exact strings.
export const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
] as const;

// Union type built from the list above: "Food" | "Transport" | ...
export type Category = (typeof CATEGORIES)[number];

// Record<Category, string> means: every category must have a colour.
export const CATEGORY_COLORS: Record<Category, string> = {
  Food: "#0f766e",
  Transport: "#2563eb",
  Shopping: "#c2410c",
  Bills: "#6d28d9",
  Entertainment: "#be185d",
  Other: "#64748b",
};

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // "YYYY-MM-DD"
}

// An expense before it gets an id (what the form produces).
export type NewExpense = Omit<Expense, "id">;

// Discriminated union: the "type" field tells TypeScript which payload to expect.
export type ExpenseAction =
  | { type: "add"; payload: Expense }
  | { type: "delete"; payload: string } // the id to delete
  | { type: "clear" };

// The filter dropdown can be any category or "All".
export type CategoryFilter = Category | "All";
