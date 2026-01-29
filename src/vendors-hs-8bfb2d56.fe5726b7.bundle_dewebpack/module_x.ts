interface FileSystem {
  ErrnoError: new (errno: number) => FSError;
}

interface FSError extends Error {
  errno: number;
}

interface StreamAPI {
  varargs: unknown;
  getStreamFromFD(): void;
}

declare const $: StreamAPI;
declare const FS: FileSystem | undefined;
declare function wt(error: unknown): void;

function moduleX(e: unknown, t: unknown): number {
  $.varargs = t;
  
  try {
    $.getStreamFromFD();
    return 0;
  } catch (error) {
    if (typeof FS !== "undefined" && error instanceof FS.ErrnoError) {
      return -(error as FSError).errno;
    }
    
    wt(error);
    return -(error as FSError).errno;
  }
}

export { moduleX };