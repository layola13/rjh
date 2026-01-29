import { UI } from './ui';
import { ConfigTypeEnum } from './config-types';
import { queryRemindFunctionList, queryRemindNewUser, queryFunctionConfig, noRemind } from './api';
import { contentConfig } from './content-config';
import { domainList } from './domain-list';
import { logRemind } from './log-util';
import { getMagic, getDomain } from './util';
import { debounce } from './debounce';

interface TargetRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EnvConfig {
  getTargetRect?: () => TargetRect;
  getTheme?: () => string;
  getModule?: () => string;
}

interface RemindFunction {
  functionKey: string;
}

interface RemindConfig {
  ruleId: string;
  contents: RemindContent[];
  awakeType: number;
  functionKey?: string;
  labelCode?: string;
  function?: string;
  label?: string;
}

interface RemindContent {
  articleUrl?: string;
  articleTitle?: string;
  marketUrl?: string;
}

interface RemindOptions {
  key: string;
  type: ConfigTypeEnum;
  config: RemindConfig;
}

interface ShowModelOptions {
  module?: string | (() => string);
  theme?: string;
  button?: TargetRect;
  data?: {
    userGuide?: unknown;
  };
  showPage?: PageConfig;
}

interface PageConfig {
  name: string;
  data: Record<string, unknown>;
}

interface TeachingAbilityButtonOptions {
  buttonTheme?: string;
  theme?: string;
  module: string | (() => string);
  className?: string;
}

interface FunctionContext {
  key: string;
  type: ConfigTypeEnum;
}

interface LogRemindOptions {
  actionType: string;
  description: string;
  id: string;
  name: string;
  config: RemindConfig;
}

interface SignalData {
  data?: {
    key?: string;
    cmd?: {
      key?: string;
      type?: string;
      getMode?: () => string;
    };
    newEnvironmentId?: string;
  };
}

export default class TeachingManager {
  private ui: UI;
  private remindFunctions: RemindFunction[] = [];
  private envConfig: Record<string, EnvConfig>;
  private readonly defaultEnvConfig: EnvConfig;
  private closeFunctions: Record<string, boolean>;
  private intoNowFunction: string = '';
  private remindKey: string = '';
  private signalHook: any;
  private remindOptions?: RemindOptions;
  private isNewUser?: boolean;

  constructor() {
    this.ui = new UI();
    this.envConfig = {};
    this.defaultEnvConfig = {
      getTargetRect: (): TargetRect => {
        const element = document.querySelector('.teaching-ability-button-wrapper');
        let rect = element?.getBoundingClientRect();
        if (!rect || !rect.width || !rect.height) {
          rect = this.getRightPosition();
        }
        return rect as TargetRect;
      },
      getTheme: (): string => 'teaching-light',
    };
    this.signalHook = new HSApp.HSCore.Util.SignalHook(this);
    this.closeFunctions = {};
    this.windowResize = debounce(this.windowResize.bind(this), 200);
    this.checkTeaching = this.checkTeaching.bind(this);
  }

  private getRightPosition(): TargetRect {
    return {
      x: document.body.clientWidth - 100,
      y: 0,
      width: 40,
      height: 40,
    };
  }

  async init(): Promise<void> {
    this.uninit();
    this.ui.init();
    this.fetchRemindFunctions();
    this.initSignal();
    // Assuming h.default is some module that needs initialization
    // h.default.init();
  }

  uninit(): void {
    this.signalHook.unlistenAll();
    // h.default.uninit();
  }

  onDeactive(): void {
    this.uninit();
  }

  private initSignal(): void {
    const app = HSApp.App.getApp();
    this.signalHook.listen(app.environmentManager.signalEnvironmentActivated, this.environmentActivated, this);
    this.signalHook.listen(app.cmdManager.signalCommandStarted, this.commandStarted, this);
    this.signalHook.listen(app.cmdManager.signalCommandTerminated, this.commandTerminated, this);
    this.signalHook.listen(app.signalCustomFunctionStart, this.customFunctionStart);
    this.signalHook.listen(app.signalCustomFunctionTerminated, this.customFunctionTerminated);
    window.addEventListener('resize', this.windowResize);
  }

  private windowResize(): void {
    if (this.remindKey && this.remindOptions) {
      this.showRemind(this.remindOptions);
    }
  }

  private removeSignal(): void {
    this.signalHook.unlistenAll();
    window.removeEventListener('resize', this.windowResize);
  }

  private customFunctionStart(signal: SignalData): void {
    const key = signal.data?.key;
    if (key) {
      this.intoFunction({
        key,
        type: ConfigTypeEnum.functions,
      });
    }
  }

  private customFunctionTerminated(signal: SignalData): void {
    const key = signal.data?.cmd?.key;
    if (key) {
      this.outFunction({
        key,
        type: ConfigTypeEnum.functions,
      });
    }
  }

  private commandTerminated(signal: SignalData): void {
    const type = signal.data?.cmd?.type;
    if (type) {
      this.outFunction({
        key: type,
        type: ConfigTypeEnum.functions,
      });
    }
  }

  private commandStarted(signal: SignalData): void {
    let cmdType = signal.data?.cmd?.type;
    if (cmdType) {
      const mode = signal.data?.cmd?.getMode?.call(signal.data.cmd);
      if (mode) {
        cmdType = `${cmdType}.${mode}`;
      }
      if (cmdType) {
        this.intoFunction({
          key: cmdType,
          type: ConfigTypeEnum.functions,
        });
      }
    }
  }

  private environmentActivated(signal: SignalData): void {
    let environmentId = signal.data?.newEnvironmentId;
    if (environmentId !== 'empty' && environmentId !== this.remindKey) {
      environmentId = this.moduleHandle(environmentId!);
      this.closeRemind({ key: this.remindKey });
      this.intoFunction({
        key: environmentId,
        type: ConfigTypeEnum.labels,
      });
    }
  }

  private async fetchRemindFunctions(): Promise<void> {
    let functions = await queryRemindFunctionList({
      domain: this.getDomain(),
      magic: this.getMagic(),
    });
    if (!functions) {
      functions = [];
    }
    this.remindFunctions = functions;
    this.isNewUser = await queryRemindNewUser();
  }

  getTeachingAbilityButton(options: TeachingAbilityButtonOptions): HTMLElement {
    const { buttonTheme, theme, module, className } = options;
    return this.ui.getTeachingAbilityButton({
      buttonTheme: buttonTheme || theme || 'teaching-light',
      showModel: ({ button }: { button: TargetRect }) => {
        this.showModel({
          module,
          theme: theme || 'teaching-light',
          button,
        });
      },
      className,
    });
  }

  private isShowGuide(): boolean {
    const guidePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
    return !!(guidePlugin && guidePlugin.showGuide());
  }

  showModel(options: ShowModelOptions): void {
    if (this.isShowGuide()) {
      return;
    }

    let moduleValue: string;
    if (typeof options.module === 'function') {
      moduleValue = options.module();
    } else if (typeof options.module === 'string') {
      moduleValue = options.module;
    } else {
      moduleValue = '';
    }
    moduleValue = this.getModule(moduleValue);

    const envConfig = { ...this.defaultEnvConfig, ...this.getEnvConfig() };
    const theme = options.theme || envConfig.getTheme?.() || 'teaching-light';
    let targetRect = options.button || envConfig.getTargetRect?.() || this.defaultEnvConfig.getTargetRect?.();

    if (!targetRect || targetRect.width === 0) {
      targetRect = this.getRightPosition();
    }

    const defaultPage: PageConfig = {
      name: 'HomePage',
      data: {
        module: moduleValue,
        userGuide: options.data?.userGuide,
      },
    };

    const showPage = options.showPage || defaultPage;

    this.ui.showModel({
      data: { showPage },
      button: targetRect,
      theme,
    });
  }

  closeModel(): void {
    this.ui.closeModel();
  }

  private async getRemindConfig(context: FunctionContext): Promise<RemindConfig | undefined> {
    try {
      const config = await queryFunctionConfig({
        type: context.type,
        keyWord: context.key,
        magic: this.getMagic(),
        domain: this.getDomain(),
      });
      return config;
    } catch {
      return undefined;
    }
  }

  private async intoFunction(context: FunctionContext): Promise<void> {
    const { type, key } = context;

    if (type === ConfigTypeEnum.functions && !this.remindFunctions.some(fn => fn.functionKey === key)) {
      return;
    }

    if (this.closeFunctions[key]) {
      return;
    }

    if (this.remindKey === key) {
      return;
    }

    this.intoNowFunction = key;
    const config = await this.getRemindConfig(context);

    if (!config || !config.ruleId || !config.contents?.length || this.intoNowFunction !== key) {
      return;
    }

    this.showRemind({
      key,
      type,
      config,
    });
  }

  private outFunction(context: FunctionContext): void {
    // Empty implementation
  }

  private async showRemind(options: RemindOptions): Promise<void> {
    const { key, type, config } = options;
    const queryStrings = HSApp.Util.Url.getQueryStrings();

    if (this.isShowGuide() || queryStrings.hxrr === 'true') {
      return;
    }

    if (!config?.ruleId) {
      return;
    }

    if (this.remindKey !== key) {
      this.logRemind({
        actionType: 'teaching.remind',
        description: '教程唤醒',
        id: '整体曝光',
        name: '整体曝光',
        config,
      });
    }

    if (contentConfig[config.awakeType]?.checkTeaching) {
      this.checkTeaching(config.contents[0]);
      return;
    }

    this.remindOptions = options;

    const envConfig = { ...this.defaultEnvConfig, ...this.getEnvConfig() };
    const theme = envConfig.getTheme?.() || 'teaching-light';
    let targetRect = envConfig.getTargetRect?.() || this.getRightPosition();
    let hideArrow = false;

    if (!targetRect?.width || !targetRect.height) {
      targetRect = this.getRightPosition();
      hideArrow = true;
    }

    this.remindKey = key;

    this.ui.showRemind({
      key,
      type: config.awakeType,
      theme: theme || 'teaching-light',
      targetRect,
      data: config.contents,
      hideArrow,
      close: () => {
        this.closeRemind({ key });

        if (type === ConfigTypeEnum.labels) {
          noRemind({ ruleId: config.ruleId });
        } else if (type === ConfigTypeEnum.functions) {
          this.closeFunctions[key] = true;
        }

        contentConfig[config.awakeType]?.closed?.({
          theme,
          targetRect,
          key,
          type,
          config,
        });

        this.logRemind({
          actionType: 'teaching.remind.close',
          description: '教程唤醒-关闭',
          id: 'close',
          name: '关闭',
          config,
        });
      },
      noRemind: async () => {
        await noRemind({ ruleId: config.ruleId });
        this.fetchRemindFunctions().catch(() => {});
        this.closeRemind({ key });

        contentConfig[config.awakeType]?.noRemind?.({
          theme,
          targetRect,
          key,
          type,
          config,
        });

        this.logRemind({
          actionType: 'teaching.remind.not.remind',
          description: '教程唤醒-不再提醒',
          id: 'not.remind',
          name: '不再提醒',
          config,
        });
      },
      checkTeaching: (content: RemindContent) => {
        this.checkTeaching(content);

        if (type === ConfigTypeEnum.functions) {
          this.closeRemind({ key });
          this.closeFunctions[key] = true;
        }

        this.logRemind({
          actionType: 'teaching.remind.check',
          description: '教程唤醒-查看详情',
          id: 'check',
          name: '查看详情',
          config,
        });
      },
    });
  }

  private logRemind(options: LogRemindOptions): void {
    const { actionType, description, id, name, config } = options;
    const domain = this.getDomain();
    const domainName = domainList.find(item => item.key === domain)?.name || domain;

    logRemind({
      actionType,
      description,
      clicksRatio: {
        id,
        name,
        subItem: {
          id: config.awakeType.toString(),
          name: contentConfig[config.awakeType].name,
          subItem: {
            id: this.isNewUser ? 'new-user' : 'old-user',
            name: this.isNewUser ? '新用户' : '老用户',
            subItem: {
              id: domain,
              name: domainName,
              subItem: {
                id: config.functionKey || config.labelCode || '',
                name: config.function || config.label || '',
              },
            },
          },
        },
      },
    });
  }

  private checkTeaching(content: RemindContent): void {
    if (content?.articleUrl && content?.articleTitle) {
      this.showModel({
        showPage: {
          name: 'ArticlePage',
          data: {
            url: content.articleUrl,
            title: content.articleTitle,
          },
        },
      });
      return;
    }

    if (content?.marketUrl) {
      window.open(content.marketUrl);
    }
  }

  private closeRemind(options: { key: string }): void {
    this.ui.closeRemind();
    this.remindKey = '';
    this.remindOptions = undefined;
  }

  private getModule(moduleParam?: string): string {
    let module = moduleParam || '';

    if (!module) {
      const envConfig = this.getEnvConfig();
      module = envConfig?.getModule?.() || '';
    }

    module = module || HSApp.App.getApp().activeEnvironmentId;
    return this.moduleHandle(module);
  }

  private getEnvConfig(): EnvConfig | undefined {
    return Object.values(this.envConfig).find(config => config.getModule?.());
  }

  private moduleHandle(environmentId: string): string {
    const moduleMapping: Record<string, () => string> = {
      'ncustomizedfeaturemodel.ncustomizedbackgroundwall': () => 'customizedfeaturemodel.customizedbackgroundwall',
      'ncustomizedfeaturemodel.ncustomizedceilingmodel': () => 'customizedfeaturemodel.customizedceilingmodel',
      'ncustomizedfeaturemodel.ncustomizedplatform': () => 'customizedfeaturemodel.customizedplatform',
    };

    return moduleMapping[environmentId] ? moduleMapping[environmentId]() : environmentId;
  }

  private getMagic(): string {
    return getMagic();
  }

  private getDomain(): string {
    return getDomain();
  }

  registerEnvConfig(key: string, config: EnvConfig): void {
    this.envConfig[key] = config;
  }
}