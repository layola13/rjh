interface SvgAttrs {
  viewBox?: string;
  focusable?: string;
  d?: string;
  fill?: string;
}

interface SvgNode {
  tag: string;
  attrs: SvgAttrs;
}

interface SvgRoot {
  tag: string;
  attrs: SvgAttrs;
  children: SvgNode[];
}

interface IconDefinition {
  icon: (primaryColor: string, secondaryColor: string) => SvgRoot;
  name: string;
  theme: string;
}

const OUTER_CIRCLE_PATH = "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z";
const MIDDLE_CIRCLE_PATH = "M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm192 396c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z";
const MINUS_BAR_PATH = "M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z";

const minusCircleIcon: IconDefinition = {
  icon(primaryColor: string, secondaryColor: string): SvgRoot {
    return {
      tag: "svg",
      attrs: {
        viewBox: "64 64 896 896",
        focusable: "false"
      },
      children: [
        {
          tag: "path",
          attrs: {
            d: OUTER_CIRCLE_PATH,
            fill: primaryColor
          }
        },
        {
          tag: "path",
          attrs: {
            d: MIDDLE_CIRCLE_PATH,
            fill: secondaryColor
          }
        },
        {
          tag: "path",
          attrs: {
            d: MINUS_BAR_PATH,
            fill: primaryColor
          }
        }
      ]
    };
  },
  name: "minus-circle",
  theme: "twotone"
};

export default minusCircleIcon;