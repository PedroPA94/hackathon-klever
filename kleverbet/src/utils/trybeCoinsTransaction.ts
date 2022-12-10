const buyTrybeCoins = (trybeCoins: number) => {
  const trybeCoinsWallet = localStorage.getItem('trybecoins');
  if (!trybeCoinsWallet) {
    localStorage.setItem('trybecoins', JSON.stringify(trybeCoins));
  } else {
    const newValue = JSON.parse(trybeCoinsWallet) + trybeCoins;
    localStorage.setItem('trybecoins', JSON.stringify(newValue));
  }
}

export { buyTrybeCoins }
