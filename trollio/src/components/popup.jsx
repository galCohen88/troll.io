import { Howl } from 'howler'
const electron = window.require("electron")
const remote = electron.remote;
// const BrowserWindow = remote.BrowserWindow;

export function popUp(){
  console.log("popup!")
  const currentWindow = remote.getCurrentWindow();
  currentWindow.moveTop();
  currentWindow.focus();
  currentWindow.hide();
  currentWindow.show();
  currentWindow.setPosition(100,5, true);
  currentWindow.setPosition(5,100, true);
  currentWindow.setPosition(100,5, true);
  currentWindow.setPosition(5,100, true);
  currentWindow.setPosition(100,5, true);
  currentWindow.setPosition(5,100, true);
  currentWindow.setPosition(100,5, true);
  currentWindow.setPosition(5,100, true);
  return

  // const win = new BrowserWindow({
  //   height: 600,
  //   width: 800
  // });
  // win.loadURL(`https://google.com`);
  // win

  // var music = new Howl({
  //   src: ["/Users/galcohen/dev/aaa/troll.io/trollio/src/media/audio/guitar.mp3"],
  //   html5: false,
  //   loop: true,
  //   autoplay: true,
  //   preload: true
  // })
  // music.play();

}
