
export default function registerHanlders(socket) {
    socket.on('troll-media', data => {
        console.log(data);
    });
}
