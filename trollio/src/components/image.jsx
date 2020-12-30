import React from "react";
import { Modal } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
// const electron = window.require("electron")
// const remote = electron.remote;
// const BrowserWindow = remote.BrowserWindow;

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export function Image(props) {
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
 
  