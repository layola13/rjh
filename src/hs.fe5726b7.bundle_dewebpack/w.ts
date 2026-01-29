export const W = {
  Left: "left",
  Left2Right: "leftToRight",
  Right: "right",
  Right2Left: "rightToLeft",
  Front: "front",
  Front2Back: "frontToBack",
  Back: "back",
  Back2Front: "backToFront",
  Bottom: "bottom",
  Bottom2Top: "bottomToTop",
  Top: "top",
  Top2Bottom: "topToBottom",
  CenterLeftRight: "centerLeftRight",
  CenterFrontBack: "centerFrontBack",
  CenterBottomTop: "centerBottomTop",
  AdaptLeftRight: "adaptLeftRight",
  AdaptFrontBack: "adaptFrontBack",
  AdaptBottomTop: "adaptBottomFront"
} as const;

export type WValue = typeof W[keyof typeof W];