import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { popUp } from './popup'
const electron = window.require("electron")
const remote = electron.remote;

export function Game(props) {
    // TODO remove, change to variables from web socket
    return (
        <div>
            <Modal.Body>
                <Modal.Title>
                    <img className='Center' src={props.gameImage}></img>
                </Modal.Title>
                <div className="GameTextBox">
                    <div className='ModalText text-center'>Its time for a break, join me (:</div>
                    <div className='ModalText text-center'><a target="_blank" href={props.gameUrl}>{props.gameUrl}</a></div>
                </div>
            </Modal.Body>
        </div>
    );
}

function resizeWindow(x, y) {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.setSize(x, y)
}