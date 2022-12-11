import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readItem = useCallback(() => {
    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
    return JSON.parse(item);
  }, [initialValue, key]);

  const [value, setValue] = useState<T>(readItem);

  const setItem: SetValue<T> = (item: SetStateAction<T>) => {
    window.localStorage.setItem(key, JSON.stringify(item));
    setValue(item);
  }

  useEffect(() => setValue(readItem()), []);

  return [value, setItem];
};

export default useLocalStorage;
