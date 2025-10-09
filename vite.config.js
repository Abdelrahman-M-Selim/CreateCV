import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // temporarily disable react-compiler to check if it causes the issue
    react({
      // babel: {
      //   plugins: [['babel-plugin-react-compiler']],
      // },
    }),
  ],
});
