/**
 * Module: module_207215
 * Original ID: 207215
 * 
 * Roof angle input component for property bar.
 * Provides a number input field for adjusting roof angles with min/max constraints.
 */

import React, { useEffect, useRef, ReactElement } from 'react';
import { NumberInput } from './NumberInput';

/**
 * Min/Max value tuple for angle constraints
 */
type MinMaxRange = [number, number];

/**
 * Node data structure containing value and constraints
 */
interface AngleNode {
  /** Current angle value, "-" represents no value or 0 */
  value: number | string;
  /** Optional min/max range constraints for the angle */
  minMax?: MinMaxRange;
}

/**
 * Component props for RoofAngleInput
 */
interface RoofAngleInputProps {
  data: {
    /** Node configuration containing value and constraints */
    node: AngleNode;
    /** Callback fired when angle value changes */
    onValueChange: (value: number) => void;
  };
}

/**
 * Ref type for NumberInput component
 */
interface NumberInputRef {
  value: string | number;
}

/**
 * Roof angle input component.
 * 
 * Displays a labeled number input for adjusting roof angles.
 * Automatically handles "-" display for zero values and tracks changes via analytics.
 * 
 * @param props - Component props containing node data and change handler
 * @returns React element rendering the angle input control
 */
const RoofAngleInput: React.FC<RoofAngleInputProps> = (props): ReactElement => {
  const { data } = props;
  const { node, onValueChange } = data;
  const { value, minMax = [] as MinMaxRange } = node;

  const inputRef = useRef<NumberInputRef | null>(null);

  // Handle initial display of "-" for zero or "-" values
  useEffect(() => {
    setTimeout(() => {
      if (value === "-" || value === 0) {
        if (inputRef.current) {
          inputRef.current.value = "-";
        }
      }
    }, 0);
  }, [value]);

  /**
   * Handles angle value changes with analytics tracking
   * @param newValue - The new angle value
   */
  const handleValueChange = (newValue: number): void => {
    // Track angle adjustment event
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Roof,
      "propertybar_angle_adjust_event",
      {
        IF_env: HSApp.App.getApp().activeEnvironmentId,
        value: newValue
      }
    );

    // Display "-" for zero values, otherwise update
    if (newValue === 0) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.value = "-";
        }
      }, 0);
    } else {
      onValueChange(newValue);
    }
  };

  return (
    <div className="property-bar-roof-angle-input">
      <span className="property-bar-label">
        {ResourceManager.getString("plugin_right_propertybar_angle")}
      </span>
      <div className="angle-input">
        <NumberInput
          unit="˚"
          autoSelect={true}
          value={value}
          min={minMax[0]}
          max={minMax[1]}
          onValueChange={handleValueChange}
          ref={(element) => {
            inputRef.current = element;
          }}
        />
      </div>
    </div>
  );
};

export default RoofAngleInput;