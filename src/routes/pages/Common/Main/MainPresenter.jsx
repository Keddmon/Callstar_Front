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
        <div className="main-layout">
            {/* 메인 컨텐츠 영역 */}
            <div className="content">
                <div className="card status-card">
                    <h1>CID 테스트</h1>
                    <p className={connectionStatus === 'connected' ? 'status-connected' : 'status-disconnected'}>
                        {connectionStatus === 'connected' ? '연결 성공 ✅' : '연결 실패 ❌'}
                    </p>
                </div>

                <div className="card">
                    <h2>발신번호</h2>
                    <p>{callerId || '수신 없음'}</p>
                </div>

                <div className="card">
                    <h2>확인된 포트</h2>
                    {availablePorts.length > 0 ? (
                        availablePorts.map((port, i) => (
                            <p key={i} className={selectedPort === port.label ? 'port-selected' : 'port'}>
                                {port.label}
                            </p>
                        ))
                    ) : <p>포트 없음</p>}
                </div>

                <div className="card event-log">
                    <h2>전화 이벤트 로그</h2>
                    <ul>
                        {callEvents.map((event, index) => (
                            <li key={index}>{event}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 팝업 */}
            <IncomingCallPopup
                visible={popupInfo.visible}
                type={popupInfo.type}
                data={popupInfo.data}
                reason={popupInfo.reason}
                onClose={() => setPopupInfo({ visible: false, type: null, phoneNumber: '', reason: '' })}
            />
            <DeviceCheckPopup visible={true} ports={availablePorts} onChange={onPortSelect} selectedPort={selectedPort} />

            {/* 사이드바 */}
            <Sidebar sendCommand={sendCommand} simulateOpcode={simulateOpcode} />
        </div>
    );
}

export default MainPresenter;