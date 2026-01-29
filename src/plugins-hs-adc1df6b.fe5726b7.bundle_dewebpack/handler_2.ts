interface RenderItem {
  getRenderItem: () => unknown;
  _item: ItemWithRender;
  posType: string;
  order: number;
  id: string;
  disabled?: boolean;
}

interface ItemWithRender {
  getRenderItem: () => unknown;
  order: number;
  setState?: (state: unknown) => void;
}

interface UI {
  render: (items: RenderItem[]) => void;
}

declare const UI: UI;

export class Handler {
  private items: RenderItem[];
  private _enable: boolean;
  private nextRun: ReturnType<typeof setTimeout> | null;
  private _app: unknown;
  private _dependencies: unknown;

  constructor(app: unknown, dependencies: unknown) {
    this._app = app;
    this._dependencies = dependencies;
    this.items = [];
    this.nextRun = null;
    this._enable = true;
  }

  addItem(item: ItemWithRender, posType?: string, id?: string): void {
    this.items.push({
      getRenderItem: () => item.getRenderItem(),
      _item: item,
      posType: posType || "right",
      order: item.order,
      id: id || ""
    });

    if (!this.nextRun) {
      this.nextRun = setTimeout(() => {
        this._render();
      }, 0);
    }
  }

  updateItemById(item: ItemWithRender, id: string): void {
    const index = this.items.findIndex((existingItem) => existingItem.id === id);
    const updatedItem: RenderItem = {
      getRenderItem: () => item.getRenderItem(),
      _item: item,
      posType: this.items[index].posType || "right",
      order: item.order,
      id: id || ""
    };

    this.items.splice(index, 1, updatedItem);

    if (!this.nextRun) {
      this.nextRun = setTimeout(() => {
        this._render();
      }, 0);
    }
  }

  updateStateById(id: string, state: unknown): void {
    const item = this.getItemById(id);
    item?._item?.setState?.(state);
  }

  getItemById(id: string): RenderItem | undefined {
    return this.items.find((item) => item.id === id);
  }

  removeItemById(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);

    if (!this.nextRun) {
      this.nextRun = setTimeout(() => {
        this._render();
      }, 0);
    }
  }

  removeItem(posType: string): void {
    this.items = this.items.filter((item) => item.posType !== posType);

    if (!this.nextRun) {
      this.nextRun = setTimeout(() => {
        this._render();
      }, 0);
    }
  }

  private _render(): void {
    if (this._enable) {
      if (this.nextRun) {
        clearTimeout(this.nextRun);
        this.nextRun = null;
      }
      UI.render(this.items);
    }
  }

  setPageHeaderReadonlyMode(customIds?: string[], shouldMerge?: boolean): void {
    let readonlyIds: string[] = ["privacy", "TeachingAbilityButton", "help"];

    if (customIds) {
      if (shouldMerge) {
        readonlyIds.push(...customIds);
      } else {
        readonlyIds = customIds;
      }
    }

    this.items.forEach((item) => {
      item.disabled = readonlyIds.findIndex((id) => item.id === id) !== -1;
    });

    if (!this.nextRun) {
      this.nextRun = setTimeout(() => {
        this._render();
      }, 0);
    }
  }

  setPageHeaderEditMode(): void {
    this.items.forEach((item) => {
      item.disabled = false;
    });

    if (!this.nextRun) {
      this.nextRun = setTimeout(() => {
        this._render();
      }, 0);
    }
  }
}