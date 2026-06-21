// ============================================================
// preload.js — Secure Bridge between Electron & Web Page
// ============================================================
// This file safely exposes only specific Node/Electron APIs
// to the renderer (index.html) using contextBridge
// ============================================================

const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to the web page
contextBridge.exposeInMainWorld('electronAPI', {
  // Get app version
  getVersion: () => ipcRenderer.invoke('app-version'),
  // Open external URL in browser
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  // Platform info
  platform: process.platform,
});
