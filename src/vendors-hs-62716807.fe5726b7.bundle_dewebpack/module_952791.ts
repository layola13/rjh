import { useReducer } from 'react';

/**
 * Custom hook that returns a function to force component re-render
 * @returns A function that when called, forces the component to re-render
 */
export default function useForceUpdate(): () => void {
  const [, forceUpdate] = useReducer((count: number): number => count + 1, 0);
  return forceUpdate;
}