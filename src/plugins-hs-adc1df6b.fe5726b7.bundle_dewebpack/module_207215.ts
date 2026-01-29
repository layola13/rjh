import { useEffect, useRef } from 'react';
import { NumberInput } from './NumberInput';

interface RoofAngleNode {
  value: number | string;
  minMax?: [number, number];
}

interface RoofAngleInputData {
  node: RoofAngleNode;
  onValueChange: (value: number) => void;
}

interface RoofAngleInputProps {
  data: RoofAngleInputData;
}

interface NumberInputRef {
  value: string | number;
}

declare global {
  namespace HSApp {
    namespace Util {
      enum EventGroupEnum {
        Roof = 'Roof'
      }
      
      namespace EventTrack {
        function instance(): {
          track(group: EventGroupEnum, event: string, data: Record<string, unknown>): void;
        };
      }
    }
    
    namespace App {
      function getApp(): {
        activeEnvironmentId: string | number;
      };
    }
  }
  
  namespace ResourceManager {
    function getString(key: string): string;
  }
}

const DASH_VALUE = '-';
const ZERO_VALUE = 0;

export default function RoofAngleInput({ data }: RoofAngleInputProps): JSX.Element {
  const { node, onValueChange } = data;
  const { value, minMax = [] } = node;
  
  const inputRef = useRef<NumberInputRef | null>(null);
  
  useEffect(() => {
    setTimeout(() => {
      if ((value === DASH_VALUE || value === ZERO_VALUE) && inputRef.current) {
        inputRef.current.value = DASH_VALUE;
      }
    }, 0);
  }, [value]);
  
  const handleValueChange = (newValue: number): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Roof,
      'propertybar_angle_adjust_event',
      {
        IF_env: HSApp.App.getApp().activeEnvironmentId,
        value: newValue
      }
    );
    
    if (newValue === ZERO_VALUE) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.value = DASH_VALUE;
        }
      }, 0);
    } else {
      onValueChange(newValue);
    }
  };
  
  return (
    <div className="property-bar-roof-angle-input">
      <span className="property-bar-label">
        {ResourceManager.getString('plugin_right_propertybar_angle')}
      </span>
      <div className="angle-input">
        <NumberInput
          unit="˚"
          autoSelect={true}
          value={value}
          min={minMax[0]}
          max={minMax[1]}
          onValueChange={handleValueChange}
          ref={inputRef}
        />
      </div>
    </div>
  );
}