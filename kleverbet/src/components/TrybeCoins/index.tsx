import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { sendToKleverTransaction } from "../../utils/transaction";
import * as trybeCoinsTransaction from "../../utils/trybeCoinsTransaction";

const TrybeCoins = () => {
  const [klv, setKlv] = useState(0);
  const [trybeCoins, setTrybeCoins] = useState(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    trybeCoinsTransaction.addTrybeCoins(trybeCoins);
  }, [trybeCoins])

  const convertKlvToTrybeCoins = (amount: number): number => {
    const trybeCoins = amount * 100;
    return trybeCoins;
  }

  const handleClick = async () => {
    await sendToKleverTransaction(klv);
    setTrybeCoins(convertKlvToTrybeCoins(klv));
    queryClient.invalidateQueries('balance');
  }

  return (
    <div>
      <input type='number' onChange={({target}) => setKlv(Number(target.value))} />
      <span>{ convertKlvToTrybeCoins(klv) }</span>
      <button onClick={handleClick}>Buy TrybeCoins</button>
    </div>
  )
}

export default TrybeCoins;
