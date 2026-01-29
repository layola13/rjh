import { HSApp } from './518193';
import { FeedbackForm } from './353695';
import { FeedbackEntry } from './398073';
import { AliXiaoMi } from './251837';
import './686416';

interface PluginDependencies {
  [HSFPConstants.PluginType.CommonUI]: any;
  'hsw.plugin.persistence.Plugin': any;
  'hsw.brand.ezhome.firstlogin.Plugin': any;
  [HSFPConstants.PluginType.Toolbar]: any;
  [HSFPConstants.PluginType.PageHeader]: any;
  [HSFPConstants.PluginType.Feedback]: any;
}

interface AppParams {
  biz: string;
}

interface App {
  appParams: AppParams;
  signalEnvironmentActivated: any;
  activeEnvironmentId: string;
  pluginManager: {
    getPlugin(name: string): any;
  };
  environmentManager: {
    activeScope: string;
  };
  userTrackLogger: {
    push(event: string, data: any): void;
  };
}

interface PopupWindowOptions {
  windowname: string;
  title: string;
  contents: React.ReactElement;
  width: number;
  submitcall: () => void;
  cancelcall: () => void;
}

interface QueryStrings {
  env?: string;
  enableXiaoMi?: string;
}

interface EnvironmentChangedData {
  newEnvironmentId: string;
  oldEnvironmentId: string;
}

interface EnvironmentChangedEvent {
  data: EnvironmentChangedData;
}

interface HelpItem {
  add(config: ToolbarItemConfig): void;
}

interface ToolbarItemConfig {
  label: string;
  name: string;
  type: string;
  order: number;
  onclick: () => void;
}

class EzHomeFeedbackPlugin extends HSApp.Plugin.IPlugin {
  private commonUI: any;
  private app: App;
  private activeWindow: any;
  private _localStorage: HSApp.Util.Storage;
  private _persistencePlugin: any;
  private _toolbarPlugin: any;
  private _pageheaderPlugin: any;
  private _feedbackV2Plugin: any;
  private _aliXiaoMi?: AliXiaoMi;
  private FeedBackEntry?: any;

  constructor() {
    super({
      name: 'ezhome feedback plugin',
      description: 'ezhome feedback for floorplan',
      dependencies: [
        HSFPConstants.PluginType.CommonUI,
        'hsw.plugin.persistence.Plugin',
        'hsw.brand.ezhome.firstlogin.Plugin',
        HSFPConstants.PluginType.Toolbar,
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.Feedback
      ]
    });
  }

  onActive(config: any, dependencies: PluginDependencies): void {
    super.onActive(config, dependencies);

    this.commonUI = dependencies[HSFPConstants.PluginType.CommonUI];
    this.app = HSApp.App.getApp();
    this.activeWindow = undefined;
    this._localStorage = new HSApp.Util.Storage('hsw.ezhome.plugin.persistence');
    this._persistencePlugin = dependencies['hsw.plugin.persistence.Plugin'];
    this._toolbarPlugin = dependencies[HSFPConstants.PluginType.Toolbar];
    this._pageheaderPlugin = dependencies[HSFPConstants.PluginType.PageHeader];
    this._feedbackV2Plugin = dependencies[HSFPConstants.PluginType.Feedback];

    new HSCore.Util.SignalHook(this).listen(
      this.app.signalEnvironmentActivated,
      this.onActiveEnvironmentChanged
    );

    this.injectToolbar();
    this.initEntryBtn();

    const queryStrings: QueryStrings = HSApp.Util.Url.getQueryStrings();
    const { env, enableXiaoMi } = queryStrings;

    const shouldEnableXiaoMi =
      (this.app.appParams.biz === 'tpzz' && enableXiaoMi !== 'false') ||
      (HSApp.Config.VERSION !== 'ea' || ['ihomeDecoration', 'ihomeXmerchant'].includes(env ?? ''));

    if (shouldEnableXiaoMi && HSApp.Config.TENANT !== 'fp') {
      this._aliXiaoMi = new AliXiaoMi();
      this._aliXiaoMi.start();
    }
  }

  onDeactive(config: any): void {
    super.onDeactive(config);
    this.removeEntryBtn();
  }

  close(): void {
    if (window.electron) {
      window.electron.ipcRenderer.send('feedbackUnlock');
    }

    try {
      ReactDOM.unmountComponentAtNode(document.querySelector('.popupcontainer')!);
    } catch (error) {
      // Ignore unmount errors
    }

    if (this.activeWindow) {
      this.activeWindow = null;
    }
  }

  show(isFromToolbar?: boolean): void {
    const isEzHomeOrFpTenant =
      HSApp.Config.TENANT === 'ezhome' || HSApp.Config.TENANT === 'fp';
    const isLogEnabled = !(typeof isFromToolbar === 'object' || !isFromToolbar);

    if (isEzHomeOrFpTenant) {
      const style = { isBlack: false };
      let module = '';

      if (
        [
          HSFPConstants.Environment.ManualLighting,
          HSFPConstants.Environment.Render,
          HSFPConstants.Environment.SparkPicEnv
        ].includes(this.app.activeEnvironmentId)
      ) {
        style.isBlack = true;
      }

      const renderImageBrowserPlugin = this.app.pluginManager.getPlugin(
        'hsw.plugin.renderImageBrowserPlugin.Plugin'
      );

      if (renderImageBrowserPlugin?.getIsInImageBrowserEnv()) {
        module = 'render';
        style.isBlack = true;
      } else if (
        this.app.environmentManager.activeScope === HSFPConstants.EnvScope.SparkPicImage
      ) {
        module = HSFPConstants.Environment.SparkPicEnv;
        style.isBlack = true;
      }

      this._feedbackV2Plugin.showFeedbackEntry({
        style,
        module,
        isLog: isEzHomeOrFpTenant && isLogEnabled
      });
    } else {
      if (window.electron) {
        window.electron.ipcRenderer.send('feedbackLock');
      }

      const popupOptions: PopupWindowOptions = {
        windowname: 'feedbackdialog',
        title: ResourceManager.getString('plugin_feedback_panel_title'),
        contents: React.createElement(FeedbackForm, {
          close: this.close.bind(this)
        }),
        width: 640,
        submitcall: () => {},
        cancelcall: () => {
          if (window.electron) {
            window.electron.ipcRenderer.send('feedbackUnlock');
          }
        }
      };

      const popup = this.commonUI.createPopupwindow(popupOptions);
      this.activeWindow = ReactDOM.render(
        popup,
        document.querySelector('.popupcontainer')
      );
    }

    if (!isEzHomeOrFpTenant || !isLogEnabled) {
      this.app.userTrackLogger.push('help.feedback', {
        description: isEzHomeOrFpTenant ? '问题反馈' : '我要吐槽',
        activeSectionName: isFromToolbar === true ? '工具栏' : '右下角反馈',
        activeSection:
          isFromToolbar === true
            ? HSApp.Util.EventGroupEnum.Toolbar
            : HSApp.Util.EventGroupEnum.Feedback,
        clicksRatio: isEzHomeOrFpTenant
          ? {
              id: 'toolbar_help_feedbackV2',
              name: ResourceManager.getString('plugin_feedback_name')
            }
          : {
              id: 'toolbar_help_feedback',
              name: ResourceManager.getString('toolbar_help_feedback')
            }
      });
    }
  }

  initEntryBtn(surveyUrl?: string): void {
    const entryContainer = document.querySelector('.feedbackEntry');
    this.FeedBackEntry = ReactDOM.render(
      React.createElement(FeedbackEntry, {
        surveyUrl,
        onclicked: this.show.bind(this),
        title: ResourceManager.getString('plugin_feedback_panel_title')
      }),
      entryContainer
    );
  }

  removeEntryBtn(): void {
    ReactDOM.unmountComponentAtNode(document.querySelector('.feedbackEntry')!);
  }

  showAliXiaomi(): void {
    if (this.FeedBackEntry) {
      this.FeedBackEntry.showFeedbackEntry();
      this.FeedBackEntry.toggleAliXiaomi(true);
    }
  }

  hideAliXiaomi(): void {
    if (this.FeedBackEntry) {
      this.FeedBackEntry.showFeedbackEntry();
      this.FeedBackEntry.toggleAliXiaomi(false);
    }
  }

  initAliXiaomi(): void {
    this._aliXiaoMi?.start();
  }

  setShowStageInUILevel(canShow: boolean): void {
    if (this.FeedBackEntry) {
      this.FeedBackEntry.setCanShowInUILevel(canShow);
    }
  }

  setSurvey(surveyUrl?: string): void {
    const entryContainer = document.querySelector('.feedbackEntry');
    if (entryContainer) {
      ReactDOM.unmountComponentAtNode(entryContainer);
      this.initEntryBtn(surveyUrl);
    }
  }

  onActiveEnvironmentChanged(event: EnvironmentChangedEvent): void {
    if (HSApp.Config.TENANT === 'fp') {
      const { newEnvironmentId, oldEnvironmentId } = event.data;
      const sparkPicEnvironments = [HSFPConstants.Environment.SparkPicEnv];

      if (sparkPicEnvironments.includes(newEnvironmentId)) {
        this.setSurvey('https://survey.alibaba.com/apps/zhiliao/31eLaLR6s');
      } else if (sparkPicEnvironments.includes(oldEnvironmentId)) {
        this.setSurvey();
      }
    }
  }

  injectToolbar(): void {
    const helpItem: HelpItem | undefined = this._pageheaderPlugin.getHelpItem('toolBar_help');

    if (this.app.appParams.biz === 'tpzz' && helpItem) {
      helpItem.add({
        label: ResourceManager.getString('toolbar_help_feedback'),
        name: 'toolBar_feedback',
        type: 'button',
        order: 500,
        onclick: () => {
          this.show(true);
        }
      });
    }
  }
}

HSApp.Plugin.registerPlugin('hsw.brand.ezhome.feedback.Plugin', EzHomeFeedbackPlugin);