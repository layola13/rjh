import React from 'react';
import classNames from 'classnames';
import { clamp } from './utils';

interface DotsProps {
  infinite: boolean;
  slidesToScroll: number;
  slidesToShow: number;
  slideCount: number;
  currentSlide: number;
  dotsClass: string;
  customPaging: (index: number) => React.ReactElement;
  appendDots: (dots: React.ReactNode[]) => React.ReactElement;
  clickHandler: (clickMessage: DotClickMessage) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
}

interface DotClickMessage {
  message: 'dots';
  index: number;
  slidesToScroll: number;
  currentSlide: number;
}

interface DotCountCalculation {
  slideCount: number;
  slidesToScroll: number;
  slidesToShow: number;
  infinite: boolean;
}

export class Dots extends React.PureComponent<DotsProps> {
  private clickHandler(clickMessage: DotClickMessage, event: React.MouseEvent): void {
    event.preventDefault();
    this.props.clickHandler(clickMessage);
  }

  render(): React.ReactElement {
    const {
      onMouseEnter,
      onMouseOver,
      onMouseLeave,
      infinite,
      slidesToScroll,
      slidesToShow,
      slideCount,
      currentSlide
    } = this.props;

    const dotCountParams: DotCountCalculation = {
      slideCount,
      slidesToScroll,
      slidesToShow,
      infinite
    };

    const dotCount = infinite
      ? Math.ceil(dotCountParams.slideCount / dotCountParams.slidesToScroll)
      : Math.ceil((dotCountParams.slideCount - dotCountParams.slidesToShow) / dotCountParams.slidesToScroll) + 1;

    const mouseHandlers = {
      onMouseEnter,
      onMouseOver,
      onMouseLeave
    };

    const dotElements: React.ReactNode[] = [];

    for (let index = 0; index < dotCount; index++) {
      const endSlideIndex = (index + 1) * slidesToScroll - 1;
      const clampedEndIndex = infinite
        ? endSlideIndex
        : clamp(endSlideIndex, 0, slideCount - 1);

      const startSlideIndex = clampedEndIndex - (slidesToScroll - 1);
      const clampedStartIndex = infinite
        ? startSlideIndex
        : clamp(startSlideIndex, 0, slideCount - 1);

      const dotClassName = classNames({
        'slick-active': infinite
          ? currentSlide >= clampedStartIndex && currentSlide <= clampedEndIndex
          : currentSlide === clampedStartIndex
      });

      const clickMessage: DotClickMessage = {
        message: 'dots',
        index,
        slidesToScroll,
        currentSlide
      };

      const handleClick = this.clickHandler.bind(this, clickMessage);

      dotElements.push(
        <li key={index} className={dotClassName}>
          {React.cloneElement(this.props.customPaging(index), {
            onClick: handleClick
          })}
        </li>
      );
    }

    return React.cloneElement(this.props.appendDots(dotElements), {
      className: this.props.dotsClass,
      ...mouseHandlers
    });
  }
}