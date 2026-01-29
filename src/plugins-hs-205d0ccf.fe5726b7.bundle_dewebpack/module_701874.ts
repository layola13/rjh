import { Signal } from 'HSCore/Util/Signal';
import { IPlugin } from 'HSApp/Plugin/IPlugin';
import SwitchLanguageComponent from './SwitchLanguageComponent';

interface Region {
  code: string;
  displayName: string | Record<string, string>;
  langs: Language[];
}

interface Language {
  code: string;
  displayName: string;
}

interface CurrentLanguageState {
  regioncode: string;
  langcode: string;
  displayName: string;
}

interface AppParams {
  tenant: string;
  locale: string;
  region: Region;
  allRegions: Region[];
}

interface NavigationData {
  url?: string;
  data: LanguageManager;
  regioncode: string;
  langcode: string;
}

interface RenderOptions {
  [key: string]: unknown;
}

class SwitchLanguagePlugin extends IPlugin {
  public signalRegionLanguageChanged!: Signal<NavigationData>;

  constructor() {
    super({
      name: 'switchlanguage plugin',
      description: 'provide switchlanguage component',
      dependencies: []
    });
  }

  public onActive(args: { app: { appParams: AppParams } }): void {
    this.signalRegionLanguageChanged = new HSCore.Util.Signal<NavigationData>();
    languageManager.init(args.app.appParams, this);
    super.onActive?.([]);
  }

  public onDeactive(): void {
    // Cleanup logic if needed
  }

  public render(container: HTMLElement, options: RenderOptions): void {
    ReactDOM.render(
      React.createElement(SwitchLanguageComponent, {
        options,
        current: languageManager.current,
        onSelectedChange: this.switchLanguage,
        regions: languageManager.allRegions
      }),
      container
    );
  }

  public getRenderItem(options: RenderOptions): React.ReactElement | undefined {
    if (HSApp.App.getApp().appParams.tenant !== 'ezhome') {
      return React.createElement(SwitchLanguageComponent, {
        options,
        current: languageManager.current,
        onSelectedChange: this.switchLanguage,
        regions: languageManager.allRegions
      });
    }
  }

  public switchLanguage = (regionCode: string, langCode: string): void => {
    languageManager.navigate(regionCode, langCode);
  };
}

const languageManager = {
  plugin: null as SwitchLanguagePlugin | null,
  path: '',
  appParam: null as AppParams | null,
  allRegions: [] as Region[],
  current: null as CurrentLanguageState | null,

  init(appParams: AppParams, plugin: SwitchLanguagePlugin): void {
    this.plugin = plugin;
    this.path = window.location.pathname;
    this.appParam = appParams;
    this.allRegions = _.cloneDeep(appParams.allRegions);

    this.allRegions.forEach((region: Region) => {
      const displayName = region.displayName;
      if (typeof displayName === 'object') {
        region.displayName = displayName[appParams.locale] ?? displayName.default ?? '';
      }
    });

    const currentRegion = this.allRegions.find(
      (region: Region) => region.code === appParams.region.code
    );

    if (!currentRegion) return;

    const currentLanguage = currentRegion.langs.find(
      (lang: Language) => lang.code === appParams.locale
    );

    if (!currentLanguage) return;

    this.current = {
      regioncode: currentRegion.code,
      langcode: appParams.locale,
      displayName:
        appParams.allRegions.length > 1
          ? `${currentRegion.displayName} - ${currentLanguage.displayName}`
          : currentLanguage.displayName
    };
  },

  navigate(regionCode: string, langCode: string): void {
    if (!this.current || (this.current.regioncode === regionCode && this.current.langcode === langCode)) {
      return;
    }

    if (!regionCode || !langCode) return;

    const queryParams = _.cloneDeep(HSApp.Util.Url.getQueryStrings());

    if (regionCode !== 'global') {
      queryParams.region = regionCode;
    }
    queryParams.lang = langCode;

    const navigationData: NavigationData = {
      url: HSApp.Util.Url.addParams(this.path, queryParams),
      data: this,
      regioncode: regionCode,
      langcode: langCode
    };

    this.plugin?.signalRegionLanguageChanged.dispatch(navigationData);

    if (navigationData.url) {
      window.location.href = navigationData.url;
    }
  }
};

HSApp.Plugin.registerPlugin('hsw.plugin.switchlanguage.Plugin', SwitchLanguagePlugin);

export default SwitchLanguagePlugin;