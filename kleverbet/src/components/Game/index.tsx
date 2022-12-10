import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ChartData, ChartArea, ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Chart } from "react-chartjs-2";
import IhandleGameArgs from '../../interfaces/handleGameArgs';
import './Game.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface GameProps {
  crashTime: number,
  betValue: number,
  callback(args: IhandleGameArgs): void
}

function getGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  let gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, '#9c58db2f');
  gradient.addColorStop(0.8, '#9c58db');
  gradient.addColorStop(1, '#903edd');

  return gradient;
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
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: []
  });

  const stopCounter = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  }

  useEffect(() => {
    
    intervalRef.current = setInterval(() => {
      setGameState(({ multiplier, timer, previous }) => (
        { 
          multiplier: multiplier * 1.02,
          timer: timer + 100,
          previous: {
            multipliers: [...previous.multipliers, multiplier * 1.02],
            timers: [...previous.timers, timer + 100]
          }
        }
      ))
    }, 300);

    return () => stopCounter();
  }, []);

  useEffect(() => {
    const loseGame = (): void => {
      stopCounter();
      callback({ type: 'LOSS', payload: { multiplier: gameState.multiplier, value: betValue }});
    }
    
    if (gameState.timer >= crashTime) loseGame();
  }, [gameState.timer]);

  const stopBet = (): void => {
    stopCounter();
    const prizeValue = gameState.multiplier * betValue;
    callback({ type: 'WON', payload: { multiplier: gameState.multiplier, value: prizeValue }});
  }

  const data = useMemo(
    () => ({
      labels: gameState.previous.timers.map((time) => `${time / 1000}s`),
      datasets: [
        {
          label: "game",
          data: gameState.previous.multipliers
        }
      ]
    }),
    [gameState]
  );

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: getGradient(chart.ctx, chart.chartArea),
        fill: true,
      }))
    };

    setChartData(chartData);
  }, [gameState, data]);

  const options: ChartOptions = {
    maintainAspectRatio: true,
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#DCDCE0',
          font: {
            size: 16,
          },
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#DCDCE0',
          font: {
            size: 16,
          },
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
    
    }
  }

  return (
    <div className='chart-container'>
      <div className='multiplier-container'>
        <h2>{`${gameState.multiplier.toFixed(2)} X`}</h2>
      </div>
      <Chart ref={chartRef} type="line" data={chartData} options={options} className='canvas' />
      <button onClick={stopBet} className="stop-game-btn">Stop</button>
    </div>
  );
}

export default Game;