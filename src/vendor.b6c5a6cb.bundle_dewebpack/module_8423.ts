/**
 * FileSaver.js implementation
 * @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js
 */

type FileSaverCallback = (event?: Event | ProgressEvent) => void;

interface FileSaverInstance {
  readyState: number;
  error: Error | null;
  onwritestart: FileSaverCallback | null;
  onprogress: FileSaverCallback | null;
  onwrite: FileSaverCallback | null;
  onabort: FileSaverCallback | null;
  onerror: FileSaverCallback | null;
  onwriteend: FileSaverCallback | null;
  abort(): void;
  INIT: number;
  WRITING: number;
  DONE: number;
}

interface FileSystemDirectoryEntry {
  root: {
    getDirectory(
      path: string,
      options: FileSystemFlags,
      successCallback: (entry: DirectoryEntry) => void,
      errorCallback?: (error: FileError) => void
    ): void;
  };
}

interface DirectoryEntry {
  getFile(
    path: string,
    options: FileSystemFlags,
    successCallback: (entry: FileEntry) => void,
    errorCallback?: (error: FileError) => void
  ): void;
}

interface FileEntry {
  createWriter(
    successCallback: (writer: FileWriter) => void,
    errorCallback?: () => void
  ): void;
  toURL(): string;
  remove(): void;
}

interface FileWriter {
  onwriteend: ((event: ProgressEvent) => void) | null;
  onerror: (() => void) | null;
  onwritestart: FileSaverCallback | null;
  onprogress: FileSaverCallback | null;
  onwrite: FileSaverCallback | null;
  onabort: FileSaverCallback | null;
  write(data: Blob): void;
  abort(): void;
  error?: { code: number; ABORT_ERR: number };
}

interface FileError {
  code: number;
  NOT_FOUND_ERR: number;
  ABORT_ERR: number;
}

interface FileSystemFlags {
  create: boolean;
  exclusive?: boolean;
}

interface ExtendedWindow extends Window {
  webkitRequestFileSystem?: (
    type: number,
    size: number,
    successCallback: (fs: FileSystemDirectoryEntry) => void,
    errorCallback?: () => void
  ) => void;
  requestFileSystem?: (
    type: number,
    size: number,
    successCallback: (fs: FileSystemDirectoryEntry) => void,
    errorCallback?: () => void
  ) => void;
  mozRequestFileSystem?: (
    type: number,
    size: number,
    successCallback: (fs: FileSystemDirectoryEntry) => void,
    errorCallback?: () => void
  ) => void;
  webkitURL?: typeof URL;
  TEMPORARY: number;
  externalHost?: boolean;
  chrome?: unknown;
  almond?: { define: unknown };
}

const OCTET_STREAM_MIME = "application/octet-stream";
const DEFAULT_FILENAME = "download";

const saveAs =
  (typeof navigator !== "undefined" &&
    navigator.msSaveOrOpenBlob &&
    navigator.msSaveOrOpenBlob.bind(navigator)) ||
  ((globalContext: ExtendedWindow): ((blob: Blob, filename?: string) => FileSaverInstance) => {
    "use strict";

    if (typeof navigator === "undefined" || !/MSIE [1-9]\./.test(navigator.userAgent)) {
      const doc = globalContext.document;

      const getURL = (): typeof URL => {
        return globalContext.URL || globalContext.webkitURL || globalContext;
      };

      const anchorElement = doc.createElementNS("http://www.w3.org/1999/xhtml", "a") as HTMLAnchorElement;
      const supportsDownloadAttribute = !globalContext.externalHost && "download" in anchorElement;
      const webkitRequestFS = globalContext.webkitRequestFileSystem;
      const requestFS = globalContext.requestFileSystem || webkitRequestFS || globalContext.mozRequestFileSystem;

      const throwAsync = (error: Error): void => {
        (globalContext.setImmediate || globalContext.setTimeout)(() => {
          throw error;
        }, 0);
      };

      let filesystemStorageSize = 0;
      const revokeQueue: Array<string | FileEntry> = [];

      const revokeAll = (): void => {
        for (let i = revokeQueue.length; i--;) {
          const item = revokeQueue[i];
          if (typeof item === "string") {
            getURL().revokeObjectURL(item);
          } else {
            item.remove();
          }
        }
        revokeQueue.length = 0;
      };

      const dispatchAll = (
        target: FileSaverInstance,
        eventTypes: string[],
        event?: Event | ProgressEvent
      ): void => {
        const types = [].concat(eventTypes);
        for (let i = types.length; i--;) {
          const handler = (target as any)[`on${types[i]}`];
          if (typeof handler === "function") {
            try {
              handler.call(target, event || target);
            } catch (error) {
              throwAsync(error as Error);
            }
          }
        }
      };

      class FileSaver implements FileSaverInstance {
        readyState: number = 0;
        error: Error | null = null;
        onwritestart: FileSaverCallback | null = null;
        onprogress: FileSaverCallback | null = null;
        onwrite: FileSaverCallback | null = null;
        onabort: FileSaverCallback | null = null;
        onerror: FileSaverCallback | null = null;
        onwriteend: FileSaverCallback | null = null;
        INIT = 0;
        WRITING = 1;
        DONE = 2;

        constructor(blob: Blob, filename: string = DEFAULT_FILENAME) {
          let objectURL: string | undefined;
          let popup: Window | null = null;
          let slicedBlob: Blob | undefined;
          const self = this;
          let mimeType = blob.type;
          let forceSlice = false;

          const createObjectURL = (): string => {
            const url = getURL().createObjectURL(blob);
            revokeQueue.push(url);
            return url;
          };

          const dispatchEvents = (): void => {
            dispatchAll(self, ["writestart", "progress", "write", "writeend"]);
          };

          const fallbackDownload = (): void => {
            if (!forceSlice && !objectURL) {
              objectURL = createObjectURL();
            }
            if (popup) {
              popup.location.href = objectURL;
            } else {
              window.open(objectURL, "_blank");
            }
            self.readyState = self.DONE;
            dispatchEvents();
          };

          const abortableCallback = <T extends (...args: any[]) => any>(callback: T): T => {
            return ((...args: Parameters<T>) => {
              if (self.readyState !== self.DONE) {
                return callback.apply(this, args);
              }
            }) as T;
          };

          const fileSystemFlags: FileSystemFlags = {
            create: true,
            exclusive: false,
          };

          this.readyState = this.INIT;

          if (supportsDownloadAttribute) {
            objectURL = createObjectURL();
            anchorElement.href = objectURL;
            anchorElement.download = filename;

            const clickEvent = doc.createEvent("MouseEvents");
            clickEvent.initMouseEvent(
              "click",
              true,
              false,
              globalContext,
              0,
              0,
              0,
              0,
              0,
              false,
              false,
              false,
              false,
              0,
              null
            );
            anchorElement.dispatchEvent(clickEvent);

            this.readyState = this.DONE;
            dispatchEvents();
            return;
          }

          if (globalContext.chrome && mimeType && mimeType !== OCTET_STREAM_MIME) {
            slicedBlob = blob.slice || (blob as any).webkitSlice;
            blob = slicedBlob.call(blob, 0, blob.size, OCTET_STREAM_MIME);
            forceSlice = true;
          }

          if (webkitRequestFS && filename !== DEFAULT_FILENAME) {
            filename += ".download";
          }

          if (mimeType === OCTET_STREAM_MIME || webkitRequestFS) {
            popup = globalContext;
          }

          if (requestFS) {
            filesystemStorageSize += blob.size;
            requestFS(
              globalContext.TEMPORARY,
              filesystemStorageSize,
              abortableCallback((filesystem: FileSystemDirectoryEntry) => {
                filesystem.root.getDirectory(
                  "saved",
                  fileSystemFlags,
                  abortableCallback((directory: DirectoryEntry) => {
                    const saveFile = (): void => {
                      directory.getFile(
                        filename,
                        fileSystemFlags,
                        abortableCallback((fileEntry: FileEntry) => {
                          fileEntry.createWriter(
                            abortableCallback((writer: FileWriter) => {
                              writer.onwriteend = (event: ProgressEvent) => {
                                popup!.location.href = fileEntry.toURL();
                                revokeQueue.push(fileEntry);
                                self.readyState = self.DONE;
                                dispatchAll(self, ["writeend"], event);
                              };

                              writer.onerror = () => {
                                const error = writer.error;
                                if (error?.code !== error?.ABORT_ERR) {
                                  fallbackDownload();
                                }
                              };

                              ["writestart", "progress", "write", "abort"].forEach((eventType) => {
                                (writer as any)[`on${eventType}`] = (self as any)[`on${eventType}`];
                              });

                              writer.write(blob);

                              self.abort = () => {
                                writer.abort();
                                self.readyState = self.DONE;
                              };

                              self.readyState = self.WRITING;
                            }),
                            fallbackDownload
                          );
                        }),
                        fallbackDownload
                      );
                    };

                    directory.getFile(
                      filename,
                      { create: false },
                      abortableCallback((existingFile: FileEntry) => {
                        existingFile.remove();
                        saveFile();
                      }),
                      abortableCallback((error: FileError) => {
                        if (error.code === error.NOT_FOUND_ERR) {
                          saveFile();
                        } else {
                          fallbackDownload();
                        }
                      })
                    );
                  }),
                  fallbackDownload
                );
              }),
              fallbackDownload
            );
          } else {
            fallbackDownload();
          }
        }

        abort(): void {
          this.readyState = this.DONE;
          dispatchAll(this, ["abort"]);
        }
      }

      const saveAsFunction = (blob: Blob, filename?: string): FileSaverInstance => {
        return new FileSaver(blob, filename);
      };

      saveAsFunction.unload = (): void => {
        revokeAll();
        globalContext.removeEventListener("unload", revokeAll, false);
      };

      globalContext.addEventListener("unload", revokeAll, false);

      return saveAsFunction;
    }

    return (() => {}) as any;
  })(
    (typeof self !== "undefined" && self) ||
      (typeof window !== "undefined" && window) ||
      (globalThis as any)
  );

export default saveAs;