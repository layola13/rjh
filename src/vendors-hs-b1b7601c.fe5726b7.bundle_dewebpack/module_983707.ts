import { innerFrom } from './innerFrom';
import { Observable } from './Observable';
import { mergeMap } from './operators/mergeMap';
import { isArrayLike } from './util/isArrayLike';
import { isFunction } from './util/isFunction';
import { mapOneOrManyArgs } from './operators/mapOneOrManyArgs';

type EventTargetLike<EventType extends string> = {
  addEventListener(
    eventName: EventType,
    handler: (event: any) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    eventName: EventType,
    handler: (event: any) => void,
    options?: boolean | EventListenerOptions
  ): void;
};

type NodeStyleEventEmitter<EventType extends string> = {
  addListener(eventName: EventType, handler: (...args: any[]) => void): void;
  removeListener(eventName: EventType, handler: (...args: any[]) => void): void;
};

type NodeEventEmitter<EventType extends string> = {
  on(eventName: EventType, handler: (...args: any[]) => void): void;
  off(eventName: EventType, handler: (...args: any[]) => void): void;
};

type EventTarget<EventType extends string> =
  | EventTargetLike<EventType>
  | NodeStyleEventEmitter<EventType>
  | NodeEventEmitter<EventType>
  | ArrayLike<EventTarget<EventType>>;

const ADD_LISTENER_METHODS = ['addListener', 'removeListener'] as const;
const ADD_EVENT_LISTENER_METHODS = ['addEventListener', 'removeEventListener'] as const;
const ON_OFF_METHODS = ['on', 'off'] as const;

function createMethodBinder<T extends string>(
  target: any,
  eventName: T
): [(handler: (...args: any[]) => void) => void, (handler: (...args: any[]) => void) => void] {
  return [
    (handler: (...args: any[]) => void) => target[0](eventName, handler),
    (handler: (...args: any[]) => void) => target[1](eventName, handler)
  ];
}

function isEventTargetLike<T extends string>(target: any): target is EventTargetLike<T> {
  return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}

function isNodeStyleEventEmitter<T extends string>(target: any): target is NodeStyleEventEmitter<T> {
  return isFunction(target.addListener) && isFunction(target.removeListener);
}

function isNodeEventEmitter<T extends string>(target: any): target is NodeEventEmitter<T> {
  return isFunction(target.on) && isFunction(target.off);
}

export function fromEvent<T extends string>(
  target: EventTarget<T>,
  eventName: T,
  options?: boolean | AddEventListenerOptions
): Observable<any>;

export function fromEvent<T extends string, R>(
  target: EventTarget<T>,
  eventName: T,
  options: boolean | AddEventListenerOptions | undefined,
  resultSelector: (...args: any[]) => R
): Observable<R>;

export function fromEvent<T extends string, R>(
  target: EventTarget<T>,
  eventName: T,
  optionsOrResultSelector?: boolean | AddEventListenerOptions | ((...args: any[]) => R),
  resultSelector?: (...args: any[]) => R
): Observable<any> {
  if (isFunction(optionsOrResultSelector)) {
    resultSelector = optionsOrResultSelector;
    optionsOrResultSelector = undefined;
  }

  if (resultSelector) {
    return fromEvent(target, eventName, optionsOrResultSelector as boolean | AddEventListenerOptions | undefined).pipe(
      mapOneOrManyArgs(resultSelector)
    );
  }

  const [add, remove] = getAddRemoveMethods<T>(target, eventName, optionsOrResultSelector);

  if (!add && isArrayLike(target)) {
    return mergeMap((subTarget: EventTarget<T>) =>
      fromEvent(subTarget, eventName, optionsOrResultSelector as boolean | AddEventListenerOptions | undefined)
    )(innerFrom(target));
  }

  if (!add) {
    throw new TypeError('Invalid event target');
  }

  return new Observable((observer) => {
    const handler = (...args: any[]) => {
      observer.next(args.length > 1 ? args : args[0]);
    };

    add(handler);

    return () => {
      remove(handler);
    };
  });
}

function getAddRemoveMethods<T extends string>(
  target: EventTarget<T>,
  eventName: T,
  options?: boolean | AddEventListenerOptions
): [(handler: (...args: any[]) => void) => void, (handler: (...args: any[]) => void) => void] {
  if (isEventTargetLike(target)) {
    return [
      (handler) => target.addEventListener(eventName, handler, options),
      (handler) => target.removeEventListener(eventName, handler, options)
    ];
  }

  if (isNodeStyleEventEmitter(target)) {
    return [
      (handler) => target.addListener(eventName, handler),
      (handler) => target.removeListener(eventName, handler)
    ];
  }

  if (isNodeEventEmitter(target)) {
    return [
      (handler) => target.on(eventName, handler),
      (handler) => target.off(eventName, handler)
    ];
  }

  return [null as any, null as any];
}