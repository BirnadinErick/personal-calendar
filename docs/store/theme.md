# Theme Store State Management

The theme and appearance settings of the application are managed globally using Zustand and persisted locally inside the user's browser.

## Store Structure

The state and setter functions are defined inside [useStore.ts](../../src/store/useStore.ts):

* **`themeMode`**: `'system' | 'light' | 'dark'`  
  Defines the theme layout preference. The default value is `'light'`.
* **`accentColorId`**: `string`  
  Stores the ID of the current active brand accent color. The default value is `'blue'`.
* **`setThemeMode(mode)`**: Updates `themeMode` state and persists it to local storage.
* **`setAccentColorId(id)`**: Updates `accentColorId` state and persists it to local storage.

## Persistence Details

To ensure proper functionality in both runtime browser environments and headless server/testing execution environments, persistence calls are wrapped in safe access helpers:

1. **`getSafeStorage(key, fallback)`**: Retrieves item from `window.localStorage` if available.
2. **`setSafeStorage(key, value)`**: Sets item in `window.localStorage` if available.

This prevents crashes during headless `vitest` execution where `localStorage` is not fully initialized.
