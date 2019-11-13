import React, { useState, useEffect } from 'react';
import Info from './info';

const ListInstuments = () => {
  const [loading, setLoading] = useState(false);
  const [instruments, setInstruments] = useState([]);
  const [instrumCur, setInstrumCur] = useState([]);
  const [pageFrom, setPageFrom] = useState(0);
  const [pageTo, setPageTo] = useState(10);
  const [choose, setChoose] = useState('');
  const [chooseData, setChooseData] = useState([]);

  useEffect(() => {
    const getInstruments = async() => {
      const response = await
      fetch(`https://quotes.instaforex.com/api/quotesList`);
      const result = await response.json();

      setInstruments(result);
      setInstrumCur(result);
      setLoading(true);
    };

    getInstruments();
  }, []);

  const handlePageNext = () => {
    setPageFrom(pageFrom + 10);
    setPageTo(pageTo + 10);
  };

  const handlePagePrev = () => {
    setPageFrom(pageFrom - 10);
    setPageTo(pageTo - 10);
  };

  const hadleClick = (key, des) => (e) => {
    e.preventDefault();
    setChoose(key);
    setChooseData(des);
  };

  const instrum = () => (
    instrumCur.quotesList.map((el, i) => (
      /* eslint-disable-next-line */
      <div
        className="btn btn-light"
        role="button"
        key={el.symbol}
        tabIndex="-1"
        onClick={hadleClick(el.symbol, el.description)}
      >
        {el.symbol}
      </div>

    )).slice(pageFrom, pageTo)
  );

  const filterByInput = (e) => {
    const value = e;

    if (value.length > 0) {
      setInstrumCur({
        quotesList: instruments.quotesList.filter(
          el => el.symbol.toLowerCase().includes(value.trim())
        ),
      });
    } else {
      setInstrumCur(instruments);
    }
  };

  return (
    <div className="widget">
      <div className="widget-instrm">
        <input
          className="form-control"
          placeholder="Search"
          type="text"
          onChange={e => filterByInput(e.target.value)}
        />
        <div className="instrm-list">
          {loading && instrum()}
        </div>
        <div className="instrm-buttons">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handlePagePrev}
            disabled={pageFrom === 0}
          >
          Prev
          </button>
          <p>
            {loading && pageTo > instrumCur.quotesList.length
              ? instrumCur.quotesList.length
              : pageTo}
          </p>
          <p>of</p>
          <p>{loading && instrumCur.quotesList.length}</p>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handlePageNext}
            disabled={loading && pageTo === instrumCur.quotesList.length}
          >
          Next
          </button>
        </div>
      </div>
      <div className="widget-info">
        <Info
          symbol={choose}
          description={chooseData}
        />
      </div>
    </div>
  );
};

export default ListInstuments;
