import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  betValue: number;
  multiplier: number;
}

function GameControl() {
  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues } = useForm<Inputs>({
    defaultValues: {
      betValue: 0,
      multiplier: 1,
    }
  });

  const doubleBetValue = ():void => {
    const betValue = getValues('betValue');
    setValue('betValue', (betValue * 2))
  }

  const halveBetValue = ():void => {
    const betValue = getValues('betValue');
    setValue('betValue', Math.floor(betValue / 2))
  }

  console.log(getValues('betValue'))
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="number" {...register("betValue", { required: true })} />
      <button type="button" onClick={ doubleBetValue }>2X</button>
      <button type="button" onClick={ halveBetValue }>1/2</button>
      { errors.betValue && <span>This field is required</span>}
      <input type="number" {...register("multiplier", { required: true })} />
      { errors.multiplier && <span>This field is required</span>}
      
      <button type="submit">BET</button>
    </form>
  );
}

export default GameControl;
