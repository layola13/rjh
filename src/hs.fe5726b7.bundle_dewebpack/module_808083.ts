import React from 'react';
import PropTypes from 'prop-types';

interface SVGIconProps {
  src: string;
}

interface SVGIconRefs {
  svgIconWrap: HTMLDivElement;
}

declare global {
  const ResourceManager: {
    injectSVGImage(element: Element): void;
  };
}

export default class SVGIcon extends React.Component<SVGIconProps> {
  static propTypes = {
    src: PropTypes.string.isRequired
  };

  refs!: SVGIconRefs;

  componentDidMount(): void {
    const svgElement = this.refs.svgIconWrap.children[0];
    ResourceManager.injectSVGImage(svgElement);
  }

  shouldComponentUpdate(nextProps: SVGIconProps): boolean {
    return nextProps.src !== this.props.src;
  }

  componentDidUpdate(): void {
    const svgElement = this.refs.svgIconWrap.children[0];
    ResourceManager.injectSVGImage(svgElement);
  }

  render(): React.ReactElement {
    return React.createElement(
      'div',
      {
        key: this.props.src,
        ref: 'svgIconWrap',
        className: 'svgWrapper'
      },
      React.createElement('span', {
        className: 'svgicon',
        'data-src': this.props.src
      })
    );
  }
}