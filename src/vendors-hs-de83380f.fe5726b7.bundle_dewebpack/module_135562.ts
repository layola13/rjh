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

const appstoreFilledIcon: IconDefinition = {
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
          d: "M864 144H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm0 400H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zM464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm0 400H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16z"
        }
      }
    ]
  },
  name: "appstore",
  theme: "filled"
};

export default appstoreFilledIcon;