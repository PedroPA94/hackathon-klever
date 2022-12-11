import "./HowToPlay.css";

interface HowToPlayProps {
  containerDisplay: boolean,
  setContainerDisplay: Function,
}

const HowToPlay = ({ containerDisplay, setContainerDisplay }: HowToPlayProps) => {
  return (
    <div className={`how_to_play__container__${containerDisplay}`} >
      <div className="how_to_play__container__box">
        <h3>How To Play</h3>
        <ol className="how_to_play__explanation">
          <li>Login with a <strong>Klever</strong> account</li>
          <li>Buy <strong>TrybeCoins</strong> with KLVs from your Klever Wallet</li>
          <li>Choose the value of your bet</li>
          <li>As soon as you click <strong>'BET'</strong>, the game will start</li>
          <li>The multiplier will go up, the more time you wait, but randomly the game will stop. <strong>If you don't take your bet, you lose a round</strong></li>
          <li>If you stop the game before it stops itself, you win a round.</li>
          <li>TrybeCoins will be added to your balance (value = your bet * multiplier)</li>
        </ol>
        <button onClick={() => setContainerDisplay(false)}>Go Back</button>
      </div>
    </div>
  )
}

export default HowToPlay;
