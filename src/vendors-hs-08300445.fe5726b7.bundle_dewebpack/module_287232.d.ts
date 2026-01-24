/**
 * Subscription module for managing nested subscriptions in a store
 * Provides a pub/sub mechanism with support for batched notifications
 */

import { getBatch } from './batch-utils';

/**
 * Listener node in the subscription linked list
 */
interface ListenerNode {
  /** Callback function to invoke on state change */
  callback: () => void;
  /** Next listener in the chain */
  next: ListenerNode | null;
  /** Previous listener in the chain */
  prev: ListenerNode | null;
}

/**
 * Listener collection managing subscription callbacks
 */
interface ListenerCollection {
  /** Clear all listeners */
  clear(): void;
  /** Notify all subscribed listeners (batched) */
  notify(): void;
  /** Get array of all listener nodes */
  get(): ListenerNode[];
  /** Subscribe a callback and return unsubscribe function */
  subscribe(callback: () => void): () => void;
}

/**
 * Store or parent subscription interface
 */
interface Store {
  /** Subscribe to store changes */
  subscribe(listener: () => void): () => void;
}

/**
 * Parent subscription interface for nested subscriptions
 */
interface ParentSubscription {
  /** Add a nested subscription listener */
  addNestedSub(listener: () => void): () => void;
}

/**
 * Subscription object managing listeners and nested subscriptions
 */
export interface Subscription {
  /** Add a nested subscription */
  addNestedSub(listener: () => void): () => void;
  /** Notify all nested subscriptions */
  notifyNestedSubs(): void;
  /** Wrapper for handling state changes */
  handleChangeWrapper(): void;
  /** Check if currently subscribed to parent */
  isSubscribed(): boolean;
  /** Attempt to subscribe to parent store/subscription */
  trySubscribe(): void;
  /** Attempt to unsubscribe from parent */
  tryUnsubscribe(): void;
  /** Get the current listener collection */
  getListeners(): ListenerCollection;
  /** Optional state change callback */
  onStateChange?(): void;
}

/**
 * Null listener collection (no-op implementation)
 */
const NULL_LISTENERS: ListenerCollection = {
  notify(): void {},
  get(): ListenerNode[] {
    return [];
  },
  clear(): void {},
  subscribe(): () => void {
    return () => {};
  }
};

/**
 * Creates a subscription object for managing store listeners
 * Supports nested subscriptions and batched notifications
 * 
 * @param store - The Redux store or similar state container
 * @param parentSubscription - Optional parent subscription for nesting
 * @returns Subscription object with listener management methods
 */
export function createSubscription(
  store: Store,
  parentSubscription?: ParentSubscription
): Subscription {
  let unsubscribe: (() => void) | undefined;
  let listeners: ListenerCollection = NULL_LISTENERS;

  /**
   * Handle state changes from parent store/subscription
   */
  function handleChangeWrapper(): void {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }

  /**
   * Subscribe to the parent store or subscription
   */
  function trySubscribe(): void {
    if (unsubscribe) {
      return;
    }

    unsubscribe = parentSubscription
      ? parentSubscription.addNestedSub(handleChangeWrapper)
      : store.subscribe(handleChangeWrapper);

    const batch = getBatch();
    let first: ListenerNode | null = null;
    let last: ListenerNode | null = null;

    listeners = {
      clear(): void {
        first = null;
        last = null;
      },

      notify(): void {
        batch(() => {
          let current = first;
          while (current) {
            current.callback();
            current = current.next;
          }
        });
      },

      get(): ListenerNode[] {
        const nodes: ListenerNode[] = [];
        let current = first;
        while (current) {
          nodes.push(current);
          current = current.next;
        }
        return nodes;
      },

      subscribe(callback: () => void): () => void {
        let isSubscribed = true;

        const node: ListenerNode = {
          callback,
          next: null,
          prev: last
        };

        if (node.prev) {
          node.prev.next = node;
        } else {
          first = node;
        }
        last = node;

        return function unsubscribeListener(): void {
          if (!isSubscribed || first === null) {
            return;
          }

          isSubscribed = false;

          if (node.next) {
            node.next.prev = node.prev;
          } else {
            last = node.prev;
          }

          if (node.prev) {
            node.prev.next = node.next;
          } else {
            first = node.next;
          }
        };
      }
    };
  }

  /**
   * Unsubscribe from parent and reset listeners
   */
  function tryUnsubscribe(): void {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = undefined;
      listeners.clear();
      listeners = NULL_LISTENERS;
    }
  }

  const subscription: Subscription = {
    addNestedSub(listener: () => void): () => void {
      trySubscribe();
      return listeners.subscribe(listener);
    },

    notifyNestedSubs(): void {
      listeners.notify();
    },

    handleChangeWrapper,

    isSubscribed(): boolean {
      return Boolean(unsubscribe);
    },

    trySubscribe,

    tryUnsubscribe,

    getListeners(): ListenerCollection {
      return listeners;
    }
  };

  return subscription;
}