import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

interface SVGImageProps {
  src: string;
}

export default class SVGImage extends React.Component<SVGImageProps> {
  static propTypes = {
    src: PropTypes.string
  };

  componentDidMount(): void {
    const element = ReactDOM.findDOMNode(this) as Element;
    ResourceManager.injectSVGImage(element);
  }

  render(): React.ReactElement {
    return React.createElement('span', {
      'data-src': `plugin/switchlanguage/res/Imgswitchlanguage/${this.props.src}`
    });
  }
}