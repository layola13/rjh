class ClipperPlusError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, ClipperPlusError.prototype);
    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}

interface NativeClipperInstance {
  package: unknown;
  asyncLoad(): Promise<NativeClipperInstance>;
}

let clipperInstance: NativeClipperInstance | Error | undefined;

async function loadNativeClipperPlusLibInstanceAsync(): Promise<unknown> {
  if (clipperInstance instanceof Error) {
    throw new ClipperPlusError("could not load native polygontools in the desired format");
  }

  if (clipperInstance !== undefined) {
    return new ClipperPlusLibWrapper();
  }

  try {
    if (!globalThis.document) {
      globalThis.document = {} as Document;
    }

    const nativeModule = await import('./native-clipper-module');
    clipperInstance = await nativeModule.asyncLoad();
    clipperInstance.package = nativeModule.package;

    return new ClipperPlusLibWrapper();
  } catch (error) {
    clipperInstance = error as Error;
    throw new ClipperPlusError("could not load native polygontools in the desired format");
  }
}

function getClipperInstance(): NativeClipperInstance {
  if (clipperInstance instanceof Error || clipperInstance == null) {
    throw new Error("Polygontools is not loaded correctly");
  }
  return clipperInstance;
}

class ClipperPlusLibWrapper {
  // Wrapper implementation
}

export { ClipperPlusError, loadNativeClipperPlusLibInstanceAsync, getClipperInstance };