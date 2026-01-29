import { Opening_IO, Opening } from './Opening';
import { Entity } from './Entity';

interface WindowData {
  __indent?: number;
  __thickness: number;
}

class Window_IO extends Opening_IO {
  load(data: WindowData, target: unknown, options: unknown): void {
    const windowData = data;
    super.load(windowData, target, options);
    
    if (!windowData.__indent) {
      windowData.__indent = windowData.__thickness / 2;
    }
  }
}

class Window extends Opening {
  constructor(id: string = "") {
    super(id);
    this.topView = HSConstants.Resources?.svgs.default_window_symbol;
    this.z = HSConstants.Constants.DEFAULT_WINDOW_ELEVATION;
  }

  getIndentVector() {
    return this.getIndentDirection().setLength(this.indent - this.thickness / 2);
  }

  protected _setThickness(thickness: number): void {
    if (this.__thickness !== thickness) {
      this.__indent = thickness / 2;
    }
    super._setThickness(thickness);
  }

  getIO(): Window_IO {
    return Window_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgWindow, Window);

export { Window_IO, Window };