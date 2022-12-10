import { TransactionType, web } from '@klever/sdk';

const kleverAccount = 'klv1me6c0y874mgxpf6l7pdegthkmrvnw9vsxagdsw8ckthl4uztaj7sv67jaq';

const sendToKleverTransaction = async (amount: number): Promise<void> => {
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

export { sendToKleverTransaction };
