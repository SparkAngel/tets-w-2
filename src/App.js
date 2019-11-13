import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const client = io('https://qrtm1.ifxid.com:8443');

const App = () => {
  const [loading, setLoading] = useState(false);
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    client.on('connect', () => {
    });
    client.emit('subscribe', ['GOLD']);
    client.on('quotes', (data) => {
      setInstruments(data);
      setLoading(true);
    });

    return () => {
      client.emit('unsubscribe', ['GOLD']);
    };
  }, []);

  const stop = () => {
    client.emit('unsubscribe', ['GOLD']);
  };

  return (
    <div className="App">
      <button
        type="button"
        onClick={stop}
      >
        STOP
      </button>
      <div className="wrap">
        <p className="text-bold">Symbol:</p>
        <p className="text-normal">{loading && instruments.msg.symbol}</p>
        <p className="text-bold">Ask:</p>
        <p className="text-normal">{loading && instruments.msg.ask}</p>
        <p className="text-bold">Bid:</p>
        <p className="text-normal">{loading && instruments.msg.bid}</p>
        <p className="text-bold">Change:</p>
        <p
          className={loading && Math.sign(instruments.msg.change) === 1
            ? 'text-gren'
            : 'text-red'}
        >
          {loading && instruments.msg.change}
        </p>
        {loading && Math.sign(instruments.msg.change) === 1
          ? <p className="text-gren">▲</p>
          : <p className="text-red">▼</p>
        }
      </div>
    </div>
  );
};

export default App;
