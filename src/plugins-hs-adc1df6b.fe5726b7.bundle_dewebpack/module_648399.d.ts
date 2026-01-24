/**
 * Property bar image button component with material preview and metadata support
 */

import type React from 'react';
import type { SmartText, Button, Tooltip } from './UIComponents';
import type { Icons } from './Icons';

/**
 * Material metadata information
 */
interface MaterialMeta {
  /** Material display name */
  name?: string;
  /** Small icon URI */
  iconSmallURI?: string;
  /** Material color (hex string or number) */
  color?: string | number;
  /** Category identifier */
  categoryId?: string;
  /** Job identifier */
  jid?: string;
  /** Material identifier */
  materialId?: string;
  /** Customized large view data */
  customizedLargeViewData?: unknown;
  /** Function to get customized large view data */
  getCustomizedLargeViewData?: () => unknown;
  [key: string]: unknown;
}

/**
 * Corner icon configuration
 */
interface CornerIcon {
  /** Icon type identifier */
  icon: string;
  /** Icon status state */
  status?: string;
}

/**
 * Label icon configuration
 */
interface LabelIcon {
  /** Icon type identifier */
  type: string;
  /** Icon inline styles */
  style?: React.CSSProperties;
}

/**
 * Async parameter result for image source
 */
interface AsyncParamResult {
  /** Image source URL */
  imgSrc?: string;
}

/**
 * Async text parameter result
 */
interface AsyncTextParamResult {
  /** Text content */
  text?: string;
}

/**
 * Component props data configuration
 */
interface PropertyBarImageButtonData {
  /** Image source URL */
  src?: string;
  /** Material color (hex string or number) */
  color?: string | number;
  /** Material seek identifier */
  seekId?: string;
  /** Material metadata */
  meta?: MaterialMeta;
  /** Additional CSS class names */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Title label text */
  titleLabel?: string;
  /** Display label text */
  label?: string;
  /** Size label text */
  size?: string;
  /** Whether to disable the action icon */
  disableIcon?: boolean;
  /** Action icon type */
  icon?: string;
  /** Corner icon configuration */
  cornerIcon?: CornerIcon;
  /** Label icon configuration */
  labelIcon?: LabelIcon;
  /** Tooltip element */
  tooltipEle?: React.ReactNode;
  /** Material edit icon type */
  materialEditIcon?: string;
  /** Whether material can be reset */
  resetable?: boolean;
  /** Job identifier */
  jid?: string;
  /** Material identifier */
  materialId?: string;
  /** Category identifier */
  categoryId?: string;
  /** Customized large view data */
  customizedLargeViewData?: unknown;
  /** Function to get customized large view data */
  getCustomizedLargeViewData?: () => unknown;
  /** Promise resolving to async image parameters */
  asyncParam?: Promise<AsyncParamResult>;
  /** Promise resolving to async text parameters */
  asyncTextParam?: Promise<AsyncTextParamResult>;
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Icon click event handler */
  onIconClick?: (event: React.MouseEvent) => void;
  /** Material reset click event handler */
  materialResetClick?: (event: React.MouseEvent) => void;
  /** Material edit click event handler */
  materialEditClick?: (event: React.MouseEvent) => void;
}

/**
 * Component props
 */
interface PropertyBarImageButtonProps {
  /** Component DOM id */
  id?: string;
  /** Component configuration data */
  data: PropertyBarImageButtonData;
}

/**
 * Component state
 */
interface PropertyBarImageButtonState {
  /** Current image source URL */
  src?: string;
  /** Current material color */
  color?: string;
  /** Current text content */
  text?: string;
  /** Current material metadata */
  meta: MaterialMeta | null;
  /** Whether mouse is hovering over image */
  hoverOnImage: boolean;
}

/**
 * Property bar image button component for material selection and preview
 * Supports async loading, metadata display, and large view details panel
 */
declare class PropertyBarImageButton extends React.Component<
  PropertyBarImageButtonProps,
  PropertyBarImageButtonState
> {
  constructor(props: PropertyBarImageButtonProps);

  /**
   * Initialize component and load material metadata
   */
  componentDidMount(): void;

  /**
   * Update component when props change
   * @deprecated Use componentDidUpdate instead
   */
  UNSAFE_componentWillReceiveProps(nextProps: PropertyBarImageButtonProps): void;

  /**
   * Process async parameters and update component state
   * @param data - Component data configuration
   */
  asyncUpdateParam(data: PropertyBarImageButtonData): void;

  /**
   * Fetch and set material metadata by seek ID
   * @param seekId - Material seek identifier
   */
  setMetaBySeekId(seekId: string): void;

  /**
   * Display the material details panel (large view)
   */
  showDetailsPanel(): void;

  /**
   * Hide the material details panel
   */
  hideDetailsPanel(): void;

  /**
   * Handle button click event
   * @param event - Mouse click event
   */
  handleClick(event: React.MouseEvent): void;

  /**
   * Handle action icon click event
   * @param event - Mouse click event
   */
  handleIconClick(event: React.MouseEvent): void;

  /**
   * Handle material reset button click
   * @param event - Mouse click event
   */
  handelMaterialResetClick(event: React.MouseEvent): void;

  /**
   * Handle material edit button click
   * @param event - Mouse click event
   */
  handelMaterialEditClick(event: React.MouseEvent): void;

  /**
   * Extract material name from metadata
   * @param meta - Material metadata
   * @returns Material name or empty string
   */
  getNameFromMeta(meta: MaterialMeta | null): string;

  /**
   * Extract image source from metadata
   * @param meta - Material metadata
   * @returns Image source URL or empty string
   */
  getSrcFromMeta(meta: MaterialMeta | null): string;

  /**
   * Render corner icon element
   * @returns React element for corner icon
   */
  renderCornerIcon(): React.ReactElement;

  /**
   * Render label element with optional icon
   * @returns React element for label
   */
  renderLabel(): React.ReactElement;

  /**
   * Render the complete component
   * @returns React element
   */
  render(): React.ReactElement;
}

export default PropertyBarImageButton;