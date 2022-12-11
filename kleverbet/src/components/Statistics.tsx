import React from 'react'
import IScoreboard from '../interfaces/IScoreboard';

const Statistics = ({ scoreboard }: { scoreboard: IScoreboard[]}): React.ReactElement => {

  const getBestMultiplier = () => {
    let bestMultiplier = 0;

    scoreboard.forEach((score) => {
      if(score.multiplier > bestMultiplier && score.won) bestMultiplier = score.multiplier;
    });

    return bestMultiplier;
  }

  const getBestProfit = () => {
    let bestProfit = 0;

    scoreboard.forEach((score) => {
      if(score.bet > bestProfit && score.won) bestProfit = score.bet;
    });

    return bestProfit
  }

  const winsInARowCalculator = () => {
    const victoriesInARow: number[] = [];
    let biggestNumberOfVictories = 0;

    scoreboard.reduce((acc, score, idx) => {
      if(score.won && score.won === scoreboard[idx + 1]?.won) {
        return acc + 1
      } else {
        console.log(victoriesInARow, score.multiplier)
        victoriesInARow.push(acc);
        return 1;
      }

    }, 1)

    console.log(victoriesInARow);

    victoriesInARow.forEach((victories) => {
      if(victories > biggestNumberOfVictories) biggestNumberOfVictories = victories;
    })

    return biggestNumberOfVictories;
  }

  return (
    <aside className="leaderboard-records">
          <h3>Records</h3>
          <p>Wins in a row: {winsInARowCalculator()}</p>
          <p>Greatest Profit: {getBestProfit()}</p>
          <p>Best Multiplier: {getBestMultiplier()}</p>
        </aside>
    )
}

export default Statistics;

