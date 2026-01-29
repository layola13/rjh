export interface IconAttrs {
  viewBox?: string;
  focusable?: string;
  d?: string;
  fill?: string;
}

export interface IconNode {
  tag: string;
  attrs: IconAttrs;
}

export interface IconDefinition {
  tag: string;
  attrs: IconAttrs;
  children: IconNode[];
}

export interface IconConfig {
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  name: string;
  theme: string;
}

const tabletTwoToneIcon: IconConfig = {
  icon: (primaryColor: string, secondaryColor: string): IconDefinition => {
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
            d: "M800 64H224c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64zm-8 824H232V136h560v752z",
            fill: primaryColor
          }
        },
        {
          tag: "path",
          attrs: {
            d: "M232 888h560V136H232v752zm280-144c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40z",
            fill: secondaryColor
          }
        },
        {
          tag: "path",
          attrs: {
            d: "M472 784a40 40 0 1080 0 40 40 0 10-80 0z",
            fill: primaryColor
          }
        }
      ]
    };
  },
  name: "tablet",
  theme: "twotone"
};

export default tabletTwoToneIcon;