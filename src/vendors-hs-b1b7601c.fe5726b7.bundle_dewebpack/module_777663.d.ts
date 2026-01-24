/**
 * Creates an observable of windows, where each window is emitted when the provided observable emits.
 * The `windowWhen` operator is used to create windows based on a closing selector function.
 * 
 * @module module_777663
 * @original_id 777663
 */

import { Observable, Subject, Subscription, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Type definition for the closing selector function that determines when to close a window.
 * 
 * @returns An ObservableInput that signals when the current window should close
 */
type ClosingSelector = () => ObservableInput<unknown>;

/**
 * Creates windows of values from the source Observable, where each window closes and a new one opens
 * when the Observable returned by the closing selector emits.
 * 
 * @template T - The type of values emitted by the source Observable
 * @param closingSelector - A function that returns an Observable. When this Observable emits, 
 *                          the current window closes and a new window opens.
 * @returns An OperatorFunction that transforms the source Observable into an Observable of windowed Observables
 * 
 * @example
 *