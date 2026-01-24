/**
 * Creates an Observable that immediately emits an error notification.
 * 
 * This function creates an Observable that does not emit any items but
 * immediately emits an error notification to the subscriber.
 * 
 * @template T - The type of the Observable (never emits, so type is irrelevant)
 * @param error - The error object to emit
 * @param scheduler - Optional scheduler to schedule the error emission
 * @returns An Observable that emits an error notification
 * 
 * @example
 *