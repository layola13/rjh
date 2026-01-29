import { useState, useEffect } from 'react';
import eventStore from './eventStore';

interface EventState {
  [key: string]: unknown;
}

type UnsubscribeFunction = () => void;

/**
 * Custom hook that subscribes to event store updates
 * @returns The current event state
 */
const useEventSubscription = (): EventState => {
  const [state, setState] = useState<EventState>({});

  useEffect(() => {
    const unsubscribe: UnsubscribeFunction = eventStore.subscribe((newState: EventState) => {
      setState(newState);
    });

    return () => {
      eventStore.unsubscribe(unsubscribe);
    };
  }, []);

  return state;
};

export default useEventSubscription;