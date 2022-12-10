import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  betValue: number;
}

const GameControl = () => {
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
  
  const onSubmit: SubmitHandler<Inputs> = (data) => localStorage.setItem('user', JSON.stringify(data));

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <span>0.00</span>
      <input type="text" { ...register("betValue", { required: true }) } />
      { errors.betValue && <span>This field is required!</span> }
      <button type="button" onClick={ doubleBetValue }>2X</button>
      <button type="button" onClick={ halveBetValue }>1/2</button>
      <button type="submit" disabled={ !isValid } >BET</button>
    </form>
  );
}

export default GameControl;
