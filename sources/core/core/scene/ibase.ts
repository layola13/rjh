import { Signal } from './Signal';
import { 
  defineStateField, 
  getValueByPaths, 
  defineEntityField, 
  defineEntityMapField, 
  defineKeyEntityMapField, 
  updateField 
} from './EntityUtils';

interface FieldChangedEvent<T = unknown> {
  fieldName: string;
  oldValue: T;
  newValue: T;
}

interface FlagChangedEvent {
  flag: number;
  [key: string]: unknown;
}

interface DefineFieldOptions {
  [key: string]: unknown;
}

export class IBase {
  static setEntityFields<T extends IBase>(entity: T, fields: Record<string, unknown>): void {
    entity.setInternalFields(fields);
  }
}

export class IObject extends IBase {
  private static _max_oid: number = 0;

  protected _id: string = "";
  protected _oid: number = IObject._max_oid++;
  protected _flag: number = 0;
  protected _tempFlag: number = 0;
  protected _disposed: boolean = false;

  public signalFlagChanged: Signal<FlagChangedEvent> = new Signal(this);
  public signalFieldChanged: Signal<FieldChangedEvent> = new Signal(this);

  public defineStateField = <T>(
    fieldName: string,
    defaultValue: T,
    validator?: (value: T) => boolean,
    raiseEvent: boolean = true
  ): void => {
    defineStateField(this, fieldName, defaultValue, validator, raiseEvent);
  };

  protected raiseFieldChanged<T>(fieldName: string, oldValue: T, newValue: T): void {
    this.onFieldChanged(fieldName, oldValue, newValue);
    this.signalFieldChanged.dispatch({
      fieldName,
      oldValue,
      newValue
    });
  }

  protected onFieldChanged<T>(fieldName: string, oldValue: T, newValue: T): void {
    // Override in subclasses
  }

  public isFlagOn(flag: number, includeTempFlag: boolean = true): boolean {
    return (
      HSCore.Util.Flag.isFlagOn(this._flag, flag) ||
      (includeTempFlag && HSCore.Util.Flag.isFlagOn(this._tempFlag, flag))
    );
  }

  public isFlagOff(flag: number, includeTempFlag: boolean = true): boolean {
    return (
      HSCore.Util.Flag.isFlagOff(this._flag, flag) &&
      (!includeTempFlag || HSCore.Util.Flag.isFlagOff(this._tempFlag, flag))
    );
  }

  public setFlagOn(flag: number, isTemporary: boolean = false, extraData: Record<string, unknown> = {}): void {
    const wasOn = this.isFlagOn(flag);

    if (isTemporary) {
      this._tempFlag = HSCore.Util.Flag.setFlagOn(this._tempFlag, flag);
    } else {
      this._flag = HSCore.Util.Flag.setFlagOn(this._flag, flag);
    }

    if (!wasOn && this.signalFlagChanged) {
      this.signalFlagChanged.dispatch({
        flag,
        ...extraData
      });
    }
  }

  public setFlagOff(flag: number, isTemporary: boolean = false, extraData: Record<string, unknown> = {}): void {
    const wasOff = this.isFlagOff(flag);

    if (isTemporary) {
      this._tempFlag = HSCore.Util.Flag.setFlagOff(this._tempFlag, flag);
    } else {
      this._flag = HSCore.Util.Flag.setFlagOff(this._flag, flag);
    }

    if (wasOff !== this.isFlagOff(flag) && this.signalFlagChanged) {
      this.signalFlagChanged.dispatch({
        flag,
        ...extraData
      });
    }
  }

  public resetTempFlag(): void {
    this._tempFlag = 0;
  }

  public getValueByPaths(paths: string[]): unknown {
    return getValueByPaths(paths, this);
  }

  public defineField<T>(fieldName: string, defaultValue: T, options: DefineFieldOptions = {}): void {
    defineEntityField(this, fieldName, defaultValue, options);
  }

  public defineEntityMapField<T>(fieldName: string, entityType: new () => T, options: DefineFieldOptions = {}): void {
    defineEntityMapField(this, fieldName, entityType, options);
  }

  public defineKeyEntityMapField<T>(fieldName: string, entityType: new () => T, options: DefineFieldOptions = {}): void {
    defineKeyEntityMapField(this, fieldName, entityType, options);
  }

  public updateField<T>(fieldName: string, value: T): void {
    updateField(this, fieldName, value);
  }

  public setInternalFields(fields: Record<string, unknown>): this {
    Object.keys(fields).forEach((key) => {
      (this as Record<string, unknown>)[`__${key}`] = fields[key];
    });
    return this;
  }

  public destroy(): void {
    if (this._disposed) {
      return;
    }

    this.signalFieldChanged.dispose();
    (this.signalFieldChanged as unknown) = undefined;

    this.signalFlagChanged.dispose();
    (this.signalFlagChanged as unknown) = undefined;

    this._disposed = true;
  }
}