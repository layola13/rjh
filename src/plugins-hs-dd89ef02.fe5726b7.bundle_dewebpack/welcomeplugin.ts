import { HSApp } from './518193';
import { Handler } from './636209';
import { HSCore } from './635589';

interface StatusChangedPayload {
  status: unknown;
}

export class WelcomePlugin extends HSApp.Plugin.IPlugin {
  private handler: Handler;
  public signalStatusChanged: HSCore.Util.Signal<WelcomePlugin>;

  constructor() {
    super({
      name: "welcome plugin",
      description: "provide welcome component",
      dependencies: [
        "hsw.plugin.switchlanguage.Plugin",
        "hsw.plugin.signin.Plugin",
        HSFPConstants.PluginType.Persistence
      ]
    });

    this.handler = new Handler();
    this.signalStatusChanged = new HSCore.Util.Signal(this);
  }

  onActive(e: unknown, n: unknown): void {
    super.onActive(e, n);
    this.handler.init(e, n);
  }

  onDeactive(): void {
    // No implementation
  }

  pause(): void {
    this.handler.pause();
  }

  resume(): void {
    this.handler.resume();
  }

  showWelcome(): void {
    this.handler.showWelcome();
  }

  showOpenDesign(): void {
    this.handler.showOpenDesign();
  }

  close(): void {
    this.handler.close();
  }

  reopen(): void {
    this.handler.reopen();
  }

  disableWalkthrough(): void {
    this.handler.disableWalkthrough();
  }

  showWalkthrough(e: unknown): void {
    this.handler.showWalkthrough(e);
  }

  setShowWelcome(e: boolean): void {
    this.handler.setShowWelcome(e);
  }

  openSurveyUrl(): void {
    // No implementation
  }

  updateStatus(e: unknown): void {
    this.signalStatusChanged.dispatch({
      status: e
    });
  }

  showQuestionnaire(): void {
    this.handler.showQuestionnaire();
  }

  showWelcomeTemplate(): void {
    this.handler.showWelcomeTemplate();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.Welcome, WelcomePlugin);