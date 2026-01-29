interface App {
  newDocument(): Promise<void>;
  switchTo2DView(): void;
  designMetadata: DesignMetadata;
}

interface DesignMetadata {
  set(key: string, value: unknown): void;
  flush(): void;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface LiveHint {
  hide(): void;
}

interface BenefitMeta {
  defaultPublic?: boolean;
}

interface AdskUser {
  getBenefitMeta(category: string, key: string): BenefitMeta | null;
}

declare global {
  interface Window {
    onNewDocument: () => Promise<void>;
    toVersionedUrl: (url: string) => string;
    stripHtml: (html: string) => string;
    DEBUG?: boolean;
    HSApp: HSApp;
    LiveHint?: LiveHint;
    adskUser: AdskUser;
    hsw_version: string;
    HSCore: {
      Doc: {
        DocumentStatus: {
          Public: unknown;
        };
      };
    };
  }
}

window.onNewDocument = async (): Promise<void> => {
  const app = window.HSApp.App.getApp();
  
  if (window.LiveHint) {
    window.LiveHint.hide();
  }
  
  await app.newDocument();
  app.switchTo2DView();
  
  const benefitMeta = window.adskUser.getBenefitMeta("whiteLabel", "shareViewerUrl");
  
  if (benefitMeta?.defaultPublic) {
    app.designMetadata.set("documentStatus", window.HSCore.Doc.DocumentStatus.Public);
    app.designMetadata.flush();
  }
};

window.toVersionedUrl = (url: string): string => {
  if (!url) {
    return "";
  }
  
  if (window.DEBUG) {
    return url;
  }
  
  const separator = url.indexOf("?") !== -1 ? "&v=" : "?";
  return `${url}${separator}${window.hsw_version}`;
};

window.stripHtml = (html: string): string => {
  if (!html) {
    return "";
  }
  
  const htmlTagPattern = /(<([^>]+)>)/gi;
  const hasHtmlTags = htmlTagPattern.test(html);
  
  if (hasHtmlTags) {
    return html
      .replace(/</g, "＜")
      .replace(/>/g, "＞")
      .replace(/"/g, "＂");
  }
  
  return html.replace(/"/g, "＂");
};