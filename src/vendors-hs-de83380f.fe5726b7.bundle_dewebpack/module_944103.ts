export interface IconAttrs {
  viewBox: string;
  focusable: string;
}

export interface PathAttrs {
  d: string;
}

export interface IconChild {
  tag: string;
  attrs: PathAttrs;
}

export interface Icon {
  tag: string;
  attrs: IconAttrs;
  children: IconChild[];
}

export interface IconDefinition {
  icon: Icon;
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
          d: "M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"
        }
      }
    ]
  },
  name: "ellipsis",
  theme: "outlined"
};

export default iconDefinition;