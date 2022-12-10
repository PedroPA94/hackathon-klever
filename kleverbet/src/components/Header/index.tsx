import React, { ChangeEvent, ReactEventHandler, useState } from 'react'
import './header.css';

export default function Header() {
  const [currencyValue, setcurrencyValue] = useState("USD");
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  }

  return (
    <header className="header">

      <div className="logo">

        <img src="https://s2.coinmarketcap.com/static/img/coins/200x200/6724.png" alt="Logo da klev" />

        <h2>Kleverbet</h2>

      </div>

      <div className="nav">
        <a href="https://klever.io/en" target="_blank">Download the Exchange App</a>
        <button className="login-button">Login</button>
        <div>
          <button onClick={ () => toggleOptions()}>PTBR | { currencyValue } 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            className="open-btn"/>
            </svg>
          </button>
        </div>
      </div>

      { showOptions ? (
        <nav className="options-nav">
            <svg xmlns="http://www.w3.org/2000/svg"
             width="28" height="28" fill="currentColor" className="bi bi-x close-btn"
             viewBox="0 0 16 16" onClick={() => toggleOptions()}>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        <div className="options">
          <h3>Language</h3>
          <p>Choose a language</p>
          <div className='buttons'> 
          <button>English</button>
          <button>Portuguese</button>
          </div>
        </div>
        <div className="options">
          <h3>Currency</h3>
          <p>Choose a currency</p>
          <div className='buttons'>
            <button onClick={() => setcurrencyValue('USD')}>USD</button>
            <button onClick={() => setcurrencyValue('BRL')}>BRL</button>
            <button onClick={() => setcurrencyValue('BTC')}>BTC</button>
          </div>
        </div>
      </nav>
      ) : <></>}
      
    </header>
  )
}
