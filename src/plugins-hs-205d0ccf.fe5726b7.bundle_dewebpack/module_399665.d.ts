import React from 'react';
import PropTypes from 'prop-types';

/**
 * Props for the SVGImageComponent
 */
export interface SVGImageComponentProps {
  /**
   * Source filename for the SVG image
   * The image will be loaded from: plugin/switchlanguage/res/Imgswitchlanguage/{src}
   */
  src?: string;
}

/**
 * Component that injects SVG images from the resource manager
 * 
 * This component renders a span element with a data-src attribute pointing to an SVG image.
 * After mounting, it uses the ResourceManager to inject the actual SVG content into the DOM.
 * 
 * @example
 *