import React from 'react';
import ReactDOM from 'react-dom';

interface DropdownOption {
  id: string | number;
  label: string;
}

interface DropdownData {
  defaultKey?: string | number;
  options: DropdownOption[];
  onchange: (id: string | number) => void;
}

interface DropdownProps {
  data: DropdownData;
}

interface DropdownState {
  show: boolean;
}

class DropdownComponent extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      show: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: DropdownProps): void {
    this.setState({
      show: false
    });
  }

  componentDidMount(): void {
    document.body.addEventListener('click', this.handleDocumentClick, true);
  }

  componentWillUnmount(): void {
    document.body.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = (): void => {
    if (this.state.show) {
      this.setState({
        show: false
      });
    }
  };

  toggleDropdown = (): void => {
    this.setState({
      show: !this.state.show
    });
  };

  handleItemClick = (event: React.MouseEvent, data: DropdownData, option: DropdownOption): void => {
    data.onchange(option.id);
    this.setState({
      show: false
    });
  };

  render(): React.ReactElement {
    const { data } = this.props;
    let selectedLabel: string | undefined;

    if (data.defaultKey !== undefined) {
      data.options.forEach((option) => {
        if (option.id === data.defaultKey) {
          selectedLabel = option.label;
        }
      });
    }

    const listItems: React.ReactElement[] = [];
    data.options.forEach((option) => {
      listItems.push(
        React.createElement(
          'li',
          {
            role: 'presentation',
            className: 'viewli',
            onClick: (event: React.MouseEvent) => this.handleItemClick(event, data, option)
          },
          React.createElement('div', {
            className: `viewsel ${option.id === data.defaultKey ? '' : 'hide'}`
          }),
          option.label
        )
      );
    });

    return React.createElement(
      'div',
      { className: 'viewdrop' },
      React.createElement(
        'div',
        { className: 'viewdiv' },
        React.createElement(
          'div',
          {
            className: 'viewbutton',
            onClick: this.toggleDropdown
          },
          React.createElement(
            'div',
            { className: 'viewp' },
            React.createElement('div', { className: 'viewspan' }, selectedLabel),
            React.createElement(
              'div',
              { className: 'viewright' },
              React.createElement('div', { className: 'viewcaret' })
            )
          )
        )
      ),
      React.createElement(
        'ul',
        {
          role: 'menu',
          className: `viewul ${this.state.show ? '' : 'hide'}`
        },
        listItems
      )
    );
  }
}

export default class Dropdown {
  private _containerElement: HTMLElement;
  private _data: DropdownData;

  constructor(data: DropdownData, containerElement: HTMLElement) {
    this._containerElement = containerElement;
    this._data = data;
    this._render(data, containerElement);
  }

  static create(data: DropdownData, containerElement: HTMLElement): Dropdown {
    return new Dropdown(data, containerElement);
  }

  update(data: Partial<DropdownData>): void {
    Object.assign(this._data, data);
    this._render(this._data, this._containerElement);
  }

  destroy(): void {
    ReactDOM.unmountComponentAtNode(this._containerElement);
  }

  destory(): void {
    console.warn('deprecated, use destroy instead!');
    this.destroy();
  }

  private _render(data: DropdownData, containerElement: HTMLElement): void {
    ReactDOM.render(
      React.createElement(DropdownComponent, { data }),
      containerElement
    );
  }
}