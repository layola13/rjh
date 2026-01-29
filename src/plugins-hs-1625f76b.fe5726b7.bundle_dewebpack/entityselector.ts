import { EventEmitter } from './EventEmitter';
import { getArrUnion, getArrDiff } from './utils';
import { PickUtils } from './PickUtils';

interface EntitySelectorState {
  mode: number;
  currentHoverOptId: string | undefined;
  hoverIds: string[];
  selectIds: string[];
}

interface LoadOptions {
  imageUrl: string;
  isPano: boolean;
  width: number;
  height: number;
}

interface HighlightColor {
  r: number;
  g: number;
  b: number;
  a: number;
  gizmoType: string;
}

interface Canvas extends HTMLCanvasElement {
  getIds(pageX: number, pageY: number): { instanceid?: string } | null;
  highlight(hoverIds: string[], selectIds: string[]): void;
  loseContext?(): void;
}

const INITIAL_STATE: EntitySelectorState = {
  mode: 0,
  currentHoverOptId: undefined,
  hoverIds: [],
  selectIds: []
};

const HOVER_COLOR: HighlightColor = {
  r: 61,
  g: 225,
  b: 197,
  a: Math.floor(76.5),
  gizmoType: "face"
};

const SELECT_COLOR: HighlightColor = {
  r: 55,
  g: 110,
  b: 255,
  a: Math.floor(76.5),
  gizmoType: "face"
};

const CANVAS_SCALE_FACTOR = 2.5;
const PICK_RENDER_SCALE = 2;

export class EntitySelector extends EventEmitter {
  private _isDeprecated: boolean;
  private _container?: HTMLElement;
  private _canvas?: Canvas;
  private _state: EntitySelectorState;

  constructor() {
    super();
    this._isDeprecated = false;
    this._state = { ...INITIAL_STATE };

    this.mouseenterHandler = this.mouseenterHandler.bind(this);
    this.mouseleaveHandler = this.mouseleaveHandler.bind(this);
    this.mousemoveHandler = this.mousemoveHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.keyupHandler = this.keyupHandler.bind(this);
  }

  private mouseenterHandler(): void {
    this.emit("enter");
  }

  private mouseleaveHandler(): void {
    this.emit("leave");
  }

  private mousemoveHandler(event: MouseEvent): void {
    if (!this._canvas) {
      return;
    }

    const ids = this._canvas.getIds(event.pageX, event.pageY);
    const operationId = this.generateUuid();
    this._state.currentHoverOptId = operationId;

    if (!event.shiftKey && this._state.selectIds.length > 0) {
      this._state.selectIds = [];
    }

    this.setHoverIds(operationId, []);
    this.emit(
      "hover",
      event,
      operationId,
      ids?.instanceid,
      event.shiftKey ? this._state.selectIds : undefined
    );
  }

  private clickHandler(event: MouseEvent): void {
    if (this._state.hoverIds.length === 0) {
      return;
    }

    if (event.shiftKey) {
      const union = getArrUnion(this._state.selectIds, this._state.hoverIds);
      const newSelectIds = union.length > 0
        ? getArrDiff(this._state.selectIds, this._state.hoverIds)
        : [...this._state.selectIds, ...this._state.hoverIds];
      this.setSelectIds(newSelectIds);
    } else {
      this.setSelectIds(this._state.hoverIds);
      this.emit("create", this._state.selectIds);
    }
  }

  private keyupHandler(event: KeyboardEvent): void {
    if (event.key === "Shift" && this._state.selectIds.length > 0) {
      this.emit("create", this._state.selectIds);
    }
  }

  private setHoverIds(operationId: string, ids: string[]): void {
    if (this._state.currentHoverOptId !== operationId) {
      return;
    }

    this._state.hoverIds = ids;
    this._canvas?.highlight(this._state.hoverIds, this._state.selectIds);
  }

  private setSelectIds(ids: string[]): void {
    this._state.selectIds = ids;
    this._canvas?.highlight(this._state.hoverIds, this._state.selectIds);
  }

  private generateUuid(): string {
    // UUID generation logic placeholder
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private mergeIdMap(idMap: unknown): unknown {
    return (window as any).HSApp?.App?.getApp()
      ?.pluginManager?.getPlugin((window as any).HSFPConstants?.PluginType?.Autostyler)
      ?.mergeSameIdsForIdMap(idMap) ?? idMap;
  }

  mount(container: HTMLElement, canvas: Canvas): void {
    if (this._isDeprecated) {
      return;
    }

    canvas.addEventListener("mouseenter", this.mouseenterHandler);
    canvas.addEventListener("mouseleave", this.mouseleaveHandler);
    canvas.addEventListener("mousemove", this.mousemoveHandler);
    canvas.addEventListener("click", this.clickHandler);
    document.addEventListener("keyup", this.keyupHandler);

    container.appendChild(canvas);
    this._container = container;
    this._canvas = canvas;

    this.emit("load-end");
  }

  unmount(): void {
    this._isDeprecated = true;

    this._canvas?.removeEventListener("mouseenter", this.mouseenterHandler);
    this._canvas?.removeEventListener("mouseleave", this.mouseleaveHandler);
    this._canvas?.removeEventListener("mousemove", this.mousemoveHandler);
    this._canvas?.removeEventListener("click", this.clickHandler);
    document.removeEventListener("keyup", this.keyupHandler);

    if (this._canvas && this._container) {
      this._container.removeChild(this._canvas);
    }

    this._canvas?.loseContext?.();

    this._container = undefined;
    this._canvas = undefined;
  }

  resetState(): void {
    this._state = { ...INITIAL_STATE };
    this._canvas?.highlight(this._state.hoverIds, this._state.selectIds);
  }

  async load(container: HTMLElement, options: LoadOptions): Promise<void> {
    if (this._isDeprecated) {
      return;
    }

    const { imageUrl, isPano, width, height } = options;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const pickMethod = isPano ? PickUtils.pickPano : PickUtils.pickImage;
    const canvasWidth = Math.floor(CANVAS_SCALE_FACTOR * (isPano ? containerWidth : width));
    const canvasHeight = Math.floor(CANVAS_SCALE_FACTOR * (isPano ? containerHeight : height));

    this.emit("load-start");

    try {
      const canvas = await pickMethod(
        imageUrl,
        canvasWidth,
        canvasHeight,
        HOVER_COLOR,
        SELECT_COLOR,
        PICK_RENDER_SCALE,
        (idMap: unknown) => this.mergeIdMap(idMap)
      );

      this.mount(container, canvas as Canvas);
      canvas.style.width = `${isPano ? containerWidth : width}px`;
      canvas.style.height = `${isPano ? containerHeight : height}px`;
    } catch (error) {
      this.emit("load-end", error);
    }
  }
}