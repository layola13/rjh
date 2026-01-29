interface Entity {
  simulatedContent: unknown;
  contents: Record<string, Content>;
  restoreSoftCloth(): void;
  setSimulationContent(content: unknown): void;
}

interface Content {
  assignTo(entity: Entity): void;
}

declare namespace HSCore.Transaction {
  class Request {
    constructor();
  }
}

declare const _: {
  cloneDeep<T>(value: T): T;
};

class SoftClothRestoreRequest extends HSCore.Transaction.Request {
  private entity: Entity;
  private beforeSimulatedContent: unknown;
  private beforeContents: Record<string, Content>;

  constructor(entity: Entity) {
    super();
    this.entity = entity;
    this.beforeSimulatedContent = _.cloneDeep(entity.simulatedContent);
    this.beforeContents = { ...entity.contents };
  }

  onCommit(): void {
    this.entity.restoreSoftCloth();
  }

  onUndo(): void {
    this.entity.setSimulationContent(this.beforeSimulatedContent);
    Object.values(this.beforeContents).forEach((content) => {
      content.assignTo(this.entity);
    });
  }

  onRedo(): void {
    this.entity.restoreSoftCloth();
  }
}

export default SoftClothRestoreRequest;