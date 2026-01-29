interface Point {
  x?: number;
  y?: number;
}

interface TwoDCanvasController {
  app: any;
  isMouseDown: boolean;
  downPoint: Point;
  onMouseMove(event: JQuery.MouseEventBase): void;
  onMouseDown(event: JQuery.MouseEventBase): void;
  onMouseUp(event: JQuery.MouseEventBase): void;
  onMouseWheel(event: JQuery.TriggeredEvent): void;
  init(): void;
  show(): void;
  hide(): void;
}

interface ThreeDCanvasController {
  canvas: any;
  isMouseDown: boolean;
  init(): void;
  show(): void;
  hide(): void;
  onMouseMove(event: JQuery.MouseEventBase): void;
  onMouseUp(event: JQuery.MouseEventBase): void;
  onMouseDown(event: JQuery.MouseEventBase): void;
  onKeyDownHandler(event: JQuery.KeyDownEvent): void;
  onKeyUpHandler(event: JQuery.KeyUpEvent): void;
}

interface CanvasController {
  app: any;
  twoDCanvasController: TwoDCanvasController;
  threeDCanvasController: ThreeDCanvasController;
  switch(): void;
  init(): void;
  show(): void;
  getController(): TwoDCanvasController | ThreeDCanvasController | undefined;
  hide(): void;
  updateUIByData(left: number, top: number, width: number, height: number): void;
  _$(selector?: string): JQuery;
}

const canvasController: CanvasController = {
  app: null,
  
  twoDCanvasController: {
    app: null,
    isMouseDown: false,
    downPoint: {},
    
    onMouseMove(event: JQuery.MouseEventBase): void {
      const controller = (event.data as any).twoDCanvasController as TwoDCanvasController;
      const activeView = controller.app.getActive2DView();
      const context = activeView.context;
      
      if (controller.isMouseDown) {
        const deltaX = event.pageX - (controller.downPoint.x ?? 0);
        const deltaY = event.pageY - (controller.downPoint.y ?? 0);
        activeView.pan(deltaX, deltaY);
        context._lastMoveDelta = [deltaX, deltaY];
        $(this).css({ cursor: HSApp.View.CursorEnum.grabbing });
      }
    },
    
    onMouseDown(event: JQuery.MouseEventBase): void {
      const controller = (event.data as any).twoDCanvasController as TwoDCanvasController;
      const context = controller.app.getActive2DView().context;
      controller.isMouseDown = true;
      controller.downPoint.x = event.pageX;
      controller.downPoint.y = event.pageY;
      context._lastMoveDelta = [0, 0];
      canvasController._$().css({ cursor: HSApp.View.CursorEnum.grabbing });
    },
    
    onMouseUp(event: JQuery.MouseEventBase): void {
      const controller = (event.data as any).twoDCanvasController as TwoDCanvasController;
      const context = controller.app.getActive2DView().context;
      controller.isMouseDown = false;
      delete context._lastMoveDelta;
      canvasController._$().css({ cursor: HSApp.View.CursorEnum.grab });
      $("body").css({ cursor: "default" });
    },
    
    onMouseWheel(event: JQuery.TriggeredEvent): void {
      const controller = (event.data as any).twoDCanvasController as TwoDCanvasController;
      const activeView = controller.app.getActive2DView();
      const wheelDelta = (event.originalEvent as WheelEvent).wheelDelta ?? 0;
      const zoomAmount = wheelDelta / 120;
      const clientX = (event as any).clientX;
      const clientY = (event as any).clientY;
      activeView.zoom(zoomAmount, clientX, clientY);
    },
    
    init(): void {
      this.app = canvasController.app;
    },
    
    show(): void {
      const self = this;
      $("body").bind("mousemove", { twoDCanvasController: self }, self.onMouseMove);
      $("body").bind("mouseup", { twoDCanvasController: self }, self.onMouseUp);
      canvasController._$().bind("mousedown", { twoDCanvasController: self }, self.onMouseDown);
      $("body").bind("mousewheel", { twoDCanvasController: self }, self.onMouseWheel);
      self.app.floorplan.active_camera.setFlagOn(HSCore.Model.CameraFlagEnum.toggleOff);
    },
    
    hide(): void {
      const self = this;
      $("body").unbind("mousemove", self.onMouseMove);
      $("body").unbind("mouseup", self.onMouseUp);
      canvasController._$().unbind("mousedown", self.onMouseDown);
      $("body").unbind("mousewheel", self.onMouseWheel);
      self.app.floorplan.active_camera.setFlagOff(HSCore.Model.CameraFlagEnum.toggleOff);
    }
  },
  
  threeDCanvasController: {
    canvas: null,
    isMouseDown: false,
    
    init(): void {
      this.canvas = canvasController.app.getActive3DView();
    },
    
    show(): void {
      const self = this;
      self.canvas.setOptions({ hideCameraMovementIndicators: true });
      $(document).bind("keydown", { threeDCanvasController: self }, self.onKeyDownHandler);
      $(document).bind("keyup", { threeDCanvasController: self }, self.onKeyUpHandler);
      $("body").bind("mousemove", { threeDCanvasController: self }, self.onMouseMove);
      $("body").bind("mouseup", { threeDCanvasController: self }, self.onMouseUp);
      canvasController._$().bind("mousedown", { threeDCanvasController: self }, self.onMouseDown);
    },
    
    hide(): void {
      const self = this;
      self.canvas.setOptions({ hideCameraMovementIndicators: false });
      $(document).unbind("keydown", self.onKeyDownHandler);
      $(document).unbind("keyup", self.onKeyUpHandler);
      $("body").unbind("mousemove", self.onMouseMove);
      $("body").unbind("mouseup", self.onMouseUp);
      canvasController._$().unbind("mousedown", self.onMouseDown);
    },
    
    onMouseMove(event: JQuery.MouseEventBase): void {
      const controller = (event.data as any).threeDCanvasController as ThreeDCanvasController;
      
      if (controller.isMouseDown) {
        const mouseMoveEvent = new Event("mousemove");
        (mouseMoveEvent as any).pageX = event.pageX;
        (mouseMoveEvent as any).pageY = event.pageY;
        controller.canvas.context.domElement.dispatchEvent(mouseMoveEvent);
        $(this).css({ cursor: HSApp.View.CursorEnum.grabbing });
      }
    },
    
    onMouseUp(event: JQuery.MouseEventBase): void {
      const controller = (event.data as any).threeDCanvasController as ThreeDCanvasController;
      const canvas = controller.canvas;
      controller.isMouseDown = false;
      const mouseUpEvent = new Event("mouseup");
      (mouseUpEvent as any).pageX = event.pageX;
      (mouseUpEvent as any).pageY = event.pageY;
      (mouseUpEvent as any).which = event.which;
      canvas.context.domElement.dispatchEvent(mouseUpEvent);
      canvasController._$().css({ cursor: HSApp.View.CursorEnum.grab });
      $("body").css({ cursor: "default" });
    },
    
    onMouseDown(event: JQuery.MouseEventBase): void {
      const controller = (event.data as any).threeDCanvasController as ThreeDCanvasController;
      const canvas = controller.canvas;
      controller.isMouseDown = true;
      const mouseDownEvent = new Event("mousedown");
      (mouseDownEvent as any).pageX = event.pageX;
      (mouseDownEvent as any).pageY = event.pageY;
      (mouseDownEvent as any).which = event.which;
      canvas.context.domElement.dispatchEvent(mouseDownEvent);
      $(event.currentTarget).css({ cursor: HSApp.View.CursorEnum.grabbing });
    },
    
    onKeyDownHandler(event: JQuery.KeyDownEvent): void {
      const controller = (event.data as any).threeDCanvasController as ThreeDCanvasController;
      const canvas = controller.canvas;
      const keyDownEvent = new Event("keydown");
      (keyDownEvent as any).keyCode = event.keyCode;
      canvas.context.domElement.dispatchEvent(keyDownEvent);
    },
    
    onKeyUpHandler(event: JQuery.KeyUpEvent): void {
      const controller = (event.data as any).threeDCanvasController as ThreeDCanvasController;
      const canvas = controller.canvas;
      const keyUpEvent = new Event("keyup");
      (keyUpEvent as any).keyCode = event.keyCode;
      canvas.context.domElement.dispatchEvent(keyUpEvent);
    }
  },
  
  switch(): void {
    if (this.app.is3DViewActive()) {
      this.threeDCanvasController.hide();
      this.twoDCanvasController.show();
    } else if (this.app.is2DViewActive()) {
      this.twoDCanvasController.hide();
      this.threeDCanvasController.show();
    }
  },
  
  init(): void {
    this.app = HSApp.App.getApp();
    this.twoDCanvasController.init();
    this.threeDCanvasController.init();
  },
  
  show(): void {
    this.getController()?.show();
    this._$().show();
  },
  
  getController(): TwoDCanvasController | ThreeDCanvasController | undefined {
    if (this.app.is3DViewActive()) {
      return this.threeDCanvasController;
    } else if (this.app.is2DViewActive()) {
      return this.twoDCanvasController;
    }
    return undefined;
  },
  
  hide(): void {
    this.threeDCanvasController.hide();
    this.twoDCanvasController.hide();
    this._$().hide();
  },
  
  updateUIByData(left: number, top: number, width: number, height: number): void {
    this._$().css({ width, height, left, top });
  },
  
  _$(selector?: string): JQuery {
    if (selector) {
      return this._$().find(selector);
    }
    return $("#editor .resizablePart .canvasController");
  }
};

export default canvasController;