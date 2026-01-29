import React, { memo, ReactNode, MouseEvent } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import Checkbox from './Checkbox';
import Button from './Button';
import LocaleReceiver from './LocaleReceiver';
import defaultLocale from './locale/default';

interface TransferItem {
  key: string;
  disabled?: boolean;
  [key: string]: any;
}

interface TransferItemProps {
  renderedText: string | number;
  renderedEl: ReactNode;
  item: TransferItem;
  checked: boolean;
  disabled?: boolean;
  prefixCls: string;
  onClick: (item: TransferItem) => void;
  onRemove?: (item: TransferItem) => void;
  showRemove?: boolean;
}

interface LocaleData {
  remove: string;
  [key: string]: any;
}

const TransferItem: React.FC<TransferItemProps> = ({
  renderedText,
  renderedEl,
  item,
  checked,
  disabled = false,
  prefixCls,
  onClick,
  onRemove,
  showRemove = false
}) => {
  const itemClassNames = classNames({
    [`${prefixCls}-content-item`]: true,
    [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    [`${prefixCls}-content-item-checked`]: checked
  });

  const title = typeof renderedText === 'string' || typeof renderedText === 'number'
    ? String(renderedText)
    : undefined;

  return (
    <LocaleReceiver
      componentName="Transfer"
      defaultLocale={defaultLocale.Transfer}
    >
      {(locale: LocaleData) => {
        const itemProps: React.HTMLAttributes<HTMLLIElement> = {
          className: itemClassNames,
          title
        };

        const textElement = (
          <span className={`${prefixCls}-content-item-text`}>
            {renderedEl}
          </span>
        );

        if (showRemove) {
          return (
            <li {...itemProps}>
              {textElement}
              <Button
                disabled={disabled || item.disabled}
                className={`${prefixCls}-content-item-remove`}
                aria-label={locale.remove}
                onClick={() => {
                  onRemove?.(item);
                }}
              >
                <Icon />
              </Button>
            </li>
          );
        }

        itemProps.onClick = disabled || item.disabled
          ? undefined
          : () => onClick(item);

        return (
          <li {...itemProps}>
            <Checkbox
              checked={checked}
              disabled={disabled || item.disabled}
            />
            {textElement}
          </li>
        );
      }}
    </LocaleReceiver>
  );
};

export default memo(TransferItem);