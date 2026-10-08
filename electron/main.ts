import { app, BrowserWindow, ipcMain, dialog, Notification } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 460,
    minHeight: 700,
    frame: false, // Custom modern titlebar
    titleBarStyle: 'hidden',
    backgroundColor: '#fbf8ff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
    icon: path.join(__dirname, '../public/icon.png'),
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  if (isDev) {
    // In dev mode, wait for Vite dev server
    const port = process.env.PORT || 5173;
    mainWindow.loadURL(`http://localhost:${port}`);
    // Open DevTools in dev if wanted:
    // mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Window controls IPC
ipcMain.on('window-minimize', () => {
  mainWindow?.minimize();
});

ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

ipcMain.on('window-close', () => {
  mainWindow?.close();
});

ipcMain.handle('window-is-maximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// Notifications
ipcMain.on('show-notification', (_event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({
      title: title || 'GeoPulse Enterprise',
      body: body || 'Pemberitahuan Sistem Absensi',
    }).show();
  }
});

// File export IPC
ipcMain.handle('export-report', async (_event, { data, filename }) => {
  if (!mainWindow) return { success: false, error: 'Window not active' };

  try {
    const defaultPath = path.join(app.getPath('downloads'), filename || 'Rekap_Absensi_GeoPulse.csv');
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Simpan Laporan Rekap Presensi',
      defaultPath,
      filters: [
        { name: 'CSV File', extensions: ['csv'] },
        { name: 'JSON Audit', extensions: ['json'] },
        { name: 'Semua File', extensions: ['*'] }
      ]
    });

    if (canceled || !filePath) {
      return { success: false, error: 'Dibatalkan oleh pengguna' };
    }

    fs.writeFileSync(filePath, data, 'utf-8');
    return { success: true, filePath };
  } catch (err: any) {
    return { success: false, error: err.message || 'Gagal menyimpan file' };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
