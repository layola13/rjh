/**
 * Step Backward Icon Definition
 * An outlined theme icon representing a "step backward" control (previous/rewind button)
 */

/**
 * SVG path attributes interface
 */
interface SVGPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SVGAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag name */
    tag: string;
    /** Root SVG attributes */
    attrs: SVGAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SVGChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: string;
}

/**
 * Step Backward icon definition
 * Represents a media control button for going to the previous item or rewinding
 */
const stepBackwardIcon: IconDefinition = {
  icon: {
    tag: "svg",
    attrs: {
      viewBox: "0 0 1024 1024",
      focusable: "false"
    },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M347.6 528.95l383.2 301.02c14.25 11.2 35.2 1.1 35.2-16.95V210.97c0-18.05-20.95-28.14-35.2-16.94L347.6 495.05a21.53 21.53 0 000 33.9M330 864h-64a8 8 0 01-8-8V168a8 8 0 018-8h64a8 8 0 018 8v688a8 8 0 01-8 8"
        }
      }
    ]
  },
  name: "step-backward",
  theme: "outlined"
};

export default stepBackwardIcon;