/**
 * Floor name input component and related UI elements for layer management
 * @module FloorNameInput
 */

import { ForwardRefExoticComponent, RefAttributes, CSSProperties, MouseEvent, FocusEvent, KeyboardEvent, ChangeEvent } from 'react';

/**
 * Maximum allowed characters for floor/layer names
 */
export const CHARACTER_LIMIT = 15;

/**
 * Icon types used in layer operations
 */
export type IconType = 
  | 'hs_mian_bianji'      // Edit icon
  | 'hs_mian_shanchu'     // Delete icon
  | 'hs_motaihua_tuozhuaismall'; // Drag icon

/**
 * Tooltip keys for internationalization
 */
export type TooltipKey = 
  | 'tooltip_edit_layer_name'
  | 'tooltip_delete_layer'
  | 'tooltip_drag_to_reorder';

/**
 * Layer data structure
 */
export interface Layer {
  /** Unique identifier for the layer */
  id: string;
  /** Display name of the layer */
  name: string;
  /** Floor number associated with this layer */
  floorNumber: number;
  /** Whether this is the root/base layer */
  isRoot: boolean;
}

/**
 * Props for the LayerListItem component
 */
export interface LayerListItemProps {
  /** The layer data object */
  layer: Layer;
  /** Display number for the floor */
  floorNumber: number;
  /** Index position in the layer list */
  index: number;
  /** Current display name */
  name: string;
  /** Whether this layer is currently selected/active */
  isActive: boolean;
  /** Whether this is the root layer (cannot be deleted) */
  isRoot: boolean;
  /** Whether operation buttons should be hidden */
  isHideOperations: boolean;
  /** Callback to toggle operation visibility */
  setIsHideOperations: (hide: boolean) => void;
  /** Callback when layer is selected */
  chooseLayer: (index: number) => void;
  /** Callback to rename a layer */
  renameLayer: (layer: Layer, newName: string) => void;
  /** Callback to remove a layer */
  removeLayer: (index: number, event: MouseEvent) => void;
}

/**
 * A draggable list item representing a single layer with edit/delete/reorder controls
 */
export const LayerListItem: ForwardRefExoticComponent<
  LayerListItemProps & RefAttributes<HTMLDivElement>
>;

/**
 * Props for the IconWithTooltip component
 */
export interface IconWithTooltipProps {
  /** Type of icon to display */
  showType: IconType;
  /** Tooltip text resource key */
  tooltip: TooltipKey;
  /** Icon color (default: '#9B9FAB') */
  iconColor?: string;
  /** Whether the icon is disabled */
  disabled?: boolean;
  /** Custom inline styles for the icon */
  customStyle?: CSSProperties;
  /** Click handler for the icon */
  iconOnClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** Mouse down handler for drag functionality */
  iconOnMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * An icon button with hover effects and tooltip
 * Used for layer operations (edit, delete, drag)
 */
export const IconWithTooltip: React.FC<IconWithTooltipProps>;

/**
 * Props for the FloorNameInput component
 */
export interface FloorNameInputProps {
  /** Initial/current value of the input */
  value: string;
  /** Character limit for the input (typically 15) */
  characterLimit: number;
  /** Callback when editing is committed (Enter or blur) */
  commitEditingName: (newName: string) => void;
}

/**
 * Inline input field for editing floor/layer names
 * Auto-focuses on mount, validates length, and commits on Enter/blur
 */
export const FloorNameInput: React.FC<FloorNameInputProps>;

/**
 * Active layer highlight color
 */
export const ACTIVE_LAYER_COLOR = '#396EFE';

/**
 * Default icon color for non-active state
 */
export const DEFAULT_ICON_COLOR = '#9B9FAB';

/**
 * Hover color for interactive elements
 */
export const HOVER_COLOR = '#396EFE';

/**
 * Tooltip delay in milliseconds
 */
export const TOOLTIP_DELAY = 1000;