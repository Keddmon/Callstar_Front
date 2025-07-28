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
        <div className="popup-overlay">
            <div className="device-check-popup">
                <div className="popup-header">
                    <h2>장비 선택</h2>
                    <button className="close-btn" onClick={() => setShow(false)}>✖</button>
                </div>

                <div className="popup-body">
                    <label>사용할 포트를 선택하세요:</label>
                    <select value={selectedPort} onChange={(e) => onChange(e.target.value)}>
                        {ports.map((port, idx) => (
                            <option key={idx} value={port.value}>{port.label}</option>
                        ))}
                    </select>
                </div>

                <div className="popup-footer">
                    <button className="confirm-btn" onClick={() => setShow(false)}>선택 완료</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default DeviceCheckPopup;