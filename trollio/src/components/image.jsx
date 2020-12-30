import React from "react";
import { Modal } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export function Image() {

    // TODO remove, change to variables from web socket
    var img = "http://interactive.nydailynews.com/2016/05/simpsons-quiz/img/simp1.jpg";
    var audio = 'http://dnfw.org/hl/sound/misc/doh.wav'
    var modalText = "Doohhhhhoooo!!!!!!"
    var sender = 'Gal Cohen'
    var autoPlay = true

    return (
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
    );
}
