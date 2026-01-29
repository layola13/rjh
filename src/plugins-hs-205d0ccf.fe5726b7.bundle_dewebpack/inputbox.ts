import ReactDOM from 'react-dom';
import React from 'react';
import { Vector2 } from './Vector2';
import { HSApp } from './HSApp';
import { toSvgPoint, getUnitParam } from './utils';
import { CanvasInput } from './CanvasInput';

export enum InputBoxType {
  Angle = 'angle',
  Number = 'number',
}

interface Position {
  x: number;
  y: number;
}

interface InputBoxConfig {
  min: number;
  max: number;
  precision: number;
  unit?: string;
}

interface UpdateDataParams {
  position?: Position;
  value?: number;
  focus?: boolean;
  config?: Partial<InputBoxConfig>;
}

interface InputBoxProps {
  type: InputBoxType;
  value?: number;
  max?: number;
  show?: boolean;
  onEnter?: (value: number, withModifier: boolean) => void;
  onTab?: (value: number, withModifier: boolean) => void;
  onKeyDown?: (keyCode: number) => void;
}

interface InputBoxState {
  value: number;
  show: boolean;
  focus: boolean;
  config: InputBoxConfig;
}

interface Context {
  canvas: HTMLCanvasElement & { parentNode: HTMLElement };
  getSize(): { width: number; height: number } | undefined;
}

export class InputBoxComp {
  private readonly _context: Context;
  public readonly domContainer: HTMLDivElement;
  private readonly _inputBoxRef: React.RefObject<InputBox>;

  constructor(context: Context, props: InputBoxProps) {
    this._context = context;
    this._inputBoxRef = React.createRef<InputBox>();

    this.domContainer = document.createElement('div');
    this.domContainer.oncontextmenu = () => false;
    this.domContainer.className = 'tgwall-inputbox-container';

    this._context.canvas.parentNode.appendChild(this.domContainer);

    ReactDOM.render(
      React.createElement(InputBox, {
        ref: this._inputBoxRef,
        ...props,
      }),
      this.domContainer
    );
  }

  private get _inputBox(): InputBox | null {
    return this._inputBoxRef.current;
  }

  public updateData(params: UpdateDataParams): void {
    if (!this._inputBox) {
      return;
    }

    const { position, value, focus, config } = params;

    if (position) {
      const svgPoint = toSvgPoint(position);
      const screenPoint = new Vector2(
        HSApp.View.SVG.Util.CanvasPointToScreen(svgPoint, this._context)
      );
      const displayPosition = { x: screenPoint.x, y: screenPoint.y };

      const containerHeight = this._context.getSize()?.height;
      if (containerHeight) {
        const maxY = containerHeight - 12;
        if (displayPosition.y > maxY) {
          displayPosition.y = maxY;
        }
      }

      this.domContainer.style.left = `${displayPosition.x}px`;
      this.domContainer.style.top = `${displayPosition.y}px`;
    }

    if (focus !== undefined) {
      this._inputBox.setState({ focus });
    }

    if (value !== undefined) {
      this._inputBox.setState({ value });
    }

    if (config) {
      const clonedConfig = this._inputBox.getCloneConfig();
      if (config.max !== undefined) {
        clonedConfig.max = config.max;
      }
      if (config.min !== undefined) {
        clonedConfig.min = config.min;
      }
      if (config.precision !== undefined) {
        clonedConfig.precision = config.precision;
      }
      if (config.unit !== undefined) {
        clonedConfig.unit = config.unit;
      }
      this._inputBox.setState({ config: clonedConfig });
    }
  }

  public get focus(): boolean {
    return this._inputBox?.focus ?? false;
  }

  public show(): void {
    if (!this._inputBox) {
      return;
    }

    this._inputBox.setState({ show: true }, () => {
      const containerWidth = this.domContainer.clientWidth;
      const containerHeight = this.domContainer.clientHeight;
      const size = this._context.getSize();

      if (!size?.width || !size?.height) {
        return;
      }

      const maxY = size.height - containerHeight / 2;
      const maxX = size.width - containerWidth / 2;
      const topStyle = this.domContainer.style.top;
      const leftStyle = this.domContainer.style.left;

      if (!topStyle || !leftStyle) {
        return;
      }

      const currentTop = parseFloat(topStyle);
      const currentLeft = parseFloat(leftStyle);

      if ((currentTop > maxY || currentLeft > maxX) && this._inputBox) {
        this._inputBox.setState({ show: false });
      }
    });
  }

  public hide(): void {
    if (this._inputBox) {
      this._inputBox.setState({ show: false, focus: false });
    }
  }

  public dispose(): void {
    ReactDOM.unmountComponentAtNode(this.domContainer);
    if (this._context.canvas.parentNode.contains(this.domContainer)) {
      this._context.canvas.parentNode.removeChild(this.domContainer);
    }
  }
}

export class InputBox extends React.Component<InputBoxProps, InputBoxState> {
  constructor(props: InputBoxProps) {
    super(props);

    const { type, value, max, show } = props;

    let config: InputBoxConfig;
    if (type === InputBoxType.Angle) {
      config = {
        min: 0,
        max: max !== undefined ? max : 90,
        unit: '°',
        precision: 1,
      };
    } else {
      const unitParam = getUnitParam() / 1000;
      config = {
        min: unitParam,
        max: max !== undefined ? max : 1000000,
        precision: -Math.log10(unitParam),
      };
    }

    this.state = {
      value: value ?? 0,
      show: show === undefined || show,
      focus: false,
      config,
    };
  }

  private readonly _onEnter = (
    value: string,
    shiftKey: boolean,
    ctrlKey: boolean
  ): void => {
    if (this.props.onEnter) {
      this.props.onEnter(Number(value), shiftKey && ctrlKey);
    }
  };

  private readonly _onTab = (
    value: string,
    shiftKey: boolean,
    ctrlKey: boolean
  ): void => {
    if (this.props.onTab) {
      this.props.onTab(Number(value), shiftKey && ctrlKey);
    }
  };

  private readonly _onKeyDown = (event: React.KeyboardEvent): void => {
    const keyCodes = HSApp.Util.Keyboard.KeyCodes;
    const preventKeys = [keyCodes.TAB, keyCodes.ENTER, keyCodes.SPACE];

    if (preventKeys.includes(event.keyCode)) {
      event.preventDefault();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event.keyCode);
    }
  };

  public getCloneConfig(): InputBoxConfig {
    return Object.assign({}, this.state.config);
  }

  public get focus(): boolean {
    return this.state.focus;
  }

  public render(): React.ReactNode {
    const { show, focus, value, config } = this.state;

    if (!show) {
      return null;
    }

    const { min, max, precision, unit } = config;

    return (
      <div className="tgwall-inputbox">
        <CanvasInput
          isFocus={focus}
          onTab={this._onTab}
          onEnter={this._onEnter}
          onKeyDown={this._onKeyDown}
          arrow={false}
          value={value}
          unit={unit ?? HSApp.App.getApp().floorplan.displayLengthUnit}
          includeUnit={false}
          min={min}
          max={max}
          precision={precision}
          autoSelect={true}
        />
      </div>
    );
  }
}