import React, { useState } from 'react';
import './WebSocketClient.scss';

interface WebSocketClientProps {
  price: number;
  crypto: string;
  currency: string;
}

const WebSocketClient: React.FC<WebSocketClientProps> = ({ price, crypto, currency }) => {
  const [ethAmount, setEthAmount] = useState('');
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const [usdtAmount, setUsdtAmount] = useState<string>('');

  const handleEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthAmount(event.target.value);
  };

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(event.target.value as 'buy' | 'sell');
  };

  const handleCalculate = () => {
    const eth: number = parseFloat(ethAmount);
    const usdt: number = eth * price;
    setUsdtAmount(usdt.toFixed(2));
  };

  return (
    <div className='container'>
      <h1>{`${crypto}/${currency} Pair Price Calculator`}</h1>
      <div className='container__eth'>
        <label htmlFor='ethAmount'>Enter {crypto} Amount:</label>
        <input
          type='number'
          id='ethAmount'
          value={ethAmount}
          onChange={handleEthChange}
        />
      </div>
      <div className='container__action'>
        <label htmlFor='action'>Select Action:</label>
        <select id='action' value={action} onChange={handleActionChange}>
          <option value='buy'>{`Buy ${crypto}`}</option>
          <option value='sell'>{`Sell ${crypto}`}</option>
        </select>
      </div>
      <button className='container__button' onClick={handleCalculate}>
        Calculate
      </button>
      <div className='container__result'>
        {action === 'buy' ? (
          <p>
            {`Amount of ${currency} required:`}{' '}
            <h2>{+usdtAmount === 0 ? 'Loading...' : usdtAmount}</h2>
          </p>
        ) : (
          <p>
            {`Amount of ${currency} you will receive:`}{' '}
            <h2>{+usdtAmount === 0 ? 'Loading...' : usdtAmount}</h2>
          </p>
        )}
      </div>
    </div>
  );
};

export default WebSocketClient;
