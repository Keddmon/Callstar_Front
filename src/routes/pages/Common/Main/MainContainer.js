import { useEffect, useState } from "react";
import MainPresenter from "./MainPresenter";
import { io } from "socket.io-client";
import CID_DATA_TYPE from "../../../../utils/Protocol.constants";

const socket = io('http://localhost:5000');

const MainContainer = () => {

    /* ===== STATE ===== */
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [callerId, setCallerId] = useState('');
    const [deviceId, setDeviceId] = useState({});
    const [callEvents, setCallEvents] = useState([]);

    // 팝업 테스트
    const [popupInfo, setPopupInfo] = useState({
        visible: false,
        type: null,
        phoneNumber: '',
        reason: '',
    });



    /* ===== HOOK ===== */
    useEffect(() => {
        fetch('http://localhost:5000/api/connection-status').
            then(res => res.json()).
            then(data => setConnectionStatus(data.status === 'connected' ? 'connected' : 'disconnected'));
    }, [], [connectionStatus]);



    useEffect(() => {
        socket.on('cid-data', (data) => {
            switch (data.type) {
                case CID_DATA_TYPE.DEVICE_INFO_REQ:
                    setCallEvents(prevEvents => [...prevEvents, '(PC → 장치) 장치 정보 요청']);
                    break;

                case CID_DATA_TYPE.DEVICE_INFO_RES:
                    setDeviceId(data.info);
                    setCallEvents(prevEvents => [...prevEvents, `(장치 → PC) 장치 정보 응답: ${data.info}`]);
                    break;

                case CID_DATA_TYPE.INCOMING:
                    setCallerId(data.phoneNumber);
                    setCallEvents(prevEvents => [...prevEvents, `(장치 → PC) 수신: ${data.phoneNumber}`]);
                    setPopupInfo({
                        visible: true,
                        type: CID_DATA_TYPE.INCOMING,
                        phoneNumber: data.phoneNumber,
                        reason: '',
                    })
                    break;

                case CID_DATA_TYPE.MASKED:
                    setCallEvents(prevEvents => [...prevEvents, `(장치 → PC) 수신: 알 수 없는 번호 (${data.payload})`]);
                    break;

                case CID_DATA_TYPE.DIAL_OUT:
                    setCallerId(data.phoneNumber);
                    setCallEvents(prevEvents => [...prevEvents, `(PC → 장치) 발신: ${data.phoneNumber}`]);
                    setPopupInfo({
                        visible: true,
                        type: CID_DATA_TYPE.DIAL_OUT,
                        phoneNumber: data.phoneNumber,
                        reason: '',
                    })
                    break;

                case CID_DATA_TYPE.DIAL_COMPLETE:
                    setCallEvents(prevEvents => [...prevEvents, '(장치 → PC) 발신 완료']);
                    break;

                case CID_DATA_TYPE.FORCED_END:
                    setCallEvents(prevEvents => [...prevEvents, '(PC → 장치) 강제 종료']);
                    break;

                case CID_DATA_TYPE.OFF_HOOK:
                    setCallEvents(prevEvents => [...prevEvents, '(장치 → PC) 수화기 들음']);
                    break;

                case CID_DATA_TYPE.ON_HOOK:
                    setCallEvents(prevEvents => [...prevEvents, '(장치 → PC) 수화기 내려놓음'])
            }
        });

        return () => {
            socket.off('cid-data');
        };

    }, [], [callerId, callEvents]);

    return (
        <MainPresenter
            deviceId={deviceId}
            connectionStatus={connectionStatus}
            callerId={callerId}
            callEvents={callEvents}

            popupInfo={popupInfo}
            setPopupInfo={setPopupInfo}
        />
    );
}

export default MainContainer;