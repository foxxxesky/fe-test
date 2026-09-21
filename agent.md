# Agent Rules & Testing Guide

## General Rules
- Refer to [objective.md](./objective.md) for core functional requirements.
- Use `codegraph` tools for codebase understanding, symbol navigation, and dependency tracing.
- Use `playwright` MCP tools to validate all user flows and UI features before completing tasks.

---

## Code Intelligence with Codegraph MCP

Codegraph maintains an indexed knowledge graph of symbols, edges, and files in the workspace (stored in `.codegraph/`). Consult it **before** writing or editing code to understand architecture, symbol relationships, and blast radius.

### 1. Tool Selection by Intent

| Intent / Question | Recommended Tool | Description |
|---|---|---|
| *"What's the deal with this task / component / feature?"* | `codegraph_context` | **Primary tool**: Composes search, node info, callers, and callees in a single call. |
| *"How does X reach or trigger Y?"* | `codegraph_trace` | Traces full execution flow (including dynamic dispatch, callbacks, and React re-renders). |
| *"Where is symbol X defined?"* | `codegraph_search` | Fast symbol name lookup returning kind, location, and signature. |
| *"Show me this symbol's source code / docstring"* | `codegraph_node` | Reads source code and metadata for a specific symbol. |
| *"Survey several related symbols or a module"* | `codegraph_explore` | Returns source of related symbols grouped by file in one capped call. |
| *"What calls / uses this symbol?"* | `codegraph_callers` | Finds all incoming call sites / usages. |
| *"What does this symbol call / invoke?"* | `codegraph_callees` | Finds all outgoing function calls and component renders. |
| *"What would changing this break?"* | `codegraph_impact` | Calculates blast radius and affected downstream dependencies. |
| *"What files exist in a directory?"* | `codegraph_files` | Lists indexed files and structures in the workspace. |
| *"Is the index ready?"* | `codegraph_status` | Inspects indexing status, symbol count, and database size. |

### 2. Recommended Workflows

- **Feature Exploration & Onboarding**:
  - Start with `codegraph_context(query: "<component or hook name>")`.
  - Use `codegraph_explore` if wider context is needed across related symbols.
  - Avoid grep loops; let Codegraph provide the structural map directly.
- **Tracing User Action to State Change**:
  - Run `codegraph_trace(from_symbol: "<handler>", to_symbol: "<reducer or state updater>")` to see the full path in one call.
- **Refactoring & Safe Modifications**:
  - Run `codegraph_impact(symbol: "<target>")` to verify all components and callers that will be affected by a signature or behavior change.

### 3. Best Practices & Anti-patterns

- **Don't grep first** when searching for known symbols or types — `codegraph_search` or `codegraph_context` is faster and context-rich.
- **Don't loop `codegraph_node`** across many symbols — use `codegraph_explore` to inspect multiple related symbols in one call.
- **Index synchronization**: The file watcher needs ~500ms to debounce and re-index after file writes; wait for the next turn before querying freshly modified symbols.

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
