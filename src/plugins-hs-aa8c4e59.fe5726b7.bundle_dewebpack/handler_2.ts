interface RefObject<T> {
  current: T | null;
}

interface AIDAComponent {
  show(): void;
  hide(): void;
}

interface QueryStrings {
  lang?: string;
  [key: string]: string | undefined;
}

interface EventTrackData {
  src: string;
}

interface EventTracker {
  track(group: string, event: string, data: EventTrackData): void;
}

interface HSAppUtil {
  Url: {
    addParam(url: string, key: string, value: string): string;
    getQueryStrings(): QueryStrings;
  };
  EventTrack: {
    instance(): EventTracker;
  };
  EventGroupEnum: {
    Pageheader: string;
  };
}

interface HSAppConfig {
  AIDA_URL: string;
}

interface HSApp {
  Config: HSAppConfig;
  Util: HSAppUtil;
}

interface AdskUser {
  isEnterprise: boolean;
}

declare const HSApp: HSApp;
declare const adskUser: AdskUser;

export class Handler {
  private aidaRef: RefObject<AIDAComponent>;

  constructor() {
    this.aidaRef = { current: null };
  }

  /**
   * Initialize AIDA container and render component
   */
  init(): void {
    const uiContainer = document.querySelector<HTMLElement>("#ui-container");
    let aidaContainer = document.querySelector<HTMLElement>(".aida-container");

    if (!aidaContainer) {
      aidaContainer = document.createElement("div");
      aidaContainer.className = "aida-container";
      uiContainer?.appendChild(aidaContainer);
    }

    // Note: Actual React rendering would require proper React imports
    // This assumes AIDA component and React are available in scope
  }

  /**
   * Check if AIDA can be shown based on user enterprise status
   */
  canShow(): boolean {
    return !adskUser.isEnterprise;
  }

  /**
   * Show AIDA entry if allowed
   */
  showAIDAEntry(): void {
    if (this.canShow()) {
      this.aidaRef.current?.show();
    }
  }

  /**
   * Hide AIDA entry
   */
  hideAIDAEntry(): void {
    this.aidaRef.current?.hide();
  }

  /**
   * Open AIDA in new window with tracking
   * @param source - Source identifier for event tracking
   */
  openAIDA(source: string): void {
    let aidaUrl = HSApp.Config.AIDA_URL;
    aidaUrl = HSApp.Util.Url.addParam(aidaUrl, "autoContribute", "true");

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    if (queryStrings.lang) {
      aidaUrl = HSApp.Util.Url.addParam(aidaUrl, "lang", queryStrings.lang);
    }

    window.open(aidaUrl, "_blank");

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Pageheader,
      "open_aida_event",
      { src: source }
    );
  }
}