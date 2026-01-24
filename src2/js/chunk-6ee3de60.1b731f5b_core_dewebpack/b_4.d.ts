/**
 * Delay notification emissions from the source observable.
 * @module DelayNotification
 */

import { Subscriber } from 'rxjs';
import { Notification } from 'rxjs/internal/Notification';
import { SchedulerLike, SchedulerAction } from 'rxjs/internal/types';
import { MonoTypeOperatorFunction } from 'rxjs/internal/types';

/**
 * Delays the emission of items from the source Observable by a given timeout or until a given Date.
 * 
 * @template T - The type of items emitted by the source Observable
 * @param scheduler - The scheduler to use for managing the timers that handle the delay
 * @param delay - The delay duration in milliseconds (or the time shift)
 * @returns A function that returns an Observable that delays the emissions of the source Observable
 * 
 * @example
 *