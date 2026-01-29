interface MaterialData {
  [key: string]: unknown;
}

interface Material {
  getMaterialData(): MaterialData;
  onEntityDirty(): void;
}

interface Entity {
  getMaterial(componentName: string): Material | null | undefined;
  dirtyMaterial(): void;
}

interface MessageEvent {
  msg: string;
  data: Record<string, unknown>;
}

interface TransactionManager {
  createRequest(
    requestType: string,
    params: [Entity, string, MaterialData | undefined]
  ): unknown;
  commit(request: unknown): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface Command {
  context: CommandContext;
  onExecute(): void;
  onReceive(event: MessageEvent): boolean;
  canUndoRedo(): boolean;
}

abstract class BaseCommand implements Command {
  abstract context: CommandContext;
  abstract onExecute(): void;
  abstract onReceive(event: MessageEvent): boolean;
  abstract canUndoRedo(): boolean;
}

class MaterialChangeUVCommand extends BaseCommand {
  private entity: Entity;
  private componentName: string;
  private materialData: MaterialData | undefined;
  context!: CommandContext;

  constructor(entity: Entity, componentName: string, materialData?: MaterialData) {
    super();
    this.entity = entity;
    this.componentName = componentName;

    const existingMaterial = this.entity.getMaterial(this.componentName);
    this.materialData = materialData ?? existingMaterial?.getMaterialData();
  }

  onExecute(): void {
    const transactionManager = this.context.transManager;
    const request = transactionManager.createRequest(
      'HSFPConstants.RequestType.ContentMaterialChangeUVRequest',
      [this.entity, this.componentName, this.materialData]
    );
    transactionManager.commit(request);
  }

  onReceive(event: MessageEvent): boolean {
    if (event.msg === 'changeUV') {
      const data = event.data;
      const material = this.entity.getMaterial(this.componentName);

      if (material) {
        Object.assign(material, data);
        material.onEntityDirty();
      }

      this.entity.dirtyMaterial();
      return true;
    }

    return false;
  }

  canUndoRedo(): boolean {
    return false;
  }
}

export default MaterialChangeUVCommand;