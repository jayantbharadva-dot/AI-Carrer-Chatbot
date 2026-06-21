// ============================================================
// AI Career Guidance Chatbot - Electron Desktop App
// main.js — Main Process (No Python Needed!)
// ============================================================
// Electron = Chromium + Node.js = Desktop App using HTML/CSS/JS
// ============================================================

const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path');

// Keep reference to window so it doesn't get garbage collected
let mainWindow;

// ---- Create the main application window ----
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 800,
    minHeight: 550,
    title: 'AI Career Guidance Chatbot',
    icon: path.join(__dirname, 'assets', 'icon.png'), // optional icon
    backgroundColor: '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // secure bridge
      contextIsolation: true,
      nodeIntegration: false,
    },
    // Frameless modern look
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false, // show only when ready
  });

  // Load the main HTML file
  mainWindow.loadFile('index.html');

  // Show window when fully loaded (no white flash)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ---- App Custom Menu ----
function createMenu() {
  const template = [
    {
      label: 'Career Bot',
      submenu: [
        { label: 'About', click: () => shell.openExternal('https://github.com') },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools', accelerator: 'CmdOrCtrl+Shift+I' },
        { type: 'separator' },
        { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// ---- Electron App Events ----
app.whenReady().then(() => {
  createWindow();
  createMenu();

  // macOS: re-create window when dock icon clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ---- IPC: handle messages from renderer ----
ipcMain.handle('app-version', () => app.getVersion());
ipcMain.handle('open-external', (e, url) => shell.openExternal(url));
