import React, { useState } from 'react';
import Game from '../Game';
import GameControl from '../GameControl';
import IhandleGameArgs from '../../interfaces/handleGameArgs';
import './GameContainer.css';


const GameContainer = () => {
  const [betValue, setBetValue] = useState<number | null>(null);

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
    <div className='game-container'>
      <GameControl callback={ setBetValue }/>
      { betValue ? <Game crashTime={ 5000 } betValue={ betValue } callback={ handleGame } /> : <p>faça uma aposta</p>}
    </div>
  )
}

export default GameContainer;
