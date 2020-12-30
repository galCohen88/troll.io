import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import lodashCapitalize from 'lodash/capitalize';
import './SendTrollForm.css';
import Switch from './Switch';
import { useSocket } from '../../socket';
import Troll from './Troll';
import { mapping, games } from './gifs';
import { default as gifIcon } from '../../images/gif.png';
import { default as youtubeIcon } from '../../images/youtube.png';
import { default as linkIcon } from '../../images/link.png';
import { default as pongIcon } from '../../images/pong.png';
import { default as daveIcon } from '../../images/dave.png';
import { default as sheshIcon } from '../../images/shesh.png';
import ReactAudioPlayer from 'react-audio-player';

function capitalize(string) {
    return string.indexOf('-') === -1 ?
        lodashCapitalize(string) :
        string.split('-').map(capitalize).join('-');
}

function Title({ title }) {
    return (
        <div className="SendTrollModa__field-title">
            {title}
        </div>
    );
}

function renderUserOption(user) {
    const [autodeskUser,] = user.split('@');
    const name = autodeskUser.split('.').map(capitalize).join(' ');

    return (
        <div className="SendTrollModal__user-option" key={autodeskUser}>
            {name}
        </div>
    )
}

function now() {
    const date = new Date();

    const dateday = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 0 ? `0${date.getMonth() + 1}` : date.getMonth();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${date.getFullYear()}-${month}-${dateday}T${hours}:${minutes}`;
}

function TrollButtons({
    onGifClicked,
    onYouTubeClicked,
    onLinkClicked,
    onPongClicked,
    onDangerousDaveClicked,
    onBackgammonClicked,
}) {
    return (
        <div>
            <div style={{ marginBottom: '25px', width: '100%', textAlign: 'center' }}>
                Select an option
            </div>
            <div className="typeButtonsContainer">
                <div className="trollTypeButton" onClick={onGifClicked}>
                    <img className="troll-icon" src={gifIcon} alt="gif" />
                </div>
                <div className="trollTypeButton" onClick={onYouTubeClicked}>
                    <img className="troll-icon" src={youtubeIcon} alt="gif" />
                </div>
                <div className="trollTypeButton" onClick={onLinkClicked}>
                    <img className="troll-icon" src={linkIcon} alt="gif" />
                </div>
                <div className="trollTypeButton" onClick={onPongClicked}>
                    <img className="troll-icon" src={pongIcon} alt="gif" />
                </div>
                <div className="trollTypeButton" onClick={onDangerousDaveClicked}>
                    <img className="troll-icon" src={daveIcon} alt="gif" />
                </div>
                <div className="trollTypeButton" onClick={onBackgammonClicked}>
                    <img className="troll-icon" src={sheshIcon} alt="gif" />
                </div>
            </div>
        </div>
    )
}

function SendTrollModal({ onCancel }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [datetime, setDatetime] = useState(now());
    const [trollType, setTrollType] = useState('');
    const [selectedTroll, setSelectedTroll] = useState('');
    const [message, setMessage] = useState('');
    const [includeSound, setIncludeSound] = useState(true);
    const [includeMotion, setIncludeMotion] = useState(false);

    const socket = useSocket();

    useEffect(() => {
        axios('http://ec2-52-91-163-171.compute-1.amazonaws.com/users')
            .then(response => setUsers(response.data.users.map(user => user.email)))
            .catch(() => alert('Could not load users list'));
    }, [])

    function sendTroll() {
        socket.troll(selectedUser, {
            troll: selectedTroll,
            trollType,
            message,
            includeSound,
            includeMotion,
        });
    }

    const typeSelectors = {
        onGifClicked: setTrollType.bind(null, 'image'),
        onYouTubeClicked: setTrollType.bind(null, 'youtube'),
        onLinkClicked: setTrollType.bind(null, 'link'),
        onPongClicked: () => { setTrollType('game'); setSelectedTroll('pong') },
        onDangerousDaveClicked: () => { setTrollType('game'); setSelectedTroll('dave') },
        onBackgammonClicked: () => { setTrollType('game'); setSelectedTroll('shesh') },
    };

    function renderTrollSelection() {
        if (!trollType) return <TrollButtons {...typeSelectors} />;

        if (trollType === 'image') {
            if (!selectedTroll) {
                return (<div className="SendTrollModal__gifs-container">
                    {Object.keys(mapping).map(key => (
                        <Troll troll={key} key={key} onClick={(troll) => setSelectedTroll(troll)} />
                    ))}
                </div>);
            } else {
                return <img src={mapping[selectedTroll]} alt={selectedTroll} />
            }
        }

        if (trollType === 'youtube' || trollType === 'link') {
            return (
                <input className="link-input" value={selectedTroll} onChange={e => setSelectedTroll(e.target.value)} placeholder="Paste URL here!" />
            );
        }

        if (trollType === 'game') {
            return <img src={games[selectedTroll]} alt={selectedTroll} style={{ width: '100%', height: '100%' }} />
        }
    }

    return (
        <div className="SendTrollModal__container">
            <div className="SendTrollModal__row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div style={{ width: '100%' }}>
                    <Title title="To" />
                    <Autocomplete
                        style={{ width: '650px' }}
                        value={selectedUser}
                        onChange={(_e, value) => setSelectedUser(value)}
                        onSelect={value => setSelectedUser(value)}
                        items={users}
                        renderItem={renderUserOption}
                        getItemValue={user => user}
                        shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        inputProps={{
                            className: "SendTrollModa__field-input SendTrollModal__input-trolled",
                            placeholder: "Type a name",
                        }}
                    />
                </div>
                {/* <div>
                    <Title title="Time" />
                    <input
                        type="datetime-local"
                        className="SendTrollModa__field-input .SendTrollModal__input-datetime"
                        value={datetime}
                        onChange={e => setDatetime(e.target.value)}
                    />
                </div> */}
            </div>
            <div className="SendTrollModal__row">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Title title="Content" />
                    { trollType && <div style={{ color: '#4DEC9F', cursor: 'pointer' }} onClick={() => {setTrollType(''); setSelectedTroll('');}}>Change</div> }
                </div>
                <div className="SendTrollModa__field-input SendTrollModal__troll-content-container">
                    { renderTrollSelection() }
                </div>
            </div>
            <textarea
                className="SendTrollModal__row SendTrollModa__field-input SendTrollModa__input-text-area"
                placeholder="Type a message"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <div
                className="SendTrollModal__row"
                style={{height: '36px', marginBottom: '70px' }}
            >
                <Switch label="Include sound" style={{ marginBottom: '20px' }} isChecked={includeSound} onToggle={setIncludeSound} />
                <Switch label="Include motion" isChecked={includeMotion} onToggle={setIncludeMotion} />
            </div>
            <div className="SendTrollModal__row SendTrollModal__buttons-container">
                <button
                    className="SendTrollModal__button SendTrollModal__button--secondary"
                    style={{ marginRight: '15px' }}
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    className="SendTrollModal__button SendTrollModal__button--primary"
                    disabled={!selectedTroll || !selectedUser}
                    onClick={sendTroll}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default SendTrollModal;
