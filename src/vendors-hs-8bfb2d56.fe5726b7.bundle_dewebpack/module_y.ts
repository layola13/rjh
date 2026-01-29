interface FileSystemError extends Error {
  errno: number;
}

interface FileSystem {
  ErrnoError: new (errno: number) => FileSystemError;
}

declare const FS: FileSystem | undefined;
declare const $: StreamManager;
declare function wt(error: unknown): void;

interface StreamManager {
  varargs: unknown;
  getStreamFromFD(): void;
  get(): void;
}

function moduleY(e: unknown, t: unknown): number {
  $.varargs = t;
  
  try {
    $.getStreamFromFD();
    $.get();
    $.get();
    $.get();
    $.get();
    return 0;
  } catch (error) {
    if (typeof FS !== "undefined" && error instanceof FS.ErrnoError) {
      return -(error as FileSystemError).errno;
    }
    
    wt(error);
    return -(error as FileSystemError).errno;
  }
}