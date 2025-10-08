import { useState, useEffect } from "react";

/**
 * Persist state to localStorage
 * @param {string} key
 * @param {any} initial
 */
export function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      console.warn("useLocalStorage parse error", e);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn("useLocalStorage save error", e);
    }
  }, [key, state]);

  return [state, setState];
}
