import { useQuery } from 'react-query'

const fetchWalletBalance = async (walletAddress: string | undefined): Promise<number> => {
  const response = await fetch(`https://api.testnet.klever.finance/address/${walletAddress}`);
  const result = await response.json();
  return result.data.account.balance;
}

const useWalletBalance = (walletAddress: string | undefined): (number | undefined)[] => {
  const { data: balance } = useQuery('balance', () => fetchWalletBalance(walletAddress), 
    {
       enabled: !!walletAddress,
       select: (data) => data / 1000000
    })
  return [ balance ]
}

export default useWalletBalance;