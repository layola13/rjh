import { useState, useEffect, useMemo, useRef, Fragment, createElement } from 'react';
import { IconfontView } from './IconfontView';

type TipStyle = 'left' | 'right' | 'top' | 'bottom';
type TipType = string;

interface TipPosition {
  top?: number;
  left?: number;
}

interface StepTipConfig {
  ele?: string | Element;
  style?: TipStyle;
  tip?: string;
  type?: TipType;
  margin?: number;
  position?: TipPosition;
}

interface GuideTipProps {
  showStepTip: boolean;
  stepTip?: StepTipConfig;
  top?: number;
  left?: number;
  canClose?: boolean;
}

interface TipStyle {
  top?: number;
  left?: number;
  display?: string;
}

const DEFAULT_MARGIN = 20;
const HIDDEN_TOP_POSITION = -1000;

export default function GuideTip(props: GuideTipProps) {
  const { showStepTip, stepTip, top, left, canClose } = props;
  const targetElement = stepTip?.ele;

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const tipRef = useRef<HTMLDivElement>(null);

  const shouldShowTip = useMemo(() => {
    return showStepTip && stepTip;
  }, [showStepTip, stepTip]);

  const [tipStyle, setTipStyle] = useState<TipStyle>({});

  useEffect(() => {
    if (!shouldShowTip) {
      setTipStyle({ display: 'none' });
      return;
    }

    let calculatedLeft: number | undefined;
    let calculatedTop: number | undefined;

    if (!tipRef.current) {
      calculatedLeft = 0;
      calculatedTop = HIDDEN_TOP_POSITION;
    } else if (targetElement) {
      let element: Element | null = null;

      if (typeof targetElement === 'string') {
        element = document.querySelector(targetElement);
      } else if (targetElement instanceof Element) {
        element = targetElement;
      }

      if (element && element !== document.documentElement) {
        const targetRect = element.getBoundingClientRect();
        const tipRect = tipRef.current.getBoundingClientRect();
        const tipWidth = tipRect.width;
        const tipHeight = tipRect.height;
        const margin = stepTip?.margin ?? DEFAULT_MARGIN;

        switch (stepTip?.style) {
          case 'left':
            calculatedLeft = targetRect.right + margin;
            calculatedTop = (targetRect.top + targetRect.bottom) / 2 - tipHeight / 2;
            break;
          case 'right':
            calculatedLeft = targetRect.left - tipWidth - margin;
            calculatedTop = (targetRect.top + targetRect.bottom) / 2 - tipHeight / 2;
            break;
          case 'top':
            calculatedLeft = targetRect.left + targetRect.width / 2 - tipWidth / 2;
            calculatedTop = targetRect.bottom + margin;
            break;
          case 'bottom':
            calculatedLeft = targetRect.left + targetRect.width / 2 - tipWidth / 2;
            calculatedTop = targetRect.top - tipHeight - margin;
            break;
        }
      } else {
        calculatedLeft = stepTip?.position?.left ?? calculatedLeft ?? 0;
        calculatedTop = stepTip?.position?.top ?? calculatedTop ?? 0;
      }
    } else {
      calculatedLeft = 0;
      calculatedTop = HIDDEN_TOP_POSITION;
    }

    setTipStyle({
      top: calculatedTop,
      left: calculatedLeft,
    });
  }, [
    tipRef.current,
    shouldShowTip,
    stepTip?.style,
    stepTip?.tip,
    stepTip?.ele,
    stepTip?.position,
    left,
    top,
  ]);

  const handleClose = (): void => {
    setIsVisible(false);
  };

  if (!shouldShowTip) {
    return createElement(Fragment, null);
  }

  return createElement(
    'div',
    {
      className: `guideTip animated bounce${stepTip?.style} ${stepTip?.type}`,
      style: tipStyle,
      ref: tipRef,
    },
    isVisible &&
      createElement(
        'div',
        { className: 'content' },
        createElement(
          'div',
          { className: 'content-text' },
          createElement('span', null, stepTip?.tip),
          canClose &&
            createElement(IconfontView, {
              iconOnclick: handleClose,
              customClass: 'guideTipCloseBtn',
              showType: 'hs_xian_guanbi',
              customStyle: {
                fontSize: '16px',
                color: 'white',
              },
            })
        ),
        createElement('div', { className: `iconArrow ${stepTip?.style}` })
      )
  );
}