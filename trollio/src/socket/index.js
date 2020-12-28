import { useRef } from 'react';
import WebSocket from './WebSocket';

const socket = new WebSocket();

export function useSocket() {
    const ref = useRef(socket);
    return ref.current;
}
