import React, { useState } from 'react';
import { SmartText, Select, Option, Tooltip, Input } from './component-library';

interface RoomOption {
  id: string;
  label: string;
}

interface RoomState {
  id: string;
  label: string;
}

interface DropdownRoomTypeListProps {
  data: {
    options: RoomOption[];
    defaultKey: string;
    isSpread: boolean;
    defaultRoomName: string;
    roomNameTitle?: string;
    onchange?: (id: string, label: string) => void;
    onchangeroomname?: (id: string, label: string) => void;
    title?: string;
    className?: string;
  };
}

const MAX_ROOM_NAME_LENGTH = 30;

/**
 * Counts grapheme clusters in a string using Intl.Segmenter if available
 */
function countGraphemes(text: string): number {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const app = (window as any).HSApp?.App?.getApp();
    const locale = (app?.appParams?.locale || 'zh_CN').replace('_', '-');
    return Array.from(
      new Intl.Segmenter(locale, { granularity: 'grapheme' }).segment(text)
    ).length;
  }
  return Array.from(text).length;
}

/**
 * Finds a room option by its ID
 */
function findOptionById(options: RoomOption[], id: string): RoomOption | undefined {
  if (id === '') {
    return options[0];
  }
  return options.find(option => option.id === id);
}

/**
 * Counts rooms of the same type, excluding the currently selected room
 */
function countRoomsOfType(roomTypeId: string): string | number {
  const app = (window as any).HSApp?.App?.getApp();
  const selectedRoom = app?.selectionManager?.selected()?.[0];
  const rooms: any[] = [];
  
  app?.floorplan?.forEachRoom?.((room: any) => {
    if (room.roomType === roomTypeId && room.ID !== selectedRoom?.ID) {
      rooms.push(room);
    }
  });
  
  return rooms.length || '';
}

/**
 * Generates a className string, optionally appending additional classes
 */
function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function DropdownRoomTypeList({ data }: DropdownRoomTypeListProps): JSX.Element {
  const {
    options,
    defaultKey,
    isSpread,
    defaultRoomName,
    roomNameTitle,
    onchange = () => {},
    onchangeroomname = () => {},
    title,
    className = ''
  } = data;

  const [roomState, setRoomState] = useState<RoomState>({
    id: defaultKey,
    label: defaultRoomName
  });

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isNoneSelected = (): boolean => defaultKey === 'none';

  const handleRoomTypeChange = (selectedId: string): void => {
    const selectedOption = options.find(opt => opt.id === selectedId);
    
    if (!selectedOption) {
      return;
    }

    const previousOption = findOptionById(options, defaultKey);
    const previousLabel = previousOption?.label || '';
    
    let newLabel = '';
    if (defaultRoomName !== previousLabel) {
      newLabel = defaultRoomName;
    } else {
      const roomCount = countRoomsOfType(selectedOption.id);
      newLabel = selectedOption.label + roomCount;
    }

    setRoomState({
      id: selectedOption.id,
      label: newLabel
    });

    onchange(selectedOption.id, newLabel);
  };

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.currentTarget?.value || '';
    
    setRoomState(prevState => ({
      id: prevState?.id || defaultKey || '',
      label: newValue
    }));
  };

  const handleRoomNameBlur = (): void => {
    const finalLabel = roomState.label || defaultRoomName;
    onchangeroomname(roomState.id, finalLabel);
    setRoomState({
      id: roomState.id,
      label: finalLabel
    });
    setIsFocused(false);
  };

  const handleRoomNameFocus = (): void => {
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  const renderSmartText = (text: string): JSX.Element => (
    <SmartText>{text}</SmartText>
  );

  const filteredOptions = isNoneSelected()
    ? options
    : options.filter(opt => opt.id !== 'none');

  const currentLength = countGraphemes(roomState.label);
  const remainingChars = Math.max(MAX_ROOM_NAME_LENGTH - currentLength, 0);
  const isOverLimit = remainingChars <= 0;

  return (
    <>
      <div className={`property-bar-dropdownroomtypelist ${className}`}>
        {title && (
          <SmartText className="property-bar-label dropdownroomtypelist-label">
            {title}
          </SmartText>
        )}
        <div
          tabIndex={2}
          className={classNames(
            'property-bar-comp',
            isNoneSelected()
              ? 'dropdownroomtypelist-comp__none'
              : 'dropdownroomtypelist-comp'
          )}
        >
          <Select
            size="large"
            position="right"
            compact={!isSpread}
            value={defaultKey}
            onChange={handleRoomTypeChange}
          >
            {filteredOptions.map(option => (
              <Option
                title={renderSmartText(option.label)}
                key={option.id}
                value={option.id}
              >
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {!isNoneSelected() && (
        <div className={`property-bar-dropdownroomtypelist ${className}`}>
          {roomNameTitle && (
            <SmartText className="property-bar-label dropdownroomtypelist-label">
              {roomNameTitle}
            </SmartText>
          )}
          <div
            tabIndex={3}
            className={classNames(
              'property-bar-comp',
              isNoneSelected()
                ? 'dropdownroomtypelist-comp__none'
                : 'dropdownroomtypelist-comp'
            )}
          >
            <Tooltip
              placement="bottomRight"
              title={roomState.label}
              overlayClassName={classNames(isFocused && 'room-name-tooltip__hidden')}
            >
              <Input
                onChange={handleRoomNameChange}
                onBlur={handleRoomNameBlur}
                onFocus={handleRoomNameFocus}
                size="large"
                className={classNames(isFocused && 'tp-input__inputting')}
                maxLength={MAX_ROOM_NAME_LENGTH}
                value={roomState.label}
                defaultValue={defaultRoomName}
              />
            </Tooltip>
            {isFocused && (
              <div
                className={classNames(
                  'count-down',
                  isOverLimit && 'count-down__error'
                )}
              >
                {remainingChars}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}