export class Action {
  manager: unknown;

  onExecute(param: unknown): void {}

  onComplete(): void {
    this.onDestroy();
  }

  onCancel(): void {
    this.onDestroy();
  }

  onDestroy(): void {}
}