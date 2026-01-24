/**
 * RxJS Subject and AnonymousSubject Type Definitions
 * This module provides reactive programming primitives for multicasting observables
 */

import { Observable } from './Observable';
import { Subscriber } from './Subscriber';
import { Subscription } from './Subscription';
import { Observer, PartialObserver } from './Observer';
import { SubscriptionLike } from './types';

/**
 * Subject is a special type of Observable that allows values to be multicasted to many Observers.
 * Subjects are like EventEmitters: they maintain a registry of many listeners.
 * 
 * @template T The type of values emitted by the Subject
 * 
 * @example
 *