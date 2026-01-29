interface SvgAttrs {
  viewBox?: string;
  focusable?: string;
  d?: string;
  fill?: string;
}

interface SvgNode {
  tag: string;
  attrs: SvgAttrs;
}

interface SvgRoot {
  tag: string;
  attrs: SvgAttrs;
  children: SvgNode[];
}

interface IconConfig {
  icon: (primaryColor: string, secondaryColor: string) => SvgRoot;
  name: string;
  theme: string;
}

const BORDER_RADIUS = 8;

const PlusSquareIcon: IconConfig = {
  icon: function(primaryColor: string, secondaryColor: string): SvgRoot {
    return {
      tag: "svg",
      attrs: {
        viewBox: "64 64 896 896",
        focusable: "false"
      },
      children: [
        {
          tag: "path",
          attrs: {
            d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
            fill: primaryColor
          }
        },
        {
          tag: "path",
          attrs: {
            d: "M184 840h656V184H184v656zm136-352c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48z",
            fill: secondaryColor
          }
        },
        {
          tag: "path",
          attrs: {
            d: "M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z",
            fill: primaryColor
          }
        }
      ]
    };
  },
  name: "plus-square",
  theme: "twotone"
};

export default PlusSquareIcon;