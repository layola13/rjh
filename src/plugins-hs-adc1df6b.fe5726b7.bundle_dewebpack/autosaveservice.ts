import { BaseSaveService } from './BaseSaveService';
import { SaveStageEnum } from './SaveStageEnum';
import { SaveHasTaskStage } from './SaveHasTaskStage';
import {
  LoadingCheckTask,
  DesignEditStateTask,
  ReadonlyModeCheckTask,
  ExportRoominfoTask,
  AutoRemotePersisterTask,
  AutoLocalPersisterTask
} from './tasks';

interface SaveAttributes {
  doSave?: boolean;
}

interface SaveResult {
  status: 'success' | 'error';
  [key: string]: unknown;
}

interface FloorplanData {
  [key: string]: unknown;
}

interface SaveOptions {
  ignoreMixPaintTextureURI?: boolean;
}

interface App {
  floorplan: {
    saveToJSON(options: SaveOptions): FloorplanData;
  };
}

export class AutoSaveService extends BaseSaveService {
  private savePostDataStage: SaveHasTaskStage;
  private doSave: boolean;

  constructor(app: App) {
    super(app);
    
    this.doSave = true;

    this.registerService(
      'loadingCheckTask',
      SaveStageEnum.Check,
      new LoadingCheckTask({ hideLivehint: true })
    );

    this.registerService(
      'designEditStateTask',
      SaveStageEnum.Check,
      new DesignEditStateTask()
    );

    this.registerService(
      'readonlyModeCheck',
      SaveStageEnum.Check,
      new ReadonlyModeCheckTask({ hideLivehint: true })
    );

    this.registerService(
      'exportRoominfoTask',
      SaveStageEnum.Subsequent,
      ExportRoominfoTask.getExportRoominfoTask()
    );

    this.savePostDataStage = new SaveHasTaskStage({ saveService: this });
    this.savePostDataStage.registerTaskService('remotePersister', new AutoRemotePersisterTask());
    this.savePostDataStage.registerTaskService('localPersister', new AutoLocalPersisterTask());
  }

  setAttribute(attributes: SaveAttributes): void {
    if (attributes.doSave !== undefined) {
      this.doSave = attributes.doSave;
    }
  }

  save(options: unknown): Promise<SaveResult> {
    return super.save(options);
  }

  getData(options: unknown): FloorplanData {
    return this.app.floorplan.saveToJSON({
      ignoreMixPaintTextureURI: true
    });
  }

  async savePostDate(data: FloorplanData, options: unknown): Promise<SaveResult> {
    if (!this.doSave) {
      return { status: 'success' };
    }

    return this.savePostDataStage.execute(data, options);
  }
}