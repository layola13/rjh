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
          d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"
        }
      }
    ]
  },
  name: "border",
  theme: "outlined"
};

export default iconDefinition;