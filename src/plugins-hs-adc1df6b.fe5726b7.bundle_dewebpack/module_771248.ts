export default class {
  get ClassName(): string {
    return "";
  }

  isSuckable(element: unknown): boolean {
    throw new Error("need to be implemented");
  }

  suck(element: unknown): unknown {
    throw new Error("need to be implemented");
  }

  isAppliable(element: unknown, data: unknown): boolean {
    throw new Error("need to be implemented");
  }

  apply(element: unknown, data: unknown): void {
    throw new Error("need to be implemented");
  }

  getUndoData(element: unknown): unknown {
    throw new Error("need to be implemented");
  }

  getRedoData(element: unknown): unknown {
    throw new Error("need to be implemented");
  }

  undo(element: unknown, data: unknown): void {
    throw new Error("need to be implemented");
  }

  redo(element: unknown, data: unknown): void {
    throw new Error("need to be implemented");
  }
}