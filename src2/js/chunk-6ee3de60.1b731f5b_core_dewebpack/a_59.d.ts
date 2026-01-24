/**
 * Checks if a subscriber chain is still active and able to receive values.
 * Traverses up the subscriber hierarchy to verify none are closed or stopped.
 * 
 * @module SubscriberUtils
 */

import { Subscriber } from './Subscriber';

/**
 * Subscriber state interface representing the internal properties
 * needed to determine if a subscriber is active.
 */
interface SubscriberState {
  /** Whether the subscriber has been closed */
  closed: boolean;
  /** Whether the subscriber has stopped receiving notifications */
  isStopped: boolean;
  /** The destination subscriber in the chain, if any */
  destination?: Subscriber<unknown> | null;
}

/**
 * Determines if a subscriber is still active by checking if it or any
 * of its parent destinations are closed or stopped.
 * 
 * Traverses the destination chain upward, checking each subscriber's
 * `closed` and `isStopped` flags. Returns false if any subscriber in
 * the chain is closed or stopped, otherwise returns true.
 * 
 * @param subscriber - The subscriber to check for active state
 * @returns True if the subscriber chain is active, false if any subscriber is closed or stopped
 * 
 * @example
 *