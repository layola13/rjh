interface GraphicsInfo {
  graphicsCard: string;
  webglName: string;
  webglVersion: string;
}

interface MemoryInfo {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

const WEBGL_CONTEXTS = [
  "webgl2",
  "experimental-webgl2",
  "webgl",
  "experimental-webgl"
] as const;

const MEMORY_PROPERTIES = [
  "jsHeapSizeLimit",
  "totalJSHeapSize",
  "usedJSHeapSize"
] as const;

export function getGraphicsCard(): GraphicsInfo | null {
  try {
    const canvas = document.createElement("canvas");
    let graphicsCard = "";
    let webglVersion = "";

    const webglName = WEBGL_CONTEXTS.find((contextType) => {
      const context = canvas.getContext(contextType, { stencil: true });
      
      if (!context) {
        return false;
      }

      const debugInfo = context.getExtension("WEBGL_debug_renderer_info");
      
      if (debugInfo) {
        graphicsCard = context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
      
      webglVersion = context.getParameter(context.VERSION);
      
      const loseContextExtension = context.getExtension("WEBGL_lose_context");
      loseContextExtension?.loseContext?.();

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

export function getMemory(): MemoryInfo | null {
  if (!performance?.memory) {
    return null;
  }

  return MEMORY_PROPERTIES.reduce((result, property) => {
    result[property] = performance.memory[property];
    return result;
  }, {} as MemoryInfo);
}