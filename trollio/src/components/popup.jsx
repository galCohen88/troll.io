import { Howl } from 'howler'
const electron = window.require("electron")
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

export function popUp(url){
  const win = new BrowserWindow({
    height: 600,
    width: 800
  });
  win.loadURL(url);
  moveWindowOnceReady(win);
}


function moveWindowOnceReady(win){

  win.webContents.once('dom-ready', () => {
    win.moveTop();
    win.focus();
    win.hide();
    win.show();
    var maximum =  1000;
    var minimum =  500;
    var moves = 20;
    var count =  0;
    while (count<moves) {
      count += 1;
      var x = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      var y = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      win.setPosition(x,y, true); 
    }
    win.maximize()
  });


}
