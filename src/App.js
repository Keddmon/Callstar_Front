import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import './App.css';

const socket = io('http://localhost:5000');

function App() {

  /* ===== State ===== */
  const [message, setMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [callerId, setCallerId] = useState('');
  const [callEvents, setCallEvents] = useState([]);

  useEffect(() => {

    // 연결 상태 확인
    fetch('http://localhost:5000/api/connection-status').
      then(response => response.json()).
      then(data => setConnectionStatus(data.status));

    // CID에서 수신되는 데이터
    socket.on('cid-data', (data) => {
      if (data.type === 'incoming') {
        setCallerId(data.phoneNumber);
        setCallEvents(prevEvents => [...prevEvents, `걸려온 전화번호: ${data.phoneNumber}`]);
      } else if (data.type === 'forced-end') {
        setCallEvents(prevEvents => [...prevEvents, '전화 끊김']);
      } else if (data.type === 'off-hook') {
        setCallEvents(prevEvents => [...prevEvents, '수화기 듬']);
      } else if (data.type === 'on-hook') {
        setCallEvents(prevEvents => [...prevEvents, '수화기 놔둠']);
      } else if (data.type === 'P') {
        setCallEvents(prevEvents => [...prevEvents, '기기 확인']);
      } // 051-900-9501
    })
    return () => {
      socket.off('cid-data');
    };
  }, []);

  // 테스트 버튼
  const test = () => {
    fetch('http://localhost:5000/api/connection-status')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }

  return (
    <div className="App">
      <h1>콜스타 테스트 시스템</h1>
      <p>연결 상태: {connectionStatus}</p>
      <button onClick={test}>연결 테스트</button>
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

export default App;
