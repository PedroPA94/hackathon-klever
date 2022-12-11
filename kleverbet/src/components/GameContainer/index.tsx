import React, { useState } from 'react';
import Game from '../Game';
import GameControl from '../GameControl';
import IhandleGameArgs from '../../interfaces/handleGameArgs';
import './GameContainer.css';
import Leaderboard from '../Leaderboard/Leaderboard';

const GameContainer = () => {
  const [betValue, setBetValue] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [crashTime, setCrashTime] = useState(0);
  const [rerenderKey, setRerenderKey] = useState(0);

  const handleGame = ({ type, payload }: IhandleGameArgs) => {
    switch(type) {
      case 'WON':
        console.log('The user won ', payload.value, ' KLVR with multiplier ', payload.multiplier);
        setIsGameRunning(false);
        setRerenderKey((prev) => prev + 1);
        break;
      case 'LOSS':
        console.log('The user lost', payload.value, 'KVLR with multiplier ', payload.multiplier);
        setIsGameRunning(false);
        setRerenderKey((prev) => prev + 1);
        break;
    }
  }

  const startGame = (payload: number) => {
    const maxCrashTime = 5;
    const randomCrashTime = Math.round(Math.random() * maxCrashTime) * 1000;
    setBetValue(payload);
    setIsGameRunning(true);
    setCrashTime(randomCrashTime);
  }

  return (
    <>
      <div className='game-container'>
        <GameControl setBetValue={ startGame }/>
        <Game crashTime={ crashTime } betValue={ betValue } callback={ handleGame } isGameRunning={ isGameRunning } />
      </div>
      <Leaderboard key={ rerenderKey } />
    </>
  )
}

export default GameContainer;
