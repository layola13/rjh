interface SVGAttrs {
  viewBox: string;
  focusable: string;
  d?: string;
}

interface SVGChild {
  tag: string;
  attrs: SVGAttrs;
}

interface SVGIcon {
  tag: string;
  attrs: SVGAttrs;
  children: SVGChild[];
}

interface IconDefinition {
  icon: SVGIcon;
  name: string;
  theme: string;
}

const iconDefinition: IconDefinition = {
  icon: {
    tag: "svg",
    attrs: {
      viewBox: "64 64 896 896",
      focusable: "false"
    },
    children: [
      {
        tag: "path",
        attrs: {
          d: "M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"
        }
      }
    ]
  },
  name: "menu",
  theme: "outlined"
};

export default iconDefinition;