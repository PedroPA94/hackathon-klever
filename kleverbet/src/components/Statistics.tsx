import React from 'react'
import IScoreboard from '../interfaces/IScoreboard';

const Statistics = ({ scoreboard }: { scoreboard: IScoreboard[]}): React.ReactElement => {

  const getGreaterMultiplier = () => {
    let greaterMultiplier = 0;

    scoreboard.forEach((score) => {
      if(score.multiplier > greaterMultiplier && score.won) greaterMultiplier = score.bet;
    });

    return greaterMultiplier;
  }

  const getGreaterProfit = () => {
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
          <p>Greater Profit: {getGreaterProfit()}</p>
          <p>Better Multiplier: {getGreaterMultiplier()}</p>
        </aside>
    )
}

export default Statistics;

