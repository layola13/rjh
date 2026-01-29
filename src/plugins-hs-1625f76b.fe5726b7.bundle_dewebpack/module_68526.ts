interface MaterialDataMap {
  [key: string]: unknown;
}

type MaterialMapKey = string;

interface TransactionManager {
  createRequest(
    requestType: string,
    params: [unknown, MaterialDataMap, MaterialMapKey[]]
  ): unknown;
  commit(request: unknown): void;
  clear(): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface Entity {
  [key: string]: unknown;
}

declare namespace HSFPConstants {
  enum RequestType {
    ContentMaterialResetAllRequest = 'ContentMaterialResetAllRequest'
  }
}

declare namespace HSApp.Cmd {
  class Command {
    protected context: CommandContext;
    onExecute(): void;
    canUndoRedo(): boolean;
  }
}

export default class MaterialResetCommand extends HSApp.Cmd.Command {
  private entity: Entity;
  private oldMaterialDataMap: MaterialDataMap;
  private materialMapKeys: MaterialMapKey[];

  constructor(
    entity: Entity,
    oldMaterialDataMap: MaterialDataMap,
    materialMapKeys: MaterialMapKey[]
  ) {
    super();
    this.entity = entity;
    this.oldMaterialDataMap = oldMaterialDataMap;
    this.materialMapKeys = materialMapKeys;
  }

  onExecute(): void {
    const transManager = this.context.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ContentMaterialResetAllRequest,
      [this.entity, this.oldMaterialDataMap, this.materialMapKeys]
    );
    transManager.commit(request);
    transManager.clear();
  }

  canUndoRedo(): boolean {
    return false;
  }
}