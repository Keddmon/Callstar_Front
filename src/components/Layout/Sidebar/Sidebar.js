import './Sidebar.style.css';

const Sidebar = ({
    sendCommand,
    simulateOpcode,
}) => {

    /* ===== RENDER ===== */
    return (
        <div className='sidebar-container'>
            <h3>테스트 명령</h3>

            <h4>실제 명령</h4>
            <button onClick={() => sendCommand('P')}>장비 정보 요청 (P)</button>
            <button onClick={() => sendCommand('O', '01012345678')}>발신 테스트 (I)</button>
            {/* 'K' = DIAL_COMPLETE */}
            <button onClick={() => sendCommand('F')}>발신 강제 종료 (F)</button>

            <h4>시뮬레이션</h4>
            <button onClick={() => simulateOpcode('S')}>[시뮬] 수화기 들기 (S)</button>
            <button onClick={() => simulateOpcode('E')}>[시뮬] 수화기 놓기 (E)</button>
            <button onClick={() => simulateOpcode('I', '01098765432')}>[시뮬] 수신 테스트 (I)</button>
        </div>
    );
};

export default Sidebar;