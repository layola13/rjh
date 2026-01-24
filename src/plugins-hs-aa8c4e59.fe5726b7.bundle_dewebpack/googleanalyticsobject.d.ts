/**
 * Google Analytics tracking integration module
 * Provides tracking functionality for DoubleClick, Universal Analytics (ga.js), and GA4
 */

/**
 * Legacy DoubleClick/ga.js queue item
 */
type GAQueueItem = [string, ...any[]];

/**
 * Legacy Google Analytics queue
 */
interface GAQueue extends Array<GAQueueItem> {
  push(item: GAQueueItem): number;
}

/**
 * DoubleClick/GA tracker configuration and methods
 */
interface DrgTrackerConfig {
  /** Default Google Analytics tracking ID */
  readonly DEFAULT_GA_ID: string;
  
  /** Internal tracker queue reference */
  _tracker: GAQueue | null;
  
  /**
   * Creates and initializes the DoubleClick tracker
   * @param trackingId - GA tracking ID (defaults to DEFAULT_GA_ID)
   * @param unused - Reserved parameter (not used in implementation)
   */
  createTracker(trackingId?: string, unused?: unknown): void;
  
  /**
   * Tracks a custom event
   * @param category - Event category (e.g., "FloorPlan")
   * @param action - Event action (e.g., "PageLoad")
   * @param label - Event label
   * @param value - Optional numeric value
   */
  trackEvent(category: string, action: string, label: string, value?: number): void;
  
  /**
   * Tracks a page view
   * @param pagePath - Virtual page path to track
   */
  trackPageView(pagePath: string): void;
  
  /**
   * Tracks an outgoing link page view with referrer context
   * @param destinationUrl - The outgoing URL being tracked
   */
  trackOutgoingPageView(destinationUrl: string): void;
}

/**
 * Universal Analytics (analytics.js) tracker configuration
 */
interface GATrackerConfig {
  /** Default tracking ID for Universal Analytics */
  readonly DEFAULT_FP_GA_ID: string;
  
  /**
   * Creates and initializes Universal Analytics tracker
   * @param trackingId - GA tracking ID (defaults to DEFAULT_FP_GA_ID)
   */
  createTracker(trackingId?: string): void;
  
  /**
   * Sends a page view hit to Universal Analytics
   */
  trackPageView(): void;
}

/**
 * Google Analytics 4 tracker configuration
 */
interface GA4TrackerConfig {
  /**
   * Creates and initializes GA4 tracker (gtag.js)
   * @param measurementId - GA4 measurement ID (defaults to HSApp.Config.GA4_ID)
   */
  createTracker(measurementId?: string): void;
}

/**
 * Extended Window interface with Google Analytics globals
 */
declare global {
  interface Window {
    /** Autodesk namespace for tracking utilities */
    adsk?: {
      drgTracker?: DrgTrackerConfig;
      gaTracker?: GATrackerConfig;
      ga4Tracker?: GA4TrackerConfig;
    };
    
    /** Legacy ga.js queue */
    _gaq?: GAQueue;
    
    /** Universal Analytics function */
    ga?: UniversalAnalytics.ga;
    
    /** Google Analytics object name (for gtag/UA) */
    GoogleAnalyticsObject?: string;
    
    /** GA4 data layer */
    dataLayer?: any[];
    
    /** Application configuration (assumed external) */
    HSApp?: {
      Config: {
        TENANT?: string;
        GA_ID?: string;
        GA4_ID?: string;
      };
    };
  }
}

/**
 * Main Google Analytics integration class
 * Initializes appropriate tracking based on tenant configuration
 */
export default class GoogleAnalyticsObject {
  constructor() {
    // No initialization needed
  }

  /**
   * Initializes the Autodesk namespace and starts appropriate tracker
   * based on HSApp.Config.TENANT value
   */
  start(): void {
    // Initialize Autodesk namespace
    window.adsk = window.adsk ?? {};
    
    const gaqQueue: GAQueue = (window as any)._gaq ?? [];
    window._gaq = gaqQueue;

    // Configure DoubleClick/ga.js tracker
    window.adsk.drgTracker = {
      DEFAULT_GA_ID: "UA-11094119-2",
      _tracker: null,

      createTracker(trackingId?: string, _unused?: unknown): void {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        const protocol = document.location.protocol === "https:" ? "https://" : "http://";
        script.src = `${protocol}stats.g.doubleclick.net/dc.js`;

        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(script, firstScript);

        const accountId = trackingId ?? this.DEFAULT_GA_ID;

        if (window.adsk?.drgTracker?._tracker === null) {
          gaqQueue.push(["_setAccount", accountId]);
          gaqQueue.push(["_trackPageview"]);
          if (window.adsk.drgTracker) {
            window.adsk.drgTracker._tracker = gaqQueue;
          }
        }
      },

      trackEvent(category: string, action: string, label: string, value?: number): void {
        try {
          gaqQueue.push(["_trackEvent", category, action, label, value]);
        } catch (error) {
          // Silently fail
        }
      },

      trackPageView(pagePath: string): void {
        try {
          gaqQueue.push(["_trackPageview", pagePath]);
        } catch (error) {
          // Silently fail
        }
      },

      trackOutgoingPageView(destinationUrl: string): void {
        const referrerUrl = window.parent.location.href.toString();
        let virtualPath = "";

        if (!referrerUrl || referrerUrl.length <= 0) {
          virtualPath = `/outgoing/${destinationUrl}`;
        } else {
          virtualPath = `/outgoing/from/${escape(referrerUrl)}/to/${destinationUrl}`;
        }

        window.adsk?.drgTracker?.trackPageView(virtualPath);
      }
    };

    // Configure Universal Analytics tracker
    window.adsk.gaTracker = {
      DEFAULT_FP_GA_ID: "UA-61197319-2",

      createTracker(trackingId?: string): void {
        if (!window.ga) {
          // Load analytics.js library
          window.GoogleAnalyticsObject = "ga";
          window.ga = window.ga ?? function(...args: any[]) {
            (window.ga!.q = window.ga!.q ?? []).push(args);
          };
          (window.ga as any).l = Number(new Date());

          const script = document.createElement("script");
          const firstScript = document.getElementsByTagName("script")[0];
          script.async = true;
          script.src = "//www.google-analytics.com/analytics.js";
          firstScript.parentNode?.insertBefore(script, firstScript);
        }

        try {
          const accountId = trackingId ?? this.DEFAULT_FP_GA_ID;
          window.ga!("create", accountId, "auto");
        } catch (error) {
          // Silently fail
        }
      },

      trackPageView(): void {
        try {
          window.ga!("send", "pageview");
        } catch (error) {
          // Silently fail
        }
      }
    };

    // Configure GA4 tracker
    window.adsk.ga4Tracker = {
      createTracker(measurementId?: string): void {
        if (window.dataLayer) {
          return;
        }

        try {
          const gaId = measurementId ?? window.HSApp?.Config.GA4_ID;
          if (!gaId) {
            return;
          }

          const script = document.createElement("script");
          script.setAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${gaId}`);
          script.setAttribute("type", "text/javascript");

          script.onload = function() {
            function gtag(...args: any[]): void {
              window.dataLayer!.push(args);
            }

            window.dataLayer = window.dataLayer ?? [];
            gtag("js", new Date());
            gtag("config", gaId);
          };

          document.body.appendChild(script);
        } catch (error) {
          // Silently fail
        }
      }
    };

    this.gaEventTrack();
  }

  /**
   * Initializes tracking based on tenant configuration
   * - "fp" tenant uses GA4
   * - Other tenants use DoubleClick + Universal Analytics
   */
  gaEventTrack(): void {
    const tenant = window.HSApp?.Config.TENANT;
    const gaId = window.HSApp?.Config.GA_ID;

    if (tenant === "fp") {
      window.adsk?.ga4Tracker?.createTracker();
    } else {
      window.adsk?.drgTracker?.createTracker(gaId);
      window.adsk?.drgTracker?.trackEvent("FloorPlan", "PageLoad", "FloorPlan");
      window.adsk?.gaTracker?.createTracker(gaId);
      window.adsk?.gaTracker?.trackPageView();
    }
  }
}