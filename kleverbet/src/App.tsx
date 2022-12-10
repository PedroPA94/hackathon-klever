import Header from './components/Header';
import './App.css';
import TrybeCoins from './components/TrybeCoins';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard/Leaderboard';
import GameContainer from './components/GameContainer';


const App = () => {
  return (
    <div className="App">
      <Header />
      <GameContainer />
      <Login />
      <TrybeCoins containerDisplay={true} />
      <Leaderboard />
    </div>
  )
}

export default App;
