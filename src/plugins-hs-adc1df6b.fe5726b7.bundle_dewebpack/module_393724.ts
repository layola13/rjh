interface RoofParameter {
  name: string;
  value: number;
  oldValue?: number;
}

interface RoofParameterNode {
  name: string;
  value: number;
}

interface RoofParameters {
  roomLoop?: any;
  roomHeight?: number;
}

interface Roof {
  parameters: RoofParameters;
  getUniqueParent(): any;
}

interface AngleInputGizmoOptions {
  roof: Roof;
  name: string;
  value: number;
  min: number;
  max: number;
}

interface Context {
  hscanvas?: {
    domElement: HTMLElement;
  };
}

interface Vector2 {
  x: number;
  y: number;
  multiply(value: number): Vector2;
  add(other: Vector2): Vector2;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Line2d {
  isLine2d(): boolean;
  getDirection(): Vector2;
  getMidPt(): Vector2;
}

interface RoomLoop {
  clone(): RoomLoop;
  scale(value: number): RoomLoop;
  getAllCurves(): Array<Line2d | any>;
}

declare const HSApp: any;
declare const HSFPConstants: any;
declare const _: any;

const ANGLE_A_LINE_INDEX = 3;
const ANGLE_B_LINE_INDEX = 1;
const INPUT_WIDTH_OFFSET = 22.5;
const INPUT_HEIGHT_OFFSET = 10;
const TAB_KEY_CODE = 9;
const SCALE_FACTOR = 0.001;

export default class AngleInputGizmo {
  private context: Context;
  private inputContainer?: HTMLDivElement;
  private input?: HTMLInputElement;
  private roof: Roof;
  private _name: string;
  private _curValue: number;
  private _min: number;
  private _max: number;

  constructor(context: Context, options: AngleInputGizmoOptions) {
    this.context = context;
    this.roof = options.roof;
    this._name = options.name;
    this._curValue = options.value;
    this._min = options.min;
    this._max = options.max;
  }

  private _onMousemove = (): void => {
    if (this.inputContainer && !this.inputContainer.classList.contains("move")) {
      this.inputContainer.classList.add("move");
    }
  };

  private _onMouseout = (): void => {
    if (this.inputContainer?.classList.contains("move")) {
      this.inputContainer.classList.remove("move");
    }
  };

  private _onFocus = (): void => {
    if (this.inputContainer && !this.inputContainer.classList.contains("focus")) {
      this.inputContainer.classList.add("focus");
    }
    this.input?.select();
  };

  private _onChange = (): void => {
    const value = this.input?.value;
    
    if (this._checkValue(value)) {
      const numValue = parseFloat(value!);
      
      if (numValue !== this._curValue) {
        const cmdManager = HSApp.App.getApp().cmdManager;
        const command = cmdManager.createCommand(
          HSFPConstants.CommandType.ChangeRoofParam,
          [this.roof, [{
            name: this._name,
            value: numValue,
            oldValue: this._curValue
          }]]
        );
        cmdManager.execute(command);
        this._curValue = numValue;
      }
    } else if (this.input) {
      const currentValueStr = this._curValue + "";
      if (value !== currentValueStr) {
        this.input.value = currentValueStr;
        this._onInput();
      }
    }
  };

  private _onBlur = (): void => {
    this._onChange();
  };

  private _onInput = (): void => {
    const value = this.input?.value;
    
    if (this._checkValue(value)) {
      if (this.inputContainer?.classList.contains("error")) {
        this.inputContainer.classList.remove("error");
      }
      if (!this.inputContainer?.classList.contains("focus")) {
        this.inputContainer?.classList.add("focus");
      }
    } else {
      if (this.inputContainer?.classList.contains("focus")) {
        this.inputContainer.classList.remove("focus");
      }
      if (!this.inputContainer?.classList.contains("error")) {
        this.inputContainer?.classList.add("error");
      }
    }
  };

  private _onKeydown = (event: KeyboardEvent): void => {
    if (event.keyCode === TAB_KEY_CODE) {
      event.preventDefault();
    }
  };

  private _changeInputVisibility(visible: boolean = true): void {
    if (this.inputContainer) {
      this.inputContainer.style.visibility = visible ? "visible" : "hidden";
    }
  }

  private _checkValue(value: string | undefined): boolean {
    if (value === undefined) {
      return false;
    }

    const numValue = parseFloat(value);
    return !_.isNaN(numValue) && 
           (numValue + "").length === value.length && 
           numValue >= this._min && 
           numValue <= this._max;
  }

  private _createInputContainer(): HTMLDivElement | undefined {
    const parentNode = this.context.hscanvas?.domElement.parentNode;
    
    if (!parentNode) {
      return undefined;
    }

    const container = document.createElement("div");
    container.classList.add("angle-input-gizmo-container");
    container.setAttribute("oncontextmenu", "return false;");

    const suffix = document.createElement("div");
    suffix.appendChild(document.createTextNode("°"));
    suffix.classList.add("angle-input-gizmo-suffix");
    
    container.appendChild(suffix);
    parentNode.appendChild(container);

    return container;
  }

  private _createInput(value: string): HTMLInputElement {
    const input = document.createElement("input");
    input.setAttribute("autocomplete", "off");
    input.value = value;
    return input;
  }

  private _createDom(): void {
    this.inputContainer = this._createInputContainer();

    if (this.inputContainer) {
      this.input = this._createInput(this._curValue + "");
      
      this.input.addEventListener("mousemove", this._onMousemove);
      this.input.addEventListener("mouseout", this._onMouseout);
      this.input.addEventListener("focus", this._onFocus);
      this.input.addEventListener("change", this._onChange);
      this.input.addEventListener("input", this._onInput);
      this.input.addEventListener("blur", this._onBlur);
      this.input.addEventListener("keydown", this._onKeydown);
      
      this.inputContainer.appendChild(this.input);
    }
  }

  public getLineIndex(): number | undefined {
    if (this._name === "angleA") {
      return ANGLE_A_LINE_INDEX;
    } else if (this._name === "angleB") {
      return ANGLE_B_LINE_INDEX;
    }
    return undefined;
  }

  public updatePosition(): void {
    if (!this.inputContainer || !this.roof.parameters.roomLoop) {
      return;
    }

    const lineIndex = this.getLineIndex();
    if (lineIndex === undefined) {
      return;
    }

    const curve = this.roof.parameters.roomLoop
      .clone()
      .scale(SCALE_FACTOR)
      .getAllCurves()[lineIndex];

    if (!curve?.isLine2d()) {
      return;
    }

    const roofNodes = HSCore.Util.Roof.getRoofParamNodes(this.roof);
    const offsetNode = roofNodes.find((node: RoofParameterNode) => node.name === "offset");
    const offset = SCALE_FACTOR * (offsetNode?.value || 0);

    const altitude = HSCore.Util.Layer.getAltitude(this.roof.getUniqueParent());
    const roomHeight = SCALE_FACTOR * (this.roof.parameters.roomHeight || 0);
    const zPosition = altitude + roomHeight;

    const direction = curve.getDirection();
    const midPoint = curve.getMidPt();
    const perpendicular = new Vector2(direction.y, -direction.x);
    const position2d = perpendicular.multiply(offset).add(midPoint);
    const position3d = new Vector3(position2d.x, position2d.y, zPosition);

    const screenPos = HSApp.View.T3d.Util.modelSpaceToScreenSpace(position3d, this.context);
    const left = screenPos.x - INPUT_WIDTH_OFFSET;
    const top = screenPos.y - INPUT_HEIGHT_OFFSET;

    this.inputContainer.style.left = left + "px";
    this.inputContainer.style.top = top + "px";
  }

  public show(): void {
    if (!this.inputContainer) {
      this._createDom();
      this._changeInputVisibility();
      this.updatePosition();
    }
  }

  public hide(): void {
    this._changeInputVisibility(false);
  }

  private _clearInput(): void {
    if (!this.inputContainer) {
      return;
    }

    this.input?.removeEventListener("mousemove", this._onMousemove);
    this.input?.removeEventListener("mouseout", this._onMouseout);
    this.input?.removeEventListener("focus", this._onFocus);
    this.input?.removeEventListener("change", this._onChange);
    this.input?.removeEventListener("input", this._onInput);
    this.input?.removeEventListener("blur", this._onBlur);
    this.input?.removeEventListener("keydown", this._onKeydown);

    this.inputContainer.parentNode?.removeChild(this.inputContainer);
  }

  public cleanup(): void {
    this._clearInput();
  }
}