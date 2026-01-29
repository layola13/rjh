interface Dimension {
  show(): void;
  hide(): void;
}

class ModuleSet {
  private _dimensions: Dimension[];
  private _dimensionVisible: boolean;

  setDimensionVisibility(visible: boolean): void {
    if (visible) {
      this._dimensions.forEach((dimension: Dimension) => {
        return dimension.show();
      });
    } else {
      this._dimensions.forEach((dimension: Dimension) => {
        return dimension.hide();
      });
    }
    this._dimensionVisible = visible;
  }
}