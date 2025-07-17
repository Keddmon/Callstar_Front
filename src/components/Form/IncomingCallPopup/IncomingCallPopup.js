import './IncomingCallPopup.style.css';
import CID_DATA_TYPE from '../../../utils/Protocol.constants';
import { useEffect, useState } from 'react';

/**
 * CID 데이터 타입 구분 함수
 * --
 */
const getMessageByType = (type, data, reason) => {
    switch (type) {
        case CID_DATA_TYPE.DEVICE_INFO_REQ:
            return `기기 확인 요청: ${data}`
            
        case CID_DATA_TYPE.INCOMING:
            return `수신 전화번호: ${data}`;

        case CID_DATA_TYPE.DIAL_OUT:
            return `발신 전화번호: ${data}`;

        case CID_DATA_TYPE.DIAL_COMPLETE:
            return `발신 전화번호: ${data}`;

        default:
            return '알 수 없는 전화 상태';
    }
}


const IncomingCallPopup = ({
    visible,
    type,
    data = '',
    reason = '',
    onClose,
}) => {
    const [show, setShow] = useState(visible);

    useEffect(() => {
        setShow(visible);
    }, [visible])

    return show ? (
        <div className='incoming-call-popup'>
            <div className='popup-content'>
                <h2>상담 요청</h2>
                <p>{getMessageByType(type, data, reason)}</p>
                <div class='popup-button-wrap'>
                    <button
                        style={{
                            width: '100%'
                        }}
                        onClick={onClose}>등록</button>
                    <button
                        style={{
                            width: '100%',
                            backgroundColor: 'red'
                        }}
                        onClick={onClose}
                    >거절</button>
                </div>
            </div>
        </div>
    ) : null;
}

export default IncomingCallPopup;