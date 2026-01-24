/**
 * Module: ModifyCustomizedModelDialog
 * Dialog components for creating and modifying customized 3D models
 */

import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Supported customized model types
 */
type ModelType =
  | 'plugin_customizedModeling_type_ceiling'
  | 'plugin_customizedModeling_type_feature_wall'
  | 'plugin_customizedModeling_type_platform'
  | 'plugin_customizedModeling_type_personalized';

/**
 * Model size range options
 */
type SizeRange = 'low' | 'middle' | 'high';

/**
 * Model creation configuration
 */
interface ModelCreationConfig {
  /** Content type from HSCatalog.ContentTypeEnum */
  modelContentType: string;
  /** Size range for the model */
  modelSizeRange: SizeRange;
}

/**
 * Props for ModifyCustomizedModelDialog component
 */
interface ModifyCustomizedModelDialogProps {
  /** Callback when model is created/modified */
  onCreate: (config: ModelCreationConfig) => void;
}

/**
 * Props for CreateCustomizedModelDialog component
 */
interface CreateCustomizedModelDialogProps {
  /** Callback when model is created */
  onCreate: (config: ModelCreationConfig) => void;
  /** Initial model type for modification mode */
  initType?: ModelType;
  /** Whether this is a modification operation */
  isModify?: boolean;
  /** Whether to show model size selector */
  isShowModelSize?: boolean;
}

/**
 * Props for ModelTypeSelector component
 */
interface ModelTypeSelectorProps {
  /** Model type identifier */
  item: ModelType;
  /** Currently selected model type */
  selectedItem: ModelType;
  /** Array of image URLs for this model type */
  modelImages: string[];
  /** Callback when model type changes */
  onModeTypeChange: (type: ModelType) => void;
}

/**
 * State for ModelTypeSelector component
 */
interface ModelTypeSelectorState {
  /** Whether mouse is hovering over this item */
  isHover: boolean;
}

/**
 * Props for ModelCreationForm component
 */
interface ModelCreationFormProps {
  /** Callback to create/modify model */
  create: (config: ModelCreationConfig) => void;
  /** Callback to cancel operation */
  cancel: (confirmed?: boolean) => void;
  /** Callback to cancel current command */
  cancelCmd: () => void;
  /** Whether to show model size options */
  isShowModelSize: boolean;
  /** Initial model type (for modify mode) */
  initType?: ModelType;
  /** Whether in modification mode */
  isModify?: boolean;
}

/**
 * State for ModelCreationForm component
 */
interface ModelCreationFormState {
  /** Whether dropdown is visible */
  show: boolean;
  /** Whether create button is disabled */
  disabled: boolean;
  /** Currently selected model type */
  selectedItem: ModelType;
  /** Currently selected size range */
  selectedSizeRange: SizeRange;
}

/**
 * Individual model type selector item component
 */
declare class ModelTypeSelector extends React.Component<
  ModelTypeSelectorProps,
  ModelTypeSelectorState
> {
  /** Handle mouse enter event */
  onMouseEnter(): void;
  
  /** Handle mouse leave event */
  onMouseLeave(): void;
  
  /** Handle model type selection */
  onModeTypeChange(type: ModelType): void;
}

/**
 * Main form component for model creation/modification
 */
declare class ModelCreationForm extends React.Component<
  ModelCreationFormProps,
  ModelCreationFormState
> {
  /** Default model type key */
  readonly data: {
    default: string;
    defaultSizeRange: string;
    types: ModelType[];
  };
  
  /** Map model types to HSCatalog content types */
  readonly modelContentTypeMap: Record<ModelType, string>;
  
  /** Map model types to image resources */
  readonly modelImageMap: Record<ModelType, string[]>;
  
  /** Toggle model type dropdown visibility */
  toggleSelectModelType(): void;
  
  /** Handle size range selection change */
  _onSizeRangeChange(event: React.MouseEvent<HTMLElement>): void;
  
  /** Handle model type selection change */
  _onModeTypeChange(type: ModelType): void;
  
  /** Handle create button click */
  _onCreateClicked(): void;
  
  /** Handle cancel button click */
  _onCancelClicked(): void;
  
  /** Close dropdown when clicking outside */
  doit(): void;
}

/**
 * Dialog wrapper component for creating customized models
 */
declare class CreateCustomizedModelDialogComponent extends React.Component<CreateCustomizedModelDialogProps> {
  refs: {
    root: any;
  };
  
  /** Close the dialog */
  close(confirmed?: boolean): void;
  
  /** Handle model creation */
  onCreate(config: ModelCreationConfig): void;
  
  /** Cancel current command if applicable */
  cancelCmd(): void;
}

/**
 * Dialog wrapper component for modifying customized models
 */
declare class ModifyCustomizedModelDialogComponent extends React.Component<ModifyCustomizedModelDialogProps> {
  refs: {
    root: any;
  };
  
  /** Close the dialog */
  close(confirmed?: boolean): void;
  
  /** Handle model modification */
  onCreate(config: ModelCreationConfig): void;
  
  /** Cancel current command */
  cancelCmd(): void;
  
  /** Log operation end event */
  addEndLog(validOperation: boolean): void;
  
  /** Handle cancel callback */
  cancelCall(): void;
  
  /** Handle submit callback */
  submitCall(): void;
}

/**
 * Public API for creating customized model dialog
 */
export default class CreateCustomizedModelDialog {
  constructor();
  
  /**
   * Show the create customized model dialog
   * @param onCreate - Callback when model is created
   */
  show(onCreate: (config: ModelCreationConfig) => void): void;
}

/**
 * Public API for modifying customized model dialog
 */
export class ModifyCustomizedModelDialog {
  private _initType: ModelType;
  
  /**
   * @param initType - Initial model type to display
   */
  constructor(initType: ModelType);
  
  /**
   * Show the modify customized model dialog
   * @param onCreate - Callback when model is modified
   */
  show(onCreate: (config: ModelCreationConfig) => void): void;
}