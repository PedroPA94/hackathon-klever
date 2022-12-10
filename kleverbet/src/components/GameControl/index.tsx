import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { removeTrybeCoins } from '../../utils/trybeCoinsTransaction';
import './index.css'

type Inputs = {
  betValue: number;
}

interface GameControlProps {
  setBetValue(args: number): void;
}

const GameControl = ({ setBetValue }: GameControlProps) => {
  const { register, handleSubmit, formState: { errors, isValid }, setValue, getValues } = useForm<Inputs>({
    defaultValues: {
      betValue: 0,
    },
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
    setBetValue(data.betValue);
    removeTrybeCoins(data.betValue);
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="form-container" >
      <div className='form-container__info-bar'>
        <span>0.00</span>
        <span>{ "Deposit >" }</span>
      </div>
      <div className='buttons-container'>
        <div className="bet-amount-container">
          <input type="text" { ...register("betValue", { required: true }) } className="bet-amount-container__place-bet-amount" />
          { errors.betValue && <span>This field is required</span> }
          <button type="button" onClick={ halveBetValue } className="bet-amount-container__bet-option">1/2</button>
          <button type="button" onClick={ doubleBetValue } className="bet-amount-container__bet-option">2X</button>
        </div>
        <button type="submit" disabled={ !isValid } className="form-container__cta" >BET</button>
      </div>
    </form>
  );
}

export default GameControl;
