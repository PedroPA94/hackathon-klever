import React, { useState } from 'react';
import Game from '../Game';
import GameControl from '../GameControl';
import IhandleGameArgs from '../../interfaces/handleGameArgs';
import './GameContainer.css';
import Leaderboard from '../Leaderboard/Leaderboard';
import { toast, ToastOptions } from 'react-toastify';


const GameContainer = () => {
  const [betValue, setBetValue] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [crashTime, setCrashTime] = useState(0);
  const [rerenderKey, setRerenderKey] = useState(0);
  const toastOptions: ToastOptions = {
    position: 'bottom-center',
    theme: 'dark'
  }

  const handleGame = ({ type, payload }: IhandleGameArgs) => {
    switch(type) {
      case 'WON':
        toast.success(`Hooray! You won ${payload.value.toFixed(2)} TC`, toastOptions);
        setIsGameRunning(false);
        setRerenderKey((prev) => prev + 1);
        break;
      case 'LOSS':
        toast.warn(`Too bad! You lost ${payload.value.toFixed(2)} TC`, toastOptions);
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
