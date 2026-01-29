interface TemplateEntity {
  // Define properties based on your actual template entity structure
  [key: string]: unknown;
}

interface CommandManager {
  cancel(): void;
  // Add other command manager methods as needed
}

interface App {
  cmdManager: CommandManager;
}

interface HSAppNamespace {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSAppNamespace;
declare function assert(condition: boolean): asserts condition;

export default class StyleApplier {
  private templateEntity: TemplateEntity | undefined;
  private cmdMgr: CommandManager | undefined;

  constructor(templateEntity: TemplateEntity) {
    this.templateEntity = templateEntity;
    const app = HSApp.App.getApp();
    this.cmdMgr = app.cmdManager;
  }

  applyStyle(style: unknown): void {
    this.cmdMgr?.cancel();
    this.onApplyStyle(style);
  }

  onApplyStyle(style: unknown): void {
    assert(false);
  }

  cleanUp(): void {
    this.templateEntity = undefined;
    this.cmdMgr = undefined;
  }
}