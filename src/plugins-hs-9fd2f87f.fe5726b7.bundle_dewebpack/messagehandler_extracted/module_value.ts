class ModuleValue {
  private _modelingHost: unknown;
  private _webcadPageInited: boolean;
  private _webcadPageOpen: boolean;
  private _entity: unknown;
  private _extraMsgData: Record<string, unknown>;

  constructor() {
    this._modelingHost = undefined;
    this._webcadPageInited = false;
    this._webcadPageOpen = false;
    this._entity = undefined;
    this._extraMsgData = {};
  }
}