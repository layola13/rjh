import React from 'react';
import classNames from 'classnames';
import { canGoNext } from './utils';

interface ArrowProps {
  clickHandler: (options: { message: string }, event?: React.MouseEvent) => void;
  currentSlide: number;
  slideCount: number;
  slidesToShow?: number;
  infinite?: boolean;
  prevArrow?: React.ReactElement;
  nextArrow?: React.ReactElement;
}

interface ArrowState {
  currentSlide: number;
  slideCount: number;
}

export class PrevArrow extends React.PureComponent<ArrowProps> {
  clickHandler(options: { message: string }, event?: React.MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    this.props.clickHandler(options, event);
  }

  render(): React.ReactNode {
    const classNameMap: Record<string, boolean> = {
      'slick-arrow': true,
      'slick-prev': true,
    };

    let onClickHandler: (() => void) | null = this.clickHandler.bind(this, {
      message: 'previous',
    });

    if (
      !this.props.infinite &&
      (this.props.currentSlide === 0 ||
        this.props.slideCount <= (this.props.slidesToShow ?? 0))
    ) {
      classNameMap['slick-disabled'] = true;
      onClickHandler = null;
    }

    const arrowProps = {
      key: '0',
      'data-role': 'none',
      className: classNames(classNameMap),
      style: {
        display: 'block',
      },
      onClick: onClickHandler,
    };

    const stateProps: ArrowState = {
      currentSlide: this.props.currentSlide,
      slideCount: this.props.slideCount,
    };

    if (this.props.prevArrow) {
      return React.cloneElement(this.props.prevArrow, {
        ...arrowProps,
        ...stateProps,
      });
    }

    return (
      <button key="0" type="button" {...arrowProps}>
        {' '}
        Previous
      </button>
    );
  }
}

export class NextArrow extends React.PureComponent<ArrowProps> {
  clickHandler(options: { message: string }, event?: React.MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    this.props.clickHandler(options, event);
  }

  render(): React.ReactNode {
    const classNameMap: Record<string, boolean> = {
      'slick-arrow': true,
      'slick-next': true,
    };

    let onClickHandler: (() => void) | null = this.clickHandler.bind(this, {
      message: 'next',
    });

    if (!canGoNext(this.props)) {
      classNameMap['slick-disabled'] = true;
      onClickHandler = null;
    }

    const arrowProps = {
      key: '1',
      'data-role': 'none',
      className: classNames(classNameMap),
      style: {
        display: 'block',
      },
      onClick: onClickHandler,
    };

    const stateProps: ArrowState = {
      currentSlide: this.props.currentSlide,
      slideCount: this.props.slideCount,
    };

    if (this.props.nextArrow) {
      return React.cloneElement(this.props.nextArrow, {
        ...arrowProps,
        ...stateProps,
      });
    }

    return (
      <button key="1" type="button" {...arrowProps}>
        {' '}
        Next
      </button>
    );
  }
}