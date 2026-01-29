interface MigrationServicePluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface App {
  openDocument(data: unknown): Promise<void>;
  saveDocument(): Promise<unknown>;
}

interface PluginContext {
  app: App;
}

interface WorkerMessageEvent {
  data: unknown;
}

interface MigrationWorker extends Worker {
  onmessage: ((event: WorkerMessageEvent) => void) | null;
  postMessage(data: unknown): void;
  terminate(): void;
}

/**
 * Migration service plugin for upgrading floorplan designs to the latest version
 */
class MigrationServicePlugin extends HSApp.Plugin.IPlugin {
  private _app!: App;

  constructor() {
    const config: MigrationServicePluginConfig = {
      name: "Migration service plugin",
      description: "migrate floorplan design to latest version",
      dependencies: []
    };

    super(config);
  }

  onActive(context: PluginContext): void {
    this._app = context.app;
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }

  async migrateDesign(designData: unknown): Promise<unknown> {
    const app = this._app;
    await app.openDocument(designData);
    return app.saveDocument();
  }

  migrateToV2(data: unknown): Promise<unknown> {
    return new Promise((resolve) => {
      const worker: MigrationWorker = new Worker() as MigrationWorker;
      
      worker.onmessage = (event: WorkerMessageEvent) => {
        worker.terminate();
        resolve(event.data);
      };
      
      worker.postMessage(data);
    });
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.migrationService.Plugin", MigrationServicePlugin);