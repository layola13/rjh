interface DragBounding {
  topHeight: number;
  leftWidth: number;
  rightWidth: number;
  bottomHeight: number;
}

interface InitialPosition {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface MoveCallbackParams {
  left: number;
  top: number;
}

interface ShowOptions {
  widgetClassName: string;
  renderElement: React.ReactElement;
  initialPosition: InitialPosition;
  dragBounding: DragBounding;
  moveCallback?: (params: MoveCallbackParams) => void;
  renderCallback?: (element: HTMLElement) => void;
}

class DraggableManager {
  private draggableDom: HTMLElement | null;
  private distanceX: number;
  private distanceY: number;
  private widgetClassName: string;
  private dragBounding: DragBounding;
  private moveCallback?: (params: MoveCallbackParams) => void;
  private renderElement?: React.Component;

  constructor() {
    this.draggableDom = document.querySelector(".draggableContainer");
    this.distanceX = 0;
    this.distanceY = 0;
    this.widgetClassName = "";
    this.dragBounding = {
      topHeight: 0,
      leftWidth: 0,
      rightWidth: 0,
      bottomHeight: 0
    };
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
  }

  show(options: ShowOptions): void {
    if (!this.draggableDom) return;

    this.draggableDom.addEventListener("mousedown", this._onMouseDown);

    const {
      widgetClassName,
      renderElement,
      initialPosition,
      dragBounding,
      moveCallback,
      renderCallback
    } = options;

    this.widgetClassName = widgetClassName;
    this.moveCallback = moveCallback;
    this.dragBounding = dragBounding;

    const { left, right, top, bottom } = initialPosition;

    const container = document.querySelector(".draggableContainer") as HTMLElement;
    if (container) {
      container.style.left = left !== undefined ? `${left}px` : "unset";
      container.style.bottom = bottom !== undefined ? `${bottom}px` : "unset";
      container.style.right = right !== undefined ? `${right}px` : "unset";
      container.style.top = top !== undefined ? `${top}px` : "unset";
    }

    let widgetElement = document.querySelector(`.${widgetClassName}`) as HTMLElement;
    if (!widgetElement) {
      widgetElement = document.createElement("div");
      widgetElement.className = widgetClassName;
      container.appendChild(widgetElement);
    }

    this.renderElement = ReactDOM.render(renderElement, widgetElement, () => {
      if (renderCallback) {
        renderCallback(widgetElement);
      }
    });
  }

  hide(): void {
    this.renderElement = undefined;

    const widgetElement = document.querySelector(`.${this.widgetClassName}`);
    if (widgetElement) {
      ReactDOM.unmountComponentAtNode(widgetElement);
    }

    if (this.draggableDom) {
      this.draggableDom.removeEventListener("mousedown", this._onMouseDown);
    }
  }

  private _onMouseMove(event: MouseEvent): void {
    if (!this.draggableDom) return;

    const { topHeight, leftWidth, rightWidth, bottomHeight } = this.dragBounding;

    let newLeft = event.clientX - this.distanceX;
    let newTop = event.clientY - this.distanceY;

    if (newTop <= topHeight) {
      newTop = topHeight;
    } else if (newTop >= document.documentElement.clientHeight - bottomHeight - this.draggableDom.offsetHeight) {
      newTop = document.documentElement.clientHeight - bottomHeight - this.draggableDom.offsetHeight;
    }

    if (newLeft <= leftWidth) {
      newLeft = leftWidth;
    } else if (newLeft >= document.documentElement.clientWidth - rightWidth - this.draggableDom.offsetWidth) {
      newLeft = document.documentElement.clientWidth - rightWidth - this.draggableDom.offsetWidth;
    }

    this.draggableDom.style.left = `${newLeft}px`;
    this.draggableDom.style.top = `${newTop}px`;

    if (this.moveCallback) {
      this.moveCallback({
        left: newLeft,
        top: newTop
      });
    }
  }

  private _onMouseUp(event: MouseEvent): void {
    document.removeEventListener("mousemove", this._onMouseMove);
    document.removeEventListener("mouseup", this._onMouseUp);
  }

  private _onMouseDown(event: MouseEvent): void {
    if (!this.draggableDom) return;

    this.distanceX = event.clientX - this.draggableDom.offsetLeft;
    this.distanceY = event.clientY - this.draggableDom.offsetTop;

    document.addEventListener("mousemove", this._onMouseMove);
    document.addEventListener("mouseup", this._onMouseUp);
  }
}

export default DraggableManager;