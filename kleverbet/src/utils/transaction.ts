import { TransactionType, web } from '@klever/sdk';

const kleverAccount = 'klv1535lpqr2jgde4sxtzn6727dfpcly5jpwkygllefl08h978udqwusc8acrf';

const send = async (amount: number): Promise<void> => {
  if (!window.kleverWeb) {
    alert('KleverWeb is not installed');
    return
  }

  const tx = await web.buildTransaction([
    {
      type: TransactionType.Transfer,
      payload: {
        receiver: kleverAccount,
        amount: amount * 1_000_000,
        asset: 'KLV',
      },
    },
  ]);

  await web.signTransaction(tx);
  await web.broadcastTransactions([tx]);
};

export { send };
