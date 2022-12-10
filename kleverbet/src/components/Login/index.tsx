import { web, IProvider } from '@klever/sdk'
import { useState } from 'react';
import useWalletBalance from '../../hooks/useWalletBalance';

const testNetProvider: IProvider = {
  node: 'https://node.testnet.klever.finance',
  api: 'https://api.testnet.klever.finance',
};

export default function Login () {
  const [address, setAddress] = useState<undefined | string>(undefined)
  const [ walletBalance ] = useWalletBalance(address)

  const connectWithKleverExtension = async () => {
    if (!window.kleverWeb) {
      alert('KleverWeb is not installed');
      return
    }

    web.setProvider(testNetProvider);
    await web.initialize();
    const address = web.getWalletAddress();

    setAddress(address)
  }

  return (
    <>
      {
        walletBalance !== undefined
        ? <p>{walletBalance} KLV</p>
        : <button onClick={connectWithKleverExtension}>Login</button>
      }
    </>
  )
}