interface Listener {
  callback: () => void;
  next: Listener | null;
  prev: Listener | null;
}

interface ListenerCollection {
  clear: () => void;
  notify: () => void;
  get: () => Listener[];
  subscribe: (callback: () => void) => () => void;
}

interface Subscription {
  addNestedSub: (callback: () => void) => () => void;
  notifyNestedSubs: () => void;
  handleChangeWrapper: () => void;
  isSubscribed: () => boolean;
  trySubscribe: () => void;
  tryUnsubscribe: () => void;
  getListeners: () => ListenerCollection;
  onStateChange?: () => void;
}

interface Store {
  subscribe: (listener: () => void) => () => void;
}

interface ParentSubscription {
  addNestedSub: (callback: () => void) => () => void;
}

import { getBatch } from './batch-utils';

const NULL_LISTENERS: ListenerCollection = {
  notify: () => {},
  get: () => []
};

export function createSubscription(
  store: Store,
  parentSub?: ParentSubscription
): Subscription {
  let unsubscribe: (() => void) | undefined;
  let listeners: ListenerCollection = NULL_LISTENERS;

  function handleChangeWrapper(): void {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }

  function trySubscribe(): void {
    if (!unsubscribe) {
      unsubscribe = parentSub
        ? parentSub.addNestedSub(handleChangeWrapper)
        : store.subscribe(handleChangeWrapper);

      const batch = getBatch();
      let first: Listener | null = null;
      let last: Listener | null = null;

      listeners = {
        clear: () => {
          first = null;
          last = null;
        },

        notify: () => {
          batch(() => {
            let listener = first;
            while (listener) {
              listener.callback();
              listener = listener.next;
            }
          });
        },

        get: () => {
          const result: Listener[] = [];
          let listener = first;
          while (listener) {
            result.push(listener);
            listener = listener.next;
          }
          return result;
        },

        subscribe: (callback: () => void) => {
          let isSubscribed = true;
          const listener: Listener = {
            callback,
            next: null,
            prev: last
          };

          last = listener;

          if (listener.prev) {
            listener.prev.next = listener;
          } else {
            first = listener;
          }

          return () => {
            if (!isSubscribed || first === null) {
              return;
            }

            isSubscribed = false;

            if (listener.next) {
              listener.next.prev = listener.prev;
            } else {
              last = listener.prev;
            }

            if (listener.prev) {
              listener.prev.next = listener.next;
            } else {
              first = listener.next;
            }
          };
        }
      };
    }
  }

  const subscription: Subscription = {
    addNestedSub: (callback: () => void) => {
      trySubscribe();
      return listeners.subscribe(callback);
    },

    notifyNestedSubs: () => {
      listeners.notify();
    },

    handleChangeWrapper,

    isSubscribed: () => {
      return Boolean(unsubscribe);
    },

    trySubscribe,

    tryUnsubscribe: () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = undefined;
        listeners.clear();
        listeners = NULL_LISTENERS;
      }
    },

    getListeners: () => {
      return listeners;
    }
  };

  return subscription;
}