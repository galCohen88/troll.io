const electron = window.require("electron")
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

export function popUp(url, move){
  const win = new BrowserWindow({
    height: 600,
    width: 800
  });
  
  win.loadURL(url);
  if (move){
  moveWindowOnceReady(win);
  }
}


function moveWindowOnceReady(win){

  win.webContents.once('dom-ready', () => {
    win.moveTop();
    win.focus();
    win.hide();
    win.show();
    var x_max = 1000
    var x_min = 0
    var y_max = 100
    var y_mix = 0
    var moves = 20;
    var count =  0;
    while (count<moves) {
      count += 1;
      var x = Math.floor(Math.random() * (x_max - x_min + 1)) + x_min;
      var y = Math.floor(Math.random() * (y_max - y_mix + 1)) + y_mix;
      win.setPosition(x,y, true); 
    }
    win.maximize()
  });


}
