interface TooltipData {
  position?: 'left' | 'right' | 'top' | 'bottom';
  [key: string]: unknown;
}

interface TooltipHandler {
  show(): void;
}

type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

class Tooltip {
  public data: TooltipData;
  public type: string;
  public position: TooltipPosition;
  private _handler: TooltipHandler;

  constructor(
    data: TooltipData,
    type: string,
    handler: TooltipHandler,
    defaultPosition?: TooltipPosition
  ) {
    this.data = data;
    this.type = type;
    this._handler = handler;
    this.position = data.position ?? defaultPosition ?? 'left';
  }

  public update(updates?: Partial<TooltipData>): void {
    if (updates) {
      Object.assign(this.data, updates);
      this._handler.show();
    }
  }
}

export default Tooltip;