import { useEffect, useState } from "react";
import MainPresenter from "./MainPresenter";
import { io } from "socket.io-client";

const socket = io('http://localhost:5000');

const MainContainer = () => {

    /* ===== STATE ===== */
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [callerId, setCallerId] = useState('');
    const [callEvents, setCallEvents] = useState([]);

    /* ===== HOOK ===== */
    useEffect(() => {
        fetch('http://localhost:5000/api/connection-status').
            then(res => res.json()).
            then(data => setConnectionStatus(data.status === 'connected' ? '연결 성공' : '연결 실패'));
    }, []);

    useEffect(() => {
        socket.on('cid-data', (data) => {
            if (data.type === 'incoming') {
                setCallerId(data.phoneNumber);
                setCallEvents(prevEvents => [...prevEvents, `발신 전화번호: ${data.phoneNumber}`]);
            } else if (data.type === 'forced-end') {
                setCallEvents(prevEvents => [...prevEvents, '전화 끊김']);
            } else if (data.type === 'off-hook') {
                setCallEvents(prevEvents => [...prevEvents, '수화기 듬']);
            } else if (data.type === 'on-hook') {
                setCallEvents(prevEvents => [...prevEvents, '수화기 놔둠']);
            } else if (data.type === 'P') {
                setCallEvents(prevEvents => [...prevEvents, '기기 확인']);
            }
        });

        return () => {
            socket.off('cid-data');
        };

    }, []);

    return (
        <MainPresenter
            connectionStatus={connectionStatus}
            callerId={callerId}
            callEvents={callEvents}
        />
    );
}

export default MainContainer;