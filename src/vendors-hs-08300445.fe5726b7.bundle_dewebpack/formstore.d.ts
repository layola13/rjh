/**
 * Form state management store for handling form field registration, validation, and value updates.
 * Implements a centralized store pattern for React form management.
 */

import { NamePath, InternalNamePath, Store, FieldEntity, FormInstance, InternalFormInstance, FieldData, FieldError, ValidateErrorEntity, ValidateMessages, Callbacks, Meta, NotifyInfo, ValuedNotifyInfo } from './types';

/**
 * Core form store class that manages form state, field entities, and validation.
 */
export class FormStore {
  /**
   * Indicates whether the form has been hooked into the component lifecycle.
   */
  private formHooked: boolean;

  /**
   * Controls whether store changes should trigger field entity updates.
   */
  private subscribable: boolean;

  /**
   * Central store containing all form field values.
   */
  private store: Store;

  /**
   * Registry of all field entities attached to this form.
   */
  private fieldEntities: FieldEntity[];

  /**
   * Initial values set when the form is created or reset.
   */
  private initialValues: Store;

  /**
   * Callback functions for form lifecycle events (onFinish, onFinishFailed, onValuesChange, onFieldsChange).
   */
  private callbacks: Callbacks;

  /**
   * Custom validation messages for field validation rules.
   */
  private validateMessages: ValidateMessages | null;

  /**
   * Determines whether to preserve field values when fields are unmounted.
   */
  private preserve: boolean | null;

  /**
   * Tracks the most recent validation promise to prevent race conditions.
   */
  private lastValidatePromise: Promise<Store> | null;

  /**
   * Timer ID for debounced operations.
   */
  private timeoutId: NodeJS.Timeout | null;

  /**
   * Root update function to force re-render of the form component.
   */
  private forceRootUpdate: () => void;

  constructor(forceRootUpdate: () => void);

  /**
   * Returns the public form instance API.
   */
  getForm(): FormInstance;

  /**
   * Provides access to internal hooks for form components.
   * @param key - Internal validation key to prevent unauthorized access
   * @returns Internal form API or null if key is invalid
   */
  getInternalHooks(key: string): InternalFormInstance | null;

  /**
   * Controls whether the store should notify observers of changes.
   * @param subscribable - Whether to enable subscriptions
   */
  useSubscribe(subscribable: boolean): void;

  /**
   * Sets the initial values for the form.
   * @param initialValues - Initial form values
   * @param init - Whether to immediately update the store with initial values
   */
  setInitialValues(initialValues: Store, init: boolean): void;

  /**
   * Retrieves the initial value for a specific field path.
   * @param namePath - Field name path
   * @returns Initial value or undefined
   */
  getInitialValue(namePath: InternalNamePath): any;

  /**
   * Sets lifecycle callback functions.
   * @param callbacks - Object containing callback functions
   */
  setCallbacks(callbacks: Callbacks): void;

  /**
   * Sets custom validation messages.
   * @param validateMessages - Custom validation messages
   */
  setValidateMessages(validateMessages: ValidateMessages): void;

  /**
   * Sets the preserve behavior for unmounted fields.
   * @param preserve - Whether to preserve field values
   */
  setPreserve(preserve: boolean): void;

  /**
   * Warns if the form hasn't been properly hooked (development only).
   */
  private warningUnhooked(): void;

  /**
   * Retrieves all field entities, optionally filtering out list fields.
   * @param pure - Whether to filter out fields without name paths
   * @returns Array of field entities
   */
  private getFieldEntities(pure?: boolean): FieldEntity[];

  /**
   * Creates a map of name paths to field entities.
   * @param pure - Whether to include only fields with name paths
   * @returns Map of name paths to entities
   */
  private getFieldsMap(pure?: boolean): Map<string, FieldEntity>;

  /**
   * Retrieves field entities for a list of name paths.
   * @param namePathList - List of field name paths or null for all entities
   * @returns Array of field entities or placeholder objects for invalid paths
   */
  private getFieldEntitiesForNamePathList(
    namePathList?: NamePath[] | null
  ): Array<FieldEntity | { INVALIDATE_NAME_PATH: InternalNamePath }>;

  /**
   * Gets values for specified fields or all fields.
   * @param namePathList - List of field paths, true for all fields, or null
   * @param filterFunc - Optional filter function based on field meta
   * @returns Store object with requested field values
   */
  getFieldsValue(namePathList?: NamePath[] | true, filterFunc?: (meta: Meta) => boolean): Store;

  /**
   * Gets the value of a single field.
   * @param namePath - Field name path
   * @returns Field value
   */
  getFieldValue(namePath: NamePath): any;

  /**
   * Gets errors for specified fields.
   * @param namePathList - List of field paths
   * @returns Array of field error objects
   */
  getFieldsError(namePathList?: NamePath[]): FieldError[];

  /**
   * Gets errors for a single field.
   * @param namePath - Field name path
   * @returns Array of error messages
   */
  getFieldError(namePath: NamePath): string[];

  /**
   * Checks if specified fields have been touched.
   * @param namePathList - List of field paths or null for all fields
   * @param allFieldsTouched - Whether all fields must be touched (true) or any field (false)
   * @returns True if touch condition is met
   */
  isFieldsTouched(namePathList?: NamePath[], allFieldsTouched?: boolean): boolean;
  isFieldsTouched(allFieldsTouched?: boolean): boolean;

  /**
   * Checks if a single field has been touched.
   * @param namePath - Field name path
   * @returns True if field has been touched
   */
  isFieldTouched(namePath: NamePath): boolean;

  /**
   * Checks if specified fields are currently validating.
   * @param namePathList - List of field paths or undefined for all fields
   * @returns True if any matching field is validating
   */
  isFieldsValidating(namePathList?: NamePath[]): boolean;

  /**
   * Checks if a single field is currently validating.
   * @param namePath - Field name path
   * @returns True if field is validating
   */
  isFieldValidating(namePath: NamePath): boolean;

  /**
   * Resets fields with their initial values, handling conflicts and multiple fields.
   * @param options - Reset options (entities, namePathList, skipExist)
   */
  private resetWithFieldInitialValue(options?: {
    entities?: FieldEntity[];
    namePathList?: InternalNamePath[];
    skipExist?: boolean;
  }): void;

  /**
   * Resets specified fields or all fields to their initial values.
   * @param namePathList - List of field paths to reset, or undefined for all fields
   */
  resetFields(namePathList?: NamePath[]): void;

  /**
   * Sets multiple field states (value, errors, etc.).
   * @param fields - Array of field data to set
   */
  setFields(fields: FieldData[]): void;

  /**
   * Gets the current state of all fields.
   * @returns Array of field data including values and meta information
   */
  getFields(): FieldData[];

  /**
   * Initializes a field entity's value from its initialValue prop.
   * @param entity - Field entity to initialize
   */
  private initEntityValue(entity: FieldEntity): void;

  /**
   * Registers a field entity with the form store.
   * @param entity - Field entity to register
   * @returns Cleanup function to unregister the entity
   */
  registerField(entity: FieldEntity): (isListField?: boolean, preserve?: boolean) => void;

  /**
   * Dispatches actions from field entities (value updates, validation triggers).
   * @param action - Action object with type and payload
   */
  dispatch(action: { type: 'updateValue'; namePath: InternalNamePath; value: any } | { type: 'validateField'; namePath: InternalNamePath; triggerName: string }): void;

  /**
   * Notifies all field entities of store changes.
   * @param prevStore - Previous store state
   * @param namePathList - List of changed field paths or null for all
   * @param info - Additional notification information
   */
  private notifyObservers(prevStore: Store, namePathList: InternalNamePath[] | null, info: NotifyInfo): void;

  /**
   * Updates a field's value and triggers dependent field validations.
   * @param namePath - Field name path
   * @param value - New field value
   */
  private updateValue(namePath: InternalNamePath, value: any): void;

  /**
   * Sets multiple field values at once.
   * @param values - Object containing field values to set
   */
  setFieldsValue(values: Store): void;

  /**
   * Finds all child fields that depend on the specified field.
   * @param namePath - Parent field name path
   * @returns Array of dependent field name paths
   */
  private getDependencyChildrenFields(namePath: InternalNamePath): InternalNamePath[];

  /**
   * Triggers the onFieldsChange callback with updated field data.
   * @param namePathList - List of changed field paths
   * @param fieldErrors - Optional array of field errors to include
   */
  private triggerOnFieldsChange(namePathList: InternalNamePath[], fieldErrors?: Array<{ name: InternalNamePath; errors: string[] }>): void;

  /**
   * Validates specified fields or all fields.
   * @param namePathList - List of field paths to validate, or undefined for all
   * @param options - Validation options (triggerName, recursive, validateMessages)
   * @returns Promise resolving to field values or rejecting with validation errors
   */
  validateFields(namePathList?: NamePath[], options?: { triggerName?: string; recursive?: boolean; validateMessages?: ValidateMessages }): Promise<Store>;

  /**
   * Submits the form by validating all fields and calling onFinish or onFinishFailed.
   */
  submit(): void;
}

/**
 * React hook that creates or uses an existing form instance.
 * @param form - Optional external form instance
 * @returns Tuple containing the form instance
 */
export default function useForm(form?: FormInstance): [FormInstance];