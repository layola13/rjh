interface BehaviorConfig {
  behavior?: boolean;
  enableConsole?: boolean;
}

interface BehaviorData {
  name?: string;
  message?: string;
  level?: string;
  from?: string;
  to?: string;
  [key: string]: unknown;
}

interface BehaviorEvent {
  type: string;
  data: BehaviorData;
  timestamp: number;
  page?: string;
}

interface TargetElement extends HTMLElement {
  tagName: string;
  id: string;
  className: string;
}

interface UIEvent {
  target?: TargetElement;
  nodeType?: number;
}

interface Utils {
  ext: (target: unknown, source: Record<string, unknown>) => void;
  encode: (str: string) => string;
  warn: (...args: unknown[]) => void;
}

const MAX_BEHAVIOR_EVENTS = 100;
const BEHAVIOR_DEBOUNCE_MS = 0;
const KEYPRESS_THROTTLE_MS = 100;
const MAX_SELECTOR_DEPTH = 5;
const MAX_SELECTOR_LENGTH = 80;
const MAX_NAME_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 200;

const SELECTOR_ATTRIBUTES = ['type', 'name', 'title', 'alt', 'data-arms-attr'];
const CONSOLE_METHODS = ['debug', 'info', 'warn', 'log', 'error', 'assert'];

export default function initializeBehaviorTracking(
  monitorInstance: unknown,
  windowContext?: Window
): void {
  const utils: Utils = require('./utils');

  const behaviorEvents: BehaviorEvent[] = [];
  let monitorRef: MonitorInstance | null = null;
  let previousUrl: string | null = windowContext?.location?.href ?? null;
  let clickTimeoutId = 0;
  let keypressTimeoutId: number | undefined;
  let lastUIEvent: UIEvent | null = null;

  function wrapMethod<T extends (...args: unknown[]) => unknown>(
    target: Record<string, unknown> | null,
    methodName: string,
    wrapper: (original: T) => T
  ): void {
    if (target === null) return;

    const original = target[methodName] as T;
    target[methodName] = wrapper(original);
  }

  function buildElementSelector(element: HTMLElement): string {
    const parts: string[] = [];

    if (!element || typeof element.tagName !== 'string') {
      return '';
    }

    parts.push(element.tagName.toLowerCase());

    if (typeof element.id === 'string') {
      parts.push(`#${element.id}`);
    }

    const className = element.className;
    if (typeof className === 'string') {
      const classes = className.split(/\s+/);
      for (const cls of classes) {
        parts.push(`.${cls}`);
      }
    }

    for (const attrName of SELECTOR_ATTRIBUTES) {
      const attrValue = element.getAttribute(attrName);
      if (typeof attrValue === 'string') {
        parts.push(`[${attrName}="${attrValue}"]`);
      }
    }

    return parts.join('');
  }

  function buildSelectorPath(targetElement: HTMLElement): string {
    if (!targetElement || targetElement.nodeType !== 1) {
      return '';
    }

    let currentNode: HTMLElement | null = targetElement;
    const selectors: string[] = [];
    let depth = 0;
    let totalLength = 0;

    while (
      currentNode &&
      depth++ < MAX_SELECTOR_DEPTH &&
      !(
        buildElementSelector(currentNode) === 'html' ||
        (depth > 1 && totalLength + 3 * selectors.length + buildElementSelector(currentNode).length >= MAX_SELECTOR_LENGTH)
      )
    ) {
      const selector = buildElementSelector(currentNode);
      selectors.push(selector);
      totalLength += selector.length;
      currentNode = currentNode.parentNode as HTMLElement | null;
    }

    return selectors.reverse().join(' > ');
  }

  function createUIEventHandler(
    eventType: string,
    shouldDebounce?: boolean
  ): (event: UIEvent) => void {
    return function handleUIEvent(event: UIEvent): void {
      if (!event || event === lastUIEvent) {
        return;
      }

      lastUIEvent = event;
      let targetElement: TargetElement | string;

      try {
        targetElement = event.target as TargetElement;
      } catch {
        targetElement = '<unknown>';
      }

      if ((targetElement as TargetElement).length === 0) {
        return;
      }

      const behaviorEvent: BehaviorEvent = {
        type: `ui.${eventType}`,
        data: {
          message: buildSelectorPath(targetElement as TargetElement)
        },
        timestamp: Date.now()
      };

      if (eventType === 'click') {
        if (clickTimeoutId) {
          clearTimeout(clickTimeoutId);
        }

        if (shouldDebounce) {
          clickTimeoutId = setTimeout(() => {
            monitorRef?.addBehavior(behaviorEvent);
          }, BEHAVIOR_DEBOUNCE_MS);
        } else {
          monitorRef?.addBehavior(behaviorEvent);
        }
      } else if (eventType === 'keypress') {
        if (!keypressTimeoutId) {
          monitorRef?.addBehavior(behaviorEvent);
        }

        clearTimeout(keypressTimeoutId);
        keypressTimeoutId = setTimeout(() => {
          keypressTimeoutId = undefined;
        }, KEYPRESS_THROTTLE_MS);
      }
    };
  }

  interface MonitorInstance {
    getConfig: (key: string) => unknown;
    addBehavior: (event: BehaviorEvent) => void;
    getBehavior: () => BehaviorEvent[];
    setBehavior: (events: BehaviorEvent[]) => BehaviorEvent[];
    reportBehavior: (callback?: () => void) => void;
    initBehavior: () => MonitorInstance;
    hasInitBehavior?: boolean;
    sendBhTimer?: number;
    behavior: (events: BehaviorEvent[]) => void;
    errorHandler: (errorEvent: ErrorEvent) => void;
  }

  utils.ext((monitorInstance as MonitorInstance).prototype, {
    addBehavior(event: BehaviorEvent): void {
      if (!this.getConfig('behavior') || !event || typeof event !== 'object') {
        return;
      }

      let eventData: BehaviorData = {};
      const rawData: BehaviorData = event.data ?? {};

      if (event.type) {
        eventData = rawData;
      } else {
        if (typeof rawData.name !== 'string' || typeof rawData.message !== 'string') {
          return;
        }
        eventData.name = rawData.name.substr(0, MAX_NAME_LENGTH);
        eventData.message = rawData.message.substr(0, MAX_MESSAGE_LENGTH);
      }

      if (eventData.message) {
        eventData.message = utils.encode(eventData.message);
      }

      const formattedEvent: BehaviorEvent = {
        type: event.type || 'custom',
        data: eventData ?? {},
        timestamp: event.timestamp || Date.now(),
        page: event.page || (windowContext?.location?.pathname ?? '')
      };

      behaviorEvents.push(formattedEvent);
      behaviorEvents.splice(0, behaviorEvents.length - MAX_BEHAVIOR_EVENTS);
    },

    getBehavior(): BehaviorEvent[] {
      return behaviorEvents ?? [];
    },

    setBehavior(events: BehaviorEvent[]): BehaviorEvent[] {
      if (events) {
        behaviorEvents.length = 0;
        behaviorEvents.push(...events);
      }
      return behaviorEvents;
    },

    reportBehavior(callback?: () => void): void {
      const monitor = this as MonitorInstance;

      if (!monitor.getConfig('behavior')) {
        return;
      }

      if (monitor.sendBhTimer) {
        clearTimeout(monitor.sendBhTimer);
        monitor.sendBhTimer = undefined;
      }

      monitor.sendBhTimer = setTimeout(() => {
        if (behaviorEvents && behaviorEvents.length > 0) {
          monitor.behavior(behaviorEvents);
          behaviorEvents.length = 0;
          monitor.sendBhTimer = undefined;

          if (callback && typeof callback === 'function') {
            callback();
          }
        }
      }, BEHAVIOR_DEBOUNCE_MS);
    },

    initBehavior(): MonitorInstance {
      const monitor = this as MonitorInstance;

      if (monitor.hasInitBehavior || monitorRef) {
        return monitor;
      }

      try {
        trackInitialNavigation();
        attachDOMEventListeners();
        interceptHistoryAPI();

        if (monitor.getConfig('enableConsole')) {
          interceptConsoleMethods();
        }
      } catch (error) {
        utils.warn('[arms] error in initBehavior', error);
      }

      monitorRef = monitor;
      monitor.hasInitBehavior = true;

      return monitor;
    }
  });

  function trackInitialNavigation(): void {
    if (!document?.referrer || !document?.location) {
      return;
    }

    const referrer = document.referrer;
    const currentUrl = document.location.href;

    if (referrer === '') {
      return;
    }

    const navigationEvent: BehaviorEvent = {
      type: 'navigation',
      data: {
        from: referrer,
        to: currentUrl
      },
      timestamp: Date.now()
    };

    previousUrl = currentUrl;
    monitorRef?.addBehavior(navigationEvent);
  }

  function attachDOMEventListeners(): void {
    if (!windowContext?.document?.addEventListener) {
      return;
    }

    windowContext.document.addEventListener('click', createUIEventHandler('click'), false);
    windowContext.document.addEventListener('keypress', createUIEventHandler('keypress'), false);
  }

  function interceptHistoryAPI(): void {
    if (!supportsHistoryAPI()) {
      return;
    }

    const recordNavigation = (fromUrl: string, toUrl: string): void => {
      const navigationEvent: BehaviorEvent = {
        type: 'navigation',
        data: {
          from: fromUrl,
          to: toUrl
        },
        timestamp: Date.now()
      };

      monitorRef?.addBehavior(navigationEvent);
      previousUrl = toUrl;
    };

    const originalPopState = windowContext!.onpopstate;
    windowContext!.onpopstate = function (...args: unknown[]): unknown {
      const currentUrl = windowContext!.location.href;
      recordNavigation(previousUrl ?? '', currentUrl);

      if (originalPopState) {
        return originalPopState.apply(this, args);
      }
      return undefined;
    };

    const wrapHistoryMethod = (
      method: (...args: unknown[]) => unknown
    ): ((...args: unknown[]) => unknown) => {
      return function (...args: unknown[]): unknown {
        const newUrl = args.length > 2 ? args[2] : undefined;

        if (newUrl) {
          recordNavigation(previousUrl ?? '', String(newUrl));
        }

        return method.apply(this, args);
      };
    };

    wrapMethod(windowContext!.history as unknown as Record<string, unknown>, 'pushState', wrapHistoryMethod);
    wrapMethod(windowContext!.history as unknown as Record<string, unknown>, 'replaceState', wrapHistoryMethod);
  }

  function supportsHistoryAPI(): boolean {
    const chromeRuntime = windowContext?.chrome?.app?.app?.runtime;
    const hasHistoryAPI =
      'history' in (windowContext ?? {}) &&
      !!windowContext?.history?.pushState &&
      !!windowContext?.history?.replaceState;

    return !chromeRuntime && hasHistoryAPI;
  }

  function interceptConsoleMethods(): void {
    if (!windowContext?.console) {
      return;
    }

    for (const methodName of CONSOLE_METHODS) {
      const consoleMethod = windowContext.console[methodName as keyof Console];

      if (!consoleMethod || typeof consoleMethod !== 'function') {
        continue;
      }

      wrapMethod(windowContext.console as unknown as Record<string, unknown>, methodName, (originalMethod) => {
        return function (...args: unknown[]): void {
          const consoleEvent: BehaviorEvent = {
            type: 'console',
            data: {
              level: methodName,
              message: args as unknown as string
            },
            timestamp: Date.now()
          };

          monitorRef?.addBehavior(consoleEvent);

          if (methodName === 'error') {
            for (const arg of args) {
              if (
                arg &&
                typeof arg === 'object' &&
                'message' in arg &&
                'stack' in arg
              ) {
                monitorRef?.errorHandler(
                  new ErrorEvent('error', {
                    error: arg,
                    message: (arg as Error).message
                  })
                );
              }
            }
          }

          if (originalMethod) {
            Function.prototype.apply.call(originalMethod, windowContext!.console, args);
          }
        } as typeof originalMethod;
      });
    }
  }
}