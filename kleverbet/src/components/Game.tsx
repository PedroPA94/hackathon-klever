import React, { useEffect, useRef, useState } from 'react';
import IhandleGameArgs from '../interfaces/handleGameArgs';

interface GameProps {
  crashTime: number,
  betValue: number,
  callback(args: IhandleGameArgs): void
}

const Game = ({ crashTime, betValue, callback }: GameProps ): React.ReactElement => {
  const [gameState, setGameState] = useState({ 
    multiplier: 1, 
    timer: 0, 
    previous: {
      multipliers: [1],
      timers: [0]
    }
  }); // timer in ms
  const intervalRef = useRef(0);

  const stopCounter = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setGameState(({ multiplier, timer, previous }) => (
        { 
          multiplier: multiplier + 0.01,
          timer: timer + 100,
          previous: {
            multipliers: [...previous.multipliers, multiplier + 0.01],
            timers: [...previous.timers, timer + 100]
          }
        }
      ))
    }, 100);

    return () => stopCounter();
  }, []);

  useEffect(() => {
    if (gameState.timer >= crashTime) loseGame();
  }, [gameState.timer]);

  const stopBet = (): void => {
    stopCounter();
    const prizeValue = gameState.multiplier * betValue;
    callback({ type: 'WON', payload: { multiplier: gameState.multiplier, value: prizeValue }});
  }

  const loseGame = (): void => {
    stopCounter();
    callback({ type: 'LOSS', payload: { multiplier: gameState.multiplier, value: betValue }});
  }

  return (
    <>
      <div>{gameState.multiplier.toFixed(2)}</div>
      <div>{gameState.timer.toFixed(2)}</div>
      {gameState.previous.multipliers.map((m) => <p>{m}</p>)}
      <button onClick={stopBet}>Stop</button>
    </>
  );
}

export default Game;