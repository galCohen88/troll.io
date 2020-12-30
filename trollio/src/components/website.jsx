import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { popUp } from './popup'
const electron = window.require("electron")
const remote = electron.remote;

export function Website(props) {
    // TODO remove, change to variables from web socket
    var url = "http://google.com";
    var modalText = "Doohhhhhoooo!!!!!!"
    if(props.includeMotion){
        popUp(url, true)
    }
    return (
        <div>
            <Modal.Body>
                <Modal.Title>
                <img className='Center' src='https://galcosagemaker.s3.amazonaws.com/website.png'></img>
                </Modal.Title>
                <div className='ModalText'>{modalText}</div>
                <div className='Sender'> Sent with
                    <img className='Heart' src='https://galcosagemaker.s3.amazonaws.com/heart.png'></img>
                    by <label className='SenderName'> {props.sender} </label>
                </div>
            </Modal.Body>
        </div>
    );
}

function resizeWindow(x, y) {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.setSize(x, y)
}