import React from "react";
import { Modal } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
const electron = window.require("electron")
const remote = electron.remote;

export function Image(props) {
    if (props.includeMotion){
        const currentWindow = remote.getCurrentWindow();
        setTimeout(() => {moveWindowOnceReady(currentWindow);}, 500);
        
    }
    
    return (
        <Modal.Body>
        <Modal.Title>
        <img className='Center' src={props.url}></img>
            </Modal.Title>
        <ReactAudioPlayer src={props.audio} autoPlay={props.includeSound} />
            <div className='ModalText'>{props.message}</div>
            <div className='Sender'> Sent with 
            <img className='Heart' src='https://galcosagemaker.s3.amazonaws.com/heart.png'></img>
            by <label className='SenderName'> {props.sender} </label>
            </div>

        </Modal.Body>
    );
}
 
function moveWindowOnceReady(win){
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
}
