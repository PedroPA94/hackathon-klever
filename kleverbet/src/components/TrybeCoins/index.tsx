import { useState } from "react";
import { useQueryClient } from "react-query";
import {send} from "../../utils/transaction";

const TrybeCoins = () => {
  const [klv, setKlv] = useState(0);
  const queryClient = useQueryClient();

  const convertKlvToTrybeCoins = (amount: number): number => {
    const trybeCoins = amount * 100;
    return trybeCoins;
  }

  const handleClick = async () => {
    await send(klv);
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
