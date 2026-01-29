import React from 'react';
import classNames from 'classnames';
import { lazyStartIndex, lazyEndIndex, getPreClones } from './utils';

interface SlideStyle {
  width?: number | string;
  position?: string;
  top?: number;
  left?: number;
  opacity?: number;
  transition?: string;
  outline?: string;
}

interface SlideClassNames {
  'slick-slide': boolean;
  'slick-active': boolean;
  'slick-center': boolean;
  'slick-cloned': boolean;
  'slick-current': boolean;
}

interface FocusOnSelectMessage {
  message: string;
  index: number;
  slidesToScroll: number;
  currentSlide: number;
}

interface TrackProps {
  rtl?: boolean;
  slideCount: number;
  index?: number;
  currentSlide: number;
  targetSlide: number;
  centerMode?: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  lazyLoad?: boolean;
  lazyLoadedList: number[];
  children: React.ReactNode;
  variableWidth?: boolean;
  slideWidth?: number | string;
  fade?: boolean;
  vertical?: boolean;
  slideHeight?: number | string;
  speed: number;
  cssEase: string;
  useCSS?: boolean;
  infinite?: boolean;
  focusOnSelect?: (message: FocusOnSelectMessage) => void;
  trackStyle?: React.CSSProperties;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseOver?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const getSlideClasses = (props: TrackProps & { index: number }): SlideClassNames => {
  const slideIndex = props.rtl 
    ? props.slideCount - 1 - props.index 
    : props.index;
  
  const isCloned = slideIndex < 0 || slideIndex >= props.slideCount;
  
  let isActive = false;
  let isCenter = false;
  let centerOffset: number;

  if (props.centerMode) {
    centerOffset = Math.floor(props.slidesToShow / 2);
    isCenter = (slideIndex - props.currentSlide) % props.slideCount === 0;
    
    if (slideIndex > props.currentSlide - centerOffset - 1 && 
        slideIndex <= props.currentSlide + centerOffset) {
      isActive = true;
    }
  } else {
    isActive = props.currentSlide <= slideIndex && 
               slideIndex < props.currentSlide + props.slidesToShow;
  }

  const normalizedTargetSlide = props.targetSlide < 0 
    ? props.targetSlide + props.slideCount 
    : props.targetSlide >= props.slideCount 
      ? props.targetSlide - props.slideCount 
      : props.targetSlide;

  return {
    'slick-slide': true,
    'slick-active': isActive,
    'slick-center': isCenter,
    'slick-cloned': isCloned,
    'slick-current': slideIndex === normalizedTargetSlide
  };
};

const getSlideKey = (child: React.ReactElement, index: number): string => {
  return `${child.key ?? ''}-${index}`;
};

const getSlideStyle = (props: TrackProps & { index: number }): SlideStyle => {
  const style: SlideStyle = {};

  if (props.variableWidth === undefined || props.variableWidth === false) {
    style.width = props.slideWidth;
  }

  if (props.fade) {
    style.position = 'relative';
    
    if (props.vertical) {
      style.top = -props.index * parseInt(String(props.slideHeight));
    } else {
      style.left = -props.index * parseInt(String(props.slideWidth));
    }
    
    style.opacity = props.currentSlide === props.index ? 1 : 0;
    
    if (props.useCSS) {
      style.transition = `opacity ${props.speed}ms ${props.cssEase}, visibility ${props.speed}ms ${props.cssEase}`;
    }
  }

  return style;
};

const renderSlides = (props: TrackProps): React.ReactElement[] => {
  const preClonedSlides: React.ReactElement[] = [];
  const originalSlides: React.ReactElement[] = [];
  const postClonedSlides: React.ReactElement[] = [];
  
  const childCount = React.Children.count(props.children);
  const lazyLoadStartIndex = lazyStartIndex(props);
  const lazyLoadEndIndex = lazyEndIndex(props);

  React.Children.forEach(props.children, (child, childIndex) => {
    if (!React.isValidElement(child)) return;

    const focusMessage: FocusOnSelectMessage = {
      message: 'children',
      index: childIndex,
      slidesToScroll: props.slidesToScroll,
      currentSlide: props.currentSlide
    };

    const shouldLazyLoad = !props.lazyLoad || 
      (props.lazyLoad && props.lazyLoadedList.indexOf(childIndex) >= 0);
    
    const slideContent = shouldLazyLoad 
      ? child 
      : React.createElement('div', null);

    const slideStyle = getSlideStyle({ ...props, index: childIndex });
    const slideClasses = getSlideClasses({ ...props, index: childIndex });
    const originalClassName = (child.props as { className?: string }).className || '';

    const createSlideElement = (
      element: React.ReactElement,
      index: number,
      keyPrefix: string
    ): React.ReactElement => {
      const classes = getSlideClasses({ ...props, index });
      
      return React.cloneElement(element, {
        key: `${keyPrefix}${getSlideKey(element, index)}`,
        'data-index': index,
        className: classNames(classes, originalClassName),
        tabIndex: -1,
        'aria-hidden': !classes['slick-active'],
        style: {
          outline: 'none',
          ...((element.props as { style?: React.CSSProperties }).style || {}),
          ...slideStyle
        },
        onClick: (event: React.MouseEvent) => {
          const elementProps = element.props as { onClick?: (e: React.MouseEvent) => void };
          if (elementProps.onClick) {
            elementProps.onClick(event);
          }
          if (props.focusOnSelect) {
            props.focusOnSelect(focusMessage);
          }
        }
      });
    };

    originalSlides.push(createSlideElement(slideContent, childIndex, 'original'));

    if (props.infinite && props.fade !== true) {
      const preCloneOffset = childCount - childIndex;
      
      if (preCloneOffset <= getPreClones(props) && childCount !== props.slidesToShow) {
        const preCloneIndex = -preCloneOffset;
        
        if (preCloneIndex >= lazyLoadStartIndex) {
          preClonedSlides.push(createSlideElement(child, preCloneIndex, 'precloned'));
        }
      }

      if (childCount !== props.slidesToShow) {
        const postCloneIndex = childCount + childIndex;
        
        if (postCloneIndex < lazyLoadEndIndex) {
          postClonedSlides.push(createSlideElement(child, postCloneIndex, 'postcloned'));
        }
      }
    }
  });

  const allSlides = preClonedSlides.concat(originalSlides, postClonedSlides);
  return props.rtl ? allSlides.reverse() : allSlides;
};

export class Track extends React.PureComponent<TrackProps> {
  node: HTMLDivElement | null = null;

  handleRef = (ref: HTMLDivElement | null): void => {
    this.node = ref;
  };

  render(): React.ReactElement {
    const slides = renderSlides(this.props);
    
    const eventHandlers = {
      onMouseEnter: this.props.onMouseEnter,
      onMouseOver: this.props.onMouseOver,
      onMouseLeave: this.props.onMouseLeave
    };

    return (
      <div
        ref={this.handleRef}
        className="slick-track"
        style={this.props.trackStyle}
        {...eventHandlers}
      >
        {slides}
      </div>
    );
  }
}