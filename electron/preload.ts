import { contextBridge, ipcRenderer } from 'electron';

export interface ElectronAPI {
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  isMaximized: () => Promise<boolean>;
  getAppVersion: () => Promise<string>;
  showNotification: (title: string, body: string) => void;
  exportReport: (data: string, filename: string) => Promise<{ success: boolean; filePath?: string; error?: string }>;
}

const electronAPI: ElectronAPI = {
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),
  isMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  showNotification: (title: string, body: string) => ipcRenderer.send('show-notification', { title, body }),
  exportReport: (data: string, filename: string) => ipcRenderer.invoke('export-report', { data, filename }),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
