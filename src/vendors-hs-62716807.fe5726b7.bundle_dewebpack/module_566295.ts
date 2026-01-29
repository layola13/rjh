import { useState, useEffect } from 'react';
import EventEmitter from './EventEmitter';

interface State {
  [key: string]: unknown;
}

type UnsubscribeFunction = () => void;

export default function useSubscription(): State {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    const subscriptionId = EventEmitter.subscribe((newState: State) => {
      setState(newState);
    });

    return (): void => {
      EventEmitter.unsubscribe(subscriptionId);
    };
  }, []);

  return state;
}