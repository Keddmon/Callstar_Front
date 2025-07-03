import { useEffect, useState } from "react";
import MainPresenter from "./MainPresenter";
import { io } from "socket.io-client";

const socket = io('http://localhost:5000');

const MainContainer = () => {

    /* ===== STATE ===== */
    const [message, setMessage] = useState('');
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [callerId, setCallerId] = useState('');
    const [callEvents, setCallEvents] = useState([]);

    /* ===== HOOK ===== */
    useEffect(() => {
        fetch('http://localhost:5000/api/connection-status').
            then(res => res.json()).
            then(data => setConnectionStatus(data.status));
    }, []);

    useEffect(() => {
        socket.on('cid-data', (data) => {
            if (data.type === 'incoming') {
                setCallerId(data.phoneNumber);
                setCallEvents(prevEvents => [...prevEvents, `걸려온 전화번호: ${data.phoneNumber}`]);
                console.log('전화 옴')
            } else if (data.type === 'forced-end') {
                setCallEvents(prevEvents => [...prevEvents, '전화 끊김']);
                console.log('전화 끊김')
            } else if (data.type === 'off-hook') {
                setCallEvents(prevEvents => [...prevEvents, '수화기 듬']);
                console.log('수화기 듬')
            } else if (data.type === 'on-hook') {
                setCallEvents(prevEvents => [...prevEvents, '수화기 놔둠']);
                console.log('수화기 놔둠')
            } else if (data.type === 'P') {
                setCallEvents(prevEvents => [...prevEvents, '기기 확인']);
                console.log('기기 확인')
            }
        });

        return () => {
            socket.off('cid-data');
        };

    }, []);

    return (
        <MainPresenter
            message={message}
            connectionStatus={connectionStatus}
            callerId={callerId}
            callEvents={callEvents}
        />
    );
}

export default MainContainer;