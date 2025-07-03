const MainPresenter = ({
    message,
    connectionStatus,
    callerId,
    callEvents,
}) => {

    return (
        <div>
            <h1>콜스타 테스트 시스템</h1>
            <p>연결 상태: {connectionStatus}</p>
            <p>{message}</p>
            <h2>발신자 ID</h2>
            <p>{callerId ? callerId : '수신 없음'}</p>
            <h2>전화 이벤트</h2>
            <ul>
                {callEvents.map((event, index) => (
                    <li key={index}>{event}</li>
                ))}
            </ul>
        </div>
    );
}

export default MainPresenter;