/**
 * RxJS dematerialize operator
 * 
 * Converts an Observable of Notification objects into the emissions they represent.
 * 
 * @module operators/dematerialize
 */

import { observeNotification } from './observeNotification';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import type { Observable, Notification, OperatorFunction } from './types';

/**
 * Dematerializes an Observable of Notification objects.
 * 
 * Converts an Observable of Notification objects (which represent next, error, 
 * and complete events) back into their actual emission representations.
 * 
 * @template T The value type of the notifications
 * @returns An operator function that takes an Observable of Notifications and 
 *          returns an Observable of their dematerialized values
 * 
 * @example
 *