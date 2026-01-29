import React from 'react';

interface SlickDotsStyle {
  display: string;
}

interface SlickSettings {
  accessibility: boolean;
  adaptiveHeight: boolean;
  afterChange: ((currentSlide: number) => void) | null;
  appendDots: (dots: React.ReactNode) => React.ReactElement;
  arrows: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  beforeChange: ((currentSlide: number, nextSlide: number) => void) | null;
  centerMode: boolean;
  centerPadding: string;
  className: string;
  cssEase: string;
  customPaging: (index: number) => React.ReactElement;
  dots: boolean;
  dotsClass: string;
  draggable: boolean;
  easing: string;
  edgeFriction: number;
  fade: boolean;
  focusOnSelect: boolean;
  infinite: boolean;
  initialSlide: number;
  lazyLoad: 'ondemand' | 'progressive' | null;
  nextArrow: React.ReactElement | null;
  onEdge: ((direction: 'left' | 'right') => void) | null;
  onInit: (() => void) | null;
  onLazyLoadError: ((error: Error) => void) | null;
  onReInit: (() => void) | null;
  pauseOnDotsHover: boolean;
  pauseOnFocus: boolean;
  pauseOnHover: boolean;
  prevArrow: React.ReactElement | null;
  responsive: Array<{
    breakpoint: number;
    settings: Partial<SlickSettings>;
  }> | null;
  rows: number;
  rtl: boolean;
  slide: string;
  slidesPerRow: number;
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
  swipe: boolean;
  swipeEvent: ((direction: 'left' | 'right') => void) | null;
  swipeToSlide: boolean;
  touchMove: boolean;
  touchThreshold: number;
  useCSS: boolean;
  useTransform: boolean;
  variableWidth: boolean;
  vertical: boolean;
  waitForAnimate: boolean;
}

const defaultSettings: SlickSettings = {
  accessibility: true,
  adaptiveHeight: false,
  afterChange: null,
  appendDots: (dots: React.ReactNode): React.ReactElement => {
    return React.createElement('ul', {
      style: {
        display: 'block'
      }
    }, dots);
  },
  arrows: true,
  autoplay: false,
  autoplaySpeed: 3000,
  beforeChange: null,
  centerMode: false,
  centerPadding: '50px',
  className: '',
  cssEase: 'ease',
  customPaging: (index: number): React.ReactElement => {
    return React.createElement('button', null, index + 1);
  },
  dots: false,
  dotsClass: 'slick-dots',
  draggable: true,
  easing: 'linear',
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  infinite: true,
  initialSlide: 0,
  lazyLoad: null,
  nextArrow: null,
  onEdge: null,
  onInit: null,
  onLazyLoadError: null,
  onReInit: null,
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  pauseOnHover: true,
  prevArrow: null,
  responsive: null,
  rows: 1,
  rtl: false,
  slide: 'div',
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: true,
  swipeEvent: null,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  useTransform: true,
  variableWidth: false,
  vertical: false,
  waitForAnimate: true
};

export default defaultSettings;