import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import ReactDOM from "react-dom";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
const electron = window.require("electron")
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const nativeImage = remote.nativeImage;
const  Notification = remote.Notification;

export function ReceiverModal() {
 
    const [show, setShow] = useState(false);
    const appIcon = nativeImage.createFromPath('logo.png')
    const notification = {
        title: 'Success!',
        body: 'User Gal Cohen got trolled',
        icon: appIcon
      }

    const handleClose = () => { setShow(false); resizeWindow(600, 500); }
    const handleShow = () => { setShow(true); resizeWindow(945, 896); new Notification(notification).show();}
    // TODO remove, change to variables from web socket
    var img = "http://interactive.nydailynews.com/2016/05/simpsons-quiz/img/simp1.jpg";
    var audio = 'http://dnfw.org/hl/sound/misc/doh.wav'
    var modalText = "Doohhhhhoooo!!!!!!"
    var sender = 'Gal Cohen'
    var autoPlay = true

      
    return (
        <div className="App">
            <Button variant="primary" onClick={handleShow}>
                Receiver modal
          </Button>

            <Modal show={show} onHide={handleClose} className="ReceiverModal">


                <Modal.Body>
                <Modal.Title>
                        <img className='Center' src={img}></img>
                    </Modal.Title>
                <ReactAudioPlayer src={audio} autoPlay={autoPlay} />
                    <div className='ModalText'>{modalText}</div>

                    
                    <div className='Sender'> Sent with 
                    <img className='Heart' src='https://galcosagemaker.s3.amazonaws.com/heart.png'></img>
                    by <label className='SenderName'> {sender} </label>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    );
}

function resizeWindow(x, y) {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.setSize(x, y)
}