import { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import lodashCapitalize from 'lodash/capitalize';
import './SendTrollForm.css';
import Switch from './Switch';
import { useSocket } from '../../socket';
import Troll from './Troll';
import { mapping } from './gifs';

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
        <div className="typeButtonsContainer">
            <div className="trollTypeButton" onClick={onGifClicked}>
                GIF
            </div>
            <div className="trollTypeButton" onClick={onYouTubeClicked}>
                YouTube
            </div>
            <div className="trollTypeButton" onClick={onLinkClicked}>
                Link
            </div>
            <div className="trollTypeButton" onClick={onPongClicked}>
                Pong
            </div>
            <div className="trollTypeButton" onClick={onDangerousDaveClicked}>
                Dangerous Dave
            </div>
            <div className="trollTypeButton" onClick={onBackgammonClicked}>
                Backgammon
            </div>
        </div>
    )
}

function SendTrollModal(props) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [datetime, setDatetime] = useState(now());
    const [trollType, setTrollType] = useState('');
    const [selectedTroll, setSelectedTroll] = useState('');
    const [message, setMessage] = useState('');
    const [includeSound, setIncludeSound] = useState(false);
    const [includeMotion, setIncludeMotion] = useState(false);

    const socket = useSocket();
    socket.connect('dor.mesica@autodeks.com');

    useEffect(() => {
        axios('http://ec2-52-91-163-171.compute-1.amazonaws.com/users')
            .then(response => setUsers(response.data.users.map(user => user.email)))
            .catch(() => alert('Could not load users list'));
    }, [])

    function sendTroll() {
        socket.troll(selectedUser, {
            troll: mapping[selectedTroll] || selectedTroll,
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
    }

    return (
        <div className="SendTrollModal__container">
            <div className="SendTrollModal__row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div>
                    <Title title="To" />
                    <Autocomplete
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
                <div>
                    <Title title="Time" />
                    <input
                        type="datetime-local"
                        className="SendTrollModa__field-input .SendTrollModal__input-datetime"
                        value={datetime}
                        onChange={e => setDatetime(e.target.value)}
                    />
                </div>
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