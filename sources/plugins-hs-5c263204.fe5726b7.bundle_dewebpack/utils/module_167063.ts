interface App {
  getMain2DView(): View2D | null;
  getAux2DView?: () => View2D | null;
  getMain3DView(): View3D | null;
  getAux3DView?: () => View3D | null;
}

interface InitContext {
  app: App;
}

interface View2D {
  registerGizmoFactory(factory: SVGGizmoFactory): void;
  unregisterGizmoFactory(factory: SVGGizmoFactory): void;
}

interface View3D {
  registerGizmoFactory(factory: WebGLGizmoFactory): void;
}

interface SVGGizmoFactory {
  // Define specific methods based on implementation
}

interface WebGLGizmoFactory {
  // Define specific methods based on implementation
}

declare namespace HSCore {
  namespace Util {
    class SignalHook {
      constructor(owner: unknown);
      unlistenAll(): void;
    }
  }
}

class GizmoManager {
  private _signalHook: HSCore.Util.SignalHook;
  private _svgGizmoFactoryMap: Map<View2D, SVGGizmoFactory | undefined>;
  private _app?: App;

  constructor() {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._svgGizmoFactoryMap = new Map();
  }

  init(context: InitContext, _options?: unknown): void {
    const app = this._app = context.app;
    
    const main2DView = app.getMain2DView();
    if (main2DView) {
      this._initSVGView(main2DView);
    }

    const aux2DView = app.getAux2DView?.();
    if (aux2DView) {
      this._initSVGView(aux2DView);
    }

    const main3DView = app.getMain3DView();
    if (main3DView) {
      this._initWebGLView(main3DView);
    }

    const aux3DView = app.getAux3DView?.();
    if (aux3DView) {
      this._initWebGLView(aux3DView);
    }
  }

  private _initSVGView(view: View2D): void {
    if (view) {
      const factory = new SVGGizmoFactory(view);
      view.registerGizmoFactory(factory);
      this._svgGizmoFactoryMap.set(view, factory);
    }
  }

  disableSVGGizmo(): void {
    this._svgGizmoFactoryMap.forEach((factory, view) => {
      if (factory) {
        view.unregisterGizmoFactory(factory);
        this._svgGizmoFactoryMap.set(view, undefined);
      }
    });
  }

  enableSVGGizmo(): void {
    this._svgGizmoFactoryMap.forEach((factory, view) => {
      if (!factory) {
        this._initSVGView(view);
      }
    });
  }

  private _initWebGLView(view: View3D): void {
    if (view) {
      view.registerGizmoFactory(new WebGLGizmoFactory(view));
    }
  }

  uninit(): void {
    this._signalHook.unlistenAll();
  }
}

export default GizmoManager;