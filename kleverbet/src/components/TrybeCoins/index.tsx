import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { sendToKleverTransaction } from "../../utils/transaction";
import * as trybeCoinsTransaction from "../../utils/trybeCoinsTransaction";
import { BiTransferAlt } from 'react-icons/bi'
import "./TrybeCoins.css";

interface TrybeCoinsProps {
  containerDisplay: boolean,
  setContainerDisplay: Function,
  setUpdateTrybeCoins: Function, 
}

const TrybeCoins = ({ containerDisplay, setContainerDisplay, setUpdateTrybeCoins }: TrybeCoinsProps) => {
  const [klv, setKlv] = useState(0); // klevercoins
  const queryClient = useQueryClient();

  const convertKlvToTrybeCoins = (amount: number): number => {
    const trybeCoins = amount * 100;
    return trybeCoins;
  }

  const handleClick = async () => {
    await sendToKleverTransaction(klv);
    queryClient.invalidateQueries('balance');
    const trybeCoins = convertKlvToTrybeCoins(klv)
    trybeCoinsTransaction.addTrybeCoins(trybeCoins);
    setUpdateTrybeCoins((prevState:boolean) => !prevState);
  }

  const closePopUp = () => {
    setContainerDisplay(false);
  }

  return (
    <div className={`trybecoins__container__${containerDisplay}`} >
      <div className="trybecoins__transaction_box">
        <div className="trybecoins__transaction_example">
          <span>1x KLV</span>
          <BiTransferAlt />
          <span>100x TrybeCoins</span>
        </div>
        <div className="trybecoins__transaction_values">
          <span>KLV:</span>
          <input type='number' onChange={({target}) => setKlv(Number(target.value))} />
          <BiTransferAlt />
          <span>{ `TrybeCoins: ${convertKlvToTrybeCoins(klv)}` }</span>
        </div>
        <button onClick={handleClick}>Buy TrybeCoins</button>
        <button onClick={closePopUp}>Go Back</button>
      </div>

    </div>
  )
}

export default TrybeCoins;
