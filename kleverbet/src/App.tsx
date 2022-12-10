import React, { useState } from 'react'
import Header from './components/header/Header';
import './App.css';
import Game from './components/Game';
import IhandleGameArgs from './interfaces/handleGameArgs';
import Leaderboard from './components/Leaderboard/Leaderboard';

const App = () => {
  const handleGame = ({ type, payload }: IhandleGameArgs) => {
    switch(type) {
      case 'WON':
        console.log('The user won ', payload.value, ' KLVR with multiplier ', payload.multiplier);
        break;
      case 'LOSS':
        console.log('The user lost', payload.value, 'KVLR with multiplier ', payload.multiplier);
        break;
    }
  }

  return (
    <div className="App">
      <Header />
      <Game crashTime={5000} betValue={1000} callback={handleGame}></Game>
      <Leaderboard />
    </div>
  )
}

export default App;
