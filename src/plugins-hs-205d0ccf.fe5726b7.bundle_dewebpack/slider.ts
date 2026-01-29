import React, { useMemo, useState, useEffect, createRef, ReactNode, CSSProperties } from 'react';
import { Icons } from './Icons';
import './Slider.css';

interface SliderProps {
  width: number;
  height: number;
  children?: ReactNode;
  theme?: 'light' | 'dark';
  autoSlider?: boolean;
}

interface TimerState {
  timer?: number;
}

const SLIDE_INTERVAL = 5000;
const TRANSITION_DURATION = 300;

export function Slider(props: SliderProps): JSX.Element | null {
  const {
    width,
    height,
    children,
    theme = 'light',
    autoSlider = true
  } = props;

  if (!children) return null;

  const childrenCount = useMemo(() => {
    return React.Children.count(children);
  }, [children]);

  const slideItems = useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    const items = childrenArray.map((child) => {
      return React.createElement('div', {
        className: 'slider-item-wrapper',
        style: {
          width,
          height
        }
      }, child);
    });

    items.splice(0, 0, React.createElement('div', {
      className: 'slider-item-wrapper',
      style: {
        width,
        height
      }
    }, childrenArray[childrenArray.length - 1]));

    items.push(React.createElement('div', {
      className: 'slider-item-wrapper',
      style: {
        width,
        height
      }
    }, childrenArray[0]));

    return items;
  }, [children, width, height]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [skipTransition, setSkipTransition] = useState<boolean>(false);
  const sliderRef = createRef<HTMLDivElement>();

  function goToNext(): void {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  useEffect(() => {
    if (skipTransition) {
      setSkipTransition(false);
      startAutoSlide();
    }
  }, [currentIndex]);

  const timerState = useState<TimerState>({})[0];

  function startAutoSlide(): () => void {
    if (!timerState.timer && autoSlider) {
      timerState.timer = window.setInterval(() => {
        goToNext();
      }, SLIDE_INTERVAL);
    }
    return stopAutoSlide;
  }

  function stopAutoSlide(): void {
    clearInterval(timerState.timer);
    timerState.timer = undefined;
  }

  useEffect(() => {
    if (autoSlider) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
    return stopAutoSlide;
  }, [autoSlider]);

  const navigationBars = useMemo(() => {
    return new Array(childrenCount).fill(1).map((_, index) => {
      let normalizedIndex = currentIndex;
      if (normalizedIndex <= -1) {
        normalizedIndex = childrenCount - 1;
      }
      if (normalizedIndex >= childrenCount) {
        normalizedIndex = 0;
      }

      return React.createElement('div', {
        onMouseEnter: () => {
          stopAutoSlide();
          setCurrentIndex(index);
        },
        onMouseLeave: () => {
          startAutoSlide();
        },
        className: `bar ${normalizedIndex === index ? 'current' : ''}`
      });
    });
  }, [childrenCount, currentIndex]);

  const sliderStyle: CSSProperties = {
    transform: `translate(${-width * (currentIndex + 1)}px, 0)`,
    transition: skipTransition ? 'none' : `transform ${TRANSITION_DURATION}ms linear`
  };

  return React.createElement('div', {
    className: `slider-wrapper ${theme}`
  }, React.createElement('div', {
    className: 'slider-content',
    style: {
      width,
      height
    }
  }, React.createElement('div', {
    className: 'slider-items-wrapper',
    ref: sliderRef,
    onTransitionEnd: () => {
      if (currentIndex >= childrenCount) {
        stopAutoSlide();
        setSkipTransition(true);
        setCurrentIndex(0);
      } else if (currentIndex <= -1) {
        stopAutoSlide();
        setSkipTransition(true);
        setCurrentIndex(childrenCount - 1);
      }
    },
    style: sliderStyle
  }, slideItems)), childrenCount === 1 ? '' : React.createElement(React.Fragment, null, React.createElement('div', {
    className: 'left-arrow arrow',
    onMouseEnter: () => {
      stopAutoSlide();
    },
    onMouseLeave: () => {
      startAutoSlide();
    },
    onClick: () => {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, React.createElement(Icons, {
    type: 'hs_xiao_danjiantou_zuo'
  })), React.createElement('div', {
    className: 'right-arrow arrow',
    onMouseEnter: () => {
      stopAutoSlide();
    },
    onMouseLeave: () => {
      startAutoSlide();
    },
    onClick: () => {
      goToNext();
    }
  }, React.createElement(Icons, {
    type: 'hs_xiao_danjiantou_you'
  }))), childrenCount === 1 ? '' : React.createElement('div', {
    className: 'slider-navigation'
  }, navigationBars));
}