import { Request } from './Request';

export class DataRequest<T = unknown> extends Request {
  private readonly _before: T;
  private readonly _after: T;
  private readonly _setter: (value: T) => void;
  private readonly _setterScope: unknown;

  constructor(
    before: T,
    after: T,
    setter: (value: T) => void,
    setterScope: unknown
  ) {
    super();
    this._before = before;
    this._after = after;
    this._setter = setter;
    this._setterScope = setterScope;
  }

  onCommit(): void {
    this._setter.call(this._setterScope, this._after);
  }

  onUndo(): void {
    this._setter.call(this._setterScope, this._before);
  }

  onRedo(): void {
    this._setter.call(this._setterScope, this._after);
  }
}