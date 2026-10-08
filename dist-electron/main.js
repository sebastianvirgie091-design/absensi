"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
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
    const isDev = process.env.NODE_ENV === 'development' || !electron_1.app.isPackaged;
    if (isDev) {
        // In dev mode, wait for Vite dev server
        const port = process.env.PORT || 5173;
        mainWindow.loadURL(`http://localhost:${port}`);
        // Open DevTools in dev if wanted:
        // mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
// Window controls IPC
electron_1.ipcMain.on('window-minimize', () => {
    mainWindow?.minimize();
});
electron_1.ipcMain.on('window-maximize', () => {
    if (mainWindow?.isMaximized()) {
        mainWindow.unmaximize();
    }
    else {
        mainWindow?.maximize();
    }
});
electron_1.ipcMain.on('window-close', () => {
    mainWindow?.close();
});
electron_1.ipcMain.handle('window-is-maximized', () => {
    return mainWindow ? mainWindow.isMaximized() : false;
});
electron_1.ipcMain.handle('get-app-version', () => {
    return electron_1.app.getVersion();
});
// Notifications
electron_1.ipcMain.on('show-notification', (_event, { title, body }) => {
    if (electron_1.Notification.isSupported()) {
        new electron_1.Notification({
            title: title || 'GeoPulse Enterprise',
            body: body || 'Pemberitahuan Sistem Absensi',
        }).show();
    }
});
// File export IPC
electron_1.ipcMain.handle('export-report', async (_event, { data, filename }) => {
    if (!mainWindow)
        return { success: false, error: 'Window not active' };
    try {
        const defaultPath = path.join(electron_1.app.getPath('downloads'), filename || 'Rekap_Absensi_GeoPulse.csv');
        const { canceled, filePath } = await electron_1.dialog.showSaveDialog(mainWindow, {
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
    }
    catch (err) {
        return { success: false, error: err.message || 'Gagal menyimpan file' };
    }
});
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
