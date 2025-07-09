import './IncomingCallPopup.style.css';
import CID_DATA_TYPE from '../../../utils/Protocol.constants';
import { useEffect, useState } from 'react';

/**
 * CID 데이터 타입 구분 함수
 * --
 */
const getMessageByType = (type, phoneNumber, reason) => {
    switch (type) {
        case CID_DATA_TYPE.INCOMING:
            return `수신 전화번호: ${phoneNumber}`;

        case CID_DATA_TYPE.DIAL_OUT:
            return `발신 전화번호: ${phoneNumber}`;

        default:
            return '알 수 없는 전화 상태';
    }
}


const IncomingCallPopup = ({
    visible,
    type,
    phoneNumber = '',
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
                <p>{getMessageByType(type, phoneNumber, reason)}</p>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    ) : null;
}

export default IncomingCallPopup;