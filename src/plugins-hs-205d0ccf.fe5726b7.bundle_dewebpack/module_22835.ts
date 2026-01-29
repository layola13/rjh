import { HSApp } from './HSApp';
import { Logger } from './Logger';
import { TeachingAbilityButtonOptions } from './TeachingAbilityButtonOptions';
import { TeachingAbilityHandle } from './TeachingAbilityHandle';
import { isHXRR } from './utils';

interface ShowModelParams {
  module: string;
  buttonTheme?: string;
  theme?: string;
  className?: string;
}

interface GetTeachingAbilityButtonParams {
  buttonTheme?: string;
  theme?: string;
  module: string;
  className?: string;
}

/**
 * Teaching Ability Plugin
 * Manages teaching ability features including model display, reminders, and UI integration
 */
class TeachingAbilityPlugin extends HSApp.Plugin.IPlugin {
  private handle: TeachingAbilityHandle;
  private logger: Logger;

  constructor() {
    super({
      dependencies: [
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.LeftMenu
      ]
    });

    this.handle = new TeachingAbilityHandle();
    this.logger = new Logger();
    this.showModel = this.showModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  /**
   * Called when the plugin is activated
   */
  onActive(event: unknown, plugins: Record<string, any>): void {
    const app = HSApp.App.getApp();
    const pageHeaderPlugin = plugins[HSFPConstants.PluginType.PageHeader];

    if (!isHXRR()) {
      pageHeaderPlugin.addItem(
        new TeachingAbilityButtonOptions({
          showModel: () => {
            const guidePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
            if (guidePlugin) {
              guidePlugin.unmountGuideTip();
            }
            this.showModel({
              module: app.activeEnvironmentId
            });
          },
          closeModel: this.closeModel
        }),
        'right',
        'TeachingAbilityButton'
      );
    }

    this.init();
    app.environmentManager.signalEnvironmentActivated.listen(this.closeModel, this);
    this.logger.onActive();
  }

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void {
    this.logger.onDeactive();
  }

  /**
   * Initialize the plugin
   */
  init(): void {
    this.handle.init();
  }

  /**
   * Get teaching ability button component
   */
  getTeachingAbilityButton(params: GetTeachingAbilityButtonParams): any {
    const { buttonTheme, theme, module, className } = params;

    if (isHXRR()) {
      return null;
    }

    return this.handle.getTeachingAbilityButton({
      buttonTheme,
      theme,
      module,
      className
    });
  }

  /**
   * Get teaching ability button options class
   */
  getTeachingAbilityButtonOptions(): typeof TeachingAbilityButtonOptions {
    return TeachingAbilityButtonOptions;
  }

  /**
   * Show the teaching ability model
   */
  showModel(params: ShowModelParams): void {
    this.handle.showModel(params);
  }

  /**
   * Close the teaching ability model
   */
  closeModel(): void {
    this.handle.closeModel();
  }

  /**
   * Show reminder notification
   */
  showRemind(params: unknown): void {
    this.handle.showRemind(params);
  }

  /**
   * Close reminder notification
   */
  closeRemind(params: unknown): void {
    this.handle.closeRemind(params);
  }

  /**
   * Reset the plugin to initial state
   */
  resetPlugin(): void {
    const app = HSApp.App.getApp();

    app.environmentManager.signalEnvironmentActivated.unlisten(this.closeModel, this);

    const pageHeaderPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.PageHeader);
    pageHeaderPlugin.addItem(
      new TeachingAbilityButtonOptions({
        showModel: () => {
          const guidePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
          if (guidePlugin) {
            guidePlugin.unmountGuideTip();
          }
          this.showModel({
            module: app.activeEnvironmentId
          });
        },
        closeModel: this.closeModel
      }),
      'right',
      'TeachingAbilityButton'
    );

    this.init();
    app.environmentManager.signalEnvironmentActivated.listen(this.closeModel, this);
    this.logger.onActive();
  }

  /**
   * Register environment configuration
   */
  registerEnvConfig(envId: string, config: unknown): void {
    this.handle.registerEnvConfig(envId, config);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.TeachingAbility, TeachingAbilityPlugin);