import type { Expense, ExpenseAction } from "./types";

// A reducer takes the current list plus an action and returns the new list.
export function expenseReducer(
  state: Expense[],
  action: ExpenseAction
): Expense[] {
  switch (action.type) {
    case "add":
      return [action.payload, ...state];
    case "delete":
      return state.filter((expense) => expense.id !== action.payload);
    case "clear":
      return [];
    default:
      return state;
  }
}
