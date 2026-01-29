interface SimulatedContent {
  [key: string]: unknown;
}

interface Entity {
  simulatedContent: SimulatedContent;
  setSimulationContent(meta: SimulatedContent): void;
  assignTo(host: unknown): void;
  getHost(): unknown;
}

interface TransactionRequest {
  new (...args: unknown[]): TransactionRequest;
}

declare const HSCore: {
  Transaction: {
    Request: TransactionRequest;
  };
};

declare const _: {
  cloneDeep<T>(value: T): T;
};

class SimulationContentTransaction extends HSCore.Transaction.Request {
  private entity: Entity;
  private meta: SimulatedContent;
  private host: unknown;
  private beforeSimulatedContent: SimulatedContent;
  private afterSimulatedContent: SimulatedContent | undefined;
  private beforeHost: unknown;

  constructor(entity: Entity, meta: SimulatedContent, host: unknown) {
    super();
    this.entity = entity;
    this.meta = meta;
    this.host = host;
    this.beforeSimulatedContent = _.cloneDeep(entity.simulatedContent);
    this.afterSimulatedContent = undefined;
    this.beforeHost = entity.getHost();
  }

  onCommit(): void {
    if (this.entity && this.meta) {
      this.entity.setSimulationContent(this.meta);
      this.afterSimulatedContent = _.cloneDeep(this.entity.simulatedContent);
      if (this.host !== undefined) {
        this.entity.assignTo(this.host);
      }
    }
  }

  onUndo(): void {
    this.entity.setSimulationContent(this.beforeSimulatedContent);
    this.entity.assignTo(this.beforeHost);
  }

  onRedo(): void {
    if (this.afterSimulatedContent !== undefined) {
      this.entity.setSimulationContent(this.afterSimulatedContent);
    }
    if (this.host !== undefined) {
      this.entity.assignTo(this.host);
    }
  }
}

export default SimulationContentTransaction;