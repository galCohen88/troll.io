import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { popUp } from './popup'
const electron = window.require("electron")
const remote = electron.remote;

export function Youtube(props) {
    popUp(props.url, props.includeMotion)
    return (
        <div>
            <Modal.Body>
                <Modal.Title>
                <img className='Center' src='https://galcosagemaker.s3.amazonaws.com/youtube.png'></img>
                </Modal.Title>
                <div className='ModalText'>{props.message}</div>
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