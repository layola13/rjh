import React, { Component, ReactElement, CSSProperties } from 'react';
import { InnerSlider } from './InnerSlider';
import { canUseDOM } from './utils';
import defaultSettings from './defaultSettings';

interface ResponsiveBreakpoint {
  breakpoint: number;
  settings: SliderSettings | 'unslick';
}

interface SliderSettings {
  slidesToShow?: number;
  slidesToScroll?: number;
  centerMode?: boolean;
  fade?: boolean;
  rows?: number;
  slidesPerRow?: number;
  variableWidth?: boolean;
  unslick?: boolean;
  [key: string]: unknown;
}

interface SliderProps extends SliderSettings {
  children?: React.ReactNode;
  responsive?: ResponsiveBreakpoint[];
  className?: string;
  style?: CSSProperties;
}

interface SliderState {
  breakpoint: number | null;
}

interface MediaHandler {
  mql: MediaQueryList;
  query: string;
  listener: (event: MediaQueryListEvent | MediaQueryList) => void;
}

interface MediaQueryOptions {
  minWidth: number;
  maxWidth?: number;
}

function buildMediaQuery(options: MediaQueryOptions): string {
  const queries: string[] = [];
  if (options.minWidth !== undefined) {
    queries.push(`(min-width: ${options.minWidth}px)`);
  }
  if (options.maxWidth !== undefined) {
    queries.push(`(max-width: ${options.maxWidth}px)`);
  }
  return queries.join(' and ');
}

export default class Slider extends Component<SliderProps, SliderState> {
  private innerSlider: InnerSlider | null = null;
  private _responsiveMediaHandlers: MediaHandler[] = [];

  constructor(props: SliderProps) {
    super(props);
    this.state = {
      breakpoint: null
    };
  }

  innerSliderRefHandler = (element: InnerSlider): void => {
    this.innerSlider = element;
  };

  slickPrev = (): void => {
    this.innerSlider?.slickPrev();
  };

  slickNext = (): void => {
    this.innerSlider?.slickNext();
  };

  slickGoTo = (index: number, dontAnimate: boolean = false): void => {
    this.innerSlider?.slickGoTo(index, dontAnimate);
  };

  slickPause = (): void => {
    this.innerSlider?.pause('paused');
  };

  slickPlay = (): void => {
    this.innerSlider?.autoPlay('play');
  };

  media(query: string, callback: () => void): void {
    const mediaQueryList = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent | MediaQueryList): void => {
      if (event.matches) {
        callback();
      }
    };
    mediaQueryList.addListener(handler);
    handler(mediaQueryList);
    this._responsiveMediaHandlers.push({
      mql: mediaQueryList,
      query: query,
      listener: handler
    });
  }

  componentDidMount(): void {
    if (!this.props.responsive) {
      return;
    }

    const breakpoints = this.props.responsive.map(item => item.breakpoint);
    breakpoints.sort((a, b) => a - b);

    breakpoints.forEach((breakpoint, index) => {
      const mediaQuery = index === 0
        ? buildMediaQuery({ minWidth: 0, maxWidth: breakpoint })
        : buildMediaQuery({ minWidth: breakpoints[index - 1] + 1, maxWidth: breakpoint });

      if (canUseDOM()) {
        this.media(mediaQuery, () => {
          this.setState({ breakpoint });
        });
      }
    });

    const largestBreakpointQuery = buildMediaQuery({
      minWidth: breakpoints[breakpoints.length - 1]
    });

    if (canUseDOM()) {
      this.media(largestBreakpointQuery, () => {
        this.setState({ breakpoint: null });
      });
    }
  }

  componentWillUnmount(): void {
    this._responsiveMediaHandlers.forEach(handler => {
      handler.mql.removeListener(handler.listener);
    });
  }

  render(): ReactElement {
    let settings: SliderSettings | 'unslick';

    if (this.state.breakpoint !== null) {
      const responsiveSettings = this.props.responsive?.filter(
        item => item.breakpoint === this.state.breakpoint
      );
      const matchedSettings = responsiveSettings?.[0]?.settings;

      if (matchedSettings === 'unslick') {
        settings = 'unslick';
      } else {
        settings = { ...defaultSettings, ...this.props, ...matchedSettings };
      }
    } else {
      settings = { ...defaultSettings, ...this.props };
    }

    if (settings === 'unslick') {
      const className = `regular slider ${this.props.className || ''}`;
      const children = React.Children.toArray(this.props.children);
      return <div className={className}>{children}</div>;
    }

    if (settings.centerMode) {
      settings.slidesToScroll = 1;
    }

    if (settings.fade) {
      settings.slidesToShow = 1;
      settings.slidesToScroll = 1;
    }

    let childrenArray = React.Children.toArray(this.props.children);
    childrenArray = childrenArray.filter(child => {
      return typeof child === 'string' ? !!child.trim() : !!child;
    });

    if (settings.variableWidth && (settings.rows! > 1 || settings.slidesPerRow! > 1)) {
      console.warn('variableWidth is not supported in case of rows > 1 or slidesPerRow > 1');
      settings.variableWidth = false;
    }

    const rows = settings.rows ?? 1;
    const slidesPerRow = settings.slidesPerRow ?? 1;
    const slides: ReactElement[] = [];
    let itemWidth: string | null = null;

    for (let i = 0; i < childrenArray.length; i += rows * slidesPerRow) {
      const slideRows: ReactElement[] = [];

      for (let j = i; j < i + rows * slidesPerRow; j += slidesPerRow) {
        const slideColumns: ReactElement[] = [];

        for (let k = j; k < j + slidesPerRow && k < childrenArray.length; k++) {
          const child = childrenArray[k] as ReactElement;
          if (settings.variableWidth && child.props?.style) {
            itemWidth = child.props.style.width;
          }

          slideColumns.push(
            React.cloneElement(child, {
              key: 100 * i + 10 * j + k,
              tabIndex: -1,
              style: {
                width: `${100 / slidesPerRow}%`,
                display: 'inline-block'
              }
            })
          );
        }

        slideRows.push(<div key={10 * i + j}>{slideColumns}</div>);
      }

      if (settings.variableWidth) {
        slides.push(
          <div key={i} style={{ width: itemWidth ?? undefined }}>
            {slideRows}
          </div>
        );
      } else {
        slides.push(<div key={i}>{slideRows}</div>);
      }
    }

    if (slides.length <= (settings.slidesToShow ?? 1)) {
      settings.unslick = true;
    }

    return (
      <InnerSlider
        style={this.props.style}
        ref={this.innerSliderRefHandler}
        {...settings}
      >
        {slides}
      </InnerSlider>
    );
  }
}