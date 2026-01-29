interface IconAttrs {
  viewBox: string;
  focusable: string;
}

interface PathAttrs {
  d: string;
}

interface IconChild {
  tag: string;
  attrs: PathAttrs;
}

interface Icon {
  tag: string;
  attrs: IconAttrs;
  children: IconChild[];
}

interface IconDefinition {
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
          d: "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"
        }
      },
      {
        tag: "path",
        attrs: {
          d: "M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"
        }
      }
    ]
  },
  name: "plus",
  theme: "outlined"
};

export default iconDefinition;