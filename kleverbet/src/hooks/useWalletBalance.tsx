import { useQuery } from 'react-query'

const fetchWalletBalance = async (walletAddress: string | undefined): Promise<number> => {
  const response = await fetch(`https://api.testnet.klever.finance/address/${walletAddress}`);
  const result = await response.json();
  return result.data.account.balance;
}

const useWalletBalance = (walletAddress: string | undefined): (number | undefined | boolean)[] => {
  const { data: balance, isLoading, isRefetching } = useQuery('balance', () => fetchWalletBalance(walletAddress), 
    {
      enabled: !!walletAddress,
      select: (data) => data / 1000000,
      onSuccess: (data) => {
        // Return the updated balance value
        return data / 1000000;
      },
      onError: () => {
        // Return undefined as the balance value in case of an error
        return undefined;
      }
    });
  return [ balance, isLoading, isRefetching ]
}

export default useWalletBalance;