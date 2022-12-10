import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import GameControl from './components/GameControl/GameControl'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <GameControl />
    </div>
  )
}

export default App
