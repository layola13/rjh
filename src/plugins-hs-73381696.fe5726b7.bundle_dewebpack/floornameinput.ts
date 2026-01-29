import { forwardRef, useState, useEffect, useRef, ForwardedRef } from 'react';
import { Input } from 'antd';
import { SmartText, Tooltip, IconfontView } from '@/components';
import classNames from 'classnames';
import { LayerEditLogger } from '@/utils/logger';

// Icon types
const ICON_EDIT = 'hs_mian_bianji';
const ICON_DELETE = 'hs_mian_shanchu';
const ICON_DRAG = 'hs_motaihua_tuozhuaismall';

// Tooltip keys
const TOOLTIP_EDIT_LAYER_NAME = 'tooltip_edit_layer_name';
const TOOLTIP_DELETE_LAYER = 'tooltip_delete_layer';
const TOOLTIP_DRAG_TO_REORDER = 'tooltip_drag_to_reorder';

// Constants
const ACTIVE_COLOR = '#396EFE';
const CHARACTER_LIMIT = 15;

interface Layer {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface LayerListItemProps {
  floorNumber: number;
  index: number;
  name: string;
  isActive: boolean;
  isRoot: boolean;
  isHideOperations: boolean;
  layer: Layer;
  setIsHideOperations: (hide: boolean) => void;
  chooseLayer: (index: number) => void;
  renameLayer: (layer: Layer, newName: string) => void;
  removeLayer: (index: number, event: React.MouseEvent) => void;
}

export const LayerListItem = forwardRef<HTMLDivElement, LayerListItemProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      floorNumber,
      index,
      name,
      isActive,
      isRoot,
      isHideOperations,
      layer,
      setIsHideOperations,
      chooseLayer,
      renameLayer,
      removeLayer,
    } = props;

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleClick = (): void => {
      chooseLayer(index);
    };

    const handleDragStart = (): void => {
      setIsHideOperations(true);
    };

    const handleDragEnd = (): void => {
      setIsHideOperations(false);
    };

    const commitEditingName = (newName: string): void => {
      setIsEditing(false);
      setIsHideOperations(false);
      renameLayer(layer, newName);
      LayerEditLogger.renameLayerInput(true);
    };

    const handleEditClick = (): void => {
      setIsEditing(true);
      setIsHideOperations(true);
      LayerEditLogger.renameLayerClicked();
    };

    const handleDeleteClick = (event: React.MouseEvent): void => {
      removeLayer(index, event);
    };

    const handleDragMouseDown = (): void => {
      LayerEditLogger.reorderLayerClicked();
    };

    return (
      <div
        onClick={handleClick}
        className="layer-list-item hover-able"
        id={`layer-list-item-${index}`}
        ref={ref}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <span className="floor-number">{floorNumber}</span>
        <div className="floor-name">
          {isEditing && (
            <FloorNameInput
              value={name}
              characterLimit={CHARACTER_LIMIT}
              commitEditingName={commitEditingName}
            />
          )}
          <div className="floor-name-display" hidden={isEditing}>
            <SmartText
              className={classNames(
                'floor-name-text',
                isActive && 'active',
                isHideOperations && 'extended'
              )}
              popoverStyle={{
                display: isHideOperations ? 'none' : 'block',
              }}
            >
              {name}
            </SmartText>
            <div className="operations" hidden={isHideOperations}>
              <IconWithTooltip
                showType={ICON_EDIT}
                tooltip={TOOLTIP_EDIT_LAYER_NAME}
                iconOnClick={handleEditClick}
              />
              <IconWithTooltip
                showType={ICON_DELETE}
                tooltip={TOOLTIP_DELETE_LAYER}
                disabled={isRoot}
                iconOnClick={handleDeleteClick}
              />
              <IconWithTooltip
                showType={ICON_DRAG}
                tooltip={TOOLTIP_DRAG_TO_REORDER}
                iconColor="#C3C6CD"
                iconOnMouseDown={handleDragMouseDown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

interface TooltipRef {
  hoverDelay?: number;
}

interface IconWithTooltipProps {
  showType: string;
  tooltip: string;
  iconColor?: string;
  disabled?: boolean;
  customStyle?: React.CSSProperties;
  iconOnClick?: (event: React.MouseEvent) => void;
  iconOnMouseDown?: () => void;
}

export const IconWithTooltip: React.FC<IconWithTooltipProps> = (props) => {
  const {
    iconColor = '#9B9FAB',
    showType,
    tooltip,
    disabled,
    customStyle,
    iconOnClick,
    iconOnMouseDown,
  } = props;

  const [currentColor, setCurrentColor] = useState<string>(iconColor);
  const tooltipRef = useRef<TooltipRef | null>(null);

  useEffect(() => {
    return () => {
      if (tooltipRef.current?.hoverDelay) {
        clearTimeout(tooltipRef.current.hoverDelay);
      }
    };
  }, []);

  const handleMouseOver = (): void => {
    setCurrentColor(ACTIVE_COLOR);
  };

  const handleMouseLeave = (): void => {
    setCurrentColor(iconColor);
  };

  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    iconOnClick?.(event);
  };

  return (
    <Tooltip
      title={ResourceManager.getString(tooltip)}
      placement="top"
      trigger={['hover']}
      delayOpen={1000}
      color="dark"
      ref={tooltipRef}
      disableHoverPopover={disabled}
      stopPropagation={true}
      preventDefault={true}
    >
      <div
        className={classNames(
          'operation-icon',
          showType === ICON_DRAG && 'grab',
          disabled && 'disabled'
        )}
        onMouseOver={handleMouseOver}
        onMouseDown={iconOnMouseDown}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <IconfontView
          customClass="iconfont"
          showType={showType}
          hoverColor={ACTIVE_COLOR}
          customStyle={{
            color: currentColor,
            fontSize: '14px',
            ...customStyle,
          }}
        />
      </div>
    </Tooltip>
  );
};

interface FloorNameInputProps {
  value: string;
  characterLimit: number;
  commitEditingName: (value: string) => void;
}

export const FloorNameInput: React.FC<FloorNameInputProps> = (props) => {
  const { value, characterLimit, commitEditingName } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(value);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setHasError(inputValue.length > characterLimit);
  }, [inputValue, characterLimit]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    commitEditingName((event.target as HTMLInputElement).value);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.select();
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    commitEditingName(event.target.value);
  };

  return (
    <Input
      onClick={handleClick}
      ref={inputRef}
      className={classNames('floor-name-input', hasError && 'error')}
      value={inputValue}
      allowClear={true}
      maxLength={characterLimit}
      onChange={handleChange}
      onPressEnter={handlePressEnter}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};