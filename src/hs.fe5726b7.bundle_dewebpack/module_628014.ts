import React from 'react';
import type { CSSProperties, MouseEvent } from 'react';

interface SvgIconProps {
  click?: (event: MouseEvent<HTMLDivElement>) => void;
  icon: string;
  className?: string;
  style?: CSSProperties;
  onMouseOver?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseOut?: (event: MouseEvent<HTMLDivElement>) => void;
}

interface SvgIconComponentProps {
  src: string;
}

declare const SvgIconComponent: React.ComponentType<SvgIconComponentProps>;

export default class SvgIcon extends React.Component<SvgIconProps> {
  static defaultProps = {
    className: ''
  };

  constructor(props: SvgIconProps) {
    super(props);
  }

  render(): React.ReactElement {
    const { className = '', style, click, onMouseOver, onMouseOut, icon } = this.props;

    return React.createElement(
      'div',
      {
        className: `svgIconContainer ${className}`,
        style,
        onClick: click,
        onMouseOver,
        onMouseOut
      },
      React.createElement(SvgIconComponent, {
        src: icon
      })
    );
  }
}