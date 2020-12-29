import { Howl } from 'howler'
const electron = window.require("electron")
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;

export function popUp(){
  console.log("popup!")
  // const currentWindow = remote.getCurrentWindow();
  // currentWindow.moveTop();
  // currentWindow.focus();
  // currentWindow.hide();
  // currentWindow.show();
  // currentWindow.setPosition(100,5, true);
  // currentWindow.setPosition(5,100, true);
  // currentWindow.setPosition(100,5, true);
  // currentWindow.setPosition(5,100, true);
  // currentWindow.setPosition(100,5, true);
  // currentWindow.setPosition(5,100, true);
  // currentWindow.setPosition(100,5, true);
  // currentWindow.setPosition(5,100, true);
  // return
  
  const win = new BrowserWindow({
    height: 600,
    width: 800
  });
  win.loadURL(`https://youtu.be/jW7fi-9MRUQ?t=38`);

  
  win.webContents.once('dom-ready', () => {
    var maximum =  1000;
    var minimum =  0;
    var moves = 20;
    var count =  0;
    while (count<moves) {
      count += 1;
      var x = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      var y = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      win.setPosition(x,y, true); 
    }
  
  });

}
