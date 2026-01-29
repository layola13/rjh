interface TooltipInfo {
  title: string;
}

interface TargetDiff {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface TipConfig {
  target: string;
  targetDiff: TargetDiff;
  targetEnableClick: boolean;
  listenTargetChange: boolean;
  type: string;
  tooltipPlacement: string;
  tooltipInfo: TooltipInfo;
}

export function createTipConfig(): TipConfig {
  return {
    target: "#renderImageLite .render-image-lite-main",
    targetDiff: {
      left: 0,
      right: -2,
      top: 0,
      bottom: 0
    },
    targetEnableClick: true,
    listenTargetChange: true,
    type: "tooltip",
    tooltipPlacement: "bottom",
    tooltipInfo: {
      title: ResourceManager.getString("plugin_guide_step_18_text")
    }
  };
}