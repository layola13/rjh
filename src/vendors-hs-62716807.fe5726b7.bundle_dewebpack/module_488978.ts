import React, { useContext, useRef, useEffect, useImperativeHandle, forwardRef, Children, ReactNode, RefObject } from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import ReactSlick, { Settings as SlickSettings } from 'react-slick';
import { ConfigContext } from '../config-provider';

type DotPosition = 'top' | 'bottom' | 'left' | 'right';

interface DotConfig {
  className?: string;
}

interface CarouselProps extends Omit<SlickSettings, 'dots' | 'dotsClass'> {
  prefixCls?: string;
  dots?: boolean | DotConfig;
  arrows?: boolean;
  draggable?: boolean;
  dotPosition?: DotPosition;
  effect?: 'scrollx' | 'fade';
  children?: ReactNode;
  autoplay?: boolean;
  initialSlide?: number;
  vertical?: boolean;
}

interface CarouselRef {
  goTo: (slide: number, dontAnimate?: boolean) => void;
  autoPlay: () => void;
  innerSlider: unknown;
  prev: () => void;
  next: () => void;
}

const Carousel = forwardRef<CarouselRef, CarouselProps>((props, ref) => {
  const {
    dots = true,
    arrows = false,
    draggable = false,
    dotPosition = 'bottom',
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const slickRef = useRef<ReactSlick>(null);

  const goTo = (slide: number, dontAnimate: boolean = false): void => {
    slickRef.current?.slickGoTo(slide, dontAnimate);
  };

  useImperativeHandle(
    ref,
    () => ({
      goTo,
      autoPlay: slickRef.current?.innerSlider?.autoPlay,
      innerSlider: slickRef.current?.innerSlider,
      prev: slickRef.current?.slickPrev,
      next: slickRef.current?.slickNext,
    }),
    [slickRef.current]
  );

  useEffect(() => {
    const onWindowResized = debounce(
      () => {
        if (restProps.autoplay && slickRef.current?.innerSlider?.autoPlay) {
          slickRef.current.innerSlider.autoPlay();
        }
      },
      500,
      { leading: false }
    );

    if (restProps.autoplay) {
      window.addEventListener('resize', onWindowResized);
    }

    return () => {
      if (restProps.autoplay) {
        window.removeEventListener('resize', onWindowResized);
        onWindowResized.cancel();
      }
    };
  }, [slickRef.current, restProps.autoplay]);

  const childrenCountRef = useRef<number>(Children.count(restProps.children));

  useEffect(() => {
    const currentChildrenCount = Children.count(restProps.children);
    if (childrenCountRef.current !== currentChildrenCount) {
      goTo(restProps.initialSlide ?? 0, false);
      childrenCountRef.current = currentChildrenCount;
    }
  }, [restProps.children]);

  const carouselSettings: SlickSettings = { ...restProps };

  if (carouselSettings.effect === 'fade') {
    carouselSettings.fade = true;
  }

  const prefixCls = getPrefixCls('carousel', restProps.prefixCls);
  const defaultDotsClass = 'slick-dots';

  carouselSettings.vertical = dotPosition === 'left' || dotPosition === 'right';

  const shouldShowDots = !!dots;
  const dotsClassName = classNames(
    defaultDotsClass,
    `${defaultDotsClass}-${dotPosition}`,
    typeof dots !== 'boolean' ? dots?.className : undefined
  );

  const carouselClassName = classNames(prefixCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-vertical`]: carouselSettings.vertical,
  });

  return (
    <div className={carouselClassName}>
      <ReactSlick
        ref={slickRef}
        {...carouselSettings}
        dots={shouldShowDots}
        dotsClass={dotsClassName}
        arrows={arrows}
        draggable={draggable}
      />
    </div>
  );
});

export default Carousel;