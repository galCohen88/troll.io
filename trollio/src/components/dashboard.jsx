import React, { useState } from "react";
import { useSocket } from '../socket';
import ReactAudioPlayer from 'react-audio-player';
import { Modal } from "react-bootstrap";
import { Website } from './website';
import { Image } from './image';
import { Youtube } from './youtube'
import { Game } from './game'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import './dashboard.css'
import { audioMapping } from './SendTrollForm/audio';
import { mapping } from './SendTrollForm/gifs';

const electron = window.require("electron")
const remote = electron.remote;

export function Dashboard(props) {
    resizeWindow(945, 896);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);

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
                    {modal}
                    <table id='scores'>
                        <thead>
                            <tr>
                                <th> </th>
                                <th> </th>
                                <th>Sent</th>
                                <th>Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    
}

