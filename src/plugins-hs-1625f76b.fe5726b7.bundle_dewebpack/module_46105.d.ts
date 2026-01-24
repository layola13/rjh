/**
 * Molding panel component for adjusting profile positioning and orientation
 * @module MoldingPanel
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Profile data structure from catalog
 */
interface ProfileData {
  /** Unique identifier for the profile */
  seekId: string;
  /** Content type categorization (e.g., Baseboard, Decoline) */
  contentType?: string;
}

/**
 * Molding configuration data
 */
interface MoldingData {
  /** Profile width in millimeters */
  profileWidth: number;
  /** Profile height in millimeters */
  profileHeight: number;
  /** SVG path data for the profile shape */
  profile: string;
  /** Horizontal offset in millimeters */
  offsetX: number;
  /** Vertical offset in millimeters */
  offsetY: number;
  /** Profile X dimension */
  profileSizeX: number;
  /** Profile Y dimension */
  profileSizeY: number;
  /** Profile catalog data */
  profileData: ProfileData;
  /** Whether to flip the normal direction */
  flipNormal: boolean;
  /** Whether to flip horizontally */
  flipHorizontal: boolean;
}

/**
 * Event data for molding field changes
 */
interface MoldingFieldChangeEvent {
  data: {
    /** Updated X offset value */
    offsetX?: number;
    /** Updated Y offset value */
    offsetY?: number;
  };
}

/**
 * Signal object for molding field change notifications
 */
interface MoldingFieldChangeSignal {
  /** Register a listener for field changes */
  listen(callback: (event: MoldingFieldChangeEvent) => void): void;
  /** Unregister a listener */
  unlisten(callback: (event: MoldingFieldChangeEvent) => void): void;
}

/**
 * Entity metadata parameters structure
 */
interface EntityParameters {
  [key: string]: {
    offsetX?: number;
    offsetY?: number;
  };
}

/**
 * 3D entity with metadata
 */
interface Entity {
  metadata: {
    parameters: EntityParameters;
  };
}

/**
 * Application instance with command management
 */
interface App {
  cmdManager: CommandManager;
}

/**
 * Command manager for undo/redo operations
 */
interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(event: string, data?: unknown): void;
  complete(): void;
}

/**
 * Command object for edit operations
 */
interface Command {
  type: string;
  args: unknown[];
}

/**
 * Slider component configuration
 */
interface SliderData {
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
 * Props for the MoldingPanel component
 */
export interface MoldingPanelProps {
  /** Molding configuration data */
  data: MoldingData;
  /** 3D entity being edited */
  entity: Entity;
  /** Whether this is a smart (parametric) molding */
  isSmartMolding: boolean;
  /** Whether X and Y axes are flipped */
  isXYFlip: boolean;
  /** Unique identifier for the molding */
  moldingId: string;
  /** Type of ceiling profile being edited */
  ceilingProfileType: string;
  /** Signal for molding field change events */
  moldingFieldChangeSignal: MoldingFieldChangeSignal;
  /** Whether to reverse width/height dimensions */
  needReverse?: boolean;
}

/**
 * Component state
 */
interface MoldingPanelState {
  /** Current width for display */
  width: number;
  /** Current height for display */
  height: number;
  /** SVG path for the molding profile */
  moldingPath: string;
  /** Horizontal offset in millimeters */
  offsetX: number;
  /** Vertical offset in millimeters */
  offsetY: number;
  /** Profile X dimension */
  profileSizeX: number;
  /** Profile Y dimension */
  profileSizeY: number;
}

/**
 * Molding panel component for adjusting profile positioning
 * Provides visual feedback and sliders for offset adjustments
 */
export default class MoldingPanel extends React.Component<MoldingPanelProps, MoldingPanelState> {
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
  private app: App;
  /** Command manager reference */
  private cmdMgr: CommandManager;
  /** Profile catalog data */
  private profileData: ProfileData;
  /** Direction selection state (0 or 1) */
  private dirSelectedItem: number;
  /** Mirror selection state (0 or 1) */
  private mirSelectedUtem: number;

  constructor(props: MoldingPanelProps);

  /**
   * Register signal listener on mount
   */
  componentDidMount(): void;

  /**
   * Unregister signal listener on unmount
   */
  componentWillUnmount(): void;

  /**
   * Handle molding field change events
   * @param event - Field change event data
   */
  private _onMoldingFieldChange(event: MoldingFieldChangeEvent): void;

  /**
   * Render coordinate system axes
   * @returns SVG group element with X and Y axes
   */
  private _renderMoldingLocation(): React.ReactElement;

  /**
   * Render molding profile icon with transforms
   * @returns SVG group element with profile path
   */
  private _renderMoldingIcon(): React.ReactElement;

  /**
   * Render the component
   */
  render(): React.ReactElement;
}