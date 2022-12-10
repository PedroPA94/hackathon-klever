import React, { useState, useEffect } from 'react';
import IScoreboard from '../../interfaces/IScoreboard';
import { checkIcon, xIcon } from '../icons';
import Statistics from '../Statistics';
import './Leaderboard.css';

const Leaderboard = (): React.ReactElement => {
  const [scoreboard, setScoreboard] = useState<IScoreboard[]>([])

  const mock: IScoreboard[] = [{
    walletAddress: 1,
    id: 1,
    bet: 1000,
    multiplier: 1,
    won: true,
  }, {
    walletAddress: 1,
    id: 1,
    bet: 100,
    multiplier: 1.5,
    won: true,
  }, {
    walletAddress: 1,
    id: 1,
    bet: 1,
    multiplier: 1,
    won: false,
  }, {
    walletAddress: 1,
    id: 1,
    bet: 1,
    multiplier: 1,
    won: false,
  }, {
    walletAddress: 1,
    id: 1,
    bet: 1,
    multiplier: 1,
    won: false,
  }, {
    walletAddress: 1,
    id: 1,
    bet: 1,
    multiplier: 1,
    won: false,
  }, {
    walletAddress: 1,
    id: 1,
    bet: 1,
    multiplier: 1,
    won: false,
  },{
    walletAddress: 1,
    id: 1,
    bet: 1,
    multiplier: 1.5,
    won: false,
  }]

  const profitCalculator = () => {
    return scoreboard.reduce((acc, score) => {
      if(score.won) return acc + (score.bet * score.multiplier);
      return acc - score.bet;
    }, 0)
  }

  const winOrLoseIcon = (won: boolean) => {
    if(won) return checkIcon;
    return xIcon;
  }

  const profitOrLossCalculator = (score: IScoreboard) => {
    if(score.won) return score.bet * score.multiplier;
    return -score.bet;
  }

  useEffect(() => {
    const scoreboardJson: string | null = (localStorage.getItem('leaderboard'));
    setScoreboard(mock);
    if(scoreboardJson) {
      const parsedScoreboard: IScoreboard[] = JSON.parse(scoreboardJson);
      setScoreboard(parsedScoreboard);
    }

  }, [])
  

  return (
    <section className="leaderboard-section">
      <div className="leaderboard-header">
        <p><strong>You</strong> bet {scoreboard.length} times</p>
        <Statistics scoreboard={scoreboard}/>
        <p>Total Profit: <strong>{profitCalculator()} TC</strong></p>
      </div>
      
      <table className="table">
        <tr className="table-header-row">
          <th>Bet</th>
          <th>Multiplier</th>
          <th>Won</th>
          <th>Profit/Loss</th>
        </tr>
        { scoreboard ? (
          scoreboard.map((score) => 
          <tr className="table-content-row">
            <td>{ score.bet } TC</td>
            <td>{ score.multiplier }x</td>
            <td>{ winOrLoseIcon(score.won) }</td>
            <td className={score.won ? "td-profit" : "td-loss"}>{ profitOrLossCalculator(score) } TC</td>
          </tr>)
        ): <></>}
      </table>
    </section>
  )
}

export default Leaderboard;
