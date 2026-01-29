/**
 * Increments the reference count for a module if its ID is greater than 4.
 * @param moduleId - The ID of the module to increment the reference count for
 */
function incrementModuleRefCount(moduleId: number): void {
  if (moduleId > 4) {
    moduleTable[moduleId].refcount += 1;
  }
}

interface ModuleEntry {
  refcount: number;
  [key: string]: unknown;
}

const moduleTable: ModuleEntry[] = [];