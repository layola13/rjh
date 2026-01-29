import { BaseObject } from './BaseObject';
import { CustomizedPMInstanceModel } from './CustomizedPMInstanceModel';

interface GraphicsDataAsync {
  objects: unknown[];
  meshDefs: unknown[];
  edgeInfos: unknown[];
}

interface GraphicsData {
  objects: unknown[];
  meshDefs: unknown[];
}

interface ChildAddedEvent {
  data: {
    entity: unknown;
  };
}

interface ChildRemovedEvent {
  data: unknown;
}

interface Entity {
  id: string;
  children: Record<string, unknown>;
  instanceOf(modelClass: string): boolean;
}

interface Context {
  dirtyObjectMap: Map<string, CustomizedPMModel>;
}

export class CustomizedPMModel extends BaseObject {
  protected geometryDirty?: boolean;
  protected childNodes?: Map<string, CustomizedPMInstanceModel>;
  protected entity: Entity;
  protected context: Context;

  constructor(entity: Entity, context: Context, parent?: unknown) {
    super(entity, context, parent);
  }

  createViewModel(entity: unknown): void {
    if (!entity) {
      return;
    }

    if (!(entity as Entity).instanceOf(HSConstants.ModelClass.CustomizedPMInstanceModel)) {
      super.createViewModel(entity);
      return;
    }

    const viewModel = new CustomizedPMInstanceModel(
      entity as Entity,
      this.context,
      this
    );

    if (this.childNodes) {
      this.childNodes.set((entity as Entity).id, viewModel);
    }
  }

  onInit(): void {
    Object.values(this.entity.children).forEach((child) => {
      this.createViewModel(child);
    }, this);
  }

  onChildAdded(event: ChildAddedEvent): void {
    const entity = event.data.entity;
    
    if (entity) {
      this.createViewModel(entity);
      this.geometryDirty = true;
      this.context.dirtyObjectMap.set(this.getEntityID(), this);
    }
  }

  onChildRemoved(event: ChildRemovedEvent): void {
    super.onChildRemoved(event);
    this.geometryDirty = true;
    this.context.dirtyObjectMap.set(this.getEntityID(), this);
  }

  async toGraphicsDataAsync(): Promise<GraphicsDataAsync> {
    return {
      objects: [],
      meshDefs: [],
      edgeInfos: []
    };
  }

  toGraphicsData(): GraphicsData {
    return {
      objects: [],
      meshDefs: []
    };
  }

  onCleanup(): void {
    super.onCleanup();
  }
}