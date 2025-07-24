import './DeviceCheckPopup.style.css';
import { useEffect, useState } from 'react';

const DeviceCheckPopup = ({
    visible,
    ports,
    onChange,

    selectedPort,
}) => {

    /* ===== STATE ===== */
    const [show, setShow] = useState(visible);

    /* ===== HOOKS ===== */
    useEffect(() => {
        setShow(visible);
    }, [visible]);

    /* ===== RENDER ===== */
    return show ? (
        <div className='device-check-popup'>
            <div className='popup-content'>
                <h2>장비 목록</h2>
                <div>
                    <select value={selectedPort} onChange={(e) => onChange(e.target.value)}>
                        {ports.map((port, idx) => (
                            <option key={idx} value={port.value}>{port.label}</option>
                        ))}
                    </select>
                </div>
                <div class='popup-button-wrap'>
                    <button
                        style={{
                            width: '100%'
                        }}
                        onClick={() => setShow(false)}>선택</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default DeviceCheckPopup;