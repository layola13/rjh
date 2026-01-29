export default class {
  private _dontShowImportConfirmDialog: boolean = false;
  private _redoData: unknown;
  private _undoData: unknown;
  private _proxyObjectsMap: unknown;

  get DontShowImportConfirmDialog(): boolean {
    return this._dontShowImportConfirmDialog;
  }

  set DontShowImportConfirmDialog(value: boolean) {
    this._dontShowImportConfirmDialog = value;
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
}