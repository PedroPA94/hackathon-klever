import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import IScoreboard from '../../interfaces/IScoreboard';
import { checkIcon, xIcon } from '../icons';
import Statistics from '../Statistics';
import './Leaderboard.css';

interface LeaderboardProps {
  key?: number,
}

const Leaderboard = (_props: LeaderboardProps): React.ReactElement => {
  const [scoreboard] = useLocalStorage<IScoreboard[]>('leaderboard', []);

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

  return (
    <section className="leaderboard-section">
      <div className="leaderboard-header">
        <p><strong>You</strong> bet {scoreboard.length} times</p>
        <Statistics scoreboard={scoreboard}/>
        <p>Total Profit: <strong>{profitCalculator()} TC</strong></p>
      </div>
      
      <table className="table">
        <thead>
          <tr className="table-header-row">
            <th>Bet</th>
            <th>Multiplier</th>
            <th>Won</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        
        { scoreboard.length ? (
            <tbody>
          {
            scoreboard.map((score, index) => 
              <tr className="table-content-row" key={`table-${index}`}>
                <td>{ score.bet } TC</td>
                <td>{ score.multiplier }x</td>
                <td>{ winOrLoseIcon(score.won) }</td>
                <td className={score.won ? "td-profit" : "td-loss"}>{ profitOrLossCalculator(score) } TC</td>
              </tr>)}
            </tbody>

        ): <h3 className="message-no-game">No game found</h3>}
        
      </table>
    </section>
  )
}

export default Leaderboard;
