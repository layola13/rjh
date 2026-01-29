import React from 'react';
import classNames from 'classnames';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import Tooltip from '../tooltip';
import Col from '../col';
import { FormContext } from './FormContext';
import { useLocaleReceiver } from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';

interface ColProps {
  span?: number;
  offset?: number;
  className?: string;
  [key: string]: any;
}

interface TooltipConfig {
  title?: React.ReactNode;
  icon?: React.ReactElement;
  [key: string]: any;
}

type LabelAlign = 'left' | 'right';
type RequiredMark = 'optional' | boolean;

interface FormItemLabelProps {
  prefixCls: string;
  label?: React.ReactNode;
  htmlFor?: string;
  labelCol?: ColProps;
  labelAlign?: LabelAlign;
  colon?: boolean;
  required?: boolean;
  requiredMark?: RequiredMark;
  tooltip?: React.ReactNode | TooltipConfig;
}

interface FormContextValue {
  vertical?: boolean;
  labelAlign?: LabelAlign;
  labelCol?: ColProps;
  colon?: boolean;
}

/**
 * Omit specific keys from an object type
 */
function omitProps<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keysToOmit: K[]
): Omit<T, K> {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keysToOmit.indexOf(key as any) < 0) {
      result[key] = obj[key];
    }
  }
  
  if (typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (
        keysToOmit.indexOf(symbol as any) < 0 &&
        Object.prototype.propertyIsEnumerable.call(obj, symbol)
      ) {
        result[symbol as any] = obj[symbol as any];
      }
    }
  }
  
  return result as Omit<T, K>;
}

/**
 * Normalize tooltip configuration
 */
function normalizeTooltip(tooltip: React.ReactNode | TooltipConfig): TooltipConfig | null {
  if (!tooltip) {
    return null;
  }
  
  if (typeof tooltip !== 'object' || React.isValidElement(tooltip)) {
    return { title: tooltip };
  }
  
  return tooltip as TooltipConfig;
}

/**
 * Form Item Label Component
 */
const FormItemLabel: React.FC<FormItemLabelProps> = (props) => {
  const {
    prefixCls,
    label,
    htmlFor,
    labelCol,
    labelAlign,
    colon,
    required,
    requiredMark,
    tooltip,
  } = props;

  const [locale] = useLocaleReceiver('Form');

  if (!label) {
    return null;
  }

  return (
    <FormContext.Consumer key="label">
      {(formContext: FormContextValue) => {
        const {
          vertical,
          labelAlign: contextLabelAlign,
          labelCol: contextLabelCol,
          colon: contextColon,
        } = formContext;

        const mergedLabelCol = labelCol ?? contextLabelCol ?? {};
        const mergedLabelAlign = labelAlign ?? contextLabelAlign;

        const labelClassName = `${prefixCls}-item-label`;
        const labelClassNames = classNames(
          labelClassName,
          mergedLabelAlign === 'left' && `${labelClassName}-left`,
          mergedLabelCol.className
        );

        let labelContent: React.ReactNode = label;
        const shouldShowColon =
          colon === true || (contextColon !== false && colon !== false);

        // Remove trailing colon/semicolon from label text
        if (
          shouldShowColon &&
          !vertical &&
          typeof label === 'string' &&
          label.trim() !== ''
        ) {
          labelContent = label.replace(/[:|：]\s*$/, '');
        }

        // Add tooltip icon if provided
        const tooltipConfig = normalizeTooltip(tooltip);
        if (tooltipConfig) {
          const { icon = <QuestionCircleOutlined />, ...restTooltipProps } = tooltipConfig;
          const tooltipPropsWithoutIcon = omitProps(tooltipConfig, ['icon']);

          const tooltipIcon = React.cloneElement(icon, {
            className: `${prefixCls}-item-tooltip`,
          });

          const tooltipElement = <Tooltip {...tooltipPropsWithoutIcon}>{tooltipIcon}</Tooltip>;

          labelContent = (
            <>
              {labelContent}
              {tooltipElement}
            </>
          );
        }

        // Add optional mark if requiredMark is 'optional' and not required
        if (requiredMark === 'optional' && !required) {
          const optionalText =
            locale?.optional ?? defaultLocale.Form?.optional;

          labelContent = (
            <>
              {labelContent}
              <span className={`${prefixCls}-item-optional`}>{optionalText}</span>
            </>
          );
        }

        const labelElementClassNames = classNames({
          [`${prefixCls}-item-required`]: required,
          [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional',
          [`${prefixCls}-item-no-colon`]: !shouldShowColon,
        });

        return (
          <Col {...mergedLabelCol} className={labelClassNames}>
            <label
              htmlFor={htmlFor}
              className={labelElementClassNames}
              title={typeof label === 'string' ? label : ''}
            >
              {labelContent}
            </label>
          </Col>
        );
      }}
    </FormContext.Consumer>
  );
};

export default FormItemLabel;