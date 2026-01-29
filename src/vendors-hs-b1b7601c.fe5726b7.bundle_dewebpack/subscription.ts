export interface TeardownLogic {
  (): void;
}

export interface Unsubscribable {
  unsubscribe(): void;
}

export type TeardownItem = Unsubscribable | TeardownLogic | void;

export class Subscription implements Unsubscribable {
  public static readonly EMPTY: Subscription = (() => {
    const empty = new Subscription();
    empty.closed = true;
    return empty;
  })();

  public closed: boolean = false;
  
  private _parentage: Subscription | Subscription[] | null = null;
  private _finalizers: TeardownItem[] | null = null;

  constructor(private initialTeardown?: TeardownLogic) {}

  public unsubscribe(): void {
    if (this.closed) {
      return;
    }

    this.closed = true;

    const parentage = this._parentage;
    if (parentage) {
      this._parentage = null;
      if (Array.isArray(parentage)) {
        for (const parent of parentage) {
          parent.remove(this);
        }
      } else {
        parentage.remove(this);
      }
    }

    const initialTeardown = this.initialTeardown;
    let errors: unknown[] | undefined;

    if (isFunction(initialTeardown)) {
      try {
        initialTeardown();
      } catch (error) {
        errors = error instanceof UnsubscriptionError ? error.errors : [error];
      }
    }

    const finalizers = this._finalizers;
    if (finalizers) {
      this._finalizers = null;
      for (const finalizer of finalizers) {
        try {
          executeFinalizer(finalizer);
        } catch (error) {
          errors = errors ?? [];
          if (error instanceof UnsubscriptionError) {
            errors = [...errors, ...error.errors];
          } else {
            errors.push(error);
          }
        }
      }
    }

    if (errors) {
      throw new UnsubscriptionError(errors);
    }
  }

  public add(teardown: TeardownItem): void {
    if (teardown && teardown !== this) {
      if (this.closed) {
        executeFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        this._finalizers = this._finalizers ?? [];
        this._finalizers.push(teardown);
      }
    }
  }

  private _hasParent(parent: Subscription): boolean {
    const parentage = this._parentage;
    return parentage === parent || (Array.isArray(parentage) && parentage.includes(parent));
  }

  private _addParent(parent: Subscription): void {
    const parentage = this._parentage;
    this._parentage = Array.isArray(parentage) 
      ? (parentage.push(parent), parentage)
      : parentage 
        ? [parentage, parent] 
        : parent;
  }

  private _removeParent(parent: Subscription): void {
    const parentage = this._parentage;
    if (parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(parentage)) {
      arrRemove(parentage, parent);
    }
  }

  public remove(teardown: TeardownItem): void {
    const finalizers = this._finalizers;
    if (finalizers) {
      arrRemove(finalizers, teardown);
    }
    if (teardown instanceof Subscription) {
      teardown._removeParent(this);
    }
  }
}

export const EMPTY_SUBSCRIPTION = Subscription.EMPTY;

export function isSubscription(value: unknown): value is Subscription {
  return (
    value instanceof Subscription ||
    (value != null &&
      typeof value === 'object' &&
      'closed' in value &&
      isFunction((value as any).remove) &&
      isFunction((value as any).add) &&
      isFunction((value as any).unsubscribe))
  );
}

function executeFinalizer(finalizer: TeardownItem): void {
  if (isFunction(finalizer)) {
    finalizer();
  } else if (finalizer) {
    finalizer.unsubscribe();
  }
}

function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

function arrRemove<T>(array: T[], item: T): void {
  const index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

export class UnsubscriptionError extends Error {
  constructor(public readonly errors: unknown[]) {
    super(
      `${errors.length} errors occurred during unsubscription:\n${errors
        .map((err, index) => `${index + 1}) ${err}`)
        .join('\n')}`
    );
    this.name = 'UnsubscriptionError';
  }
}