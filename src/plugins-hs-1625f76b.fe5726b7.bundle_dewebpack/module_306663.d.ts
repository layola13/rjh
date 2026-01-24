/**
 * Molding panel component for adjusting profile offsets and rendering molding visualization
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Profile data structure
 */
interface ProfileData {
  contentType?: string;
  seekId?: string;
}

/**
 * Molding component props data structure
 */
interface MoldingData {
  profileHeight: number;
  profileWidth: number;
  profile: string;
  offsetX: number;
  offsetY: number;
  profileSizeX: number;
  profileSizeY: number;
  profileData: ProfileData;
  flipNormal: boolean;
  flipHorizontal: boolean;
}

/**
 * Signal for molding field changes
 */
interface MoldingFieldChangeSignal {
  listen(callback: (event: MoldingFieldChangeEvent) => void): void;
  unlisten(callback: (event: MoldingFieldChangeEvent) => void): void;
}

/**
 * Molding field change event data
 */
interface MoldingFieldChangeEvent {
  data: {
    offsetX?: number;
    offsetY?: number;
  };
}

/**
 * Component props interface
 */
interface MoldingPanelProps {
  /** Molding configuration data */
  data: MoldingData;
  /** Entity object being edited */
  entity: {
    metadata: {
      parameters: Record<string, CeilingParameters>;
    };
  };
  /** Whether this is a smart molding */
  isSmartMolding: boolean;
  /** Whether X and Y axes are flipped */
  isXYFlip: boolean;
  /** Unique identifier for the molding */
  moldingId: string;
  /** Type of ceiling profile */
  ceilingProfileType: string;
  /** Signal for field change events */
  moldingFieldChangeSignal: MoldingFieldChangeSignal;
  /** Whether to reverse width/height */
  needReverse?: boolean;
}

/**
 * Component state interface
 */
interface MoldingPanelState {
  width: number;
  height: number;
  moldingPath: string;
  offsetX: number;
  offsetY: number;
  profileSizeX: number;
  profileSizeY: number;
}

/**
 * Ceiling parameters structure
 */
interface CeilingParameters {
  offsetX?: number;
  offsetY?: number;
}

/**
 * Slider configuration interface
 */
interface SliderConfig {
  value: number;
  className: string;
  options: {
    rules: {
      range: {
        max: number;
        min: number;
      };
    };
    readOnly: boolean;
  };
  onValueChangeStart: () => void;
  onValueChange: (value: number) => void;
  onValueChangeEnd: (value: number) => void;
}

/**
 * Molding panel component for profile offset adjustment and visualization
 */
declare class MoldingPanel extends React.Component<MoldingPanelProps, MoldingPanelState> {
  static propTypes: {
    data: PropTypes.Validator<object>;
    entity: PropTypes.Validator<object>;
    isSmartMolding: PropTypes.Validator<boolean>;
    isXYFlip: PropTypes.Validator<boolean>;
    moldingId: PropTypes.Validator<string>;
    ceilingProfileType: PropTypes.Validator<string>;
    moldingFieldChangeSignal: PropTypes.Validator<object>;
  };

  /** Application instance */
  private app: HSApp.App;
  
  /** Command manager for undo/redo operations */
  private cmdMgr: HSApp.CommandManager;
  
  /** Profile data reference */
  private profileData: ProfileData;
  
  /** Direction selection state (0 or 1) */
  private dirSelectedItem: number;
  
  /** Mirror selection state (0 or 1) */
  private mirSelectedUtem: number;

  constructor(props: MoldingPanelProps);

  /**
   * Lifecycle: Subscribe to molding field change events
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Unsubscribe from molding field change events
   */
  componentWillUnmount(): void;

  /**
   * Handle molding field change events
   * @param event - Field change event containing offset updates
   */
  private _onMoldingFieldChange(event: MoldingFieldChangeEvent): void;

  /**
   * Render coordinate axes visualization
   * @returns React element containing X and Y axis paths
   */
  private _renderMoldingLocation(): React.ReactElement;

  /**
   * Render molding profile icon with proper scaling and positioning
   * @returns React element containing the molding profile path
   */
  private _renderMoldingIcon(): React.ReactElement;

  /**
   * Main render method
   * @returns Complete molding panel UI with sliders and visualization
   */
  render(): React.ReactElement;
}

export default MoldingPanel;