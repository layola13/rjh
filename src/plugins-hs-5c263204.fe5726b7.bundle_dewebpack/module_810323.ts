import { IPlugin, registerPlugin } from 'HSApp/Plugin';
import { PluginType } from 'HSFPConstants';

interface ModelHandle {
  init(): void;
  showModel(arg1: unknown, arg2: unknown): void;
  closeModel(): void;
}

class ModelHandleImpl implements ModelHandle {
  init(): void {
    // Implementation placeholder
  }

  showModel(arg1: unknown, arg2: unknown): void {
    // Implementation placeholder
  }

  closeModel(): void {
    // Implementation placeholder
  }
}

interface PluginOptions {
  dependencies: PluginType[];
}

class HotkeyModelPlugin extends IPlugin {
  private handle: ModelHandle;

  constructor() {
    const options: PluginOptions = {
      dependencies: [PluginType.PageHeader]
    };
    
    super(options);
    
    this.handle = new ModelHandleImpl();
    this.showModel = this.showModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
  }

  onActive(): void {
    this.init();
    
    HSApp.App.getApp().environmentManager.signalEnvironmentActivated.listen(() => {
      this.closeModel();
    });
  }

  onDeactive(): void {
    // Lifecycle hook - no implementation needed
  }

  private init(): void {
    this.handle.init();
  }

  showModel(arg1: unknown, arg2: unknown): void {
    this.handle.showModel(arg1, arg2);
  }

  closeModel(): void {
    this.handle.closeModel();
  }
}

registerPlugin(PluginType.hotkeyModel, HotkeyModelPlugin);