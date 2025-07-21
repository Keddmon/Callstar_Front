import { IncomingCallPopup } from '../../../../components';
import './Main.css';

const MainPresenter = ({
    deviceId,
    connectionStatus,
    callerId,
    callEvents,

    popupInfo,
    setPopupInfo,

    availablePorts,
    handlePortSelect,
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
                <h2>확인된 장비</h2>
                <p>{deviceId ? deviceId : '확인된 장비 없음'}</p>
            </div>
            <div>
                <select onChange={(e) => handlePortSelect(e.target.value)}>
                    {availablePorts.map((port, idx) => (
                        <option key={idx} value={port}>{port}</option>
                    ))}
                </select>
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
        </div>
    );
}

export default MainPresenter;