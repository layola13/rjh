interface Item {
  hide(): void;
}

class ModuleValue {
  private _curveItems: Item[];
  private _dimensions: Item[];
  private _orthoDashItems: Item[];
  private _endPointItem: Item;

  constructor(
    curveItems: Item[],
    dimensions: Item[],
    orthoDashItems: Item[],
    endPointItem: Item
  ) {
    this._curveItems = curveItems;
    this._dimensions = dimensions;
    this._orthoDashItems = orthoDashItems;
    this._endPointItem = endPointItem;
  }

  public hideAllItems(): void {
    this._curveItems.forEach((item: Item) => {
      return item.hide();
    });

    this._dimensions.forEach((item: Item) => {
      return item.hide();
    });

    this._orthoDashItems.forEach((item: Item) => {
      return item.hide();
    });

    this._endPointItem.hide();
  }
}