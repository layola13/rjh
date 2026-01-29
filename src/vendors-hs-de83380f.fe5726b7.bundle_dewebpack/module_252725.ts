export interface IconAttrs {
  viewBox: string;
  focusable: string;
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

const funnelPlotFilledIcon: IconConfig = {
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
          d: "M336.7 586h350.6l84.9-148H251.8zm543.4-432H143.9c-24.5 0-39.8 26.7-27.5 48L215 374h594l98.7-172c12.2-21.3-3.1-48-27.6-48zM349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V650H349v188z"
        }
      }
    ]
  },
  name: "funnel-plot",
  theme: "filled"
};

export default funnelPlotFilledIcon;