import { useState } from 'react';
import { Select, Option } from './Select';
import { Util } from './Util';

interface FloorOption {
  code: number;
  name: string;
}

interface FloorSelectorProps {
  highestFloor: number;
  setHighestFloor: (floor: number) => void;
  lowestFloor: number;
  setLowestFloor: (floor: number) => void;
  selectedCardsNum: number;
  isDisabled: boolean;
}

export const HIGHER_FLOOR_OPTIONS: FloorOption[] = [
  { code: 7, name: "7" },
  { code: 6, name: "6" },
  { code: 5, name: "5" },
  { code: 4, name: "4" },
  { code: 3, name: "3" },
  { code: 2, name: "2" },
  { code: 1, name: "1" }
];

export const LOWER_FLOOR_OPTIONS: FloorOption[] = [
  { code: 1, name: "1" },
  { code: -1, name: "-1" },
  { code: -2, name: "-2" },
  { code: -3, name: "-3" }
];

const LIVE_HINT_DURATION = 3000;

const showDeselectCardWarning = (): void => {
  LiveHint.hide();
  LiveHint.show(
    ResourceManager.getString("plugin_cadunderlay_mld_livehint_deselect_card"),
    LIVE_HINT_DURATION,
    undefined,
    {
      canclose: true,
      status: LiveHint.statusEnum.warning
    }
  );
};

const isValidFloorRange = (lowestFloor: number, highestFloor: number, selectedCardsNum: number): boolean => {
  return highestFloor - lowestFloor + (lowestFloor < 0 ? 0 : 1) >= selectedCardsNum;
};

const FloorSelector: React.FC<FloorSelectorProps> = ({
  highestFloor,
  setHighestFloor,
  lowestFloor,
  setLowestFloor,
  selectedCardsNum,
  isDisabled
}) => {
  const [currentHighestFloor, setCurrentHighestFloor] = useState<number>(highestFloor);
  const [currentLowestFloor, setCurrentLowestFloor] = useState<number>(lowestFloor);

  const handleLowestFloorChange = (value: string): void => {
    const newLowestFloor = Number(value);
    
    if (isValidFloorRange(newLowestFloor, highestFloor, selectedCardsNum)) {
      LiveHint.hide();
      setLowestFloor(newLowestFloor);
    } else {
      setLowestFloor(lowestFloor);
      setCurrentLowestFloor(Math.random());
      setTimeout(() => {
        setCurrentLowestFloor(lowestFloor);
        showDeselectCardWarning();
      }, 0);
    }
  };

  const handleHighestFloorChange = (value: string): void => {
    const newHighestFloor = Number(value);
    
    if (isValidFloorRange(lowestFloor, newHighestFloor, selectedCardsNum)) {
      LiveHint.hide();
      setHighestFloor(newHighestFloor);
    } else {
      setHighestFloor(highestFloor);
      setCurrentHighestFloor(Math.random());
      setTimeout(() => {
        setCurrentHighestFloor(highestFloor);
        showDeselectCardWarning();
      }, 0);
    }
  };

  const handleClose = (event: unknown): void => {
    console.log(event);
  };

  return (
    <div className="match-layer-layer-select">
      <div className="select-layer lowest">
        <span>{ResourceManager.getString("plugin_cadunderlay_mld_lowest_floor")}</span>
        <Select
          disabled={isDisabled}
          className={`select ${isDisabled ? "disabled-cursor" : ""}`}
          dropdownClassName="select-dropdown"
          defaultValue={currentLowestFloor}
          validOptions={{ valid: true }}
          onChange={handleLowestFloorChange}
          onClose={handleClose}
          bindSelf={true}
        >
          {LOWER_FLOOR_OPTIONS.map((option) => {
            const floorName = Util.floorNumberToName(option.code);
            return (
              <Option key={option.code} value={option.code} title={floorName}>
                {floorName}
              </Option>
            );
          })}
        </Select>
      </div>

      <div className="select-layer highest">
        <span>{ResourceManager.getString("plugin_cadunderlay_matchlayrdialog_highest_floor")}</span>
        <Select
          disabled={isDisabled}
          className="select"
          dropdownClassName="select-dropdown"
          defaultValue={currentHighestFloor}
          validOptions={{ valid: true }}
          onChange={handleHighestFloorChange}
          onClose={handleClose}
          bindSelf={true}
        >
          {HIGHER_FLOOR_OPTIONS.map((option) => {
            const floorName = Util.floorNumberToName(option.code);
            return (
              <Option key={option.code} value={option.code} title={floorName}>
                {floorName}
              </Option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default FloorSelector;