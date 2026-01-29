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

const smallDashOutlined: IconDefinition = {
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
          d: "M112 476h72v72h-72zm182 0h72v72h-72zm364 0h72v72h-72zm182 0h72v72h-72zm-364 0h72v72h-72z"
        }
      }
    ]
  },
  name: "small-dash",
  theme: "outlined"
};

export default smallDashOutlined;