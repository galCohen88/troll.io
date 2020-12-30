import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import { Button, Modal } from "react-bootstrap";
import { Website } from './website';
import { Image } from './image';
import { Youtube } from './youtube'
import { Game } from './game'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
const electron = window.require("electron")
const remote = electron.remote;

export function ReceiverModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false); resizeWindow(600, 500); }
    const handleShow = () => { setShow(true); resizeWindow(945, 896);}
    // TODO remove, change to variables from web socket
    var audio = 'http://dnfw.org/hl/sound/misc/doh.wav'
    var autoPlay = true

    var trollType = 'game';

    var troll = null;
    if (trollType == 'image'){
        troll = <Image />
    }
    if (trollType == 'website'){
        troll = <Website />
    }
    if (trollType == 'youtube'){
        troll = <Youtube />
    }

    if (trollType == 'game'){
        var gameImage = 'https://galcosagemaker.s3.amazonaws.com/shesh.png'
        var gameUrl = 'https://www.247backgammon.org/'
        var gameImage = 'https://galcosagemaker.s3.amazonaws.com/dave.png'
        var gameUrl = 'https://www.playdosgames.com/play/dangerous-dave/'
        var gameImage = 'https://galcosagemaker.s3.amazonaws.com/pong.pngg'
        var gameUrl = 'https://pong-2.com/'
        troll = <Game gameUrl={gameUrl} gameImage={gameImage} />
    }

    return (
        <div className="App">
            
            <Button variant="primary" onClick={handleShow}>Receiver modal</Button>
            <Modal show={show} onHide={handleClose} className="ReceiverModal">
                {troll}
                <ReactAudioPlayer src={audio} autoPlay={autoPlay} />
            </Modal>
        </div>
    );
}

function resizeWindow(x, y) {
    const currentWindow = remote.getCurrentWindow();
    currentWindow.setSize(x, y)
}