import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Info = ({ symbol, description }) => {
  const [info, setInfo] = useState([]);
  const [descr, setDescr] = useState();

  useEffect(() => {
    if (symbol !== '') {
      const getInfo = async() => {
        const response = await
        fetch(`https://quotes.instaforex.com/api/quotesTick?q=${symbol}`);
        const result = await response.json();

        setInfo(result);
        setDescr(description);
      };

      getInfo();
    }
  }, [symbol]);

  return (
    <div className="info-container">
      {info.map(el => (
        <div className="container-wrap" key={el.symbol}>
          <div className="container-wrap-text">
            <p className="text-bold">Symbol:</p>
            <p className="text-normal">{el.symbol}</p>
          </div>
          <div className="container-wrap-text">
            <p className="text-bold">Description:</p>
            <p className="text-normal">{descr}</p>
          </div>
          <div className="container-wrap-text">
            <p className="text-bold">digits:</p>
            <p className="text-normal">{el.digits}</p>
          </div>
          <div className="container-wrap-text">
            <p className="text-bold">ask:</p>
            <p className="text-normal">{el.ask}</p>
          </div>
          <div className="container-wrap-text">
            <p className="text-bold">bid:</p>
            <p className="text-normal">{el.bid}</p>
          </div>
          <div className="container-wrap-text">
            <p className="text-bold">change:</p>
            <p className="text-normal">{el.change}</p>
          </div>
          <div className="container-wrap-text">
            <p className="text-bold">change24h:</p>
            <p className="text-normal">{el.change24h}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

Info.propTypes = {
  symbol: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.string),
};

Info.defaultProps = {
  symbol: '',
  description: '',
};

export default Info;
