const MainPresenter = ({
    connectionStatus,
    callerId,
    callEvents,
}) => {

    return (
        <div>
            <h1>콜스타 테스트</h1>
            <p>연결 상태: {connectionStatus}</p>
            <h2>발신번호</h2>
            <p>{callerId ? callerId : '수신 없음'}</p>
            <h2>전화 이벤트</h2>
            <ul>
                {callEvents.map((event, index) => (
                    <li key={index}>{event}</li>
                ))}
            </ul>
            <h2>CID Data</h2>
            {/* <p>{cidData.type}</p> */}
        </div>
    );
}

export default MainPresenter;