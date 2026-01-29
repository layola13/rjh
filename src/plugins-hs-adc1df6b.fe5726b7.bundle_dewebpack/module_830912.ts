interface LogoSettings {
  customLevel: string;
  imageUrl: string;
  hidePowerBy: boolean;
  link: string;
  showVersion: boolean;
  hideLogo: boolean;
}

interface QueryStrings {
  hxrr?: string;
  env?: string;
  [key: string]: string | undefined;
}

interface MtopResponse<T> {
  ret: string[];
  data: T;
}

interface CustomLogoData {
  customLevel: string;
  imageUrl: string;
}

interface PageHeaderLogoConfig {
  logo: string;
  link: string;
  hidePowerByHomestyler: boolean;
  hideLogo?: boolean;
}

interface LogoSettingData {
  logoSetting?: {
    pageHeaderLogo?: PageHeaderLogoConfig;
  };
}

interface SignalData {
  data?: LogoSettingData;
}

interface BenefitMeta {
  pageHeaderLogo?: {
    hide?: boolean;
  };
}

interface BenefitCheck {
  useful?: boolean;
}

interface Plugin {
  signalWhiteLabelSetting: {
    listen: (callback: (data: SignalData) => void) => void;
    unlisten: (callback: (data: SignalData) => void) => void;
  };
}

interface UserInfoPlugin {
  handler: {
    handleOpenMyWorkBench: (target: string, url?: string) => void;
  };
}

const DEFAULT_LOGO_LEVEL = 'DEFAULT';
const CUSTOM_LOGO_LEVEL_JOINTLY = 'JOINTLY';
const VERSION_EA = 'ea';
const TENANT_FP = 'fp';
const POWERED_BY_TEXT = 'Powered by ';
const BRAND_NAME = 'HOMESTYLER';
const HTTPS_PREFIX = 'https://';
const LOGO_STORAGE_KEY = 'hs_custom_logo_info';

const LogoComponent: React.FC = () => {
  const queryStrings: QueryStrings = HSApp.Util.Url.getQueryStrings();
  const isHaixun = queryStrings.hxrr === 'true';
  const defaultLogoUrl = isHaixun
    ? HSApp.Config.HAI_XUN_LOGO
    : `${HSApp.Config.RES_BASEPATH}v2/image/logo/pageheaderlargelogo.svg`;

  const [logoSettings, setLogoSettings] = React.useState<LogoSettings>({
    customLevel: DEFAULT_LOGO_LEVEL,
    imageUrl: '',
    hidePowerBy: false,
    link: '',
    showVersion: true,
    hideLogo: false,
  });

  const {
    customLevel,
    imageUrl,
    hidePowerBy,
    link,
    hideLogo,
  } = logoSettings;

  const app = HSApp.App.getApp();
  const firstLoginPlugin = app.pluginManager.getPlugin(
    'hsw.brand.ezhome.firstlogin.Plugin'
  ) as Plugin;
  const userInfoPlugin = app.pluginManager.getPlugin(
    HSFPConstants.PluginType.UserInfo
  ) as UserInfoPlugin;

  React.useEffect(() => {
    if (HSApp.Config.VERSION === VERSION_EA) {
      loadEACustomLogo();
    }

    if (HSApp.Config.TENANT === TENANT_FP) {
      loadFPCustomLogo();
      firstLoginPlugin.signalWhiteLabelSetting.listen(handleWhiteLabelChange);
    }

    return () => {
      firstLoginPlugin.signalWhiteLabelSetting.unlisten(handleWhiteLabelChange);
    };
  }, []);

  const loadEACustomLogo = (): void => {
    NWTK.mtop.User.customizedLogo()
      .then((response: MtopResponse<CustomLogoData>) => {
        const { data, ret } = response;
        if (!response || !ret[0].includes('SUCCESS') || !data) {
          return Promise.reject(data);
        }

        const { customLevel: level, imageUrl: url } = data;
        setLogoSettings({
          ...logoSettings,
          customLevel: level,
          imageUrl: url,
        });
      });
  };

  const loadFPCustomLogo = (): void => {
    const storedLogoInfo = localStorage.getItem(LOGO_STORAGE_KEY);
    let parsedLogoInfo: PageHeaderLogoConfig | undefined;

    try {
      parsedLogoInfo = storedLogoInfo ? JSON.parse(storedLogoInfo) : undefined;
    } catch (error) {
      // Silently handle parse errors
    }

    const logoConfig =
      parsedLogoInfo || adskUser.logoSetting?.pageHeaderLogo;

    if (logoConfig) {
      const { logo, link: logoLink, hidePowerByHomestyler } = logoConfig;
      setLogoSettings({
        ...logoSettings,
        imageUrl: logo,
        link: logoLink,
        hidePowerBy: hidePowerByHomestyler,
        showVersion: false,
        hideLogo: adskUser.logoSetting?.pageHeaderLogo?.hideLogo ?? false,
      });
    }
  };

  const handleWhiteLabelChange = (signal: SignalData): void => {
    const whiteLabelMeta = adskUser.getBenefitMeta(
      'whiteLabel',
      'hideHomestylerText'
    ) as BenefitMeta | undefined;

    if (
      whiteLabelMeta?.pageHeaderLogo?.hide &&
      adskUser.logoSetting?.pageHeaderLogo
    ) {
      adskUser.logoSetting.pageHeaderLogo.hideLogo = true;
      setLogoSettings({
        ...logoSettings,
        hideLogo: true,
      });
      return;
    }

    const pageHeaderLogo = signal?.data?.logoSetting?.pageHeaderLogo;
    if (pageHeaderLogo) {
      const { logo, link: logoLink } = pageHeaderLogo;
      const benefitCheck = adskUser.checkBenefit(
        'whiteLabel',
        'hidePowerByHomestyler'
      ) as BenefitCheck | undefined;
      const shouldHidePowerBy = benefitCheck?.useful ?? false;

      setLogoSettings({
        ...logoSettings,
        imageUrl: logo,
        link: logoLink,
        hidePowerBy: shouldHidePowerBy,
        showVersion: false,
      });
    }
  };

  const logoElement = React.useMemo(() => {
    if (hideLogo) {
      return null;
    }

    if (HSApp.Config.TENANT === TENANT_FP && imageUrl) {
      return (
        <div className="fp-outer-block">
          <img className="large-icon fp-outer-image" src={imageUrl} />
          {!hidePowerBy && (
            <p className="poweredby">
              {POWERED_BY_TEXT}
              <strong>{BRAND_NAME}</strong>
            </p>
          )}
        </div>
      );
    }

    return (
      <img
        className={`large-icon ${imageUrl ? 'outer-image' : ''}`}
        src={imageUrl || defaultLogoUrl}
      />
    );
  }, [imageUrl, defaultLogoUrl, hidePowerBy, hideLogo]);

  const handleLogoClick = (): void => {
    if (adskUser.kanfangCustomizedUI || isHaixun) {
      return;
    }

    const targetUrl =
      link && !link.startsWith('http') ? `${HTTPS_PREFIX}${link}` : link;
    userInfoPlugin.handler.handleOpenMyWorkBench('_blank', targetUrl);

    const environment = queryStrings.env;
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventTrack.EventGroupEnum.Pageheader,
      'logo_workbench_event',
      { env: environment }
    );
  };

  return (
    <li className="shejijia" onClick={handleLogoClick}>
      <a>
        {customLevel === CUSTOM_LOGO_LEVEL_JOINTLY && (
          <React.Fragment>
            <img
              className="icon"
              src={`${HSApp.Config.RES_BASEPATH}v2/image/logo/pageheaderlogo.png`}
            />
            <img className="mix-icon" src={mixIconUrl} />
          </React.Fragment>
        )}
        {logoElement}
      </a>
    </li>
  );
};

export default class LogoPlugin {
  order: number = 0;

  getRenderItem(): React.ReactElement {
    return React.createElement(LogoComponent);
  }
}