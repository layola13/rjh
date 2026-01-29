export default function processFileSystemEntries(
  items: DataTransferItemList,
  onFilesFound: (files: File[]) => void,
  shouldIncludeFile: (file: File) => boolean
): void {
  const traverseEntry = (
    entry: FileSystemEntry,
    currentPath: string = ""
  ): void => {
    entry.path = currentPath;

    if (entry.isFile) {
      (entry as FileSystemFileEntry).file((file: File) => {
        if (shouldIncludeFile(file)) {
          if (entry.fullPath && !file.webkitRelativePath) {
            Object.defineProperties(file, {
              webkitRelativePath: {
                writable: true
              }
            });
            file.webkitRelativePath = entry.fullPath.replace(/^\//, "");
            Object.defineProperties(file, {
              webkitRelativePath: {
                writable: false
              }
            });
          }
          onFilesFound([file]);
        }
      });
    } else if (entry.isDirectory) {
      readAllDirectoryEntries(
        entry as FileSystemDirectoryEntry,
        (entries: FileSystemEntry[]) => {
          entries.forEach((childEntry: FileSystemEntry) => {
            traverseEntry(childEntry, `${currentPath}${entry.name}/`);
          });
        }
      );
    }
  };

  const readAllDirectoryEntries = (
    directoryEntry: FileSystemDirectoryEntry,
    callback: (entries: FileSystemEntry[]) => void
  ): void => {
    const reader = directoryEntry.createReader();
    const allEntries: FileSystemEntry[] = [];

    const readBatch = (): void => {
      reader.readEntries((entries: FileSystemEntry[]) => {
        const entriesArray = Array.prototype.slice.apply(entries);
        allEntries.push(...entriesArray);
        
        if (entriesArray.length > 0) {
          readBatch();
        } else {
          callback(allEntries);
        }
      });
    };

    readBatch();
  };

  Array.from(items).forEach((item: DataTransferItem) => {
    const entry = item.webkitGetAsEntry();
    if (entry) {
      traverseEntry(entry);
    }
  });
}