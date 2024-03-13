import { useEffect, useState } from 'react';
import WebSocketClient from './components/WebSocketClient';
import './App.scss';

const App: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [cryptocurrency, setCryptocurrency] = useState('ETH');
  const [defaultCurrency, setDefaultCurrency] = useState('USDT');

  const handleChangeCryptocurrency = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCryptocurrency(event.target.value);
  };

  const handleChangeDefaultCurrency = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDefaultCurrency(event.target.value);
  };

  useEffect(() => {
    const ws = new WebSocket(
      'wss://blackbot-server-test.onrender.com',
    );

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({ cryptocurrency, defaultCurrency }));
    };

    ws.onmessage = (event) => {
      const data: string = event.data;
      const price: number = parseFloat(data);
      setPrice(price);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [cryptocurrency, defaultCurrency]);

  return (
    <>
      <WebSocketClient
        price={price}
        crypto={cryptocurrency}
        currency={defaultCurrency}
      />
      <div className='container'>
        <div className='container__crypto'>
          <label htmlFor='cryptocurrency'>Select Cryptocurrency:</label>
          <select
            id='cryptocurrency'
            value={cryptocurrency}
            onChange={handleChangeCryptocurrency}
          >
            <option value='ETH'>Ethereum</option>
            <option value='BTC'>Bitcoin</option>
            <option value='BNB'>Binance Coin</option>
            <option value='SOL'>Solana</option>
            <option value='XRP'>XRP</option>
          </select>
        </div>
        <div className='container__currency'>
          <label htmlFor='defaultCurrency'>Select Default Currency:</label>
          <select
            id='defaultCurrency'
            value={defaultCurrency}
            onChange={handleChangeDefaultCurrency}
          >
            <option value='USDT'>USDT</option>
            <option value='EUR'>EUR</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default App;
