/**
 * Subscription that manages the relationship between a subject and a subscriber.
 * Automatically removes the subscriber from the subject's observer list when unsubscribed.
 */
export class SubjectSubscription<T> extends Subscription {
  /**
   * The subject this subscription is attached to.
   */
  private subject: Subject<T> | null;

  /**
   * The observer/subscriber instance.
   */
  private subscriber: Observer<T>;

  /**
   * Indicates whether this subscription has been closed.
   */
  public closed: boolean;

  /**
   * Creates a new SubjectSubscription.
   * 
   * @param subject - The subject to subscribe to
   * @param subscriber - The observer that will receive notifications
   */
  constructor(subject: Subject<T>, subscriber: Observer<T>) {
    super();
    this.subject = subject;
    this.subscriber = subscriber;
    this.closed = false;
  }

  /**
   * Unsubscribes the subscriber from the subject.
   * Removes the subscriber from the subject's observers list and cleans up resources.
   */
  public unsubscribe(): void {
    if (this.closed) {
      return;
    }

    this.closed = true;

    const subject = this.subject;
    const observers = subject?.observers;

    this.subject = null;

    if (!observers || observers.length === 0 || subject?.isStopped || subject?.closed) {
      return;
    }

    const subscriberIndex = observers.indexOf(this.subscriber);
    if (subscriberIndex !== -1) {
      observers.splice(subscriberIndex, 1);
    }
  }
}

/**
 * Base subscription class (imported from module 6).
 */
interface Subscription {
  unsubscribe(): void;
  closed: boolean;
}

/**
 * Subject interface representing an observable that can multicast to multiple observers.
 */
interface Subject<T> {
  observers: Observer<T>[];
  isStopped: boolean;
  closed: boolean;
}

/**
 * Observer interface for receiving notifications.
 */
interface Observer<T> {
  next?(value: T): void;
  error?(err: unknown): void;
  complete?(): void;
}