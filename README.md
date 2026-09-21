# Shopping Cart Frontend Modernization

A modern e-commerce shopping cart application migrated from a legacy single-file HTML/CSS/JavaScript codebase into a scalable, component-driven frontend using **React 19**, **TypeScript**, and **Vite**.

---

## Overview

This project refactors and enhances a legacy shopping cart implementation ([index.html](./index.html)) to meet modern web standards, improve user experience, and implement five core feature requirements specified in [objective.md](./objective.md).

### Implemented Requirements

| # | Feature | Description | Key Components |
|---|---|---|---|
| 1 | **Confirmation Dialog** | Modal dialog confirming user intent before checking out or deleting an item from the cart. | `ConfirmDialog.tsx` |
| 2 | **Add-to-Cart Notification** | Non-blocking toast/snackbar alerting the user when an item is added to the cart. | `Notification.tsx` |
| 3 | **Total Quantity Badge** | Real-time aggregate count of all item units in the cart displayed on the header cart icon. | `Header.tsx`, `CartContext.tsx` |
| 4 | **Search Box Filter** | Live debounced search input allowing users to quickly search and filter products. | `SearchBox.tsx`, `ProductGrid.tsx` |
| 5 | **Quantity Multiples** | Configurable step/multiples support for `+` and `-` quantity controls (not hardcoded to step 1). | `QuantityControls.tsx`, `CartItem.tsx` |

---

## Project Structure

```text
.
├── fe-test/                         # Modernized React 19 + TypeScript application
│   ├── src/
│   │   ├── components/              # UI Components (Header, Cart, Dialogs, etc.)
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSidebar.tsx
│   │   │   ├── ConfirmDialog.tsx    # Feature 1: Confirmation modal
│   │   │   ├── Header.tsx           # Feature 3: Header with total quantity badge
│   │   │   ├── Notification.tsx     # Feature 2: Toast notification
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductPage.tsx
│   │   │   ├── QuantityControls.tsx # Feature 5: Step/multiples controls
│   │   │   └── SearchBox.tsx        # Feature 4: Search & filter
│   │   ├── context/
│   │   │   └── CartContext.tsx      # Central cart state management
│   │   ├── data/
│   │   │   └── products.ts          # Product data & mock catalog
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript interfaces and contracts
│   │   ├── App.tsx                  # Root layout & state provider integration
│   │   ├── main.tsx                 # React DOM entry point
│   │   └── index.css                # Global theme, variables, and typography
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── index.html                       # Original vanilla HTML/CSS/JS frontend
├── objective.md                     # Assessment requirements & specifications
├── plan.md                          # Migration & technical implementation plan
├── agent.md                         # AI agent guidelines, Playwright & Codegraph MCP guides
└── README.md                        # Project documentation (this file)
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (bundled with Node.js)

### Installation & Local Development

1. Navigate to the `fe-test` application directory:
   ```bash
   cd fe-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## Available Scripts

From within the `fe-test/` directory:

| Command | Action |
|---|---|
| `npm run dev` | Starts the local Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles TypeScript and bundles production assets into `fe-test/dist/`. |
| `npm run preview` | Locally serves the production build for testing and inspection. |
| `npm run lint` | Runs ESLint to verify code quality and adherence to style rules. |

---

## Validation & Testing

- **Playwright MCP Integration**: End-to-end user flows and UI interactions can be validated using Playwright MCP tools (`browser_navigate`, `browser_click`, `browser_snapshot`, etc.). Detailed test scenarios for each feature are documented in [agent.md](./agent.md#testing-with-playwright-mcp).
- **Code Intelligence via Codegraph MCP**: The workspace is indexed with Codegraph for rapid symbol discovery, impact analysis, and dependency tracing. See [agent.md](./agent.md#code-intelligence-with-codegraph-mcp) for query patterns and workflows.
