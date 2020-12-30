import React, { useState } from "react";
import { useSocket } from '../socket';
import ReactAudioPlayer from 'react-audio-player';
import { Modal, Button } from "react-bootstrap";
import { Website } from './website';
import { Image } from './image';
import { Youtube } from './youtube'
import { Game } from './game'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import './dashboard.css'
import { audioMapping } from './SendTrollForm/audio';
import { mapping } from './SendTrollForm/gifs';
import SendTrollModal from './SendTrollForm/';

const electron = window.require("electron")
const remote = electron.remote;

export function Dashboard(props) {
    resizeWindow(945, 896);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageM, setModalMessage] = useState(false);

    const handleModalClose = () => { setShow(false); }
    const handleModalShow = () => { setShow(true); }

    const handleClose = () => { setMessage(null); setShow(false); resizeWindow(600, 500);}

    const socket = useSocket();
    var modal = null;
    socket.on('troll-media', (message) => {
        setMessage(message.media);
    })

    if (message){
        resizeWindow(945, 896);
        var troll = null;
        var trollType = message.trollType;

        if (trollType == 'image'){
            var url = message.troll
            if (message.troll in mapping){
                url = mapping[url]
            }

            var audioUrl = message.troll
            if (message.troll in audioMapping){
                audioUrl = audioMapping[audioUrl];
            }
            else{
                audioUrl=null;
            }

            troll = <Image audio={audioUrl} includeSound={message.includeSound} message={message.message} includeMotion={message.includeMotion} url={url} sender={message.sender}/>
        }
        if (trollType == 'website'){
            troll = <Website message={message.message} includeMotion={message.includeMotion} url={message.troll} sender={message.sender}/>
        }
        if (trollType == 'youtube'){
            troll = <Youtube message={message.message} includeMotion={message.includeMotion} url={message.troll} sender={message.sender}/>
        }

        if (trollType == 'game'){
            var gameImage = null;
            var gameUrl = null;
            if (message.troll == 'shesh'){
                gameImage = 'https://galcosagemaker.s3.amazonaws.com/shesh.png'
                gameUrl = 'https://www.247backgammon.org/'
            }
            if (message.troll == 'dave'){
                gameImage = 'https://galcosagemaker.s3.amazonaws.com/dave.png'
                gameUrl = 'https://www.playdosgames.com/play/dangerous-dave/'
            }
            if (message.troll == 'pong'){
                gameImage = 'https://galcosagemaker.s3.amazonaws.com/pong.png'
                gameUrl = 'https://pong-2.com/'
            }

            troll = <Game gameUrl={gameUrl} gameImage={gameImage} includeMotion={message.includeMotion}/>
        }
        modal = <Modal show={true} onHide={handleClose} className="ReceiverModal">{troll}</Modal>
    }

    function resizeWindow(x, y) {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.setSize(x, y)
    }

    function renderScoreRow(score, index) {
        let trClass = 'not-top-three';
        if (0 <= index && index <= 2) {
            trClass = 'top-three'
        }
        if (score.email === props.currentUser) {
            trClass += ' current-user';
        }

        let name = score.name;
        if (index === 0) {
            name += ' (1st)';
        } else if (index === 1) {
            name += ' (2nd)';
        } else if (index === 2) {
            name += ' (3rd)';
        }

        const image = require(`../users/${score.email}.jpeg`).default;

        return <tr className={trClass}>
            <td className="photo">
                <img className="user-image" src={image} alt={score.name} />
            </td>
            <td className="name">{name}</td>
            <td className="sent">{score.sent}</td>
            <td className="received">{score.received}</td>
        </tr>
    }

        const rows = props.scores.map( renderScoreRow );
        return (
            <div>
                <div className="title">
                <label>TROLL.IO</label>
                </div>
                <div>
                <Button variant="primary" onClick={handleModalShow}>
                Send troll modal
                </Button>
                <Modal show={show} onHide={handleModalClose}>
                    <SendTrollModal onCancel={handleModalClose}></SendTrollModal>
                </Modal>
                </div>

                <div>
                    {modal}
                    <table className='scores'>
                        <thead>
                        <tr>
                            <th className="photo"> </th>
                            <th className="name"> </th>
                            <th className="sent">Sent</th>
                            <th className="received">Received</th>
                        </tr>
                        </thead>
                    </table>
                    <div id="score-container">
                        <table className='scores'>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

}







// import React, { useState } from "react";
// import ReactAudioPlayer from 'react-audio-player';
// import ReactDOM from "react-dom";
// import { Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./styles.css";
// const electron = window.require("electron")
// const remote = electron.remote;
// const BrowserWindow = remote.BrowserWindow;
// const nativeImage = remote.nativeImage;
// const  Notification = remote.Notification;

// export function ReceiverModal() {

//     const [show, setShow] = useState(false);
//     const appIcon = nativeImage.createFromPath('logo.png')
//     const notification = {
//         title: 'Success!',
//         body: 'User Gal Cohen got trolled',
//         icon: appIcon
//       }

//     const handleClose = () => { setShow(false); resizeWindow(600, 500); }
//     const handleShow = () => { setShow(true); resizeWindow(945, 896); new Notification(notification).show();}
//     // TODO remove, change to variables from web socket
//     var img = "http://interactive.nydailynews.com/2016/05/simpsons-quiz/img/simp1.jpg";
//     var audio = 'http://dnfw.org/hl/sound/misc/doh.wav'
//     var modalText = "Doohhhhhoooo!!!!!!"
//     var sender = 'Gal Cohen'
//     var autoPlay = true


//     return (
//         <div className="App">
//             <Button variant="primary" onClick={handleShow}>
//                 Receiver modal
//           </Button>

//             <Modal show={show} onHide={handleClose} className="ReceiverModal">


//                 <Modal.Body>
//                 <Modal.Title>
//                         <img className='Center' src={img}></img>
//                     </Modal.Title>
//                 <ReactAudioPlayer src={audio} autoPlay={autoPlay} />
//                     <div className='ModalText'>{modalText}</div>


//                     <div className='Sender'> Sent with
//                     <img className='Heart' src='https://galcosagemaker.s3.amazonaws.com/heart.png'></img>
//                     by <label className='SenderName'> {sender} </label>
//                     </div>

//                 </Modal.Body>
//             </Modal>
//         </div>
//     );
// }

// function resizeWindow(x, y) {
//     const currentWindow = remote.getCurrentWindow();
//     currentWindow.setSize(x, y)
// }
