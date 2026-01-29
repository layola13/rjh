interface DirtyEvent {
  type: string;
  options?: Record<string, unknown>;
}

interface FlagChangedEvent {
  flag: number;
  [key: string]: unknown;
}

/**
 * Interactive model class for managing entity state and flags
 */
export class InteractiveModel {
  private _id: string = "";
  private _flag: number = 0;
  private _tempFlag: number = 0;
  
  public readonly signalFlagChanged: HSCore.Util.Signal<FlagChangedEvent>;
  public readonly signalDirty: HSCore.Util.Signal<DirtyEvent>;

  constructor(id: string = "") {
    this.signalFlagChanged = new HSCore.Util.Signal(this);
    this.signalDirty = new HSCore.Util.Signal(this);
    this._id = id;
    this.generateId();
  }

  get id(): string {
    return this._id;
  }

  generateId(): void {
    this._id = HSCore.Util.IDGeneratorType.Temp + HSCore.Util.IDGenerator.generate(
      undefined, 
      HSCore.Util.IDGeneratorType.Temp
    );
  }

  dirty(event?: DirtyEvent, options: Record<string, unknown> = {}): void {
    const dirtyEvent = event ?? { type: HSCore.Model.EntityEventType.Display };
    dirtyEvent.options = options;
    this.signalDirty.dispatch(dirtyEvent);
  }

  canEdit(): boolean {
    return !this.isFlagOn(HSCore.Model.EntityFlagEnum.freezed);
  }

  canSelect(): boolean {
    return !this.isFlagOn(
      HSCore.Model.EntityFlagEnum.removed | HSCore.Model.EntityFlagEnum.unselectable
    );
  }

  isFlagOn(flag: number, includeTemp: boolean = true): boolean {
    return HSCore.Util.Flag.isFlagOn(this._flag, flag) || 
           (includeTemp && HSCore.Util.Flag.isFlagOn(this._tempFlag, flag));
  }

  isFlagOff(flag: number, includeTemp: boolean = true): boolean {
    return HSCore.Util.Flag.isFlagOff(this._flag, flag) && 
           (!includeTemp || HSCore.Util.Flag.isFlagOff(this._tempFlag, flag));
  }

  setFlagOn(flag: number, isTemp: boolean = false, metadata: Record<string, unknown> = {}): void {
    const wasFlagOn = this.isFlagOn(flag);
    
    if (isTemp) {
      this._tempFlag = HSCore.Util.Flag.setFlagOn(this._tempFlag, flag);
    } else {
      this._flag = HSCore.Util.Flag.setFlagOn(this._flag, flag);
    }
    
    if (!wasFlagOn && this.signalFlagChanged) {
      this.signalFlagChanged.dispatch({ flag, ...metadata });
    }
  }

  setFlagOff(flag: number, isTemp: boolean = false, metadata: Record<string, unknown> = {}): void {
    const wasFlagOff = this.isFlagOff(flag);
    
    if (isTemp) {
      this._tempFlag = HSCore.Util.Flag.setFlagOff(this._tempFlag, flag);
    } else {
      this._flag = HSCore.Util.Flag.setFlagOff(this._flag, flag);
    }
    
    if (wasFlagOff !== this.isFlagOff(flag) && this.signalFlagChanged) {
      this.signalFlagChanged.dispatch({ flag, ...metadata });
    }
  }

  destroy(): void {
    this.signalDirty.dispose();
    this.signalFlagChanged.dispose();
  }
}