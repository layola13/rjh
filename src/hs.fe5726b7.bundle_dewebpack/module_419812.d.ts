/**
 * Length input component for displaying and editing length values with unit conversion support.
 * Supports various length units (meter, centimeter, millimeter, kilometer, foot, inch) with customizable display precision.
 */

import React from 'react';

/**
 * Length unit types supported by the component
 */
declare enum LengthUnitType {
    meter = 'meter',
    centimeter = 'centimeter',
    millimeter = 'millimeter',
    kilometer = 'kilometer',
    foot = 'foot',
    inch = 'inch'
}

/**
 * Label positioning options
 */
declare type LabelPosition = 'left' | 'bottom' | '';

/**
 * Range validation rules for input values
 */
interface RangeRules {
    /** Minimum allowed value */
    min?: number;
    /** Maximum allowed value */
    max?: number;
    /** Whether to check minimum value constraint */
    checkMin?: boolean;
    /** Whether to check maximum value constraint */
    checkMax?: boolean;
}

/**
 * Validation rules for the length input
 */
interface ValidationRules {
    /** Value range constraints */
    range?: RangeRules;
    /** Warning message to display when validation fails */
    warningText?: string;
    /** Only allow positive values */
    positiveOnly?: boolean;
    /** Only allow integer values (no decimals) */
    integerOnly?: boolean;
}

/**
 * Configuration options for the length input component
 */
interface LengthInputOptions {
    /** Unit type for display and parsing */
    unitType?: LengthUnitType;
    /** Number of decimal digits to display */
    displayDigits?: number;
    /** Whether to show the unit label */
    includeUnit?: boolean;
    /** Whether the input is read-only */
    readOnly?: boolean;
    /** Whether to show increment/decrement buttons */
    includeTunning?: boolean;
    /** Validation rules */
    rules?: ValidationRules;
    /** Always trigger value change event even if value hasn't changed */
    alwaysCommitValueChange?: boolean;
}

/**
 * Event detail for value change events
 */
interface ValueChangeDetail {
    /** The new value in database units */
    value: number;
}

/**
 * Custom event with value change detail
 */
interface ValueChangeEvent {
    detail: ValueChangeDetail;
}

/**
 * Focus/blur event parameters
 */
interface FocusBlurEventParams {
    /** The original DOM event */
    e: React.FocusEvent<HTMLInputElement> | Event;
}

/**
 * Props for the LengthInput component
 */
interface LengthInputData {
    /** Additional CSS class names */
    className?: string;
    /** Label text to display */
    label?: string;
    /** Current value in database units */
    value: number | string;
    /** List of predefined values for selection dropdown */
    listValues?: string[];
    /** Position of the label relative to input */
    labelPosition?: LabelPosition;
    /** Disable change events */
    disableChange?: boolean;
    /** Configuration options */
    options?: LengthInputOptions;
    /** Callback when value change starts */
    onChangeStart?: (event: ValueChangeEvent) => void;
    /** Callback when value changes */
    onChanged?: (event: ValueChangeEvent) => void;
    /** Callback when value change ends */
    onChangeEnd?: (event: ValueChangeEvent) => void;
    /** Callback when input gains focus */
    onFocus?: (params: FocusBlurEventParams) => void;
    /** Callback when input loses focus */
    onBlur?: (params: FocusBlurEventParams) => void;
    /** Callback when key is pressed */
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>, isInvalid: boolean) => void;
}

/**
 * Props interface for the LengthInput component
 */
interface LengthInputProps {
    /** Component data and configuration */
    data: LengthInputData;
}

/**
 * Internal state for the LengthInput component
 */
interface LengthInputState {
    /** Component data reference */
    data: LengthInputData;
    /** Formatted display value */
    value: string | number;
    /** Configuration options */
    options: LengthInputOptions;
    /** Whether to show increment/decrement buttons */
    showTunningButtons: boolean;
    /** Step value for increment/decrement operations */
    tunningStep: number;
    /** Current unit type */
    unitType: LengthUnitType;
    /** Number of decimal digits */
    displayDigits: number;
    /** Whether to display unit label */
    includeUnit: boolean;
    /** Whether input has focus */
    focus: boolean;
    /** Whether current value is invalid */
    invalid: boolean;
    /** Last valid value before editing */
    lastValue?: string | number;
}

/**
 * Floor plan calculation result
 */
interface FloorPlanResult {
    /** Unit type for display */
    unitType: LengthUnitType;
    /** Number of decimal digits to display */
    displayDigits: number;
    /** Whether to include unit in display */
    includeUnit: boolean;
    /** Step value for tuning operations */
    tunningStep: number;
    /** Formatted text expression of the value */
    textExpression: string;
}

/**
 * Length input component with unit conversion and validation support.
 * 
 * Features:
 * - Multiple length unit support (metric and imperial)
 * - Configurable display precision
 * - Value range validation
 * - Increment/decrement buttons
 * - Predefined value selection
 * - Focus/blur event handling
 * - Read-only mode
 * 
 * @example
 *