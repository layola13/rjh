interface GlobalLoginCompRef {
  openDropdownMenu?: () => void;
  closeDropdownMenu?: () => void;
}

interface MgmModalProps {
  url: string;
  onClose: () => void;
}

interface Plugin {
  refreshBenefits: () => void;
}

interface PluginManager {
  getPlugin: (pluginType: string) => Plugin | null;
}

interface App {
  pluginManager: PluginManager;
}

interface AppContainer {
  getApp: () => App;
}

interface HSAppConfig {
  TENANT: string;
  EZHOME_HOST: string;
}

interface HSAppGlobal {
  Config: HSAppConfig;
  App: AppContainer;
}

interface HSFPConstantsGlobal {
  PluginType: {
    MarketingBadge: string;
  };
}

declare const HSApp: HSAppGlobal;
declare const HSFPConstants: HSFPConstantsGlobal;
declare const React: any;
declare const ReactDOM: any;

const FP_TENANT = 'fp';

export default class UserInfoManager {
  containerDom: HTMLDivElement | undefined;
  mgmModalDom: HTMLDivElement | undefined;
  globalLoginCompRef: GlobalLoginCompRef | null;

  constructor() {
    this.containerDom = undefined;
    this.mgmModalDom = undefined;
    this.globalLoginCompRef = null;
  }

  init(): void {
    const pluginContainer = document.querySelector<HTMLElement>('#plugin-container');
    const containerDiv = document.createElement('div');
    containerDiv.className = 'user-info-container';
    this.containerDom = containerDiv;
    pluginContainer?.appendChild(containerDiv);
  }

  getUserInfoButton(): React.ReactElement {
    if (HSApp.Config.TENANT === FP_TENANT) {
      return React.createElement('LoginComp', {
        ref: (ref: GlobalLoginCompRef) => this.setGlobalLoginCompRef(ref)
      });
    }
    return React.createElement('LoginStatusComp', null);
  }

  setGlobalLoginCompRef(ref: GlobalLoginCompRef): void {
    this.globalLoginCompRef = ref;
  }

  openUserDropdownMenu(): void {
    this.globalLoginCompRef?.openDropdownMenu?.();
  }

  closeUserDropdownMenu(): void {
    this.globalLoginCompRef?.closeDropdownMenu?.();
  }

  showMgmModal(): void {
    const pluginContainer = document.querySelector<HTMLElement>('#plugin-container');
    
    if (!this.mgmModalDom) {
      this.mgmModalDom = document.createElement('div');
      this.mgmModalDom.className = 'mgm-modal-container';
      pluginContainer?.appendChild(this.mgmModalDom);
    }

    const mgmUrl = `https://${HSApp.Config.EZHOME_HOST}/mgm/`;
    const modalProps: MgmModalProps = {
      url: mgmUrl,
      onClose: () => this.closeMgmModal()
    };

    ReactDOM.render(
      React.createElement('MgmModal', modalProps),
      this.mgmModalDom
    );
  }

  closeMgmModal(): void {
    if (this.mgmModalDom) {
      ReactDOM.unmountComponentAtNode(this.mgmModalDom);
    }

    const marketingBadgePlugin = HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.MarketingBadge);
    
    marketingBadgePlugin?.refreshBenefits();
  }
}