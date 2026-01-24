/**
 * 空间方向和对齐方式枚举
 * 定义了3D空间中的方向、从一侧到另一侧的过渡、居中和自适应对齐选项
 */
export declare const W: {
  /** 左侧对齐 */
  readonly Left: "left";
  
  /** 从左到右 */
  readonly Left2Right: "leftToRight";
  
  /** 右侧对齐 */
  readonly Right: "right";
  
  /** 从右到左 */
  readonly Right2Left: "rightToLeft";
  
  /** 前侧对齐 */
  readonly Front: "front";
  
  /** 从前到后 */
  readonly Front2Back: "frontToBack";
  
  /** 后侧对齐 */
  readonly Back: "back";
  
  /** 从后到前 */
  readonly Back2Front: "backToFront";
  
  /** 底部对齐 */
  readonly Bottom: "bottom";
  
  /** 从底部到顶部 */
  readonly Bottom2Top: "bottomToTop";
  
  /** 顶部对齐 */
  readonly Top: "top";
  
  /** 从顶部到底部 */
  readonly Top2Bottom: "topToBottom";
  
  /** 左右居中对齐 */
  readonly CenterLeftRight: "centerLeftRight";
  
  /** 前后居中对齐 */
  readonly CenterFrontBack: "centerFrontBack";
  
  /** 上下居中对齐 */
  readonly CenterBottomTop: "centerBottomTop";
  
  /** 左右自适应 */
  readonly AdaptLeftRight: "adaptLeftRight";
  
  /** 前后自适应 */
  readonly AdaptFrontBack: "adaptFrontBack";
  
  /** 上下自适应 */
  readonly AdaptBottomTop: "adaptBottomFront";
};

/**
 * 空间方向和对齐方式类型
 * 表示W对象中所有可能的值
 */
export type SpatialAlignment = typeof W[keyof typeof W];