function getFontSize(element: unknown): number {
  const DEFAULT_FONT_SIZE = 12;
  const fontSizeProperty = new Property("fontSize", Font.Parse(ctx.font).fontSize);
  
  if (!fontSizeProperty.hasValue()) {
    return DEFAULT_FONT_SIZE;
  }
  
  return fontSizeProperty.Length.toPixels(element);
}

interface Property {
  hasValue(): boolean;
  Length: {
    toPixels(element: unknown): number;
  };
}

interface Font {
  fontSize: string;
}

interface Context {
  font: string;
}

declare const Property: {
  new (name: string, value: string): Property;
};

declare const Font: {
  Parse(font: string): Font;
};

declare const ctx: Context;