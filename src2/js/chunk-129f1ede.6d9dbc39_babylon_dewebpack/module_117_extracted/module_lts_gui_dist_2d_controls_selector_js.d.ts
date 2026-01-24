/**
 * GUI 2D Controls - Selector module
 * Provides various selector group controls including checkboxes, radio buttons, and sliders
 */

import { Rectangle } from './rectangle';
import { StackPanel } from './stackPanel';
import { Control } from './control';
import { TextBlock } from './textBlock';
import { Checkbox } from './checkbox';
import { RadioButton } from './radioButton';
import { Slider } from './sliders/slider';
import { Container } from './container';

/**
 * Callback function type for checkbox state changes
 */
export type CheckboxCallback = (isChecked: boolean) => void;

/**
 * Callback function type for radio button selection
 */
export type RadioCallback = (selectedIndex: number) => void;

/**
 * Callback function type for slider value changes
 */
export type SliderCallback = (value: number) => void;

/**
 * Function type for formatting slider display values
 */
export type SliderFormatter = (value: number) => string | number;

/**
 * Base class for selector groups
 * Manages a panel containing multiple selector controls with a header
 */
export declare class SelectorGroup {
    /** Group identifier */
    name: string;

    /** Stack panel containing all selector controls */
    readonly groupPanel: StackPanel;

    /** Array of selector controls in this group */
    readonly selectors: Control[];

    /** Header text for the group */
    header: string;

    /**
     * Creates a new selector group
     * @param name - Unique identifier for the group
     */
    constructor(name: string);

    /**
     * Adds a header text block to the group panel
     * @param text - Header text content
     * @returns The created TextBlock control
     */
    protected _addGroupHeader(text: string): TextBlock;

    /**
     * Retrieves a selector control by index
     * @param index - Zero-based index of the selector
     * @returns The selector control or undefined if index is out of bounds
     */
    protected _getSelector(index: number): Control | undefined;

    /**
     * Removes a selector from the group
     * @param index - Zero-based index of the selector to remove
     */
    removeSelector(index: number): void;

    /**
     * Updates the label text of a selector
     * @param index - Zero-based index of the selector
     * @param text - New label text
     */
    protected _setSelectorLabel(index: number, text: string): void;

    /**
     * Updates the label color of a selector
     * @param index - Zero-based index of the selector
     * @param color - CSS color value
     */
    protected _setSelectorLabelColor(index: number, color: string): void;

    /**
     * Updates the button/control color of a selector
     * @param index - Zero-based index of the selector
     * @param color - CSS color value
     */
    protected _setSelectorButtonColor(index: number, color: string): void;

    /**
     * Updates the button/control background color of a selector
     * @param index - Zero-based index of the selector
     * @param background - CSS color value
     */
    protected _setSelectorButtonBackground(index: number, background: string): void;
}

/**
 * Group of checkbox controls
 * Allows multiple selections within a single group
 */
export declare class CheckboxGroup extends SelectorGroup {
    /**
     * Adds a checkbox with label to the group
     * @param label - Text label for the checkbox
     * @param callback - Function called when checkbox state changes (default: no-op)
     * @param isChecked - Initial checked state (default: false)
     */
    addCheckbox(label: string, callback?: CheckboxCallback, isChecked?: boolean): void;
}

/**
 * Group of radio button controls
 * Allows only one selection within the group at a time
 */
export declare class RadioGroup extends SelectorGroup {
    /** Counter for assigning unique indices to radio buttons */
    private _selectNb: number;

    /**
     * Adds a radio button with label to the group
     * @param label - Text label for the radio button
     * @param callback - Function called when radio button is selected, receives button index (default: no-op)
     * @param isChecked - Initial checked state (default: false)
     */
    addRadio(label: string, callback?: RadioCallback, isChecked?: boolean): void;
}

/**
 * Group of slider controls with value display
 * Each slider shows its current value with customizable formatting
 */
export declare class SliderGroup extends SelectorGroup {
    /**
     * Adds a slider with label and value display to the group
     * @param label - Text label for the slider
     * @param callback - Function called when slider value changes (default: no-op)
     * @param units - Unit label displayed after value (default: "Units")
     * @param minimum - Minimum slider value (default: 0)
     * @param maximum - Maximum slider value (default: 0)
     * @param value - Initial slider value (default: 0)
     * @param formatter - Function to format displayed value (default: rounds to integer)
     */
    addSlider(
        label: string,
        callback?: SliderCallback,
        units?: string,
        minimum?: number,
        maximum?: number,
        value?: number,
        formatter?: SliderFormatter
    ): void;
}

/**
 * Container panel for organizing multiple selector groups
 * Provides visual separation and unified styling for groups
 */
export declare class SelectionPanel extends Rectangle {
    /** Internal stack panel containing all groups */
    private _panel: StackPanel;

    /** Array of selector groups in the panel */
    private _groups: SelectorGroup[];

    /** Array of separator bars between groups */
    private _bars: Container[];

    /** Color for group headers */
    private _headerColor: string;

    /** Color for selector buttons/controls */
    private _buttonColor: string;

    /** Background color for selector buttons/controls */
    private _buttonBackground: string;

    /** Color for selector labels */
    private _labelColor: string;

    /** Color for separator bars */
    private _barColor: string;

    /** Height of separator bars */
    private _barHeight: string;

    /** Height of spacer containers */
    private _spacerHeight: string;

    /**
     * Creates a new selection panel
     * @param name - Unique identifier for the panel
     * @param groups - Initial array of selector groups (default: empty array)
     */
    constructor(name: string, groups?: SelectorGroup[]);

    /** Gets the internal stack panel */
    readonly panel: StackPanel;

    /** Gets or sets the color for all group headers */
    headerColor: string;

    /** Applies header color to all groups */
    protected _setHeaderColor(): void;

    /** Gets or sets the color for all selector buttons/controls */
    buttonColor: string;

    /** Applies button color to all selectors in all groups */
    protected _setbuttonColor(): void;

    /** Gets or sets the background color for all selector buttons/controls */
    buttonBackground: string;

    /** Applies button background color to all selectors in all groups */
    protected _setButtonBackground(): void;

    /** Gets or sets the color for all selector labels */
    labelColor: string;

    /** Applies label color to all selectors in all groups */
    protected _setLabelColor(): void;

    /** Gets or sets the color for separator bars */
    barColor: string;

    /** Applies bar color to all separator bars */
    protected _setBarColor(): void;

    /** Gets or sets the height of separator bars */
    barHeight: string;

    /** Applies bar height to all separator bars */
    protected _setBarHeight(): void;

    /** Gets or sets the height of spacer containers */
    spacerHeight: string;

    /** Applies spacer height to all spacer containers */
    protected _setSpacerHeight(): void;

    /**
     * Adds a visual separator bar between groups
     */
    protected _addSpacer(): void;

    /**
     * Adds a selector group to the panel
     * @param group - The selector group to add
     */
    addGroup(group: SelectorGroup): void;

    /**
     * Removes a selector group from the panel
     * @param index - Zero-based index of the group to remove
     */
    removeGroup(index: number): void;

    /**
     * Updates the header text of a group
     * @param text - New header text
     * @param groupIndex - Zero-based index of the group
     */
    setHeaderName(text: string, groupIndex: number): void;

    /**
     * Updates the label of a specific selector in a group
     * @param text - New label text
     * @param groupIndex - Zero-based index of the group
     * @param selectorIndex - Zero-based index of the selector within the group
     */
    relabel(text: string, groupIndex: number, selectorIndex: number): void;

    /**
     * Removes a selector from a group
     * @param groupIndex - Zero-based index of the group
     * @param selectorIndex - Zero-based index of the selector to remove
     */
    removeFromGroupSelector(groupIndex: number, selectorIndex: number): void;

    /**
     * Adds a checkbox to a specific group
     * @param groupIndex - Zero-based index of the target group
     * @param label - Text label for the checkbox
     * @param callback - Function called when checkbox state changes (default: no-op)
     * @param isChecked - Initial checked state (default: false)
     */
    addToGroupCheckbox(
        groupIndex: number,
        label: string,
        callback?: CheckboxCallback,
        isChecked?: boolean
    ): void;

    /**
     * Adds a radio button to a specific group
     * @param groupIndex - Zero-based index of the target group
     * @param label - Text label for the radio button
     * @param callback - Function called when radio button is selected (default: no-op)
     * @param isChecked - Initial checked state (default: false)
     */
    addToGroupRadio(
        groupIndex: number,
        label: string,
        callback?: RadioCallback,
        isChecked?: boolean
    ): void;

    /**
     * Adds a slider to a specific group
     * @param groupIndex - Zero-based index of the target group
     * @param label - Text label for the slider
     * @param callback - Function called when slider value changes (default: no-op)
     * @param units - Unit label displayed after value (default: "Units")
     * @param minimum - Minimum slider value (default: 0)
     * @param maximum - Maximum slider value (default: 0)
     * @param value - Initial slider value (default: 0)
     * @param formatter - Function to format displayed value (default: rounds to integer)
     */
    addToGroupSlider(
        groupIndex: number,
        label: string,
        callback?: SliderCallback,
        units?: string,
        minimum?: number,
        maximum?: number,
        value?: number,
        formatter?: SliderFormatter
    ): void;

    /**
     * Returns the type name for serialization
     * @returns "SelectionPanel"
     */
    protected _getTypeName(): string;
}