import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getTrybeCoins, removeTrybeCoins } from '../../utils/trybeCoinsTransaction';
import Login from '../Login';
import './index.css'

type Inputs = {
  betValue: number;
}

interface GameControlProps {
  setBetValue(args: number): void;
}

const GameControl = ({ setBetValue }: GameControlProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues, setError } = useForm<Inputs>({
    defaultValues: {
      betValue: 0,
    },
    mode: 'onChange'
  });

  const doubleBetValue = ():void => {
    const betValue = getValues('betValue');
    setValue('betValue', (betValue * 2))
  }

  const halveBetValue = ():void => {
    const betValue = getValues('betValue');
    setValue('betValue', Math.floor(betValue / 2))
  }
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setBetValue(Number(data.betValue));
    removeTrybeCoins(data.betValue);
  };
  
  const verifyTrybeCoins = (data: number) => {
    const trybeCoins = getTrybeCoins();
    if (trybeCoins - data <= 0) { toast.error('Insufficient Trybecoins, please make a purchase', { position: 'top-center' }) }
    return (trybeCoins - data) >= 0
  }
  console.log(errors);
  return (
    <div className='game_control__container'>
      <div className='form-container__info-bar'>
        <Login setIsLoggedIn={ setIsLoggedIn } /> 
        <span className='form-container__trybecoins'>
        </span>
      </div>
      <form onSubmit={ handleSubmit(onSubmit) } className="form-container" >
        { errors.betValue && <span className='form-validation'>{ `${errors.betValue.message}` }</span> }
        <div className='buttons-container'>
          <div className="bet-amount-container">
            <input type="text" { ...register("betValue", { required: 'Put a bet amount', validate: { hasBalance: (data) => verifyTrybeCoins(data) } }) } className="bet-amount-container__place-bet-amount" />
            <button type="button" onClick={ halveBetValue } className="bet-amount-container__bet-option">1/2</button>
            <button type="button" onClick={ doubleBetValue } className="bet-amount-container__bet-option">2X</button>
          </div>
          <button type="submit" disabled={ !isLoggedIn || !isValid } className="form-container__cta" >BET</button>
        </div>
      </form>
    </div>
  );
}

export default GameControl;
