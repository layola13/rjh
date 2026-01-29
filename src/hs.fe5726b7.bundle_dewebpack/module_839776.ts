import React from 'react';
import PropTypes from 'prop-types';

interface ButtonConfig {
  label?: string;
  src?: [string, string];
  className?: string;
}

interface HelpTipData {
  text?: string;
  trigger?: string;
  placement?: string;
  delay?: number;
}

interface RadioGroupData {
  selectedIndex: number;
  btns: ButtonConfig[];
  onchange: (index: number) => void;
  className?: string;
  hidden?: boolean;
  disabled?: boolean;
  tooltip?: string;
  helptipData?: HelpTipData;
  label?: string;
}

interface RadioGroupProps {
  data: RadioGroupData;
}

interface RadioGroupState {
  selectedIndex: number;
}

export default class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {} as RadioGroupData
  };

  constructor(props: RadioGroupProps) {
    super(props);
    this.state = {
      selectedIndex: props.data.selectedIndex
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: RadioGroupProps): void {
    const { data } = nextProps;
    this.setState({
      selectedIndex: data.selectedIndex
    });
  }

  private _onItemClick(
    event: React.MouseEvent,
    data: RadioGroupData,
    clickedButton: ButtonConfig,
    disabled: boolean | undefined
  ): void {
    if (disabled) return;

    for (let index = 0; index < data.btns.length; index++) {
      if (data.btns[index] === clickedButton) {
        this.setState(
          {
            selectedIndex: index
          },
          () => {
            data.onchange(this.state.selectedIndex);
          }
        );
      }
    }
  }

  private createPopover(element: React.ReactNode, helpTipData: HelpTipData): React.ReactNode {
    return helpTipData.text
      ? React.createElement(
          HSApp.UI.Popover.Tooltip,
          {
            trigger: helpTipData.trigger || 'hover',
            title: helpTipData.text,
            placement: helpTipData.placement || 'right',
            delay: helpTipData.delay || 200
          },
          element
        )
      : '';
  }

  render(): React.ReactNode {
    const { data } = this.props;
    let visibilityClass = '';
    let labelVisibilityClass = 'label-hidden';
    let disabledClass = '';
    const customClassName = data.className || '';

    if (data.hidden) {
      visibilityClass = 'hide';
    }
    if (data.disabled) {
      disabledClass = 'disabled';
    }
    if (data.tooltip) {
      labelVisibilityClass = '';
    }

    const radioItems: React.ReactNode[] = [];

    for (let index = 0; index < data.btns.length; index++) {
      const button = data.btns[index];
      const itemContent: React.ReactNode[] = [];

      if (button.label) {
        itemContent.push(
          React.createElement('span', { className: 'inputlabel' }, button.label)
        );
      }

      if (this.state.selectedIndex !== index) {
        if (button.src?.[0]) {
          itemContent.push(
            React.createElement('img', {
              className: 'img-btn',
              src: button.src[0],
              alt: ''
            })
          );
        }
        radioItems.push(
          React.createElement(
            'div',
            {
              className: `radio-item ${button.className}`,
              onClick: (event: React.MouseEvent) =>
                this._onItemClick(event, data, button, data.disabled)
            },
            itemContent
          )
        );
      } else {
        if (button.src?.[1]) {
          itemContent.push(
            React.createElement('img', {
              className: 'img-btn',
              src: button.src[1],
              alt: ''
            })
          );
        }
        radioItems.push(
          React.createElement(
            'div',
            {
              className: `radio-item active-item ${button.className}`
            },
            itemContent
          )
        );
      }
    }

    let helpTipIcon: React.ReactNode = '';
    let helpTipPopover: React.ReactNode = '';

    if (data.helptipData) {
      helpTipIcon = React.createElement(
        'span',
        { className: 'imageButton' },
        React.createElement('img', { src: require('./path/to/helpicon') })
      );
      helpTipPopover = this.createPopover(helpTipIcon, data.helptipData);
    }

    let titleElement: React.ReactNode = '';
    if (data.label) {
      titleElement = React.createElement(
        'span',
        { className: 'radio-title' },
        data.label
      );
    }

    return React.createElement(
      'div',
      {
        className: `react-radio ${visibilityClass} ${customClassName}${disabledClass}`
      },
      titleElement,
      React.createElement(
        'div',
        { className: `radio-label ${labelVisibilityClass}` },
        React.createElement('span', { className: 'label-tooltip' }, data.tooltip)
      ),
      helpTipPopover,
      React.createElement('div', { className: 'react-radio-btn' }, radioItems)
    );
  }
}