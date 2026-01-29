import React from 'react';
import ReactDOM from 'react-dom';
import { Select, Option, CheckBox } from './components';

interface CheckBoxConfig {
  name: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

interface SelectOption {
  value: string;
  name: string;
}

interface SelectConfig {
  defaultValue: string;
  onChange: (value: string) => void;
  editable?: boolean;
  list: SelectOption[];
}

interface HeadToolItem {
  label: string;
  size?: string;
  checkBox?: CheckBoxConfig;
  select?: SelectConfig;
}

interface HeadToolProps {
  items: HeadToolItem[];
}

interface HeadToolState {
  checkMap: Map<string, boolean>;
}

interface CanvasContext {
  canvas: HTMLElement;
}

export class HeadTool extends React.Component<HeadToolProps, HeadToolState> {
  constructor(props: HeadToolProps) {
    super(props);

    const checkMap = new Map<string, boolean>();
    this.props.items.forEach((item) => {
      if (item.checkBox) {
        checkMap.set(item.checkBox.name, !!item.checkBox.checked);
      }
    });

    this.state = {
      checkMap
    };
  }

  private _onCheckBoxChange = (
    checked: boolean,
    name: string,
    onChange: (checked: boolean) => void
  ): void => {
    const checkMap = new Map(this.state.checkMap);
    checkMap.set(name, checked);
    this.setState({ checkMap });
    onChange(checked);
  };

  render(): React.ReactElement {
    const { items } = this.props;
    const { checkMap } = this.state;

    const containerProps = {
      initialWidth: 100,
      initialHeight: 40,
      barPosition: 'left' as const
    };

    const itemElements = items.map((item) => {
      let controlElement: React.ReactElement | undefined;

      if (item.select) {
        controlElement = (
          <Select
            defaultValue={item.select.defaultValue}
            size={item.size}
            onChange={item.select.onChange}
            editable={item.select.editable}
          >
            {item.select.list.map((option) => (
              <Option key={option.value} value={option.value} title={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
        );
      } else if (item.checkBox) {
        controlElement = (
          <CheckBox
            checked={checkMap.get(item.checkBox.name)}
            onChange={(checked) =>
              this._onCheckBoxChange(checked, item.checkBox!.name, item.checkBox!.onChange)
            }
          >
            {item.checkBox.name}
          </CheckBox>
        );
      }

      if (controlElement) {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '0px 8px',
              height: '24px'
            }}
          >
            <span style={{ marginRight: 6, fontSize: '12px' }}>{item.label}</span>
            {controlElement}
          </div>
        );
      }
      return null;
    });

    return (
      <div
        style={{ minWidth: 100 }}
        className="tgwall-headtool"
        {...containerProps}
      >
        {itemElements}
      </div>
    );
  }
}

export class HeadToolComp {
  private _context: CanvasContext;
  private domContainer: HTMLDivElement;
  private _headTool?: HeadTool;

  constructor(context: CanvasContext, props: HeadToolProps) {
    this._context = context;
    this.domContainer = document.createElement('div');
    this.domContainer.className = 'tgwall-headedit-container';
    this._context.canvas.parentNode?.appendChild(this.domContainer);

    ReactDOM.render(
      <HeadTool
        ref={(ref) => {
          this._headTool = ref ?? undefined;
        }}
        {...props}
      />,
      this.domContainer
    );
  }

  dispose(): void {
    if (this.domContainer.parentNode) {
      ReactDOM.unmountComponentAtNode(this.domContainer);
      this._context.canvas.parentNode?.removeChild(this.domContainer);
    }
  }
}