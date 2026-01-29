import React, { useContext, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { scrollTo, waitElementReady } from './scroll-utils';
import PanelContext from './PanelContext';

interface TimeUnit {
  label: string;
  value: number;
  disabled?: boolean;
}

interface TimeUnitColumnProps {
  prefixCls: string;
  units: TimeUnit[];
  onSelect: (value: number) => void;
  value: number;
  active: boolean;
  hideDisabledOptions?: boolean;
}

const TimeUnitColumn: React.FC<TimeUnitColumnProps> = ({
  prefixCls,
  units,
  onSelect,
  value,
  active,
  hideDisabledOptions
}) => {
  const cellClassName = `${prefixCls}-cell`;
  const { open } = useContext(PanelContext);
  
  const listRef = useRef<HTMLUListElement>(null);
  const cellRefsMap = useRef<Map<number, HTMLLIElement | null>>(new Map());
  const cleanupRef = useRef<(() => void) | undefined>();

  useLayoutEffect(() => {
    const targetCell = cellRefsMap.current.get(value);
    if (targetCell && open !== false) {
      scrollTo(listRef.current, targetCell.offsetTop, 120);
    }
  }, [value]);

  useLayoutEffect(() => {
    if (open) {
      const targetCell = cellRefsMap.current.get(value);
      if (targetCell) {
        cleanupRef.current = waitElementReady(targetCell, () => {
          scrollTo(listRef.current, targetCell.offsetTop, 0);
        });
      }
    }

    return () => {
      cleanupRef.current?.();
    };
  }, [open, value]);

  return (
    <ul
      className={classNames(`${prefixCls}-column`, {
        [`${prefixCls}-column-active`]: active
      })}
      ref={listRef}
      style={{ position: 'relative' }}
    >
      {units.map((unit) => {
        if (hideDisabledOptions && unit.disabled) {
          return null;
        }

        return (
          <li
            key={unit.value}
            ref={(element) => {
              cellRefsMap.current.set(unit.value, element);
            }}
            className={classNames(cellClassName, {
              [`${cellClassName}-disabled`]: unit.disabled,
              [`${cellClassName}-selected`]: value === unit.value
            })}
            onClick={() => {
              if (!unit.disabled) {
                onSelect(unit.value);
              }
            }}
          >
            <div className={`${cellClassName}-inner`}>{unit.label}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default TimeUnitColumn;