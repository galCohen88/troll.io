const { app, BrowserWindow, TouchBar } = require('electron')
const { TouchBarLabel, TouchBarButton } = TouchBar
const {nativeImage} = require('electron');
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

let happyTroll = new TouchBarButton({
  'backgroundColor': '#000000',
  'icon': nativeImage.createFromPath(path.join(__dirname, '..', 'src', 'rotate-old.png')).resize({
    width: 50,
    height: 50,
  }),
  'iconPosition': 'center',
});

let greeenTroll = new TouchBarButton({
  'backgroundColor': '#000000',
  'icon': nativeImage.createFromPath(path.join(__dirname, '..', 'src', 'rotate.png')).resize({
    width: 50,
    height: 50,
  }),
  'iconPosition': 'right',
});

const label = new TouchBarLabel({label: "TROOOOOLIIINNNNN'", 'textColor': '#4DEC9F'})


  const touchBar = new TouchBar({
    items: [happyTroll, label, greeenTroll]
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
    mainWindow.webContents.openDevTools();
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