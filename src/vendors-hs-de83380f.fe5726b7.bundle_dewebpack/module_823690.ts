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

const folderFilledIcon: IconDefinition = {
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
          d: "M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32z"
        }
      }
    ]
  },
  name: "folder",
  theme: "filled"
};

export default folderFilledIcon;