interface ModuleSetOptions {
  _label?: string;
}

class ModuleSet {
  private _label?: string;

  constructor(label?: string) {
    if (label) {
      this._label = label;
    }
  }
}

export default ModuleSet;