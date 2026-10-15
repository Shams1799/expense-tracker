import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CATEGORIES } from "../types";
import type { Category, NewExpense } from "../types";
import { todayISO } from "../utils";

// Props: what this component receives from its parent.
interface ExpenseFormProps {
  onAdd: (expense: NewExpense) => void;
}

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<Category>("Food");
  const [date, setDate] = useState<string>(todayISO());
  const [error, setError] = useState<string>("");

  // The event types tell TypeScript exactly what e.target contains.
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCategory(e.target.value as Category);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const value = Number(amount);

    if (!title.trim()) {
      setError("Enter what you spent the money on.");
      return;
    }
    if (!Number.isFinite(value) || value <= 0) {
      setError("Enter an amount greater than 0.");
      return;
    }

    onAdd({ title: title.trim(), amount: value, category, date });
    setTitle("");
    setAmount("");
    setError("");
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>Add an expense</h2>

      <label htmlFor="title">What was it for?</label>
      <input
        id="title"
        type="text"
        value={title}
        placeholder="Lunch, metro card, electricity bill"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />

      <div className="row">
        <div>
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={amount}
            placeholder="0.00"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            max={todayISO()}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
          />
        </div>
      </div>

      <label htmlFor="category">Category</label>
      <select id="category" value={category} onChange={handleCategory}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="primary">
        Add expense
      </button>
    </form>
  );
}
