interface Position {
  x: number;
  y: number;
  direction: 'topleft' | 'topright' | 'bottomleft' | 'bottomright';
}

interface InputOptions {
  displayDigits: number;
  unitType?: HSCore.Util.Unit.LengthUnitTypeEnum;
  rules: {
    range: {
      min: number;
      max: number;
    };
  };
}

interface FloatInputData {
  label: string;
  id: string;
  value: number;
  options: InputOptions;
  onValueChange?: (value: number) => void;
  onValueChangeEnd?: (value: number) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onTabDown?: (value: number) => void;
}

interface FloatInputState {
  show: boolean;
  disableChange: boolean;
  position: Position;
  data: FloatInputData[];
  selectedIndex: number;
}

interface LengthInputProps {
  className: string;
  label: string;
  labelPosition: string;
  value: number;
  options: InputOptions;
  onValueChange?: (value: number) => void;
  onValueChangeEnd?: (value: number) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  disableChange: boolean;
}

interface LengthInputRef {
  isIntegerCheck(value: string): boolean;
  isValueMatchRules(value: number): boolean;
}

class FloatInputComponent extends React.Component<{}, FloatInputState> {
  private lengthInputs: React.ReactElement[] = [];
  private refs: { [key: number]: LengthInputRef } = {};

  constructor(props: {}) {
    super(props);
    
    this.state = {
      show: false,
      disableChange: false,
      position: {
        x: 0,
        y: 0,
        direction: 'topright'
      },
      data: [{
        label: '',
        id: '',
        value: 0,
        options: {
          displayDigits: 0,
          rules: {
            range: {
              min: 0,
              max: 100
            }
          }
        }
      }],
      selectedIndex: 0
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  show(
    position: Position = this.state.position,
    data?: FloatInputData[],
    focusIndex: number = 0
  ): void {
    if (!data || data.length === 0) {
      return;
    }

    this.setState({
      show: true,
      position,
      data,
      selectedIndex: 0,
      disableChange: false
    }, () => {
      this.setFocus(focusIndex);
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
      document.addEventListener('mousedown', this.onMouseDown);
      document.addEventListener('mouseup', this.onMouseUp);
    });
  }

  hide(): void {
    this.setState({
      show: false,
      selectedIndex: 0
    });
    
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  update(
    value: number,
    id?: string,
    position: Position = this.state.position
  ): void {
    if (!position.direction) {
      position.direction = this.state.position.direction;
    }

    const data = this.state.data;
    let selectedIndex = this.state.selectedIndex;

    if (id) {
      selectedIndex = data.findIndex(item => item.id === id);
    }

    data[selectedIndex].value = value;

    this.setState({
      data,
      position
    }, () => {
      this.setFocus(this.state.selectedIndex);
    });
  }

  setFocus(index?: number): void {
    const targetIndex = index ?? this.state.selectedIndex;
    const selector = `.float-input-container .float-input-${targetIndex} .input`;
    $(selector).select();
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === HSApp.Util.Keyboard.KeyCodes.TAB) {
      const nextIndex = (this.state.selectedIndex + 1) % this.state.data.length;
      const data = this.state.data;
      const currentData = data[this.state.selectedIndex];
      
      const unitType = currentData.options.unitType ?? HSCore.Util.Unit.LengthUnitTypeEnum.millimeter;
      const inputValue = Number.parseInt((event.target as HTMLInputElement).value);
      const parsedValue = HSApp.Util.ParseUtil.tryGetLengthDatabaseUnitValue(inputValue, unitType);

      if (
        Number.isFinite(parsedValue) &&
        this.refs[this.state.selectedIndex].isIntegerCheck((event.target as HTMLInputElement).value) &&
        this.refs[this.state.selectedIndex].isValueMatchRules(parsedValue)
      ) {
        data[this.state.selectedIndex].value = parsedValue;
        
        if (currentData.onTabDown) {
          currentData.onTabDown(parsedValue);
        }

        this.setState({
          data,
          disableChange: true,
          selectedIndex: nextIndex
        }, () => {
          this.setFocus(nextIndex);
        });
      } else {
        this.setFocus(this.state.selectedIndex);
      }

      event.preventDefault();
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    if (event.keyCode === HSApp.Util.Keyboard.KeyCodes.TAB) {
      this.setState({
        disableChange: false
      });
    }
  }

  private onMouseDown(event: MouseEvent): void {
    const activeView = HSApp.App.getApp().getActive2DView();
    if (activeView.domElement !== event.target) {
      this.setState({
        disableChange: true
      });
    }
  }

  private onMouseUp(): void {
    if (this.state.disableChange) {
      this.setState({
        disableChange: false
      });
    }
  }

  private getRenderPosition(position: Position): { left: number; top: number } {
    let { x, y } = position;
    let width = 150;
    let height = 50;

    const container = document.querySelector('.float-input-container') as HTMLElement;
    if (container) {
      width = container.offsetWidth || 150;
      height = container.offsetHeight || 50;
    }

    const offset = 10;

    switch (position.direction) {
      case 'topleft':
        x -= width + offset;
        y -= height + offset;
        break;
      case 'topright':
        x += offset;
        y -= height + offset;
        break;
      case 'bottomleft':
        x -= width + offset;
        y += offset;
        break;
      default:
        x += offset;
        y += offset;
    }

    return {
      left: x,
      top: y
    };
  }

  render(): React.ReactElement {
    const { show, position, data, disableChange } = this.state;
    const renderPosition = this.getRenderPosition(position);

    this.lengthInputs = data.map((item, index) => {
      const inputProps: { data: LengthInputProps } = {
        data: {
          className: `float-input-${index}`,
          label: item.label,
          labelPosition: 'left',
          value: item.value,
          options: item.options,
          onValueChange: item.onValueChange,
          onValueChangeEnd: item.onValueChangeEnd,
          onKeyDown: item.onKeyDown,
          disableChange
        }
      };

      return React.createElement(LengthInput, {
        ...inputProps,
        ref: (ref: LengthInputRef) => {
          this.refs[index] = ref;
        }
      });
    });

    return React.createElement('div', {
      className: `float-input-container${show ? '' : ' hide'}`,
      style: renderPosition
    }, this.lengthInputs);
  }
}

class FloatInputUI {
  private _element: HTMLDivElement;
  private _floatInputUi: FloatInputComponent;

  constructor() {
    this._element = document.createElement('div');
    this._element.className = 'float-input';
    
    const uiContainer = document.querySelector('#ui-container');
    if (uiContainer) {
      uiContainer.appendChild(this._element);
    }

    this._floatInputUi = ReactDOM.render(
      React.createElement(FloatInputComponent, null),
      this._element
    ) as FloatInputComponent;
  }

  show(position: Position, data: FloatInputData[]): void {
    this._floatInputUi.show(position, data);
  }

  hide(): void {
    this._floatInputUi.hide();
  }

  update(value: number, id?: string, position?: Position): void {
    this._floatInputUi.update(value, id, position);
  }

  setFocus(index: number): void {
    this._floatInputUi.setFocus(index);
  }
}

export default FloatInputUI;