import { useContext } from 'react';
import { ReactReduxContext } from './ReactReduxContext';

export function useReduxContext() {
  return useContext(ReactReduxContext);
}