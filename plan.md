# React Shopping Cart — Implementation Plan

## Objective
Migrate the vanilla HTML/CSS/JS shopping cart from `index.html` into `fe-test/` (Vite + React 19 + TypeScript), implementing these 5 features:

1. **Dialog window** — confirm before checkout or remove item from cart
2. **Add-to-cart notification** — toast/snackbar when item is added
3. **Total quantity count** — displayed on cart icon badge
4. **Search box** — filter products by name
5. **Fix quantity multiples** — quantity +/- should increment/decrement by a configurable step (default 1), not always by 1

---

## File Structure

```
fe-test/src/
├── main.tsx                          # entry (already exists, keep as-is)
├── App.tsx                           # root layout: Header + ProductPage + CartSidebar + Dialog + Notification
├── index.css                         # global reset + variables (replace existing)
├── types/
│   └── index.ts                      # Product, CartItem interfaces
├── data/
│   └── products.ts                   # mock product array (from index.html)
├── context/
│   └── CartContext.tsx               # CartProvider + useCart hook
├── components/
│   ├── Header.tsx                    # site header with cart icon + badge + search trigger
│   ├── Header.css
│   ├── ProductGrid.tsx               # responsive product grid
│   ├── ProductGrid.css
│   ├── ProductCard.tsx               # single product card with "add to cart" button
│   ├── ProductCard.css
│   ├── SearchBox.tsx                 # search input with debounce
│   ├── SearchBox.css
│   ├── CartSidebar.tsx               # slide-in cart panel
│   ├── CartSidebar.css
│   ├── CartItem.tsx                  # single cart line item with quantity controls
│   ├── CartItem.css
│   ├── QuantityControls.tsx          # +/- buttons with step support (fixes feature 5)
│   ├── QuantityControls.css
│   ├── ConfirmDialog.tsx             # reusable modal dialog (feature 1)
│   ├── ConfirmDialog.css
│   ├── Notification.tsx             # toast notification system (feature 2)
│   └── Notification.css
```

---

## Implementation Steps

### Step 1 — Types & Data

**File: `src/types/index.ts`**
```ts
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
```

**File: `src/data/products.ts`**
- Extract the 8 products from `index.html` (lines 317-326) into a typed array.

### Step 2 — Cart Context (state management)

**File: `src/context/CartContext.tsx`**
- `CartProvider` wraps the app.
- State: `cart: CartItem[]`, `isCartOpen: boolean`, `notification: string | null`, `dialog: DialogConfig | null`.
- Actions:
  - `addToCart(product, step = 1)` — adds `step` quantity; shows notification (feature 2 + 3).
  - `removeFromCart(productId)` — triggers confirm dialog (feature 1).
  - `updateQuantity(productId, change)` — change can be any integer (feature 5 — multiples).
  - `checkout()` — triggers confirm dialog, then clears cart.
  - `toggleCart()`, `closeCart()`.
  - `showNotification(msg)` / `dismissNotification()`.
  - `showDialog(config)` / `dismissDialog()`.
- Derived: `totalItems` (sum of quantities — feature 3), `totalPrice`.

### Step 3 — Confirm Dialog (feature 1)

**File: `src/components/ConfirmDialog.tsx` + `.css`**
- Reusable modal with `title`, `message`, `onConfirm`, `onCancel` props.
- Renders a backdrop overlay + centered card.
- Triggered by context's `dialog` state (checkout & remove-item flows).

### Step 4 — Notification Toast (feature 2)

**File: `src/components/Notification.tsx` + `.css`**
- Fixed-position toast at top-right.
- Auto-dismisses after 3 seconds.
- Driven by context's `notification` state.

### Step 5 — Search Box (feature 4)

**File: `src/components/SearchBox.tsx` + `.css`**
- Controlled input with `onChange` → `useMemo` filter on product list (debounced via `useDeferredValue` from React 19).
- Placed inside `Header` component.

### Step 6 — Quantity Controls (feature 5)

**File: `src/components/QuantityControls.tsx` + `.css`**
- Props: `quantity`, `onIncrease`, `onDecrease`, `step` (default 1).
- +/- buttons call `onIncrease` / `onDecrease` with `step` value.
- This fixes the "quantity can't update by multiples" issue.

### Step 7 — UI Components

**Header.tsx** — dark header bar with title, SearchBox, and cart icon badge showing `totalItems`.

**ProductGrid.tsx** — CSS Grid (4 columns → 2 on mobile). Receives filtered product list.

**ProductCard.tsx** — shows product name, price (NT$ format), and "Add to Cart" button.

**CartSidebar.tsx** — fixed right panel, slides in. Lists `CartItem` components + total price + checkout button.

**CartItem.tsx** — shows product name, price, and `QuantityControls` + remove button.

### Step 8 — App.tsx Assembly

- Render `Header`, `ProductGrid`, `CartSidebar`, `ConfirmDialog`, `Notification`.
- Wrap everything in `CartProvider`.
- Replace `index.css` with shopping-cart styles (responsive, modern CSS).

### Step 9 — Styling

- Replace existing `index.css` and `App.css` completely.
- Use CSS files per component (plain CSS, no CSS modules — keep it simple and matching the Vite default setup).
- Responsive: grid 4-col → 2-col → 1-col. Cart sidebar collapses on mobile.
- Color scheme from original: header `#333`, accent `#ff6b6b`, button `#4CAF50`.

---

## Key Design Decisions

- **No external dependencies** — React 19 + TypeScript only. Uses `useDeferredValue` for search debounce, `createContext` for state.
- **Quantity step** — `QuantityControls` accepts a `step` prop (default 1). `addToCart` also accepts a step. This is the fix for feature 5.
- **Dialog is context-driven** — any component can trigger a confirm dialog by calling `showDialog()` from context, keeping it reusable.
- **Notification auto-dismiss** — 3-second timeout, no library needed.

---

## Verification

1. `cd fe-test && npm run dev` — app loads with product grid.
2. Search box filters products in real time.
3. "Add to cart" shows a notification toast and increments the badge count.
4. Cart sidebar opens, shows items with quantity +/- controls.
5. Remove item shows a confirm dialog.
6. Checkout shows a confirm dialog, then clears cart.
7. Quantity controls respect the `step` value (test with step=2 or step=5).
8. Responsive: resize browser to verify grid adapts.
9. `npm run build` — no TypeScript errors.

---

## Evaluation Criteria

### 1. Code Structure (60%)

- Whether a framework like React or Vue is used
- Proper component separation/design
- Use of modern frontend features (e.g., hooks, composition API)
- Clear and readable code structure
- Use of state management tools (3 points)
- Custom hooks or composables (if any)
- Proper CSS organization and styling approach

### 2. Problem Solving & Optimization (30%)

Fix or improve the following issues:

**CSS / Layout issues:**
- Incorrect or incomplete styles

**JavaScript / Logic issues:**
- Incomplete implementation or poor optimization
- Incorrect data handling
- Code readability and structure issues

### 3. AI Usage (10%)

- Proper use of AI tools to assist coding
- Reasonable prompting techniques
- Final result accuracy and understanding
