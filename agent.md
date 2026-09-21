# Agent Rules & Testing Guide

## General Rules
- Refer to [objective.md](./objective.md) for core functional requirements.
- Use `codegraph` tools for codebase understanding, symbol navigation, and dependency tracing.
- Use `playwright` MCP tools to validate all user flows and UI features before completing tasks.

---

## Testing with Playwright MCP

When verifying the frontend application (Vite dev server at `http://localhost:5173` or target URL), use the Playwright MCP tools to perform automated functional testing and UI validation.

### 1. Setup & Navigation
- Ensure the local dev server is running (e.g., `npm run dev` in `fe-test/`).
- Use `browser_navigate` to load the application URL (e.g., `http://localhost:5173`).
- Use `browser_wait_for` or `browser_snapshot` to ensure the DOM is fully loaded before interacting.

### 2. Required Test Scenarios (from `objective.md`)

#### Feature 1: Confirmation Dialog Window
- **Actions:**
  - Add items to cart and click "Remove" on a cart item.
  - Add items to cart and click the "Checkout" button.
- **Verification:**
  - Check that a confirmation dialog appears before executing the action.
  - Verify canceling the dialog retains the item/state.
  - Verify confirming proceeds with the item deletion or checkout flow.

#### Feature 2: Add-to-Cart Notification
- **Actions:**
  - Click "Add to Cart" on any product card.
- **Verification:**
  - Verify a toast/snackbar notification pops up confirming the item was added.
  - Verify it displays relevant details (item name, status) and dismisses/fades out appropriately.

#### Feature 3: Total Quantity Count in Cart Badge
- **Actions:**
  - Add multiple items and adjust quantities.
- **Verification:**
  - Verify the cart icon badge displays the aggregate total quantity of all items in the cart (not just number of unique items).
  - Verify badge count updates immediately when quantities increase or decrease.

#### Feature 4: Search Box Functionality
- **Actions:**
  - Use `browser_fill_form` or `browser_type` into the search box.
- **Verification:**
  - Verify product grid dynamically filters to matching products.
  - Test edge cases: clearing the search box (shows all products), search query with no matching items (shows empty state / message).

#### Feature 5: Quantity Multiples / Step Updates
- **Actions:**
  - Modify quantity using the `+` and `-` buttons or input.
- **Verification:**
  - Verify quantity increments and decrements by the expected step/multiple.
  - Ensure minimum quantity constraints (e.g., >= 1) and totals calculate accurately.

### 3. Verification & Diagnostic Checks
- **DOM Inspection:** Use `browser_snapshot` to inspect accessibility tree / element states.
- **Visual Validation:** Use `browser_take_screenshot` to verify visual layout and styles.
- **Console Errors:** Check `browser_console_messages` to ensure zero runtime uncaught exceptions or React warnings.
- **Cleanup:** Call `browser_close` once testing is complete.
