import React, { useState, useEffect } from 'react';
import { checkIcon, xIcon } from '../icons';
import './Leaderboard.css';

const Leaderboard = (): React.ReactElement => {
  const [scoreboard, setScoreboard] = useState<iScoreboard[]>([])

  const mock: iScoreboard[] = [{
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

  interface iScoreboard {
    walletAddress: number,
    id: number,
    bet: number,
    multiplier: number,
    won: boolean,
  }

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

  useEffect(() => {
    const scoreboardJson: string | null = (localStorage.getItem('leaderboard'));
    setScoreboard(mock);
    if(scoreboardJson) {
      const parsedScoreboard: iScoreboard[] = JSON.parse(scoreboardJson);
      setScoreboard(parsedScoreboard);
    }

  }, [])
  

  return (
    <section className="leaderboard-section">
      <div className="leaderboard-header">
        <p><strong>Você</strong> apostou {scoreboard.length} vezes</p>
        <p>Lucro total: <strong>{profitCalculator()} TC</strong></p>
      </div>
      <table className="table">
        <tr className="table-header-row">
          <th>Bet</th>
          <th>Multiplier</th>
          <th>Won</th>
        </tr>
        { scoreboard ? (
          scoreboard.map((score) => 
          <tr className="table-content-row">
            <td>{ score.bet } TC</td>
            <td>{ score.multiplier }x</td>
            <td>{ winOrLoseIcon(score.won) }</td>
          </tr>)
        ): <></>}
      </table>
    </section>
  )
}

export default Leaderboard;
