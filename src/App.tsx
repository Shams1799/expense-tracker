import { useEffect, useMemo, useReducer, useState } from "react";
import type { ChangeEvent } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import { expenseReducer } from "./expenseReducer";
import { loadFromStorage, saveToStorage } from "./storage";
import { CATEGORIES } from "./types";
import type { CategoryFilter, Expense, NewExpense } from "./types";
import { makeId } from "./utils";
import "./App.css";

const STORAGE_KEY = "expense-tracker:v1";

export default function App() {
  // useReducer holds the list. The 3rd argument loads saved data on first render.
  const [expenses, dispatch] = useReducer(
    expenseReducer,
    [] as Expense[],
    (initial) => loadFromStorage<Expense[]>(STORAGE_KEY, initial)
  );
  const [filter, setFilter] = useState<CategoryFilter>("All");

  // Save to localStorage every time the list changes.
  useEffect(() => {
    saveToStorage<Expense[]>(STORAGE_KEY, expenses);
  }, [expenses]);

  const visible = useMemo<Expense[]>(
    () =>
      filter === "All"
        ? expenses
        : expenses.filter((e) => e.category === filter),
    [expenses, filter]
  );

  const handleAdd = (data: NewExpense): void => {
    dispatch({ type: "add", payload: { ...data, id: makeId() } });
  };

  const handleClear = (): void => {
    if (window.confirm("Delete all expenses? This can't be undone.")) {
      dispatch({ type: "clear" });
    }
  };

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFilter(e.target.value as CategoryFilter);
  };

  return (
    <div className="page">
      <header>
        <h1>Expense Tracker</h1>
        <p className="muted">Your expenses stay in this browser.</p>
      </header>

      <main>
        <aside>
          <Summary expenses={expenses} />
          <ExpenseForm onAdd={handleAdd} />
        </aside>

        <section className="history" aria-label="Expense history">
          <div className="history-head">
            <h2>History</h2>
            <div className="tools">
              <label htmlFor="filter" className="sr-only">
                Filter by category
              </label>
              <select id="filter" value={filter} onChange={handleFilter}>
                <option value="All">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {expenses.length > 0 && (
                <button type="button" className="ghost" onClick={handleClear}>
                  Clear all
                </button>
              )}
            </div>
          </div>
          <ExpenseList
            expenses={visible}
            onDelete={(id) => dispatch({ type: "delete", payload: id })}
          />
        </section>
      </main>
    </div>
  );
}
