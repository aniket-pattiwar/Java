# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


I have hidden the Teaching Mode and Teaching Tips directly on your main branch:

Summary of Changes:


TeachingTip.tsx

Added const SHOW_TEACHING_TIPS = false;
All teacher notes, 2-minute pitches, whiteboard drawing guides, and classroom discussion Q&As are completely hidden from concept cards.


Navbar.tsx

Added const SHOW_TEACHING_MODE = false;
The Teaching Mode: ON/OFF toggle button is cleanly hidden from the navbar without triggering any TypeScript unused import/variable warnings.


TeachingModeContext.tsx

Defaulted teachingMode to false for any new visitors visiting the deployed site.
How to Turn It Back On Later
Whenever you want to re-enable Teaching Mode:

In Navbar.tsx
, flip SHOW_TEACHING_MODE = true;

In TeachingTip.tsx
, flip SHOW_TEACHING_TIPS = true;
The build was tested with npm run build (tsc -b && vite build) and passed with 0 errors. You are all set to deploy to Vercel!