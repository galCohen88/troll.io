const { app, BrowserWindow, TouchBar } = require('electron')
const { TouchBarLabel, TouchBarButton } = TouchBar
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

const troll = new TouchBarButton({
    label: '😈 Troll',
    backgroundColor: '#7FFFD4',
    click: () => {}
  })
  
  const music = new TouchBarButton({
    label: '🎸 Audio',
    backgroundColor: '#008B8B',
    click: () => {}
  })

  const play = new TouchBarButton({
    label: '🎮 Play',
    backgroundColor: '#DC143C',
    click: () => {}
  })

  const touchBar = new TouchBar({
    items: [troll, music, play]
  })

  
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
           }
    });
    mainWindow.loadURL(isDev ? "http://localhost:3000" :`file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => (mainWindow = null));
    // mainWindow.webContents.openDevTools();
    mainWindow.setTouchBar(touchBar)
    mainWindow.show();
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});