interface IconAttrs {
  viewBox?: string;
  focusable?: string;
  d?: string;
  fill?: string;
}

interface IconChild {
  tag: string;
  attrs: IconAttrs;
}

interface IconStructure {
  tag: string;
  attrs: IconAttrs;
  children: IconChild[];
}

interface IconFunction {
  (primaryColor: string, secondaryColor: string): IconStructure;
}

interface IconDefinition {
  icon: IconFunction;
  name: string;
  theme: string;
}

const MobileIcon: IconDefinition = {
  icon: function(primaryColor: string, secondaryColor: string): IconStructure {
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
            d: "M744 64H280c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h464c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64zm-8 824H288V136h448v752z",
            fill: primaryColor
          }
        },
        {
          tag: "path",
          attrs: {
            d: "M288 888h448V136H288v752zm224-142c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40z",
            fill: secondaryColor
          }
        },
        {
          tag: "path",
          attrs: {
            d: "M472 786a40 40 0 1080 0 40 40 0 10-80 0z",
            fill: primaryColor
          }
        }
      ]
    };
  },
  name: "mobile",
  theme: "twotone"
};

export default MobileIcon;