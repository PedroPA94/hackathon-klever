import React from 'react'
import IScoreboard from '../interfaces/IScoreboard';

const Statistics = ({ scoreboard }: { scoreboard: IScoreboard[]}): React.ReactElement => {

  const getBestMultiplier = () => {
    let greaterMultiplier = 0;

    scoreboard.forEach((score) => {
      if(score.multiplier > greaterMultiplier && score.won) greaterMultiplier = score.multiplier;
    });

    return greaterMultiplier;
  }

  const getBestProfit = () => {
    let greaterProfit = 0;

    scoreboard.forEach((score) => {
      if(score.bet > greaterProfit && score.won) greaterProfit = score.bet;
    });

    return greaterProfit
  }

  const winsInARowCalculator = () => {
    const victoriesInARow: number[] = [];
    let greaterNumberOfVictories = 0;

    scoreboard.reduce((acc, score) => {
      if(score.won) {
        return acc + 1
      } else {
        victoriesInARow.push(acc);
        return 0;
      }

    }, 0)

    victoriesInARow.forEach((victories) => {
      if(victories > greaterNumberOfVictories) greaterNumberOfVictories = victories;
    })

    return greaterNumberOfVictories;
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

