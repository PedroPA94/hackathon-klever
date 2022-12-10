import { web, IProvider } from '@klever/sdk'
import { useState } from 'react';
import useWalletBalance from '../../hooks/useWalletBalance';
import './Login.css'
import { ImSpinner2 } from 'react-icons/im'
import KlvIcon from '../../assets/klv_icon.avif'

const testNetProvider: IProvider = {
  node: 'https://node.testnet.klever.finance',
  api: 'https://api.testnet.klever.finance',
};

const Login = (): React.ReactElement => {
  const [address, setAddress] = useState<undefined | string>(undefined)
  const [ walletBalance, isLoading, isRefetching ] = useWalletBalance(address) as [number, boolean, boolean]

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

  if (isLoading || isRefetching) return <ImSpinner2 className='spinner' />

  return (
    <div className='login-button'>
      {
        walletBalance !== undefined
        ? <p className='wallet-info{ data: balance, isLoading }'>
            <img src={KlvIcon} alt='klv icon' className='klv-icon'/> KLV {walletBalance.toFixed()}
          </p>
        : <button onClick={connectWithKleverExtension} className='login-button'>Login</button>
      }
    </div>
  )
}

export default Login;