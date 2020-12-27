const io = require('socket.io-client');

class WebSocket {
    constructor() {
        this._socket = null;
        this._username = null;
    }

    connect(username) {
        this._username = username;
        this._socket = io("ws://ec2-52-91-163-171.compute-1.amazonaws.com", {
            reconnectionDelayMax: 10000,
        });

        this._socket.onopen(() => this._emit('login', { username }));
    }

    logoff() {
        this._emit('logoff', { username: this._username });
    }

    _emit(type, json) {
        this._socket.emit(type, JSON.stringify(json));
    }
}


module.exports = WebSocket;