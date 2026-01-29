export class UI {
  private _environment: unknown;
  private _aux2DContainer?: HTMLDivElement;

  constructor(environment: unknown) {
    this._environment = environment;
    this._aux2DContainer = undefined;
  }

  get aux2DContainer(): HTMLDivElement | undefined {
    return this._aux2DContainer;
  }

  renderAux2D(): void {
    if (!this._aux2DContainer) {
      const containerElement = document.createElement("div");
      containerElement.className = "outdoordrawing-aux2d";
      
      const editor2dContainer = document.querySelector(".editor2dContainer");
      editor2dContainer?.appendChild(containerElement);
      
      this._aux2DContainer = containerElement;
    }
  }

  destroy(): void {
    if (this._aux2DContainer) {
      this._aux2DContainer.remove();
      this._aux2DContainer = undefined;
    }
  }
}