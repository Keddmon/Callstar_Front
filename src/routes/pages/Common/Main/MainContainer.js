import { useEffect, useRef, useState } from "react";
import MainPresenter from "./MainPresenter";
import { io } from "socket.io-client";
import CID_DATA_TYPE from "../../../../utils/Protocol.constants";

const MainContainer = () => {

    /* ===== STATE ===== */
    const socketRef = useRef(null);
    // 연결 상태
    const [connectionStatus, setConnectionStatus] = useState(false);
    // 전화번호
    const [callerId, setCallerId] = useState('');
    // 장비 정보
    const [deviceId, setDeviceId] = useState([]);
    // 콜 이벤트
    const [callEvents, setCallEvents] = useState([]);
    // 팝업 테스트 (콜 이벤트)
    const [popupInfo, setPopupInfo] = useState({
        visible: false,
        type: null,
        data: '',
        reason: '',
    });
    // 연결 가능한 장비 목록
    const [availablePorts, setAvailablePorts] = useState([]);
    // 선택된 포트(port)
    const [selectedPort, setSelectedPort] = useState(null);



    /* ===== HOOKS ===== */
    // socket 연결 및 Protocol
    useEffect(() => {
        if (!socketRef.current) {
            const socket = io('http://localhost:5000', { transports: ['websocket'] });
            socketRef.current = socket;

            socket.on('connect', () => {
                console.log('[SOCKET] Connected to server:', socket.id);
                socket.emit('client-ready');
            });

            socket.on('cid-data', (data) => {
                console.log('[SOCKET] Received cid-data:', data);

                switch (data.type) {

                    // 장비 ID 확인
                    case CID_DATA_TYPE.DEVICE_INFO_REQ:
                        // setDeviceId(data.info);
                        setCallEvents(prev => [...prev, '(PC → 장치) 장치 정보 요청']);
                        break;

                    case CID_DATA_TYPE.DEVICE_INFO_RES:
                        // setDeviceId(data.info);
                        setCallEvents(prev => [...prev, `(장치 → PC) 장치 정보 응답: ${data.info}`]);
                        break;



                    // 수신호 처리
                    case CID_DATA_TYPE.INCOMING:
                        setCallerId(data.phoneNumber);
                        setCallEvents(prev => [...prev, `(장치 → PC) 수신: ${data.phoneNumber}`]);
                        setPopupInfo({
                            visible: true,
                            type: CID_DATA_TYPE.INCOMING,
                            data: data.phoneNumber,
                            reason: '',
                        });
                        break;

                    case CID_DATA_TYPE.MASKED:
                        setCallEvents(prev => [...prev, `(장치 → PC) 수신: 알 수 없는 번호 (${data.payload})`]);
                        break;



                    // 발신호 처리    
                    case CID_DATA_TYPE.DIAL_OUT:
                        setCallerId(data.phoneNumber);
                        setCallEvents(prev => [...prev, `(PC → 장치) 발신: ${data.phoneNumber}`]);
                        setPopupInfo({
                            visible: true,
                            type: CID_DATA_TYPE.DIAL_OUT,
                            data: data.phoneNumber,
                            reason: '',
                        });
                        break;

                    case CID_DATA_TYPE.DIAL_COMPLETE:
                        setCallerId(data.phoneNumber);
                        setCallEvents(prev => [...prev, '(장치 → PC) 발신 완료']);
                        setPopupInfo({
                            visible: true,
                            type: CID_DATA_TYPE.DIAL_COMPLETE,
                            data: data.phoneNumber,
                            reason: '',
                        });
                        break;

                    case CID_DATA_TYPE.FORCED_END:
                        setCallEvents(prev => [...prev, '(PC → 장치) 강제 종료']);
                        setPopupInfo({
                            visible: true,
                            type: CID_DATA_TYPE.FORCED_END,
                            data: '',
                            reason: '',
                        });
                        break;



                    // 수화기 처리
                    case CID_DATA_TYPE.OFF_HOOK:
                        setCallEvents(prev => [...prev, '(장치 → PC) 수화기 들음']);
                        setPopupInfo({
                            visible: true,
                            type: CID_DATA_TYPE.OFF_HOOK,
                            data: '',
                            reason: '',
                        });
                        break;

                    case CID_DATA_TYPE.ON_HOOK:
                        setCallEvents(prev => [...prev, '(장치 → PC) 수화기 내려놓음']);
                        setPopupInfo({
                            visible: true,
                            type: CID_DATA_TYPE.ON_HOOK,
                            data: '',
                            reason: '',
                        });
                        break;
                }
            });
        }

        return () => {
            if (socketRef.current) {
                console.log('[SOCKET] Disconnecting socket');
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);



    // 연결 확인
    useEffect(() => {
        fetch('http://localhost:5000/api/connection-status')
            .then(res => res.json())
            .then(data => setConnectionStatus(data.status === 'connected' ? 'connected' : 'disconnected'));
    }, []);



    // 연결 가능한 장비 확인
    useEffect(() => {
        fetch('http://localhost:5000/api/ports')
            .then(res => res.json())
            .then(data => {
                setAvailablePorts(data.ports);
            });
    }, []);



    // 장비 변경 확인
    useEffect(() => {
        console.log('[STATE] deviceId changed:', deviceId);
    }, [deviceId]);



    /* ===== FUNCTION ===== */
    const handlePortSelect = (port) => {
        if (!socketRef.current) return;

        if (selectedPort === port) return;

        setSelectedPort(port);
        socketRef.current.emit('select-port', port);
    };



    console.log('[MainContainer][availablePorts]: ', availablePorts);
    console.log('[MainContainer][socketRef]: ', socketRef);
    console.log('[MainContainer][selectedPort]: ', selectedPort);



    /* ===== RENDER ===== */
    return (
        <MainPresenter
            deviceId={deviceId}
            connectionStatus={connectionStatus}
            callerId={callerId}
            callEvents={callEvents}

            popupInfo={popupInfo}
            setPopupInfo={setPopupInfo}

            availablePorts={availablePorts}
            selectedPort={selectedPort}
            setSelectedPort={setSelectedPort}
            onPortSelect={handlePortSelect}
        />
    );
}

export default MainContainer;