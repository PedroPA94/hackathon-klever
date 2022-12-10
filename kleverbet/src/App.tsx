import Header from './components/Header';
import './App.css';
import Leaderboard from './components/Leaderboard/Leaderboard';
import GameContainer from './components/GameContainer';


const App = () => {
  return (
    <div className="App">
      <Header />
      <GameContainer />
      <Leaderboard />
    </div>
  )
}

export default App;
