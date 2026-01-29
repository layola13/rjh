import { TaskHander } from './TaskHandler';
import { TaskTemplate } from './TaskTemplate';
import { showTips, closeTips } from './TipsUtils';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface Dependencies {
  permission: boolean;
  documentOpened: boolean;
  configReady: boolean;
}

interface TipConfig {
  contentMdsKeyValue?: string;
  [key: string]: unknown;
}

interface TaskConfig {
  tips?: TipConfig[];
  [key: string]: unknown;
}

interface Task {
  taskCode: string;
  listen?: () => void;
  [key: string]: unknown;
}

interface DocumentOpenedData {
  isNewDocument: boolean;
}

interface DocumentOpenedEvent {
  data: DocumentOpenedData;
}

class TaskCenterPlugin extends HSApp.Plugin.IPlugin {
  public readonly importFloorplanSignal: HSCore.Util.Signal;
  public readonly panoramarenderSignal: HSCore.Util.Signal;
  public readonly inspirationLibrarySignal: HSCore.Util.Signal;
  
  private readonly _handler: TaskHander;
  private readonly _dependencies: Dependencies;

  constructor() {
    const config: PluginConfig = {
      name: "Task Center Plugin",
      description: "task center plugin",
      dependencies: ["hsw.brand.ezhome.firstlogin.Plugin"]
    };
    
    super(config);
    
    this.importFloorplanSignal = new HSCore.Util.Signal();
    this.panoramarenderSignal = new HSCore.Util.Signal();
    this.inspirationLibrarySignal = new HSCore.Util.Signal();
    
    this._dependencies = {
      permission: false,
      documentOpened: false,
      configReady: false
    };
    
    this._handler = new TaskHander();
    this._init();
  }

  private _init(): void {
    this.handler.init();
  }

  public onActive(pluginManager: unknown, plugins: Record<string, unknown>): void {
    const firstLoginPlugin = plugins["hsw.brand.ezhome.firstlogin.Plugin"] as any;
    
    if (firstLoginPlugin?.signalCheckPermissionsCompleted) {
      firstLoginPlugin.signalCheckPermissionsCompleted.listen(() => {
        this._dependencies.permission = true;
        this.start();
      });
    }

    const app = HSApp.App.getApp();
    app.signalDocumentOpened.listen((event: DocumentOpenedEvent) => {
      if (!app.appParams.assetId || !event.data.isNewDocument) {
        this._dependencies.documentOpened = true;
      }
      this.start();
    });

    this.handler.configReadySignal.listen(() => {
      this._dependencies.configReady = true;
      this.start();
    });
  }

  public start(): void {
    const allReady = Object.keys(this._dependencies).every(
      (key) => this._dependencies[key as keyof Dependencies]
    );

    if (allReady) {
      TaskTemplate.forEach((task: Task) => {
        task.listen?.();
      });
      this.handler.loadTaskCenter();
    }
  }

  public showHint(tipConfig: TipConfig, tipIndex: number = 0): void {
    const defaultConfig = this.handler.getDefaultTaskConfig();
    
    if (defaultConfig?.tips?.length) {
      Object.assign(tipConfig, defaultConfig.tips[tipIndex]);
    }

    if (tipConfig.contentMdsKeyValue) {
      showTips(tipConfig);
    }
  }

  public nextStep(stepData: unknown): void {
    this.handler.nextStep(stepData);
  }

  public hideHint(): void {
    closeTips();
  }

  public registerTask(taskCode: string, updates: Partial<Task>): void {
    const task = TaskTemplate.find((t: Task) => t.taskCode === taskCode);
    
    if (task && updates) {
      Object.keys(updates).forEach((key) => {
        task[key] = updates[key];
      });
    }
  }

  public get handler(): TaskHander {
    return this._handler;
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.TaskCenter, TaskCenterPlugin);