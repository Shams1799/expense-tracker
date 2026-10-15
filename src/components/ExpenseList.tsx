import type { Expense } from "../types";
import { CATEGORY_COLORS } from "../types";
import { formatCurrency, formatDate } from "../utils";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <p className="empty">
        No expenses here yet. Add your first one using the form.
      </p>
    );
  }

  // Newest first. [...expenses] copies the array so we don't change the original.
  const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ul className="ledger">
      {sorted.map((expense) => (
        <li key={expense.id}>
          <span
            className="dot"
            style={{ background: CATEGORY_COLORS[expense.category] }}
            aria-hidden="true"
          />
          <div className="what">
            <strong>{expense.title}</strong>
            <small>
              {expense.category}, {formatDate(expense.date)}
            </small>
          </div>
          <span className="amount">{formatCurrency(expense.amount)}</span>
          <button
            type="button"
            className="ghost"
            aria-label={`Delete ${expense.title}`}
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
