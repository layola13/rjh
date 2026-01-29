export class Storage {
  private _redoData: unknown;
  private _undoData: unknown;
  private _proxyObjectsMap: unknown;
  private _rooms: unknown;

  constructor() {
    this._redoData = undefined;
    this._undoData = undefined;
    this._proxyObjectsMap = undefined;
    this._rooms = undefined;
  }

  get redoData(): unknown {
    return this._redoData;
  }

  set redoData(value: unknown) {
    this._redoData = value;
  }

  get undoData(): unknown {
    return this._undoData;
  }

  set undoData(value: unknown) {
    this._undoData = value;
  }

  get proxyObjectsMap(): unknown {
    return this._proxyObjectsMap;
  }

  set proxyObjectsMap(value: unknown) {
    this._proxyObjectsMap = value;
  }

  get rooms(): unknown {
    return this._rooms;
  }

  set rooms(value: unknown) {
    this._rooms = value;
  }
}