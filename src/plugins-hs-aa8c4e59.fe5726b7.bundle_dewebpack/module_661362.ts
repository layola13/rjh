interface Camera {
  near: number;
  clip: boolean;
  target_x: number;
  target_y: number;
  x?: number;
  y?: number;
}

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

interface UpdateMessage {
  value: number | boolean;
}

interface View2D {
  getViewBox(): ViewBox;
  setViewBox(x: number, y: number, width: number, height: number): void;
  context: {
    getScaleFactor(): number;
  };
}

/**
 * Camera command for handling 2D view camera operations
 */
class CameraCommand extends HSApp.Cmd.Command {
  private camera: Camera;

  constructor(camera: Camera) {
    super();
    this.camera = camera;
  }

  onExecute(): void {
    // Implementation placeholder
  }

  /**
   * Adjusts the viewport to fit the camera view with animation
   */
  fitForCamera(): void {
    const activeView = HSApp.App.getApp().getActive2DView();
    const currentViewBox = activeView.getViewBox();
    
    const cameraCanvasPoint = HSApp.View.SVG.Util.ModelPointToCanvas(this.camera);
    const targetCanvasPoint = HSApp.View.SVG.Util.ModelPointToCanvas({
      x: this.camera.target_x,
      y: this.camera.target_y
    });
    
    const vectorMagnitude = new HSCore.Util.Math.Vec2(
      targetCanvasPoint.x - cameraCanvasPoint.x,
      targetCanvasPoint.y - cameraCanvasPoint.y
    ).magnitude() * activeView.context.getScaleFactor();
    
    const targetViewBox = { ...currentViewBox };
    
    const MIN_MAGNITUDE = 32;
    if (vectorMagnitude < MIN_MAGNITUDE) {
      const scaleFactor = MIN_MAGNITUDE / vectorMagnitude;
      targetViewBox.width /= scaleFactor;
      targetViewBox.height /= scaleFactor;
    }
    
    const targetWidth = targetViewBox.width;
    const targetHeight = targetViewBox.height;
    
    const ANIMATION_STEPS = 10;
    const deltaX = (cameraCanvasPoint.x - (currentViewBox.x + currentViewBox.width / 2)) / ANIMATION_STEPS;
    const deltaY = (cameraCanvasPoint.y - (currentViewBox.y + currentViewBox.height / 2)) / ANIMATION_STEPS;
    const deltaWidth = (targetWidth - currentViewBox.width) / ANIMATION_STEPS;
    const deltaHeight = (targetHeight - currentViewBox.height) / ANIMATION_STEPS;
    
    let currentStep = 0;
    
    const animateStep = (): void => {
      const centerX = currentViewBox.x + currentViewBox.width / 2 + deltaX * currentStep;
      const centerY = currentViewBox.y + currentViewBox.height / 2 + deltaY * currentStep;
      const width = currentViewBox.width + currentStep * deltaWidth;
      const height = currentViewBox.height + currentStep * deltaHeight;
      
      activeView.setViewBox(centerX - width / 2, centerY - height / 2, width, height);
      
      ++currentStep;
      if (currentStep <= ANIMATION_STEPS) {
        window.requestAnimationFrame(animateStep);
      }
    };
    
    animateStep();
  }

  onReceive(message: string, data: UpdateMessage): boolean {
    let handled = true;
    
    switch (message) {
      case "update_clip_value":
        this.camera.near = (data.value as number) / 100;
        break;
        
      case "update_clip_enable":
        this.camera.clip = data.value as boolean;
        if (this.camera.clip) {
          this.fitForCamera();
        }
        break;
        
      default:
        handled = super.onReceive(message, data);
    }
    
    return handled;
  }

  canUndoRedo(): boolean {
    return false;
  }
}

export default CameraCommand;