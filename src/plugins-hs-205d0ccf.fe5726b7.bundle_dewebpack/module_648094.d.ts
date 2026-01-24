/**
 * Camera settings panel CSS module type definitions
 * @module CameraSettingsStyles
 */

/**
 * CSS module exports for camera settings panel
 * Contains styles for camera height, pitch, FOV controls and slider components
 */
declare module '*.css' {
  /**
   * CSS content as a string
   */
  const content: string;
  export default content;
}

/**
 * Webpack CSS loader module function signature
 * @param useSourceMap - Whether to generate source maps for CSS
 * @returns CSS loader instance that processes and exports CSS content
 */
declare function cssLoader(useSourceMap: boolean): CSSLoaderInstance;

/**
 * CSS Loader instance interface
 */
interface CSSLoaderInstance {
  /**
   * Adds CSS content to the module exports
   * @param data - Tuple containing module ID and CSS content string
   */
  push(data: [moduleId: string, cssContent: string]): void;
}

/**
 * Camera settings panel style classes
 * Defines the visual appearance and layout of camera control components
 */
interface CameraSettingsStyles {
  /** Title section styles (50px height, bordered) */
  '.spark_pic_right_panel .camera-settings .title': CSSStyleDeclaration;
  
  /** Title text styles (14px bold white) */
  '.spark_pic_right_panel .camera-settings .title span': CSSStyleDeclaration;
  
  /** Main content container with 16px margins */
  '.spark_pic_right_panel .camera-settings .content': CSSStyleDeclaration;
  
  /** Left content flexbox layout (column direction) */
  '.spark_pic_right_panel .camera-settings .content .left-content': CSSStyleDeclaration;
  
  /** Two-way control icon positioning (16px height) */
  '.spark_pic_right_panel .camera-settings .content .left-content .two-ways': CSSStyleDeclaration;
  
  /** Slider label text styles (12px PingFangSC-Light white) */
  '.spark_pic_right_panel .camera-settings .content .slide-name': CSSStyleDeclaration;
  
  /** Camera height and pitch slider containers (full width) */
  '.spark_pic_right_panel .camera-settings .content .camera-height': CSSStyleDeclaration;
  '.spark_pic_right_panel .camera-settings .content .camera-pitch': CSSStyleDeclaration;
  
  /** Slider circle background (black) */
  '.spark_pic_right_panel .camera-settings .content .camera-height .slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-circle': CSSStyleDeclaration;
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .slider-bar-wrapper-dark .slider-bar .slider-wrapper .slider-circle': CSSStyleDeclaration;
  
  /** Setting view container with top padding */
  '.spark_pic_right_panel .camera-settings .content .setting-view': CSSStyleDeclaration;
  
  /** Sectional slider padding */
  '.spark_pic_right_panel .camera-settings .content .setting-view .sectional-slider-container': CSSStyleDeclaration;
  
  /** Camera settings relative positioning container */
  '.spark_pic_right_panel .camera-settings .content .setting-camera': CSSStyleDeclaration;
  
  /** Camera pitch absolute positioning (top: 6px, left: 138px) */
  '.spark_pic_right_panel .camera-settings .content .setting-camera .camera-pitch': CSSStyleDeclaration;
  
  /** Camera height absolute positioning (top: 36px, left: 138px) */
  '.spark_pic_right_panel .camera-settings .content .setting-camera .camera-height': CSSStyleDeclaration;
  
  /** Height label base styles (12px light gray) */
  '.spark_pic_right_panel .camera-settings .content .height': CSSStyleDeclaration;
  
  /** Maximum height label position (top: 5px) */
  '.spark_pic_right_panel .camera-settings .content .height.max': CSSStyleDeclaration;
  
  /** Minimum height label position (top: 213px) */
  '.spark_pic_right_panel .camera-settings .content .height.min': CSSStyleDeclaration;
  
  /** Current height label position (top: 120px, left: 100px) */
  '.spark_pic_right_panel .camera-settings .content .height.current': CSSStyleDeclaration;
  
  /** FOV container flexbox layout (space-between alignment) */
  '.spark_pic_right_panel .camera-settings .content .camera-fov-container': CSSStyleDeclaration;
  
  /** Camera background left border (white top/bottom) */
  '.spark_pic_right_panel .camera-settings .content .camera-background .left': CSSStyleDeclaration;
  
  /** Camera background right border (white bottom/left) */
  '.spark_pic_right_panel .camera-settings .content .camera-background .right': CSSStyleDeclaration;
  
  /** Ant Design slider step track (dark gray, rounded) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .left-content .ant-slider.homestyler-ui-components .ant-slider-step': CSSStyleDeclaration;
  
  /** Slider dot markers (8x8px) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .left-content .ant-slider.homestyler-ui-components .ant-slider-step .ant-slider-dot': CSSStyleDeclaration;
  
  /** Slider handle (black with blue border) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .left-content .ant-slider.homestyler-ui-components .ant-slider-handle': CSSStyleDeclaration;
  
  /** Slider handle pseudo-element border */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .left-content .ant-slider.homestyler-ui-components .ant-slider-handle::before': CSSStyleDeclaration;
  
  /** Number input field (transparent with light border) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .homestyler-numberinput-input': CSSStyleDeclaration;
  
  /** Number input suffix container (transparent) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .homestyler-numberinput-suffix': CSSStyleDeclaration;
  
  /** Number input handler wrapper (increment/decrement buttons) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .homestyler-numberinput-suffix .homestyler-numberinput-handler-wrap': CSSStyleDeclaration;
  
  /** First handler border (separator line) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .homestyler-numberinput-suffix .homestyler-numberinput-handler:first-child': CSSStyleDeclaration;
  
  /** Handler text color (white) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .homestyler-numberinput-suffix .homestyler-numberinput-handler': CSSStyleDeclaration;
  
  /** Handler icon hover state (blue) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .homestyler-numberinput-suffix .homestyler-numberinput-handler:hover .anticon': CSSStyleDeclaration;
  
  /** Number input unit label (transparent with border) */
  '.spark_pic_right_panel .camera-settings .content .camera-pitch .homestyler-numberinput-suffix .homestyler-numberinput-unit': CSSStyleDeclaration;
  
  /** Sectional slider handle (black background) */
  '.spark_pic_right_panel .camera-settings .sectional-slider-container .slider-input .slider-outer .ant-slider-handle': CSSStyleDeclaration;
}

export default CameraSettingsStyles;