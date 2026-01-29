/**
 * Step tip component props interface
 */
interface StepTipProps {
  /** Whether to show the next step tip */
  showNextStepTip: boolean;
  
  /** Step configuration object */
  step: StepConfig | null;
  
  /** Position styles for the tip container */
  position: React.CSSProperties;
  
  /** Callback function when next button is clicked */
  nextStepTip: () => void;
  
  /** Whether to hide the next button */
  hideNextbtn?: boolean;
}

/**
 * Step configuration interface
 */
interface StepConfig {
  /** Image URL for the step tip */
  imageurl?: string;
  
  /** Text content of the step tip */
  txt: string;
  
  /** Title of the step tip */
  title?: string;
  
  /** Position of the arrow pointer (e.g., 'top', 'bottom', 'left', 'right') */
  arrowPosition?: string;
}

/**
 * Global ResourceManager interface
 */
declare const ResourceManager: {
  getString(key: string): string;
};

/**
 * Renders a step-by-step guide tip component with optional image, title, and arrow indicator
 * 
 * @param props - Component props
 * @returns React element or null if tip should not be displayed
 */
declare function StepTip(props: StepTipProps): React.ReactElement | null;

export default StepTip;