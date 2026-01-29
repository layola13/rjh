export interface IconAttrs {
  viewBox?: string;
  focusable?: string;
  d?: string;
}

export interface IconChild {
  tag: string;
  attrs: IconAttrs;
}

export interface IconDefinition {
  tag: string;
  attrs: IconAttrs;
  children: IconChild[];
}

export interface IconConfig {
  icon: IconDefinition;
  name: string;
  theme: string;
}

const iconConfig: IconConfig = {
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
          d: "M904 476H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
        }
      }
    ]
  },
  name: "line",
  theme: "outlined"
};

export default iconConfig;