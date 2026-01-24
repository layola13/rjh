/**
 * RxJS scheduling utility for arrays
 * Schedules emission of array elements using a provided scheduler
 */

import { Observable } from 'rxjs';
import { SchedulerLike } from 'rxjs';

/**
 * Creates an Observable that emits each element of an array on a specified scheduler
 * 
 * @template T - The type of elements in the array
 * @param array - The array of elements to emit
 * @param scheduler - The scheduler to use for scheduling emissions
 * @returns An Observable that emits each array element sequentially
 * 
 * @example
 *