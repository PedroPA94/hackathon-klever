import { web, IProvider } from '@klever/sdk'
import { useState } from 'react';
import useWalletBalance from '../../hooks/useWalletBalance';
import './Login.css'
import { ImSpinner2 } from 'react-icons/im'
import KlvIcon from '../../assets/klv_icon.avif'
import TrybeCoins from '../TrybeCoins';

interface LoginProps {
  setIsLoggedIn(args: boolean): void;
}

const testNetProvider: IProvider = {
  node: 'https://node.testnet.klever.finance',
  api: 'https://api.testnet.klever.finance',
};

const Login = ({ setIsLoggedIn }: LoginProps): React.ReactElement => {
  const [containerDisplay, setContainerDisplay] = useState(false);
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

    setAddress(address);
    setIsLoggedIn(true);
  }

  if (isLoading || isRefetching) return <ImSpinner2 className='spinner' />

  return (
    <div className='login-container'>
      {
        walletBalance !== undefined
        ? <div className='balances_info wallet-info{ data: balance, isLoading }'>
            <div className='trybecoins_box'>
              <TrybeCoins containerDisplay={containerDisplay} setContainerDisplay={setContainerDisplay}/>
              <span onClick={ () => setContainerDisplay(true) } >Buy TrybeCoins</span>
            </div>
            <div>
              <img src={KlvIcon} alt='klv icon' className='klv-icon'/> KLV Balance: {walletBalance.toFixed()}
            </div>
          </div>
        : <button type='button' onClick={connectWithKleverExtension} className='login-button'>Login</button>
      }
    </div>
  )
}

export default Login;