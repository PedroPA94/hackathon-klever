import Header from './components/Header';
import './App.css';
import GameContainer from './components/GameContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <GameContainer />
      <ToastContainer />
    </div>
  )
}

export default App;
