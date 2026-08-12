# Shared

Where a piece of UI belongs, in one rule each.

## `shared/ui` — atoms

Small, generic, no business knowledge. Takes everything through inputs and
reports back through outputs. Usable on any screen of any app.

`badge` · `button` · `form-field` · `form-section` · `toast` · `export-import`

## `shared/components` — composites

Built from atoms, still generic, but they own more structure or state.

`table` · `cards` · `dialog` · `loader` · `page-header` · `error-page`

## `shared/directives` — behaviour with no markup

`click-outside` · `scroll-lock`

---

## What does **not** belong here

A component used by exactly one feature lives **next to that feature**, not in
`shared`. Putting it here implies "reusable" and sends the next developer
looking for a generic API that does not exist.

Examples already applied:

- `notifications`, `user-menu`, `language-switcher` → `layout/header/components/`
  (they read the header's own state and appear nowhere else)
- `search-table`, `table-pagination`, `table-actions` → `shared/components/table/`
  (parts of the table, not standalone atoms)

Rule of thumb: **move it to `shared` on the second use, not the first.**
