interface GizmoOptions {
  [key: string]: any;
}

interface GizmoParams {
  gizmo?: {
    compass?: Record<string, any>;
    entranceIndictor?: Record<string, any>;
  };
}

interface ViewConstructorParams {
  params: GizmoParams;
}

function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
  for (const key in source) {
    if (source[key] && source[key].constructor && source[key].constructor === Object) {
      target[key] = target[key] || ({} as any);
      deepMerge(target[key] as Record<string, any>, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

class CompassGizmo extends HSApp.View.SVG.Gizmo {
  type: string;
  options: GizmoOptions;

  constructor(
    firstParam: any,
    secondParam: any,
    thirdParam: ViewConstructorParams
  ) {
    super(firstParam, secondParam, thirdParam);
    this.type = "hsw.view.svg.gizmo.Compass";
    this.options = {};

    const compassParams = thirdParam.params.gizmo?.compass || {};
    deepMerge(this.options, compassParams);
  }

  onActivate(): void {
    super.onActivate();
  }

  onDeactivate(): void {
    super.onDeactivate();
  }

  onCleanup(): void {
    super.onCleanup();
  }

  draw(): void {
    // Empty implementation
  }
}

class EntranceIndicatorGizmo extends HSApp.View.SVG.Gizmo {
  type: string;
  options: GizmoOptions;

  constructor(
    firstParam: any,
    secondParam: any,
    thirdParam: ViewConstructorParams
  ) {
    super(firstParam, secondParam, thirdParam);
    this.type = "hsw.view.svg.gizmo.EntranceIndictor";
    this.options = {};

    const entranceParams = thirdParam.params.gizmo?.entranceIndictor || {};
    deepMerge(this.options, entranceParams);
  }

  onActivate(): void {
    super.onActivate();
  }

  onDeactivate(): void {
    super.onDeactivate();
  }

  onCleanup(): void {
    super.onCleanup();
  }

  draw(): void {
    // Empty implementation
  }
}

export default class Export2DGizmo extends HSApp.View.SVG.Gizmo {
  type: string;
  compass: CompassGizmo | undefined;
  entranceIndictor: EntranceIndicatorGizmo | undefined;
  dirty?: boolean;

  constructor(
    firstParam: any,
    secondParam: any,
    thirdParam: ViewConstructorParams
  ) {
    super(firstParam, secondParam, thirdParam);
    this.type = "hsw.view.svg.gizmo.Export2D";
    this.compass = new CompassGizmo(firstParam, secondParam, thirdParam);
    this.entranceIndictor = new EntranceIndicatorGizmo(firstParam, secondParam, thirdParam);
    this.addChildGizmo(this.compass);
    this.addChildGizmo(this.entranceIndictor);
  }

  onActivate(): void {
    super.onActivate();
  }

  onDeactivate(): void {
    super.onDeactivate();
  }

  onCleanup(): void {
    this.compass = undefined;
    this.entranceIndictor = undefined;
    super.onCleanup();
  }

  draw(): void {
    super.draw();
  }

  update(): void {
    this.dirty = true;
  }
}