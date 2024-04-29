import { useEffect } from 'react';
import useUserStore from '../../userStore';

export const useDashboardSocket = (onMessage) => {
    const token = useUserStore(state => state.token);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8080/projecto5backend/websocket/dashboard/${token}`);

        socket.onopen = function(event) {
            console.log("WebSocket is open now.");
        };

        socket.onclose = function(event) {
            console.log("WebSocket is closed now.");
        };

        socket.onmessage = function(event) {
            const message = event.data;
            onMessage(message);
        };

        //garante que a conexão é encerrada corretamente quando o componente for desmontado

        return () => {
            console.log("WebSocket is about to be closed.");
            socket.close();
        };
    }, [token, onMessage]);
};