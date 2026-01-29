function incrementRefCount(moduleId: number): void {
  if (moduleId > 4) {
    Qt[moduleId].refcount += 1;
  }
}