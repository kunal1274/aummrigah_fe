/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
  */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Vite PWA",
        short_name: "MyPWA",
        description: "A Progressive Web App built with Vite",
        theme_color: "#007bff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/apple-touch-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/desktop1.png", // Add a valid screenshot here
            sizes: "1920x1080", // Update the resolution based on your app
            type: "image/png",
            form_factor: "wide", // Options: wide, narrow, or standard
          },
          {
            src: "/mobile1.png", // Add a valid screenshot here
            sizes: "1080x1920", // Update the resolution based on your app
            type: "image/png",
            form_factor: "narrow", // Options: wide, narrow, or standard
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.(js|css|html|png|jpg|jpeg|svg|gif)/,
            handler: "CacheFirst",
          },
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/,
            handler: "NetworkFirst",
          },
        ],
      },
    }),
  ],
});
