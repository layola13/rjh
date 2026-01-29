interface GaqCommand extends Array<string | number> {}

interface DrgTracker {
  DEFAULT_GA_ID: string;
  _tracker: GaqCommand[] | null;
  createTracker(trackingId?: string, additionalParam?: unknown): void;
  trackEvent(category: string, action: string, label?: string, value?: number): void;
  trackPageView(path: string): void;
  trackOutgoingPageView(url: string): void;
}

interface GaTracker {
  DEFAULT_FP_GA_ID: string;
  createTracker(trackingId?: string): void;
  trackPageView(): void;
}

interface Ga4Tracker {
  createTracker(trackingId?: string): void;
}

interface AdskhWindow extends Window {
  adsk?: {
    drgTracker?: DrgTracker;
    gaTracker?: GaTracker;
    ga4Tracker?: Ga4Tracker;
  };
  _gaq?: GaqCommand[];
  ga?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  GoogleAnalyticsObject?: string;
  HSApp?: {
    Config: {
      TENANT?: string;
      GA_ID?: string;
      GA4_ID?: string;
    };
  };
}

declare const window: AdskhWindow;
declare const HSApp: {
  Config: {
    TENANT?: string;
    GA_ID?: string;
    GA4_ID?: string;
  };
};

export default class GoogleAnalyticsObject {
  start(): void {
    if (!window.adsk) {
      window.adsk = {};
    }

    const gaqQueue: GaqCommand[] = [];
    window._gaq = gaqQueue;

    window.adsk.drgTracker = {
      DEFAULT_GA_ID: "UA-11094119-2",
      _tracker: null,

      createTracker(trackingId?: string, additionalParam?: unknown): void {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        const protocol = document.location.protocol === "https:" ? "https://" : "http://";
        script.src = `${protocol}stats.g.doubleclick.net/dc.js`;

        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(script, firstScript);

        const finalTrackingId = trackingId ?? this.DEFAULT_GA_ID;

        if (window.adsk?.drgTracker?._tracker == null) {
          gaqQueue.push(["_setAccount", finalTrackingId]);
          gaqQueue.push(["_trackPageview"]);
          if (window.adsk?.drgTracker) {
            window.adsk.drgTracker._tracker = gaqQueue;
          }
        }
      },

      trackEvent(category: string, action: string, label?: string, value?: number): void {
        try {
          gaqQueue.push(["_trackEvent", category, action, label ?? "", value ?? 0]);
        } catch (error) {
          // Silent error handling
        }
      },

      trackPageView(path: string): void {
        try {
          gaqQueue.push(["_trackPageview", path]);
        } catch (error) {
          // Silent error handling
        }
      },

      trackOutgoingPageView(url: string): void {
        const parentHref = window.parent.location.href.toString();
        let trackingPath = "";

        if (parentHref == null || parentHref.length <= 0) {
          trackingPath = `/outgoing/${url}`;
        } else {
          trackingPath = `/outgoing/from/${escape(parentHref)}/to/${url}`;
        }

        window.adsk?.drgTracker?.trackPageView(trackingPath);
      }
    };

    window.adsk.gaTracker = {
      DEFAULT_FP_GA_ID: "UA-61197319-2",

      createTracker(trackingId?: string): void {
        if (!window.ga) {
          window.GoogleAnalyticsObject = "ga";
          window.ga = window.ga || function (...args: unknown[]) {
            ((window.ga as any).q = (window.ga as any).q || []).push(args);
          };
          (window.ga as any).l = Number(new Date());

          const script = document.createElement("script");
          const firstScript = document.getElementsByTagName("script")[0];
          script.async = true;
          script.src = "//www.google-analytics.com/analytics.js";
          firstScript.parentNode?.insertBefore(script, firstScript);

          try {
            const finalTrackingId = trackingId || this.DEFAULT_FP_GA_ID;
            window.ga("create", finalTrackingId, "auto");
          } catch (error) {
            // Silent error handling
          }
        }
      },

      trackPageView(): void {
        try {
          window.ga?.("send", "pageview");
        } catch (error) {
          // Silent error handling
        }
      }
    };

    window.adsk.ga4Tracker = {
      createTracker(trackingId?: string): void {
        if (!window.dataLayer) {
          try {
            const finalTrackingId = trackingId || HSApp.Config.GA4_ID;
            const script = document.createElement("script");
            script.setAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${finalTrackingId}`);
            script.setAttribute("type", "text/javascript");

            script.onload = function (): void {
              function gtag(...args: unknown[]): void {
                (window.dataLayer as unknown[]).push(args);
              }

              window.dataLayer = window.dataLayer || [];
              gtag("js", new Date());
              gtag("config", finalTrackingId);
            };

            document.body.appendChild(script);
          } catch (error) {
            // Silent error handling
          }
        }
      }
    };

    this.gaEventTrack();
  }

  gaEventTrack(): void {
    if (HSApp.Config.TENANT === "fp") {
      window.adsk?.ga4Tracker?.createTracker();
    } else {
      window.adsk?.drgTracker?.createTracker(HSApp.Config.GA_ID);
      window.adsk?.drgTracker?.trackEvent("FloorPlan", "PageLoad", "FloorPlan");
      window.adsk?.gaTracker?.createTracker(HSApp.Config.GA_ID);
      window.adsk?.gaTracker?.trackPageView();
    }
  }
}