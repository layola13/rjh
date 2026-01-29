import React from 'react';

interface HintViewProps {
  hint?: string | React.ReactNode | React.ReactElement;
  icon: string;
  className?: string;
  show?: boolean;
}

interface HintViewState {
  value: string;
}

class HintView extends React.Component<HintViewProps, HintViewState> {
  static defaultProps: Partial<HintViewProps> = {
    className: '',
    hint: 'No Result',
    show: false
  };

  constructor(props: HintViewProps) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render(): React.ReactElement {
    const visibilityClass = this.props.show ? ' ' : 'hidden ';
    
    const hintContent = typeof this.props.hint === 'string'
      ? React.createElement('span', null, this.props.hint)
      : this.props.hint;

    const SVG_PATTERN = /\.(svg|SVG)$/;
    const iconElement = SVG_PATTERN.test(this.props.icon)
      ? React.createElement(HSApp.UI.SvgIcon, {
          className: 'hintIcon svgicon',
          icon: this.props.icon
        })
      : React.createElement('div', {
          className: 'hintIcon',
          style: {
            backgroundImage: `url(${this.props.icon})`
          }
        });

    return React.createElement(
      'div',
      {
        className: `hintView ${visibilityClass}${this.props.className ?? ''}`
      },
      iconElement,
      React.createElement('div', { className: 'hintText' }, hintContent)
    );
  }
}

export default HintView;