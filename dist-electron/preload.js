"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electronAPI = {
    minimizeWindow: () => electron_1.ipcRenderer.send('window-minimize'),
    maximizeWindow: () => electron_1.ipcRenderer.send('window-maximize'),
    closeWindow: () => electron_1.ipcRenderer.send('window-close'),
    isMaximized: () => electron_1.ipcRenderer.invoke('window-is-maximized'),
    getAppVersion: () => electron_1.ipcRenderer.invoke('get-app-version'),
    showNotification: (title, body) => electron_1.ipcRenderer.send('show-notification', { title, body }),
    exportReport: (data, filename) => electron_1.ipcRenderer.invoke('export-report', { data, filename }),
};
electron_1.contextBridge.exposeInMainWorld('electronAPI', electronAPI);
