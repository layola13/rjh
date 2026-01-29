import { useReducer, useRef } from 'react';

type SetStateAction<S> = S | ((prevState: S) => S);

function useGetState<S>(initialState: S): [() => S, (action: SetStateAction<S>) => void] {
  const [, forceUpdate] = useReducer((count: number) => count + 1, 0);
  
  const stateRef = useRef<S>(initialState);
  
  const getState = (): S => {
    return stateRef.current;
  };
  
  const setState = (action: SetStateAction<S>): void => {
    stateRef.current = typeof action === 'function' 
      ? (action as (prevState: S) => S)(stateRef.current) 
      : action;
    forceUpdate();
  };
  
  return [getState, setState];
}

export default useGetState;