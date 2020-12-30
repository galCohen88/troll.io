import io from 'socket.io-client';
import registerHandlers from './handlers';
import lodashCapitalize from 'lodash/capitalize';

function capitalize(string) {
    return string.indexOf('-') === -1 ?
        lodashCapitalize(string) :
        string.split('-').map(capitalize).join('-');
}
class WebSocket {
    constructor() {
        this._socket = null;
        this._username = null;
    }

    connect(username) {
        if (!username) {
            throw new Error('Username not specified');
        }

        this._username = username;
        this._socket = io('ws://ec2-52-91-163-171.compute-1.amazonaws.com', {
            reconnectionDelayMax: 10000,
        });

        registerHandlers(this._socket);

        this._emit('login', { username });
    }

    logoff() {
        this._emit('logoff', { username: this._username });
    }

    troll(target, options) {
        const [autodeskUser,] = this._username.split('@');
        const name = autodeskUser.split('.').map(capitalize).join(' ');

        this._emit('troll', {
            destination: target,
            media: { sender: name, ...options }
        });
    }

    on(event, handler) {
        this._socket.on(event, handler);
    }

    _emit(type, json) {
        this._socket.emit(type, JSON.stringify(json));
    }
}


export default WebSocket;
