export interface IconAttrs {
  viewBox: string;
  focusable: string;
  d?: string;
}

export interface IconChild {
  tag: string;
  attrs: IconAttrs;
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

const mailFilledIcon: IconDefinition = {
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
          viewBox: "",
          focusable: "",
          d: "M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z"
        }
      }
    ]
  },
  name: "mail",
  theme: "filled"
};

export default mailFilledIcon;