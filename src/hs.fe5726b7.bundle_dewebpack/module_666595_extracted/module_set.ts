interface RGBAColor {
  _rgba: [number, number, number, number];
  blend(background: string): RGBAColor;
  toRgbaString(): string;
}

interface ColorSupport {
  rgba: boolean;
}

interface ColorUtils {
  type(value: unknown): string;
  css(element: HTMLElement, property: string): string;
}

const COLOR_SUPPORT: ColorSupport = { rgba: false };

function parseColor(input: string): [number, number, number, number] | null {
  // Implementation placeholder for color parsing
  return null;
}

function createColorObject(input: string | [number, number, number, number]): RGBAColor {
  // Implementation placeholder for color object creation
  return {} as RGBAColor;
}

function setStyle(
  element: HTMLElement,
  propertyName: string,
  colorValue: string | RGBAColor,
  utils: ColorUtils
): void {
  let parsedColor: [number, number, number, number] | null = null;
  let backgroundColor = "";

  if (colorValue === "transparent") {
    return;
  }

  if (typeof colorValue === "string") {
    parsedColor = parseColor(colorValue);
  }

  if (parsedColor !== null || typeof colorValue !== "string") {
    const color = createColorObject(parsedColor ?? colorValue);

    if (!COLOR_SUPPORT.rgba && color._rgba[3] !== 1) {
      let currentElement: HTMLElement | null =
        propertyName === "backgroundColor" ? element.parentNode as HTMLElement : element;

      while (
        (backgroundColor === "" || backgroundColor === "transparent") &&
        currentElement?.style
      ) {
        try {
          backgroundColor = utils.css(currentElement, "backgroundColor");
          currentElement = currentElement.parentNode as HTMLElement;
        } catch (error) {
          break;
        }
      }

      const blendColor = backgroundColor && backgroundColor !== "transparent" 
        ? backgroundColor 
        : "_default";
      
      const blendedColor = color.blend(blendColor);
      colorValue = blendedColor.toRgbaString();
    } else {
      colorValue = color.toRgbaString();
    }
  }

  try {
    element.style[propertyName as any] = colorValue as string;
  } catch (error) {
    // Silently fail if style property cannot be set
  }
}