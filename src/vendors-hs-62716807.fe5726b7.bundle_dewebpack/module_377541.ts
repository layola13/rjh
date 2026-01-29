import { useRef } from 'react';
import useForceUpdate from './useForceUpdate';

type GetState<T> = () => T;
type SetState<T> = (value: T) => void;

/**
 * Returns a stateful value stored in a ref and a function to update it.
 * Unlike useState, updating the value will trigger a re-render but the value
 * is stored in a ref, making it accessible in closures without stale values.
 * 
 * @param initialValue - The initial state value
 * @returns A tuple containing a getter function and a setter function
 */
export default function useRefState<T>(initialValue: T): [GetState<T>, SetState<T>] {
  const stateRef = useRef<T>(initialValue);
  const forceUpdate = useForceUpdate();

  const getState: GetState<T> = () => {
    return stateRef.current;
  };

  const setState: SetState<T> = (value: T) => {
    stateRef.current = value;
    forceUpdate();
  };

  return [getState, setState];
}