import './IncomingCallPopup.style.css';
import CID_DATA_TYPE from '../../../utils/Protocol.constants';
import { useEffect, useState } from 'react';

/**
 * CID 데이터 타입 구분 함수
 * --
 */
const getMessageByType = (type, data) => {
    switch (type) {
        case CID_DATA_TYPE.DEVICE_INFO_RES:
            return {
                head: '기기 정보',
                content: `기기 확인 응답: ${data}`,
                button: false,
            };

        case CID_DATA_TYPE.INCOMING:
            return {
                head: '상담 요청',
                content: `수신 전화번호: ${data}`,
                button: true,
            };

        case CID_DATA_TYPE.DIAL_OUT:
            return {
                head: '발신 시도',
                content: `발신 전화번호: ${data}`,
                button: false,
            };

        case CID_DATA_TYPE.DIAL_COMPLETE:
            return {
                head: '발신 시도',
                content: `발신 전화번호: ${data}`,
                button: false,
            };

        case CID_DATA_TYPE.FORCED_END:
            return {
                head: '수화기',
                content: '강제 종료',
                button: false,
            };

        case CID_DATA_TYPE.OFF_HOOK:
            return {
                head: '수화기',
                content: '수화기 들음',
                button: false,
            };

        case CID_DATA_TYPE.ON_HOOK:
            return {
                head: '수화기',
                content: '수화기 내려놓음',
                button: false,
            };

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
                <h2>{getMessageByType(type, data, reason).head}</h2>
                <p>{getMessageByType(type, data, reason).content}</p>
                <div class='popup-button-wrap'>
                    {
                        getMessageByType(type, data, reason).button ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <button
                                    style={{
                                        width: '100%',
                                    }}
                                    onClick={onClose}
                                >확인</button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    ) : null;
}

export default IncomingCallPopup;