export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export type ResponsiveInfo = {
  [key in Breakpoint]?: boolean;
};

export const responsiveArray: readonly Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const responsiveMap: Record<Breakpoint, string> = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

type SubscribeHandler = (info: ResponsiveInfo) => void;

interface MatchHandler {
  mql: MediaQueryList;
  listener: (event: MediaQueryListEvent | MediaQueryList) => void;
}

class ResponsiveObserver {
  private subscriptions = new Map<number, SubscribeHandler>();
  private subscriptionId = -1;
  private currentResponsiveInfo: ResponsiveInfo = {};
  private matchHandlers: Record<string, MatchHandler> = {};

  dispatch(responsiveInfo: ResponsiveInfo): boolean {
    this.currentResponsiveInfo = responsiveInfo;
    this.subscriptions.forEach((handler) => {
      handler(this.currentResponsiveInfo);
    });
    return this.subscriptions.size >= 1;
  }

  subscribe(handler: SubscribeHandler): number {
    if (!this.subscriptions.size) {
      this.register();
    }
    this.subscriptionId += 1;
    this.subscriptions.set(this.subscriptionId, handler);
    handler(this.currentResponsiveInfo);
    return this.subscriptionId;
  }

  unsubscribe(subscriptionId: number): void {
    this.subscriptions.delete(subscriptionId);
    if (!this.subscriptions.size) {
      this.unregister();
    }
  }

  unregister(): void {
    Object.keys(responsiveMap).forEach((breakpoint) => {
      const mediaQuery = responsiveMap[breakpoint as Breakpoint];
      const handler = this.matchHandlers[mediaQuery];
      handler?.mql.removeListener(handler.listener);
    });
    this.subscriptions.clear();
  }

  register(): void {
    Object.keys(responsiveMap).forEach((breakpoint) => {
      const mediaQuery = responsiveMap[breakpoint as Breakpoint];
      
      const listener = (event: MediaQueryListEvent | MediaQueryList): void => {
        const matches = event.matches;
        this.dispatch({
          ...this.currentResponsiveInfo,
          [breakpoint]: matches,
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