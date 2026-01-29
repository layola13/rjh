import { useState, useEffect, useMemo, createElement } from 'react';
import { Button, Tooltip, IconfontView } from './components';
import questionIcon from './assets/question-icon';

interface ButtonConfig {
  icon: string;
  hoverColor?: string;
  label: string;
  tooltip?: string;
  value: any;
}

interface HelptipData {
  trigger?: 'hover' | 'click';
  text: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

interface LabelRadioButtonProps {
  data: {
    className?: string;
    label: string;
    hidden?: boolean;
    disabled?: boolean;
    tooltip?: string;
    helptipData?: HelptipData;
    onChange?: (index: number, value: any) => void;
    btns?: ButtonConfig[];
    selectedIndex?: number;
    defaultValue?: any;
  };
}

export default function LabelRadioButton(props: LabelRadioButtonProps) {
  const { data } = props;
  const {
    label,
    hidden,
    disabled,
    tooltip,
    helptipData,
    onChange,
    btns,
    selectedIndex,
    defaultValue
  } = data;

  let initialIndex = selectedIndex;
  if (defaultValue && btns) {
    const foundIndex = btns.findIndex((btn) => btn.value === defaultValue);
    if (foundIndex !== -1) {
      initialIndex = foundIndex;
    }
  }

  const [currentIndex, setCurrentIndex] = useState<number | undefined>(initialIndex);

  useEffect(() => {
    let newIndex = selectedIndex;
    if (defaultValue && btns) {
      const foundIndex = btns.findIndex((btn) => btn.value === defaultValue);
      if (foundIndex !== -1) {
        newIndex = foundIndex;
      }
    }
    setCurrentIndex(newIndex);
  }, [selectedIndex, defaultValue, btns]);

  const helptipElement = useMemo(() => {
    if (!helptipData) {
      return null;
    }

    const questionIconElement = createElement('span', {
      className: 'property-bar-labelradiobutton__label__question'
    }, createElement('img', {
      src: questionIcon
    }));

    return createElement(Tooltip, {
      trigger: helptipData.trigger || 'hover',
      title: helptipData.text,
      placement: helptipData.placement || 'right',
      delay: helptipData.delay || 200
    }, questionIconElement);
  }, [helptipData]);

  const tooltipElement = useMemo(() => {
    if (!tooltip) {
      return null;
    }
    return createElement('span', {
      className: 'property-bar-labelradiobutton__label__tooltip'
    }, tooltip);
  }, [tooltip]);

  const labelElement = useMemo(() => {
    return createElement('div', {
      className: 'property-bar-labelradiobutton__label'
    }, label, helptipElement, tooltipElement);
  }, [label, helptipElement, tooltipElement]);

  const buttonsElement = useMemo(() => {
    return createElement('div', {
      hidden,
      className: 'property-bar-labelradiobutton__btns'
    }, btns?.map((btn, index) => {
      const { icon, hoverColor, label: btnLabel, tooltip: btnTooltip } = btn;
      
      let buttonClassName = '';
      if (index === currentIndex && currentIndex !== undefined) {
        buttonClassName = 'property-bar-labelradiobutton-btn-selected';
      }

      const handleClick = () => {
        setCurrentIndex(index);
        if (btns[index] && onChange) {
          const value = btns[index].value;
          onChange(index, value);
        }
      };

      const buttonElement = createElement(Button, {
        disabled,
        className: buttonClassName,
        onClick: handleClick,
        level: 'forth',
        type: 'icon',
        icon: createElement(IconfontView, {
          showType: icon,
          hoverColor
        })
      }, btnLabel);

      if (btnTooltip) {
        return createElement(Tooltip, {
          color: 'dark',
          title: btnTooltip
        }, buttonElement);
      }

      return buttonElement;
    }));
  }, [btns, currentIndex, hidden, disabled, onChange]);

  return createElement('div', {
    className: 'property-bar-labelradiobutton'
  }, labelElement, buttonsElement);
}