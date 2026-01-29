interface PatternCache {
  [key: string]: string | null;
}

const patternCache: PatternCache = {};

export function render(
  backgroundColor: string,
  foregroundColor: string,
  size: number,
  canvasConstructor?: new () => HTMLCanvasElement
): string | null {
  if (typeof document === "undefined" && !canvasConstructor) {
    return null;
  }

  const canvas = canvasConstructor 
    ? new canvasConstructor() 
    : document.createElement("canvas");
  
  canvas.width = 2 * size;
  canvas.height = 2 * size;

  const context = canvas.getContext("2d");
  
  if (!context) {
    return null;
  }

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  context.fillStyle = foregroundColor;
  context.fillRect(0, 0, size, size);
  
  context.translate(size, size);
  context.fillRect(0, 0, size, size);

  return canvas.toDataURL();
}

export function get(
  backgroundColor: string,
  foregroundColor: string,
  size: number,
  isServerSide?: boolean
): string | null {
  const cacheKey = `${backgroundColor}-${foregroundColor}-${size}${isServerSide ? "-server" : ""}`;

  if (patternCache[cacheKey]) {
    return patternCache[cacheKey];
  }

  const pattern = render(
    backgroundColor,
    foregroundColor,
    size,
    isServerSide ? (undefined as any) : undefined
  );

  patternCache[cacheKey] = pattern;

  return pattern;
}