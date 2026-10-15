# Expense Tracker

A simple expense tracker built with **React, TypeScript and Vite**. Add what you spend, see where your money goes by category, and filter your history. Your data stays in your browser, so no sign-up is needed.

**Live demo:** https://expense-tracker-nu-six-90.vercel.app/

<!-- Add a screenshot: save it as screenshot.png in this repo, then remove the comment marks around the next line -->
<!-- ![Expense Tracker screenshot](screenshot.png) -->

## Features

- Add an expense with a title, amount, date and category, with input validation
- See your total spending and a colour bar showing the share of each category
- Filter the history by category
- Delete a single expense, or clear everything
- Data is saved in the browser (`localStorage`), so it is still there after a refresh
- Responsive layout that works on phones and desktops

## Tech stack

- React (function components and hooks)
- TypeScript (strict mode)
- Vite
- Plain CSS
- Deployed on Vercel

## TypeScript concepts used

| Concept | Where |
|---|---|
| Interfaces and type aliases | `Expense`, `NewExpense` in `types.ts` |
| Union types | `Category` and `CategoryFilter` |
| `as const` | The list of categories |
| `Record<K, V>` | Colour and total for each category |
| Discriminated union | Reducer actions: add, delete, clear |
| Generics | `loadFromStorage<T>` and `saveToStorage<T>` |
| Typed props, state and events | The components in `src/components` |

## Project structure

```
src/
  components/
    ExpenseForm.tsx    form with validation
    ExpenseList.tsx    list of expenses, newest first
    Summary.tsx        total and category breakdown
  App.tsx              connects everything together
  expenseReducer.ts    rules for adding, deleting and clearing expenses
  storage.ts           typed helpers for localStorage
  types.ts             all shared types
  utils.ts             currency and date formatting
  App.css, index.css   styles
  main.tsx             app entry point
```

## Run it locally

Requires Node.js 18 or newer.

```bash
git clone https://github.com/Shams1799/expense-tracker.git
cd expense-tracker
npm install
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173).

Other commands:

```bash
npm run build      # create a production build in dist/
npx tsc -b         # check the types
```

## What I learned

- How TypeScript catches mistakes before the code runs
- Managing state with `useReducer` and saving it with `useEffect`
- Typing React props, state and form events
- Deploying a Vite app from GitHub to Vercel

## Ideas for the future

- Edit an existing expense
- Filter by month and export to CSV
- Add a backend and user accounts

## Author

**Shams Parvez**, Frontend Developer
LinkedIn: https://www.linkedin.com/in/shams-parvez-754034218
