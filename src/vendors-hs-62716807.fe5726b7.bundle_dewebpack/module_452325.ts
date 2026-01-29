interface HistoryStateDetail {
  detail: string;
}

interface UtilityModule {
  cutUrlSearch(url: string): string;
  warn(message: string): void;
  createFakeToString(methodName: string): () => string;
  ext(target: Record<string, unknown>, source: Record<string, unknown>): void;
}

interface WindowWithHistory extends Window {
  history: History;
  document: Document;
  CustomEvent?: typeof CustomEvent;
}

interface HistoryMonitor {
  hasHackedHistoryState?: boolean;
  hackHistoryState(): this;
}

export default function historyStateMonitor(
  moduleExports: HistoryMonitor,
  windowContext: WindowWithHistory,
  utilityModule: UtilityModule
): void {
  const history = windowContext.history || ({} as History);
  const document = windowContext.document;

  const dispatchCustomEvent = (eventName: string, detail: string): void => {
    let event: Event;

    if (windowContext.CustomEvent) {
      event = new CustomEvent(eventName, { detail });
    } else {
      event = document.createEvent('HTMLEvents');
      (event as CustomEvent).initEvent(eventName, false, true);
      (event as CustomEvent<string>).detail = detail;
    }

    windowContext.dispatchEvent(event);
  };

  const wrapHistoryMethod = (methodName: 'pushState' | 'replaceState'): void => {
    const originalMethod = history[methodName];

    if (typeof originalMethod !== 'function') {
      return;
    }

    history[methodName] = function (
      data: unknown,
      unused: string,
      url?: string | URL | null
    ): void {
      const args = arguments.length === 1 ? [arguments[0]] : Array.prototype.slice.call(arguments);
      const previousUrl = location.href;
      const result = originalMethod.apply(history, args as [unknown, string, string?]);

      if (!url || typeof url !== 'string') {
        return result;
      }

      if (url === previousUrl) {
        return result;
      }

      try {
        const previousParts = previousUrl.split('#');
        const newParts = url.split('#');
        const previousPath = utilityModule.cutUrlSearch(previousParts[0]);
        const newPath = utilityModule.cutUrlSearch(newParts[0]);
        const previousHash = previousParts[1]?.replace(/^\/?(.*)/, '$1');
        const newHash = newParts[1]?.replace(/^\/?(.*)/, '$1');

        if (previousPath !== newPath) {
          dispatchCustomEvent('historystatechange', newPath);
        } else if (previousHash !== newHash) {
          dispatchCustomEvent('historystatechange', newHash ?? '');
        }
      } catch (error) {
        utilityModule.warn(`[retcode] error in ${methodName}: ${error}`);
      }

      return result;
    } as History['pushState'] | History['replaceState'];

    (history[methodName] as unknown as { toString: () => string }).toString =
      utilityModule.createFakeToString(methodName);
  };

  utilityModule.ext(moduleExports as unknown as Record<string, unknown>, {
    hackHistoryState(): HistoryMonitor {
      if (!this.hasHackedHistoryState) {
        wrapHistoryMethod('pushState');
        wrapHistoryMethod('replaceState');
        this.hasHackedHistoryState = true;
      }
      return this;
    },
  });
}