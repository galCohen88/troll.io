import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { popUp } from './popup'
const electron = window.require("electron")
const remote = electron.remote;

export function Youtube() {
    // TODO remove, change to variables from web socket
    var url = "https://youtu.be/jW7fi-9MRUQ?t=38";
    var modalText = "Doohhhhhoooo!!!!!!"
    var sender = 'Gal Cohen'
    popUp(url, true)
    return (
        <div>
            <Modal.Body>
                <Modal.Title>
                <img className='Center' src='https://galcosagemaker.s3.amazonaws.com/youtube.png'></img>
                </Modal.Title>
                <div className='ModalText'>{modalText}</div>
                <div className='Sender'> Sent with
                    <img className='Heart' src='https://galcosagemaker.s3.amazonaws.com/heart.png'></img>
                    by <label className='SenderName'> {sender} </label>
                </div>
            </Modal.Body>
        </div>
    );
}

function resizeWindow(x, y) {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.setSize(x, y)
}