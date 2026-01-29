interface LocaleResourceMap {
  [key: string]: string;
}

interface AppParams {
  locale: string;
}

interface App {
  getApp(): { appParams: AppParams };
}

interface GlobalResourceManager {
  getString(key: string): string | undefined;
}

declare const HSApp: {
  App: App;
};

const localeResources: Record<string, LocaleResourceMap> = {
  ja_JP: {} as LocaleResourceMap,
  en_US: {} as LocaleResourceMap,
  fr_FR: {} as LocaleResourceMap,
  ru_RU: {} as LocaleResourceMap,
  it_IT: {} as LocaleResourceMap,
  es_ES: {} as LocaleResourceMap,
  pt_PT: {} as LocaleResourceMap,
  zh_CN: {} as LocaleResourceMap,
  id_ID: {} as LocaleResourceMap,
  de_DE: {} as LocaleResourceMap,
  zh_TW: {} as LocaleResourceMap,
  pl_PL: {} as LocaleResourceMap,
  ko_KR: {} as LocaleResourceMap,
  ar_SA: {} as LocaleResourceMap,
};

export class ResourceManager {
  private globalResourceManager?: GlobalResourceManager;
  private resourceMap?: LocaleResourceMap;

  init(locale?: string): Promise<void> {
    if (this.globalResourceManager) {
      return Promise.resolve();
    }

    if (globalThis.window?.ResourceManager) {
      this.globalResourceManager = (window as any).ResourceManager;
      return Promise.resolve();
    }

    const selectedLocale = locale ?? HSApp.App.getApp().appParams.locale;
    this.resourceMap = localeResources[selectedLocale] ?? localeResources.en_US;

    return Promise.resolve();
  }

  getString(key: string): string | undefined {
    if (this.globalResourceManager) {
      return this.globalResourceManager.getString(key);
    }

    if (this.resourceMap) {
      return this.resourceMap[key];
    }

    return undefined;
  }
}

export const resourceManager = new ResourceManager();