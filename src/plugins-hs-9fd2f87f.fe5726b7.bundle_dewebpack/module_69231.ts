import React from 'react';
import ReactDOM from 'react-dom';

interface TooltipData {
  tooltipTitle: string;
  tooltipBody: string;
  nomoreShow?: boolean;
  containerElement: HTMLElement;
}

interface TipComponentProps {
  data: TooltipData;
}

interface TipComponentState {
  tooltipTitle: string;
  tooltipBody: string;
  nomoreShow?: boolean;
  containerElement: HTMLElement;
}

interface HotkeyConfig {
  win: string;
  mac: string;
}

class TipComponent extends React.Component<TipComponentProps, TipComponentState> {
  constructor(props: TipComponentProps) {
    super(props);
    this.state = {
      tooltipTitle: props.data.tooltipTitle,
      tooltipBody: props.data.tooltipBody,
      nomoreShow: props.data.nomoreShow,
      containerElement: props.data.containerElement
    };
  }

  private readonly _destroyComponent = (): void => {
    BoundaryTipCtrl.destroy();
  };

  private readonly _renderTooltipTitle = (): React.ReactElement | null => {
    const { tooltipTitle } = this.state;
    return tooltipTitle ? React.createElement('p', null, tooltipTitle) : null;
  };

  private readonly _renderTooltipBody = (): React.ReactElement | null => {
    const { tooltipBody } = this.state;
    return tooltipBody ? React.createElement('p', null, tooltipBody) : null;
  };

  componentDidMount(): void {}

  render(): React.ReactElement {
    return React.createElement(
      'div',
      { className: 'tip-wrap' },
      React.createElement('div', { className: 'tip-head' }),
      React.createElement('div', { className: 'triangle' }),
      React.createElement(
        'div',
        { className: 'tip-body' },
        this._renderTooltipTitle(),
        this._renderTooltipBody()
      )
    );
  }
}

class BoundaryTipCtrl {
  private _editButoonElement?: string;
  private _toolTip?: string;
  private _hotkey?: HotkeyConfig;
  private _toolTipBody?: string;

  constructor(
    editButtonElement?: string,
    toolTip?: string,
    hotkey?: HotkeyConfig,
    toolTipBody?: string
  ) {
    this._editButoonElement = editButtonElement;
    this._toolTip = toolTip;
    this._hotkey = hotkey;
    this._toolTipBody = toolTipBody;
  }

  create(
    editButtonElement?: string,
    toolTip?: string,
    hotkey?: HotkeyConfig,
    toolTipBody?: string
  ): void {
    const buttonElement = editButtonElement ?? this._editButoonElement;
    const tipText = toolTip ?? this._toolTip;
    const hotkeyConfig = hotkey ?? this._hotkey;
    const tipBody = toolTipBody ?? this._toolTipBody;

    const targetElement = document.querySelector<HTMLElement>(
      buttonElement ?? 'li[data-toolbar-path="plugin_customized_toolbar_rotate"]'
    );

    if (targetElement && !document.getElementById('customizedtool-tip')) {
      const container = document.createElement('div');
      container.setAttribute('id', 'customizedtool-tip');
      targetElement.appendChild(container);

      const displayString = ResourceManager.getString(
        tipText ?? 'plugin_customized_toolbar_rotate'
      );
      const hotkeyDisplayString = HSApp.Util.Hotkey.getHotkeyDisplayString(
        hotkeyConfig ?? {
          win: 'ctrl+o',
          mac: 'meta+o'
        }
      );

      const data: TooltipData = {
        tooltipTitle: `${displayString} （${hotkeyDisplayString}）`,
        tooltipBody: ResourceManager.getString(
          tipBody ?? 'plugin_customized_toolbar_rotate_tip'
        ),
        containerElement: container
      };

      ReactDOM.render(React.createElement(TipComponent, { data }), container);
    }
  }

  static destroy(): void {
    const element = document.getElementById('customizedtool-tip');
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
      element.parentNode?.removeChild(element);
    }
  }
}

export default BoundaryTipCtrl;