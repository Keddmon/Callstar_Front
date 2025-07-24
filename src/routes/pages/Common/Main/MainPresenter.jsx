import { DeviceCheckPopup, IncomingCallPopup, Sidebar } from '../../../../components';
import './Main.css';

const MainPresenter = ({
    connectionStatus,
    callerId,
    callEvents,

    popupInfo,
    setPopupInfo,

    availablePorts,
    selectedPort,
    setSelectedPort,
    onPortSelect,

    sendCommand,
    simulateOpcode,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className="main-container">
            <div>
                <h1>CID 테스트</h1>
                <p style={{
                    color: connectionStatus === 'connected' ? 'blue' : 'red'
                }}>{connectionStatus === 'connected' ? '연결 성공' : '연결 실패'}</p>
            </div>
            <div>
                <h2>발신번호</h2>
                <p>{callerId ? callerId : '수신 없음'}</p>
            </div>
            <div>
                <h2>확인된 포트</h2>
                {availablePorts.map(port => (
                    <p>{port.label}</p>
                ))}
            </div>
            <div>
                <h2>전화 이벤트</h2>
                <ul>
                    {callEvents.map((event, index) => (
                        <li key={index}>{event}</li>
                    ))}
                </ul>
            </div>

            <IncomingCallPopup
                visible={popupInfo.visible}
                type={popupInfo.type}
                data={popupInfo.data}
                reason={popupInfo.reason}
                onClose={() => setPopupInfo({ visible: false, type: null, phoneNumber: '', reason: '' })}
            />

            <DeviceCheckPopup
                visible={true}
                ports={availablePorts}
                onChange={onPortSelect}

                selectedPort={selectedPort}
            />
            <Sidebar
                sendCommand={sendCommand}
                simulateOpcode={simulateOpcode}
            />
        </div>
    );
}

export default MainPresenter;