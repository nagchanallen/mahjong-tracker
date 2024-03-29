import { app, BrowserWindow, Notification, ipcMain } from 'electron';
import type IpcMain from 'electron';
import fs from 'fs';
declare const MAIN_WINDOW_WEBPACK_ENTRY: never;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    resizable: false,
    height: 800,
    width: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.removeMenu();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // mainWindow.webContents.on('new-window', function (event, url) {
  //   event.preventDefault();
  //   shell.openExternal(url);
  // });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const showNotification = (users: string[]) => {
  const notification = {
    title: '天鳳観戦情報',
    body: users.join('\n'),
  };
  new Notification(notification).show();
};

const getFavouritePlayers = (): string[] => {
  try {
    const data = fs.readFileSync('favourite_players.txt', 'utf-8');
    return data.split('\n');
  } catch (err) {
    return [];
  }
};

const saveFavouritePlayers = (favouritePlayers: string[]): void => {
  const data = favouritePlayers.join('\n');
  try {
    fs.writeFileSync('favourite_players.txt', data);
  } catch (err) {
    console.error('Cannot save favourite players file');
  }
};

ipcMain.on('get-favourite-players', (event: IpcMain.IpcMainEvent) => {
  const favouritePlayers = getFavouritePlayers();
  event.returnValue = favouritePlayers;
});

ipcMain.on(
  'save-favourite-players',
  (event: IpcMain.IpcMainEvent, favouritePlayers: string[]) => {
    // favouritePlayers.sort()
    saveFavouritePlayers(favouritePlayers);
  },
);

ipcMain.on(
  'show-notification',
  (event: IpcMain.IpcMainEvent, users: string[]) => {
    showNotification(users);
  },
);
