import { SignalHook } from './SignalHook';

interface Entity {
  id: string;
  children: Record<string, Entity>;
  signalChildAdded: Signal<ChildEventData>;
  signalChildRemoved: Signal<ChildEventData>;
  [key: string]: unknown;
}

interface ChildEventData {
  entity: Entity;
}

interface Signal<T> {
  data: T;
}

interface ConfigAction {
  actionType: string;
  callbackSet: Set<SignalCallback<unknown>>;
}

type SignalCallback<T> = (signal: Signal<T>) => void;

interface ConfigRegister {
  getMatchedActionsByType(entity: Entity): ConfigAction[];
  isAvailableType(entity: Entity | undefined): boolean;
}

interface NodeContext {
  createRelationshipModel?: (entity: Entity, parent: Node) => Node | undefined;
  configRegister: ConfigRegister;
}

export class Node {
  public childNodes: Map<string, Node>;
  public signalHook: SignalHook | undefined;
  public entity: Entity | undefined;
  public context: NodeContext;
  public parent: Node | undefined;

  constructor(entity: Entity, context: NodeContext, parent?: Node) {
    this.childNodes = new Map();
    this.signalHook = new SignalHook(this);
    this.entity = entity;
    this.context = context;
    this.parent = parent;
    this._init();

    if (this.entity && this.signalHook) {
      this.signalHook
        .listen(this.entity.signalChildAdded, this.onChildAdded)
        .listen(this.entity.signalChildRemoved, this.onChildRemoved);
    }
  }

  public getEntityID(): string {
    return this.entity?.id ?? '';
  }

  private _init(): void {
    this.onInit();
  }

  protected onInit(): void {
    if (this.entity) {
      Object.values(this.entity.children).forEach((childEntity: Entity) => {
        this.createRelationshipModel(childEntity);
      });
      this._bindConfigActions();
    }
  }

  public clear(): void {
    this.onClear();

    if (this.childNodes) {
      this.childNodes.forEach((childNode: Node) => {
        childNode.clear();
      });
      this.childNodes.clear();
    }

    if (this.signalHook) {
      this.signalHook.dispose();
      this.signalHook = undefined;
    }

    this.entity = undefined;
  }

  protected onClear(): void {}

  private onChildAdded(signal: Signal<ChildEventData>): void {
    const entity = signal.data.entity;
    if (entity) {
      this.createRelationshipModel(entity);
    }
  }

  private onChildRemoved(signal: Signal<ChildEventData>): void {
    const entity = signal.data.entity;
    if (!entity) return;

    const childNode = this.childNodes.get(entity.id);
    if (childNode) {
      this.childNodes.delete(entity.id);
      childNode.clear();
    }
  }

  private createRelationshipModel(entity: Entity): void {
    if (!this.context.createRelationshipModel) return;

    const relationshipModel = this.context.createRelationshipModel(entity, this);
    if (relationshipModel) {
      this.childNodes.set(entity.id, relationshipModel);
    }
  }

  private _bindConfigActions(): void {
    if (!this.entity) return;

    this.context.configRegister
      .getMatchedActionsByType(this.entity)
      .forEach((configAction: ConfigAction) => {
        const { actionType, callbackSet } = configAction;
        const signal = this.entity?.[actionType];

        if (signal) {
          callbackSet.forEach((callback: SignalCallback<unknown>) => {
            this.signalHook?.listen(signal as Signal<unknown>, callback);
          });
        }
      });
  }

  private _rebindHooks(): void {
    if (this.signalHook && this.entity) {
      this.signalHook.unlistenAll();
      this.signalHook
        .listen(this.entity.signalChildAdded, this.onChildAdded)
        .listen(this.entity.signalChildRemoved, this.onChildRemoved);
      this._bindConfigActions();
    }
  }

  public update(): void {
    if (this.context.configRegister.isAvailableType(this.entity)) {
      this._rebindHooks();

      if (this.entity) {
        Object.values(this.entity.children).forEach((childEntity: Entity) => {
          const existingChild = this.childNodes.get(childEntity?.id);
          if (existingChild) {
            existingChild.update();
          } else {
            this.createRelationshipModel(childEntity);
          }
        });
      }
    } else {
      this.clear();
    }
  }
}