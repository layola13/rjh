interface SvgAttrs {
  viewBox: string;
  focusable: string;
}

interface PathAttrs {
  d: string;
}

interface SvgChild {
  tag: string;
  attrs: PathAttrs;
}

interface IconConfig {
  tag: string;
  attrs: SvgAttrs;
  children: SvgChild[];
}

interface IconDefinition {
  icon: IconConfig;
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
          d: "M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"
        }
      }
    ]
  },
  name: "more",
  theme: "outlined"
};

export default iconDefinition;