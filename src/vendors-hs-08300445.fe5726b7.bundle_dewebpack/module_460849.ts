interface ScrollBarSize {
  width: number;
  height: number;
}

let cachedScrollBarSize: ScrollBarSize | undefined;

function measureScrollBarSize(element?: Element): ScrollBarSize {
  const measureId = `rc-scrollbar-measure-${Math.random().toString(36).substring(7)}`;
  const measureDiv = document.createElement("div");
  measureDiv.id = measureId;

  const style = measureDiv.style;
  style.position = "absolute";
  style.left = "0";
  style.top = "0";
  style.width = "100px";
  style.height = "100px";
  style.overflow = "scroll";

  let customScrollbarWidth: number | undefined;
  let customScrollbarHeight: number | undefined;

  if (element) {
    const computedStyle = getComputedStyle(element);
    style.scrollbarColor = computedStyle.scrollbarColor;
    style.scrollbarWidth = computedStyle.scrollbarWidth;

    const webkitScrollbarStyle = getComputedStyle(element, "::-webkit-scrollbar");
    const parsedWidth = parseInt(webkitScrollbarStyle.width, 10);
    const parsedHeight = parseInt(webkitScrollbarStyle.height, 10);

    try {
      const widthCSS = parsedWidth ? `width: ${webkitScrollbarStyle.width};` : "";
      const heightCSS = parsedHeight ? `height: ${webkitScrollbarStyle.height};` : "";
      
      updateCSS(
        `#${measureId}::-webkit-scrollbar {\n${widthCSS}\n${heightCSS}\n}`,
        measureId
      );
    } catch (error) {
      console.error(error);
      customScrollbarWidth = parsedWidth;
      customScrollbarHeight = parsedHeight;
    }
  }

  document.body.appendChild(measureDiv);

  const scrollbarWidth =
    element && customScrollbarWidth && !isNaN(customScrollbarWidth)
      ? customScrollbarWidth
      : measureDiv.offsetWidth - measureDiv.clientWidth;

  const scrollbarHeight =
    element && customScrollbarHeight && !isNaN(customScrollbarHeight)
      ? customScrollbarHeight
      : measureDiv.offsetHeight - measureDiv.clientHeight;

  document.body.removeChild(measureDiv);
  removeCSS(measureId);

  return {
    width: scrollbarWidth,
    height: scrollbarHeight
  };
}

export function getTargetScrollBarSize(element?: Element): ScrollBarSize {
  if (typeof document === "undefined" || !element || !(element instanceof Element)) {
    return {
      width: 0,
      height: 0
    };
  }
  return measureScrollBarSize(element);
}

export default function getScrollBarSize(recalculate?: boolean): number {
  if (typeof document === "undefined") {
    return 0;
  }

  if (recalculate || cachedScrollBarSize === undefined) {
    cachedScrollBarSize = measureScrollBarSize();
  }

  return cachedScrollBarSize.width;
}

function updateCSS(css: string, key: string): void {
  const styleId = `rc-util-key-${key}`;
  let styleElement = document.querySelector<HTMLStyleElement>(`#${styleId}`);

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  styleElement.innerHTML = css;
}

function removeCSS(key: string): void {
  const styleId = `rc-util-key-${key}`;
  const styleElement = document.querySelector(`#${styleId}`);
  
  if (styleElement) {
    styleElement.remove();
  }
}