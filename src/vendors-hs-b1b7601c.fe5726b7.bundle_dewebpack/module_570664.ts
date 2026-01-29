import { Subscription, SchedulerLike, SchedulerAction } from 'rxjs';

/**
 * Executes a scheduled action with optional recursion
 * @param subscription - The subscription to add the scheduled action to
 * @param scheduler - The scheduler to use for scheduling the action
 * @param work - The work function to execute
 * @param delay - The delay in milliseconds before executing the action
 * @param recursive - Whether to recursively schedule the action
 * @returns The scheduled action subscription, or undefined if recursive
 */
export function executeSchedule(
  subscription: Subscription,
  scheduler: SchedulerLike,
  work: () => void,
  delay: number = 0,
  recursive: boolean = false
): Subscription | undefined {
  const scheduledAction = scheduler.schedule(function(this: SchedulerAction<unknown>) {
    work();
    
    if (recursive) {
      subscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);

  subscription.add(scheduledAction);

  if (!recursive) {
    return scheduledAction;
  }
  
  return undefined;
}