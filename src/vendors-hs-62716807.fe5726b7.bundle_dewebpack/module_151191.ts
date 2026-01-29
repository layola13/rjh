export const responsiveArray = ["xxl", "xl", "lg", "md", "sm", "xs"] as const;

export const responsiveMap = {
  xs: "(max-width: 575px)",
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  xxl: "(min-width: 1600px)",
} as const;

export type ResponsiveKey = typeof responsiveArray[number];
export type ResponsiveBreakpoint = Record<ResponsiveKey, boolean>;

interface MatchHandler {
  mql: MediaQueryList;
  listener: (event: MediaQueryListEvent | MediaQueryList) => void;
}

type SubscriberCallback = (screens: ResponsiveBreakpoint) => void;

class ResponsiveObserver {
  private subscribers = new Map<number, SubscriberCallback>();
  private subscriptionId = -1;
  private screens: ResponsiveBreakpoint = {} as ResponsiveBreakpoint;
  private matchHandlers: Record<string, MatchHandler> = {};

  /**
   * Dispatch screen changes to all subscribers
   */
  dispatch(screens: ResponsiveBreakpoint): boolean {
    this.screens = screens;
    this.subscribers.forEach((callback) => {
      callback(this.screens);
    });
    return this.subscribers.size >= 1;
  }

  /**
   * Subscribe to responsive breakpoint changes
   */
  subscribe(callback: SubscriberCallback): number {
    if (!this.subscribers.size) {
      this.register();
    }
    this.subscriptionId += 1;
    this.subscribers.set(this.subscriptionId, callback);
    callback(this.screens);
    return this.subscriptionId;
  }

  /**
   * Unsubscribe from responsive breakpoint changes
   */
  unsubscribe(subscriptionId: number): void {
    this.subscribers.delete(subscriptionId);
    if (!this.subscribers.size) {
      this.unregister();
    }
  }

  /**
   * Unregister all media query listeners
   */
  unregister(): void {
    Object.keys(responsiveMap).forEach((breakpointKey) => {
      const mediaQuery = responsiveMap[breakpointKey as ResponsiveKey];
      const handler = this.matchHandlers[mediaQuery];
      handler?.mql.removeListener(handler.listener);
    });
    this.subscribers.clear();
  }

  /**
   * Register media query listeners for all breakpoints
   */
  register(): void {
    Object.keys(responsiveMap).forEach((breakpointKey) => {
      const key = breakpointKey as ResponsiveKey;
      const mediaQuery = responsiveMap[key];
      
      const listener = (event: MediaQueryListEvent | MediaQueryList): void => {
        const matches = event.matches;
        this.dispatch({
          ...this.screens,
          [key]: matches,
        });
      };

      const mediaQueryList = window.matchMedia(mediaQuery);
      mediaQueryList.addListener(listener);
      
      this.matchHandlers[mediaQuery] = {
        mql: mediaQueryList,
        listener,
      };
      
      listener(mediaQueryList);
    });
  }
}

const responsiveObserver = new ResponsiveObserver();

export default responsiveObserver;