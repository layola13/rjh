import { Subscription } from './Subscription';

export class Action extends Subscription {
  constructor(scheduler: unknown, work: unknown) {
    super();
  }

  schedule(state?: unknown, delay: number = 0): this {
    return this;
  }
}