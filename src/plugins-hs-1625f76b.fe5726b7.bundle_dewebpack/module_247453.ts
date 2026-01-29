interface IParentContainer {
  hasChild(child: ICloneable): boolean;
  removeChild(id: string, param1: boolean, param2: boolean): void;
  addChild(child: ICloneable): void;
}

interface ICloneable {
  ID: string;
  x: number;
  y: number;
  parents: Record<string, IParentContainer>;
  clone(): ICloneable;
  assignTo(host: unknown | null): void;
  getHost(): unknown;
}

declare const HSFPConstants: {
  LogGroupTypes: {
    ContentOperation: string;
  };
};

declare const HSApp: {
  Cmd: {
    Command: new () => Command;
  };
};

declare function log(message: string): void;

abstract class Command {
  abstract onExecute(): void;
  abstract onCleanup(): void;
  abstract onReceive(param1: unknown, param2: unknown): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export default class DuplicateContentCommand extends Command {
  private src: ICloneable;
  private dup?: ICloneable;
  private saved?: ICloneable;
  private host?: unknown;

  constructor(source: ICloneable) {
    super();
    this.src = source;
  }

  onExecute(): void {
    log(`todo ----- duplicate content logic here: src=${this.src.ID}`);
    
    const duplicated = this.src.clone();
    duplicated.x = this.src.x + 0.5;
    duplicated.y = this.src.y - 0.5;
    
    const parentKey = Object.keys(this.src.parents)[0];
    const parent = this.src.parents[parentKey];
    
    if (parent.hasChild(duplicated)) {
      parent.removeChild(duplicated.ID, true, false);
    }
    
    parent.addChild(duplicated);
    duplicated.assignTo(null);
    
    this.dup = duplicated;
    this.saved = duplicated;
    this.host = duplicated.getHost();
  }

  onCleanup(): void {
    // No cleanup logic needed
  }

  onReceive(param1: unknown, param2: unknown): void {
    this.src;
  }

  onUndo(): void {
    const parentKey = Object.keys(this.src.parents)[0];
    const parent = this.src.parents[parentKey];
    
    if (this.saved) {
      parent.removeChild(this.saved.ID, true, false);
      this.saved.assignTo(null);
    }
  }

  onRedo(): void {
    const parentKey = Object.keys(this.src.parents)[0];
    const parent = this.src.parents[parentKey];
    
    if (this.saved) {
      parent.addChild(this.saved);
      this.saved.assignTo(this.host ?? null);
    }
  }

  getDescription(): string {
    return "复制物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}