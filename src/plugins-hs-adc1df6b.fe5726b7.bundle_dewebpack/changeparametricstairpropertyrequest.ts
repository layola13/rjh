import { HSCore } from './HSCore';

export class ChangeParametricStairPropertyRequest extends HSCore.Transaction.Request {
  private _content: any;
  private _propertyName: string;
  private _propertyValue: any;
  private _prePropertyValue: any;

  constructor(content: any, propertyName: string, propertyValue: any) {
    super();
    this._content = content;
    this._propertyName = propertyName;
    this._propertyValue = propertyValue;
    this._prePropertyValue = content.getPropertyMap().get(propertyName).value;
  }

  private _setParamsToStairs(value: any): void {
    this._content.setParamsToStairs({
      [this._propertyName]: value
    });
  }

  onCommit(): any {
    super.onCommit();
    this._setParamsToStairs(this._propertyValue);
    return this._content;
  }

  onUndo(): void {
    super.onUndo();
    this._setParamsToStairs(this._prePropertyValue);
  }

  onRedo(): void {
    super.onRedo();
    this._setParamsToStairs(this._propertyValue);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "设置楼梯参数";
  }
}