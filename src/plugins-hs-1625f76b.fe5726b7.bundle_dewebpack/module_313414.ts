import { HSApp } from './HSApp';

interface EntityMetadata {
  [key: string]: unknown;
}

interface Entity {
  metadata: EntityMetadata;
}

interface MaterialData {
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(
    requestType: string,
    params: [Entity, string, MaterialData, unknown]
  ): unknown;
  commit(request: unknown): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

export default class MaterialReplaceCommand extends HSApp.Cmd.Command {
  private entity: Entity;
  private meshName: string;
  private materialData: MaterialData;

  constructor(entity: Entity, meshName: string, materialData: MaterialData) {
    super();
    this.entity = entity;
    this.meshName = meshName;
    this.materialData = materialData;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    const customizeSize = HSApp.Util.Entity.getEntityCustomizeSize(
      this.entity.metadata
    );
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ContentMaterialReplaceRequest,
      [this.entity, this.meshName, this.materialData, customizeSize]
    );
    transManager.commit(request);
  }

  canUndoRedo(): boolean {
    return false;
  }
}