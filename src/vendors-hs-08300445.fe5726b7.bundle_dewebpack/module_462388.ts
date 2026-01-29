interface NodeStyling {
  sizingStyle: string;
  paddingSize: number;
  borderSize: number;
  boxSizing: string;
}

interface TextareaSize {
  height: number;
  minHeight: number;
  maxHeight: number;
  overflowY: string | undefined;
  resize: string;
}

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const SIZING_STYLE_PROPERTIES = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "font-variant",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing",
  "word-break"
];

const stylingsCache: Record<string, NodeStyling> = {};

let hiddenTextarea: HTMLTextAreaElement | null = null;

export function calculateNodeStyling(
  element: HTMLTextAreaElement,
  useCache: boolean = false
): NodeStyling {
  const elementId =
    element.getAttribute("id") ||
    element.getAttribute("data-reactid") ||
    element.getAttribute("name");

  if (useCache && elementId && stylingsCache[elementId]) {
    return stylingsCache[elementId];
  }

  const computedStyle = window.getComputedStyle(element);
  const boxSizing =
    computedStyle.getPropertyValue("box-sizing") ||
    computedStyle.getPropertyValue("-moz-box-sizing") ||
    computedStyle.getPropertyValue("-webkit-box-sizing");

  const paddingSize =
    parseFloat(computedStyle.getPropertyValue("padding-bottom")) +
    parseFloat(computedStyle.getPropertyValue("padding-top"));

  const borderSize =
    parseFloat(computedStyle.getPropertyValue("border-bottom-width")) +
    parseFloat(computedStyle.getPropertyValue("border-top-width"));

  const sizingStyle = SIZING_STYLE_PROPERTIES.map(
    (property) => `${property}:${computedStyle.getPropertyValue(property)}`
  ).join(";");

  const styling: NodeStyling = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  };

  if (useCache && elementId) {
    stylingsCache[elementId] = styling;
  }

  return styling;
}

export default function calculateTextareaHeight(
  element: HTMLTextAreaElement,
  useCache: boolean = false,
  minRows: number | null = null,
  maxRows: number | null = null
): TextareaSize {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tab-index", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    document.body.appendChild(hiddenTextarea);
  }

  const wrapAttribute = element.getAttribute("wrap");
  if (wrapAttribute) {
    hiddenTextarea.setAttribute("wrap", wrapAttribute);
  } else {
    hiddenTextarea.removeAttribute("wrap");
  }

  const { paddingSize, borderSize, boxSizing, sizingStyle } = calculateNodeStyling(
    element,
    useCache
  );

  hiddenTextarea.setAttribute("style", `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
  hiddenTextarea.value = element.value || element.placeholder || "";

  let minHeight = Number.MIN_SAFE_INTEGER;
  let maxHeight = Number.MAX_SAFE_INTEGER;
  let height = hiddenTextarea.scrollHeight;

  if (boxSizing === "border-box") {
    height += borderSize;
  } else if (boxSizing === "content-box") {
    height -= paddingSize;
  }

  let overflowY: string | undefined;

  if (minRows !== null || maxRows !== null) {
    hiddenTextarea.value = " ";
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === "border-box") {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }

    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === "border-box") {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? "" : "hidden";
      height = Math.min(maxHeight, height);
    }
  }

  return {
    height,
    minHeight,
    maxHeight,
    overflowY,
    resize: "none"
  };
}