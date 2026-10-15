import { CATEGORIES, CATEGORY_COLORS } from "../types";
import type { Category, Expense } from "../types";
import { formatCurrency } from "../utils";

interface SummaryProps {
  expenses: Expense[];
}

export default function Summary({ expenses }: SummaryProps) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Start every category at 0, then add each expense to its category.
  const byCategory = {} as Record<Category, number>;
  for (const c of CATEGORIES) byCategory[c] = 0;
  for (const e of expenses) byCategory[e.category] += e.amount;

  const used = CATEGORIES.filter((c) => byCategory[c] > 0);

  return (
    <section className="summary" aria-label="Spending summary">
      <p className="label">Total spent</p>
      <p className="total">{formatCurrency(total)}</p>

      {total > 0 ? (
        <>
          <div className="bar" role="img" aria-label="Spending by category">
            {used.map((c) => (
              <span
                key={c}
                style={{
                  width: `${(byCategory[c] / total) * 100}%`,
                  background: CATEGORY_COLORS[c],
                }}
              />
            ))}
          </div>
          <ul className="legend">
            {used.map((c) => (
              <li key={c}>
                <span
                  className="dot"
                  style={{ background: CATEGORY_COLORS[c] }}
                  aria-hidden="true"
                />
                {c} <b>{formatCurrency(byCategory[c])}</b>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="muted">Your category breakdown appears here.</p>
      )}
    </section>
  );
}
