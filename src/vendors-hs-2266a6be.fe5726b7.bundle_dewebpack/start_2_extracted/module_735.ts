interface GraphicsCardInfo {
  graphicsCard: string;
  webglName: string;
  webglVersion: string;
}

interface MemoryInfo {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

/**
 * Gets the graphics card information by probing WebGL contexts
 * @returns Graphics card details or null if unavailable
 */
export function getGraphicsCard(): GraphicsCardInfo | null {
  try {
    const canvas = document.createElement("canvas");
    let graphicsCard = "";
    let webglVersion = "";

    const contextNames = [
      "webgl2",
      "experimental-webgl2",
      "webgl",
      "experimental-webgl"
    ];

    const webglName = contextNames.find((contextName) => {
      const context = canvas.getContext(contextName, { stencil: true });
      
      if (!context) {
        return false;
      }

      const debugInfo = context.getExtension("WEBGL_debug_renderer_info");
      
      if (debugInfo) {
        graphicsCard = context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
      
      webglVersion = context.getParameter(context.VERSION);
      
      const loseContextExt = context.getExtension("WEBGL_lose_context");
      loseContextExt?.loseContext?.();

      return true;
    });

    canvas.remove();

    return {
      graphicsCard,
      webglName: webglName ?? "",
      webglVersion
    };
  } catch (error) {
    return null;
  }
}

/**
 * Gets JavaScript heap memory usage information
 * @returns Memory usage details or null if unavailable
 */
export function getMemory(): MemoryInfo | null {
  if (!performance?.memory) {
    return null;
  }

  const memoryKeys: Array<keyof MemoryInfo> = [
    "jsHeapSizeLimit",
    "totalJSHeapSize",
    "usedJSHeapSize"
  ];

  return memoryKeys.reduce((result, key) => {
    result[key] = performance.memory[key];
    return result;
  }, {} as MemoryInfo);
}