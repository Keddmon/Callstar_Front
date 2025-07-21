import './DeviceCheckPopup.style.css';
import CID_DATA_TYPE from '../../../utils/Protocol.constants';
import { useEffect, useState } from 'react';

const DeviceCheckPopup = ({
    visible,
    type,
    data,
    onClose,
}) => {

    /* ===== STATE ===== */
    const [show, setShow] = useState(visible);

    /* ===== HOOKS ===== */
    useEffect(() => {
        setShow(visible);
    }, [visible]);

    /* ===== RENDER ===== */
    return show ? (
        <div className='incoming-call-popup'>
            <div className='popup-content'>
                <h2>장비 목록</h2>
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
};

export default DeviceCheckPopup;