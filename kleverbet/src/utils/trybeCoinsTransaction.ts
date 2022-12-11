const getTrybeCoins = () => {
  const trybeCoinsWallet = localStorage.getItem('trybecoins');
  if (!trybeCoinsWallet) {
    localStorage.setItem('trybecoins', '0');
    return 0;
  } else {
    return Number(trybeCoinsWallet);
  }
}

const addTrybeCoins = (trybeCoins: number) => {
  const trybeCoinsStorage = getTrybeCoins();
  const newValue = JSON.stringify(trybeCoinsStorage + trybeCoins);
  localStorage.setItem('trybecoins', newValue);
}

const removeTrybeCoins = (trybeCoins: number) => {
  const trybeCoinsStorage = getTrybeCoins();
  const newValue = JSON.stringify(trybeCoinsStorage - trybeCoins);
  localStorage.setItem('trybecoins', newValue);
}

export { getTrybeCoins, addTrybeCoins, removeTrybeCoins }
