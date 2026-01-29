import { HSApp } from './HSApp';

interface MaterialDataMap {
  [key: string]: unknown;
}

/**
 * Command to replace materials for all matching entities
 */
export default class ReplaceMaterialCommand extends HSApp.Cmd.Command {
  private entities: unknown[];
  private materialDataMap: MaterialDataMap | undefined;

  constructor(entities: unknown[] = [], materialDataMap?: MaterialDataMap) {
    super();
    this.entities = entities;
    this.materialDataMap = materialDataMap;
  }

  onExecute(): void {
    const transactionManager = this.context.transManager;
    const request = transactionManager.createRequest(
      HSFPConstants.RequestType.ContentsMaterialReplaceAllRequest,
      [this.entities, this.materialDataMap]
    );
    transactionManager.commit(request);
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "材质应用到相同模型";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}