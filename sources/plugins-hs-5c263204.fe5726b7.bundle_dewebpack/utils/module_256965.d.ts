/**
 * User guide step configuration module
 * Defines the step-by-step tutorial flow for new users
 */

/** Hotkey identifiers that should be disabled during certain guide steps */
const DISABLED_HOTKEYS = [
  "esc", "tab", "r", "u", "o", "l", "x", "c", "n", "b",
  "ctrl+b", "shift+q", "ctrl+p", "ctrl+0", "ctrl+l", "ctrl+s", 
  "ctrl+shift+s", "ctrl+z", "ctrl+y",
  "meta+b", "meta+q", "meta+p", "meta+0", "meta+l", "meta+s", 
  "meta+shift+s", "meta+z", "meta+y"
] as const;

/** Position coordinates for UI elements */
interface Position {
  top?: string;
  left?: string;
  right?: string | number;
  bottom?: string;
}

/** Step tooltip configuration */
interface StepTip {
  /** Tooltip placement direction */
  style?: "left" | "top" | "bottom" | "right";
  /** Tooltip text content */
  tip?: string;
  /** Target DOM element (selector or element) */
  ele?: string | HTMLElement;
  /** Custom positioning */
  position?: Position;
  /** Render-specific tooltip type */
  type?: "render";
}

/** Interactive block highlighting configuration */
interface BuildBlocks {
  /** Target element selector */
  element: string;
  /** Middle block dimension adjustments */
  middleBlock?: {
    height?: number;
    middleCenterBlock?: {
      width?: number;
    };
  };
}

/** Next step preview card */
interface NextStepTipItem {
  /** Description text */
  txt: string;
  /** Preview image URL */
  imageurl: string;
  /** Card title */
  title: string;
  /** Optional custom positioning */
  position?: Position;
}

/** Signal object for async step progression */
interface Signal<T = unknown> {
  data: T;
}

/** Command starting signal data */
interface CommandSignalData {
  cmd: {
    type: string;
  };
}

/** Environment activation signal data */
interface EnvironmentSignalData {
  newEnvironmentId: string;
}

/** Guide step configuration */
interface GuideStep {
  /** Sequential step number (may have substeps) */
  stepNum: number;
  
  /** Precise substep number */
  stepAccurateNum: number;
  
  /** Analytics tracking point identifier */
  trackPoint: string;
  
  /** Tooltip configuration */
  stepTip?: StepTip;
  
  /** Show main step tooltip */
  showStepTip: boolean;
  
  /** Show next step preview cards */
  showNextStepTip: boolean;
  
  /** Next step preview card items */
  nextStepTipArr?: NextStepTipItem[];
  
  /** Callback when next step button clicked */
  nextStepTipCallBack?: () => void;
  
  /** Show toolbar mask overlay */
  showGuideToolbarMask: boolean;
  
  /** Show single mask overlay */
  showMask: boolean;
  
  /** Show multiple masks */
  showMasks: boolean;
  
  /** Show full guide UI */
  showGuide?: boolean;
  
  /** Add guide-specific CSS classes */
  requireAddClass?: boolean;
  
  /** Async step requiring signal */
  isAsync?: boolean;
  
  /** Delay before building interactive blocks (ms) */
  setTimeoutDelayForBuildBlocks?: number;
  
  /** Interactive block configuration */
  buildBlocks?: BuildBlocks;
  
  /** Get signal for async progression */
  getSignal?: () => Signal;
  
  /** Handle signal when received */
  signalCallback?: (signal: Signal<CommandSignalData | EnvironmentSignalData>) => void;
  
  /** Execute when step starts */
  callback?: () => void;
  
  /** Execute when step exits */
  exitCallback?: () => void;
  
  /** Indicates final step */
  isFinalStep?: boolean;
}

/**
 * Generate user guide step configurations
 * @returns Array of guide step definitions
 */
export default function createGuideSteps(this: {
  _handler: {
    resetView: () => void;
  };
  updateGuide: (stepNum: number, accurateNum: number) => void;
  disableHotkey: (keys: readonly string[]) => void;
  enableHotKey: (keys: readonly string[]) => void;
}): GuideStep[];