/**
 * BehaviorSubject - A Subject that requires an initial value and emits its current value whenever subscribed.
 * 
 * BehaviorSubject is a variant of Subject that requires an initial value and emits the current value
 * to new subscribers. It stores the latest value emitted to its consumers, and whenever a new 
 * Observer subscribes, it will immediately receive the "current value" from the BehaviorSubject.
 * 
 * @module BehaviorSubject
 * @exports BehaviorSubject
 */

import { Subject } from './Subject';
import { ObjectUnsubscribedError } from './errors/ObjectUnsubscribedError';
import { Observer } from './types';
import { Subscription } from './Subscription';

/**
 * A variant of Subject that requires an initial value and emits its current value to new subscribers.
 * 
 * @template T The type of values emitted by the BehaviorSubject
 * 
 * @example
 *