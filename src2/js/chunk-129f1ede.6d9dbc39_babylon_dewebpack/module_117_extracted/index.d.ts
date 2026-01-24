/**
 * Babylon.js GUI Library Type Definitions
 * @module @babylonjs/gui
 */

// ============================================================================
// 2D GUI Controls
// ============================================================================

/**
 * 2D GUI 核心模块
 */
declare module '@babylonjs/gui/2D' {
  export * from '@babylonjs/gui/2D/advancedDynamicTexture';
  export * from '@babylonjs/gui/2D/controls';
  export * from '@babylonjs/gui/2D/measure';
  export * from '@babylonjs/gui/2D/math2D';
  export * from '@babylonjs/gui/2D/style';
  export * from '@babylonjs/gui/2D/valueAndUnit';
  export * from '@babylonjs/gui/2D/multiLinePoint';
  export * from '@babylonjs/gui/2D/adtInstrumentation';
  export * from '@babylonjs/gui/2D/xmlLoader';
}

/**
 * 2D 控件模块
 */
declare module '@babylonjs/gui/2D/controls' {
  export * from '@babylonjs/gui/2D/controls/control';
  export * from '@babylonjs/gui/2D/controls/container';
  export * from '@babylonjs/gui/2D/controls/button';
  export * from '@babylonjs/gui/2D/controls/focusableButton';
  export * from '@babylonjs/gui/2D/controls/focusableControl';
  export * from '@babylonjs/gui/2D/controls/checkbox';
  export * from '@babylonjs/gui/2D/controls/colorpicker';
  export * from '@babylonjs/gui/2D/controls/displayGrid';
  export * from '@babylonjs/gui/2D/controls/ellipse';
  export * from '@babylonjs/gui/2D/controls/grid';
  export * from '@babylonjs/gui/2D/controls/image';
  export * from '@babylonjs/gui/2D/controls/inputText';
  export * from '@babylonjs/gui/2D/controls/inputPassword';
  export * from '@babylonjs/gui/2D/controls/inputTextArea';
  export * from '@babylonjs/gui/2D/controls/line';
  export * from '@babylonjs/gui/2D/controls/multiLine';
  export * from '@babylonjs/gui/2D/controls/radioButton';
  export * from '@babylonjs/gui/2D/controls/rectangle';
  export * from '@babylonjs/gui/2D/controls/selector';
  export * from '@babylonjs/gui/2D/controls/stackPanel';
  export * from '@babylonjs/gui/2D/controls/textBlock';
  export * from '@babylonjs/gui/2D/controls/textWrapper';
  export * from '@babylonjs/gui/2D/controls/toggleButton';
  export * from '@babylonjs/gui/2D/controls/virtualKeyboard';
  export * from '@babylonjs/gui/2D/controls/statics';
}

/**
 * 2D 滑块控件模块
 */
declare module '@babylonjs/gui/2D/controls/sliders' {
  export * from '@babylonjs/gui/2D/controls/sliders/baseSlider';
  export * from '@babylonjs/gui/2D/controls/sliders/slider';
  export * from '@babylonjs/gui/2D/controls/sliders/imageBasedSlider';
  export * from '@babylonjs/gui/2D/controls/sliders/scrollBar';
  export * from '@babylonjs/gui/2D/controls/sliders/imageScrollBar';
}

/**
 * 2D 滚动视图控件模块
 */
declare module '@babylonjs/gui/2D/controls/scrollViewers' {
  export * from '@babylonjs/gui/2D/controls/scrollViewers/scrollViewer';
  export * from '@babylonjs/gui/2D/controls/scrollViewers/scrollViewerWindow';
}

/**
 * 2D 渐变效果模块
 */
declare module '@babylonjs/gui/2D/controls/gradient' {
  export * from '@babylonjs/gui/2D/controls/gradient/BaseGradient';
  export * from '@babylonjs/gui/2D/controls/gradient/LinearGradient';
  export * from '@babylonjs/gui/2D/controls/gradient/RadialGradient';
}

// ============================================================================
// 3D GUI Controls
// ============================================================================

/**
 * 3D GUI 核心模块
 */
declare module '@babylonjs/gui/3D' {
  export * from '@babylonjs/gui/3D/gui3DManager';
  export * from '@babylonjs/gui/3D/controls';
  export * from '@babylonjs/gui/3D/materials';
  export * from '@babylonjs/gui/3D/gizmos';
  export * from '@babylonjs/gui/3D/vector3WithInfo';
}

/**
 * 3D 控件模块
 */
declare module '@babylonjs/gui/3D/controls' {
  export * from '@babylonjs/gui/3D/controls/control3D';
  export * from '@babylonjs/gui/3D/controls/container3D';
  export * from '@babylonjs/gui/3D/controls/abstractButton3D';
  export * from '@babylonjs/gui/3D/controls/button3D';
  export * from '@babylonjs/gui/3D/controls/meshButton3D';
  export * from '@babylonjs/gui/3D/controls/touchButton3D';
  export * from '@babylonjs/gui/3D/controls/touchMeshButton3D';
  export * from '@babylonjs/gui/3D/controls/holographicButton';
  export * from '@babylonjs/gui/3D/controls/touchHolographicButton';
  export * from '@babylonjs/gui/3D/controls/holographicSlate';
  export * from '@babylonjs/gui/3D/controls/holographicBackplate';
  export * from '@babylonjs/gui/3D/controls/contentDisplay3D';
  export * from '@babylonjs/gui/3D/controls/cylinderPanel';
  export * from '@babylonjs/gui/3D/controls/planePanel';
  export * from '@babylonjs/gui/3D/controls/scatterPanel';
  export * from '@babylonjs/gui/3D/controls/spherePanel';
  export * from '@babylonjs/gui/3D/controls/stackPanel3D';
  export * from '@babylonjs/gui/3D/controls/volumeBasedPanel';
  export * from '@babylonjs/gui/3D/controls/slider3D';
  export * from '@babylonjs/gui/3D/controls/handMenu';
  export * from '@babylonjs/gui/3D/controls/nearMenu';
  export * from '@babylonjs/gui/3D/controls/touchHolographicMenu';
}

/**
 * MRTK3 控件模块
 */
declare module '@babylonjs/gui/3D/controls/MRTK3' {
  export * from '@babylonjs/gui/3D/controls/MRTK3/touchHolographicButton';
}

/**
 * 3D 材质模块
 */
declare module '@babylonjs/gui/3D/materials' {
  export * from '@babylonjs/gui/3D/materials/fluent';
  export * from '@babylonjs/gui/3D/materials/fluentButton';
  export * from '@babylonjs/gui/3D/materials/fluentBackplate';
  export * from '@babylonjs/gui/3D/materials/mrdl';
  export * from '@babylonjs/gui/3D/materials/handle';
}

/**
 * Fluent 材质模块
 */
declare module '@babylonjs/gui/3D/materials/fluent' {
  export * from '@babylonjs/gui/3D/materials/fluent/fluentMaterial';
}

/**
 * Fluent 按钮材质模块
 */
declare module '@babylonjs/gui/3D/materials/fluentButton' {
  export * from '@babylonjs/gui/3D/materials/fluentButton/fluentButtonMaterial';
}

/**
 * Fluent 背板材质模块
 */
declare module '@babylonjs/gui/3D/materials/fluentBackplate' {
  export * from '@babylonjs/gui/3D/materials/fluentBackplate/fluentBackplateMaterial';
}

/**
 * MRDL 材质模块（Mixed Reality Design Language）
 */
declare module '@babylonjs/gui/3D/materials/mrdl' {
  export * from '@babylonjs/gui/3D/materials/mrdl/mrdlBackglowMaterial';
  export * from '@babylonjs/gui/3D/materials/mrdl/mrdlBackplateMaterial';
  export * from '@babylonjs/gui/3D/materials/mrdl/mrdlFrontplateMaterial';
  export * from '@babylonjs/gui/3D/materials/mrdl/mrdlInnerquadMaterial';
  export * from '@babylonjs/gui/3D/materials/mrdl/mrdlSliderBarMaterial';
  export * from '@babylonjs/gui/3D/materials/mrdl/mrdlSliderThumbMaterial';
}

/**
 * 手柄材质模块
 */
declare module '@babylonjs/gui/3D/materials/handle' {
  export * from '@babylonjs/gui/3D/materials/handle/handleMaterial';
}

/**
 * 3D Gizmos 模块
 */
declare module '@babylonjs/gui/3D/gizmos' {
  export * from '@babylonjs/gui/3D/gizmos/gizmoHandle';
  export * from '@babylonjs/gui/3D/gizmos/slateGizmo';
}

/**
 * 3D 行为模块
 */
declare module '@babylonjs/gui/3D/behaviors' {
  export * from '@babylonjs/gui/3D/behaviors/defaultBehavior';
}

// ============================================================================
// Main Entry Points
// ============================================================================

/**
 * GUI 主入口模块 - 包含所有 GUI 功能
 */
declare module '@babylonjs/gui' {
  export * from '@babylonjs/gui/2D';
  export * from '@babylonjs/gui/3D';
}

/**
 * Legacy 兼容模块
 */
declare module '@babylonjs/gui/legacy' {
  export * from '@babylonjs/gui';
}

// ============================================================================
// Observable from Core
// ============================================================================

/**
 * Babylon.js 核心可观察对象模块
 */
declare module 'core/Misc/observable' {
  export class Observable<T> {
    add(callback: (eventData: T, eventState: EventState) => void): Observer<T> | null;
    remove(observer: Observer<T> | null): boolean;
    notifyObservers(eventData: T, mask?: number): boolean;
    clear(): void;
  }

  export class Observer<T> {
    callback: (eventData: T, eventState: EventState) => void;
    unregisterOnNextCall: boolean;
  }

  export class EventState {
    skipNextObservers: boolean;
    mask: number;
  }
}