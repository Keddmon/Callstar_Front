import './Sidebar.style.css';

const Sidebar = ({
    sendCommand,
    simulateOpcode,
}) => {

    /* ===== RENDER ===== */
    return (
        <aside className="sidebar-container">
            <h3>테스트 명령 패널</h3>

            <div className="sidebar-section">
                <h4>실제 명령</h4>
                <button className="cmd-btn primary" onClick={() => sendCommand('P')}>
                    장비 정보 요청 (P)
                </button>
                <button className="cmd-btn primary" onClick={() => sendCommand('O', '01012345678')}>
                    발신 테스트 (O)
                </button>
                <button className="cmd-btn danger" onClick={() => sendCommand('F')}>
                    발신 강제 종료 (F)
                </button>
            </div>

            <div className="sidebar-section">
                <h4>시뮬레이션</h4>
                <button className="cmd-btn" onClick={() => simulateOpcode('S')}>
                    [시뮬] 수화기 들기 (S)
                </button>
                <button className="cmd-btn" onClick={() => simulateOpcode('E')}>
                    [시뮬] 수화기 놓기 (E)
                </button>
                <button className="cmd-btn" onClick={() => simulateOpcode('I', '01098765432')}>
                    [시뮬] 수신 테스트 (I)
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;