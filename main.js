// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, screen } = require('electron')
require('electron-reload')(__dirname);

// this allows the native module to be loaded. Will be removed in Electron 10. 
app.allowRendererProcessReuse = false;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window. enableRemoteModule removes warning from console - this wont work anymore with Electron 10.
  mainWindow = new BrowserWindow({ width: 1366, height: 768, webPreferences: { nodeIntegration: true, enableRemoteModule: true }, autoHideMenuBar: true })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools({ mode: 'detach' })

  love_it = true;

  mainWindow.on('close', (e) => {

    if (love_it) {
      e.preventDefault();
      console.log(love_it);

      mainWindow.webContents.send('love time', 'false');
    }

  })

  mainWindow.webContents.on('found-in-page', (event, result) => {

    if (result.finalUpdate) {
      mainWindow.webContents.stopFindInPage('clearSelection');
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {

    mainWindow = null;

  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

//
// NEEDS TO BE REMOVED WHEN LIVE!!!!
//
app.on('ready', () => {
  const { getCursorScreenPoint, getDisplayNearestPoint } = screen

  const currentScreen = getDisplayNearestPoint(getCursorScreenPoint())

  mainWindow.setBounds(currentScreen.bounds);
  mainWindow.setSize(1366, 768);




})

// This removes the menubar
app.on('browser-window-created', function (e, window) {
  window.setMenu(null);
  // turn of the menubar.
  window.setMenuBarVisibility(false);
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// listen the 'app_quit' event
ipcMain.on('app_quit', (event, info) => {
  love_it = false;
  app.quit()
})

// ipcMain.on('search', (event, arg) => {
//   console.log(arg);
//   console.log(event);
//   mainWindow.webContents.unselect();
//   
//   mainWindow.webContents.findInPage(arg, {findNext: true});
// 
// });