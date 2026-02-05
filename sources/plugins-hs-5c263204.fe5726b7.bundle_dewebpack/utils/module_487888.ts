// @ts-nocheck
interface Point {
  x: number;
  y: number;
}

interface PreviewStyle {
  "stroke-width": number;
  stroke: string;
  "fill-opacity": number;
  fill: string;
  "stroke-dasharray"?: string;
}

interface GizmoEventData {
  position: Point;
  event: MouseEvent;
}

interface SVGElement {
  attr(attributes: Record<string, number | string>): SVGElement;
  show(): SVGElement;
  hide(): SVGElement;
}

interface Layer {
  appendChild(element: SVGElement): void;
  removeChild(element: SVGElement): void;
}

interface Canvas {
  context: any;
}

interface Command {
  _startPoint: Point;
}

interface LeftMenuPlugin {
  showLeftMenuBar(position: { x: number; y: number }): void;
}

interface CmdManager {
  receive(command: string, data: GizmoEventData): void;
}

interface Environment {
  active: boolean;
}

interface EnvironmentManager {
  getEnvironment(name: string): Environment | null;
}

interface PluginManager {
  getPlugin(pluginType: string): LeftMenuPlugin;
}

interface App {
  cmdManager: CmdManager;
  environmentManager: EnvironmentManager;
  pluginManager: PluginManager;
}

interface Context {
  rect(x: number, y: number): SVGElement;
}

interface SVGUtil {
  ScreenPointToCanvas(screenPoint: [number, number], context: any): [number, number];
}

declare const HSApp: {
  View: {
    SVG: {
      Temp: any;
      Util: SVGUtil;
    };
  };
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: {
    LeftMenu: string;
  };
};

const MOVE_THROTTLE_MS = 40;
const LEFT_MOUSE_BUTTON = 1;

const DEFAULT_PREVIEW_STYLE: PreviewStyle = {
  "stroke-width": 1,
  stroke: "#606060",
  "fill-opacity": 0.3,
  fill: "#118ef5"
};

const FALSE_PREVIEW_STYLE: PreviewStyle = {
  "stroke-width": 1,
  stroke: "#53d1a0",
  "stroke-dasharray": "5 5",
  "fill-opacity": 0.3,
  fill: "rgb(134, 172, 157)"
};

export default class RectanglePreviewTool extends HSApp.View.SVG.Temp {
  private cmd: Command;
  private layer: Layer;
  private context: Context;
  private canvas: Canvas;
  private newVec: [number, number];
  private originVec: [number, number];
  private isPreview: boolean = false;
  private previewElement?: SVGElement;
  private firstMove: number = 0;
  private previewStyle: PreviewStyle;
  private falsePreviewStyle: PreviewStyle;
  private lastMoveTime?: number;
  private width: number = 0;
  private height: number = 0;

  constructor(context: Context, layer: Layer, cmd: Command) {
    super(context, layer, cmd, false);
    
    this.cmd = cmd;
    this.layer = layer;
    this.context = context;
    
    this.reset();
    
    this.newVec = [cmd._startPoint.x, cmd._startPoint.y];
    this.originVec = [...this.newVec];
    
    this.previewStyle = { ...DEFAULT_PREVIEW_STYLE };
    this.falsePreviewStyle = { ...FALSE_PREVIEW_STYLE };
  }

  /**
   * Initialize and draw the preview element
   */
  onDraw(): void {
    if (this.previewElement) {
      this.layer.appendChild(this.previewElement);
      this.updatePreview();
    } else {
      this.previewElement = this.context.rect(0, 0)
        .attr(this.previewStyle)
        .hide();
      this.onDraw();
    }
  }

  /**
   * Handle mouse move events with throttling
   */
  onMouseMove(event: MouseEvent, screenX: number, screenY: number): void {
    const currentTime = new Date().getTime();
    
    if (this.lastMoveTime && currentTime - this.lastMoveTime < MOVE_THROTTLE_MS) {
      return;
    }

    const canvasPoint = HSApp.View.SVG.Util.ScreenPointToCanvas(
      [screenX, screenY],
      this.canvas.context
    );
    
    const position: Point = {
      x: canvasPoint[0],
      y: canvasPoint[1]
    };

    this.newVec[0] = position.x;
    this.newVec[1] = position.y;

    if (this.originVec[0] === undefined) {
      this.originVec[0] = position.x;
    }
    if (this.originVec[1] === undefined) {
      this.originVec[1] = position.y;
    }

    const cmdManager = HSApp.App.getApp().cmdManager;
    this.firstMove += 1;
    this.isPreview = true;
    this.updatePreview();

    if (this.firstMove === 1) {
      cmdManager.receive(`gizmo.${event.type}`, {
        position,
        event
      });
    }

    this.lastMoveTime = currentTime;
  }

  /**
   * Handle mouse up events
   */
  onMouseUp(event: MouseEvent, screenX: number, screenY: number): void {
    if (!this.context) {
      return;
    }

    const canvasPoint = HSApp.View.SVG.Util.ScreenPointToCanvas(
      [screenX, screenY],
      this.canvas.context
    );
    
    const position: Point = {
      x: canvasPoint[0],
      y: canvasPoint[1]
    };

    if (event.which === LEFT_MOUSE_BUTTON) {
      this.isPreview = false;
      this.updatePreview();
      this.firstMove = 0;

      const app = HSApp.App.getApp();
      const mixpaintEnvironment = app.environmentManager.getEnvironment("mixpaint");

      if (mixpaintEnvironment && !mixpaintEnvironment.active) {
        const leftMenuPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.LeftMenu);
        leftMenuPlugin.showLeftMenuBar({
          x: event.pageX,
          y: event.pageY
        });
      }

      app.cmdManager.receive(`gizmo.${event.type}`, {
        position,
        event
      });
    }
  }

  /**
   * Update the preview rectangle based on current mouse position
   */
  private updatePreview(): void {
    if (!this.previewElement) {
      return;
    }

    this.width = this.newVec[0] - this.originVec[0];
    this.height = this.newVec[1] - this.originVec[1];

    const attributes: Record<string, number | string> = {
      x: Math.min(this.originVec[0], this.newVec[0]),
      y: Math.min(this.originVec[1], this.newVec[1]),
      width: Math.abs(this.width),
      height: Math.abs(this.height)
    };

    if (this.isPreview) {
      if (this.newVec[0] < this.originVec[0]) {
        Object.assign(attributes, this.falsePreviewStyle);
        this.previewElement.attr(attributes).show();
      } else {
        Object.assign(attributes, this.previewStyle);
        this.previewElement.attr(attributes).show();
      }
    } else {
      this.previewElement.attr({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }).hide();
    }
  }

  /**
   * Clean up resources
   */
  onCleanup(): void {
    this.reset();
    super.onCleanup?.();
  }

  /**
   * Reset the preview state
   */
  private reset(): void {
    this.isPreview = false;
    
    if (this.previewElement) {
      this.layer.removeChild(this.previewElement);
      delete this.previewElement;
    }
  }
}