interface AlignPoint {
  points: [string, string];
  offset: [number, number];
  overflow: {
    adjustX: 0 | 1;
    adjustY: 0 | 1;
  };
}

interface BuiltinPlacements {
  bottomLeft: AlignPoint;
  bottomRight: AlignPoint;
  topLeft: AlignPoint;
  topRight: AlignPoint;
}

interface PickerTriggerProps {
  prefixCls: string;
  popupElement: React.ReactNode;
  popupStyle?: React.CSSProperties;
  visible: boolean;
  dropdownClassName?: string;
  dropdownAlign?: Record<string, unknown>;
  transitionName?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  children: React.ReactNode;
  range?: boolean;
  popupPlacement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  direction?: 'ltr' | 'rtl';
}

const BUILTIN_PLACEMENTS: BuiltinPlacements = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1
    }
  }
};

/**
 * Picker trigger component that wraps the picker with a dropdown trigger.
 */
export default function PickerTrigger(props: PickerTriggerProps): JSX.Element {
  const {
    prefixCls,
    popupElement,
    popupStyle,
    visible,
    dropdownClassName,
    dropdownAlign,
    transitionName,
    getPopupContainer,
    children,
    range,
    popupPlacement,
    direction
  } = props;

  const dropdownPrefixCls = `${prefixCls}-dropdown`;

  const defaultPlacement = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  const placement = popupPlacement !== undefined ? popupPlacement : defaultPlacement;

  const classNames: string[] = [];
  if (dropdownClassName) {
    classNames.push(dropdownClassName);
  }
  if (range) {
    classNames.push(`${dropdownPrefixCls}-range`);
  }
  if (direction === 'rtl') {
    classNames.push(`${dropdownPrefixCls}-rtl`);
  }

  return (
    <Trigger
      showAction={[]}
      hideAction={[]}
      popupPlacement={placement}
      builtinPlacements={BUILTIN_PLACEMENTS}
      prefixCls={dropdownPrefixCls}
      popupTransitionName={transitionName}
      popup={popupElement}
      popupAlign={dropdownAlign}
      popupVisible={visible}
      popupClassName={classNames.join(' ')}
      popupStyle={popupStyle}
      getPopupContainer={getPopupContainer}
    >
      {children}
    </Trigger>
  );
}