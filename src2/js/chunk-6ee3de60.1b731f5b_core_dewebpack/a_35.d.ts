/**
 * RxJS mergeMap operator implementation
 * Provides functionality to project each source value to an Observable which is merged in the output Observable
 */

import { Observable, ObservableInput, OperatorFunction, Subscriber, Subscription } from 'rxjs';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { subscribeToResult } from 'rxjs/internal/util/subscribeToResult';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Projects each source value to an Observable which is merged in the output Observable.
 * 
 * @template T - The type of the source Observable values
 * @template R - The type of the result Observable values
 * @param project - A function that projects source values to Observables or values to be converted to Observables
 * @param concurrent - Maximum number of input Observables being subscribed to concurrently. Default is positive infinity
 * @returns An OperatorFunction that merges projected Observables
 * 
 * @example
 *