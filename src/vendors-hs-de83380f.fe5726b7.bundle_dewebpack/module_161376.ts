interface IconAttrs {
  viewBox?: string;
  focusable?: string;
  d?: string;
}

interface IconChild {
  tag: string;
  attrs: IconAttrs;
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
          d: "M916 210H376c-17.7 0-32 14.3-32 32v236H108c-17.7 0-32 14.3-32 32v272c0 17.7 14.3 32 32 32h540c17.7 0 32-14.3 32-32V546h236c17.7 0 32-14.3 32-32V242c0-17.7-14.3-32-32-32zM612 746H412V546h200v200zm268-268H680V278h200v200z"
        }
      }
    ]
  },
  name: "build",
  theme: "filled"
};

export default iconDefinition;