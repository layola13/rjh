import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs';

/**
 * Creates an observable that immediately emits an error notification.
 * 
 * @template T - The nominal type of the observable (never emits values, only errors)
 * @param errorOrErrorFactory - An error instance or a factory function that returns an error
 * @param scheduler - Optional scheduler to schedule the error emission
 * @returns An Observable that emits an error notification
 * 
 * @example
 *