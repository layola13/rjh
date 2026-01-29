import React from 'react';
import { IconfontView } from './IconfontView';

interface CarouselProps {
  images: string[];
}

interface CarouselState {
  width: number;
  currentIndex: number;
  animation: boolean;
}

interface TrackStyle {
  width: number;
  transform: string;
  transitionDuration?: string;
}

export class Carousel extends React.Component<CarouselProps, CarouselState> {
  private carouselListRef: HTMLDivElement | null = null;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      width: 0,
      currentIndex: 0,
      animation: false
    };
    this.getCarouselListRef = this.getCarouselListRef.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.goNext = this.goNext.bind(this);
  }

  private getCarouselListRef(element: HTMLDivElement | null): void {
    this.carouselListRef = element;
  }

  componentDidMount(): void {
    setTimeout(() => {
      if (this.carouselListRef) {
        this.setState({
          width: this.carouselListRef.clientWidth
        });
      }
    }, 300);
  }

  private goPrev(): void {
    const totalImages = this.props.images.length;
    const { currentIndex } = this.state;
    
    this.setState(
      {
        currentIndex: currentIndex - 1,
        animation: true
      },
      () => {
        setTimeout(() => {
          if (currentIndex - 1 <= -1) {
            this.setState({
              currentIndex: totalImages - 1,
              animation: false
            });
          } else {
            this.setState({
              animation: false
            });
          }
        }, 300);
      }
    );
  }

  private goNext(): void {
    const totalImages = this.props.images.length;
    const { currentIndex } = this.state;
    
    this.setState(
      {
        currentIndex: currentIndex + 1,
        animation: true
      },
      () => {
        setTimeout(() => {
          if (currentIndex + 1 >= totalImages) {
            this.setState({
              currentIndex: currentIndex + 1 - totalImages,
              animation: false
            });
          } else {
            this.setState({
              animation: false
            });
          }
        }, 300);
      }
    );
  }

  private activePage(pageIndex: number): void {
    this.setState(
      {
        currentIndex: pageIndex,
        animation: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            animation: false
          });
        }, 300);
      }
    );
  }

  render(): JSX.Element {
    const { images } = this.props;
    const { width, animation, currentIndex } = this.state;
    const totalImages = images.length;

    const trackStyle: TrackStyle = {
      width: 2 * totalImages * width,
      transform: `translate(-${(currentIndex + 1) * width}px, 0)`
    };

    if (animation) {
      trackStyle.transitionDuration = '0.3s';
    }

    return (
      <div className="carousel-wrap">
        <div className="carousel-imgs-slider">
          <div className="carousel-prev" onClick={this.goPrev}>
            <span>
              <IconfontView
                showType="hs_xiao_danjiantou_zuo"
                customStyle={{
                  fontSize: '26px',
                  color: 'rgba(96, 100, 111, 1)'
                }}
                hoverBgColor="#f5f5f5"
                hoverColor="#1C1C1C"
                clickColor="#396EFE"
                bgExtendSize={30}
              />
            </span>
          </div>
          <div ref={this.getCarouselListRef} className="carousel-imgs-list">
            <div className="carousel-imgs-track" style={trackStyle}>
              <div key={-1} className="carousel-img-wrapper" style={{ width }}>
                <img src={images[totalImages - 1]} />
              </div>
              {images.map((imageSrc, index) => (
                <div key={index} className="carousel-img-wrapper" style={{ width }}>
                  <img src={imageSrc} />
                </div>
              ))}
              {images.slice(0, totalImages - 1).map((imageSrc, index) => (
                <div key={index} className="carousel-img-wrapper" style={{ width }}>
                  <img key={index + totalImages} src={imageSrc} />
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-next" onClick={this.goNext}>
            <span>
              <IconfontView
                showType="hs_xiao_danjiantou_you"
                customStyle={{
                  fontSize: '26px',
                  color: 'rgba(96, 100, 111, 1)'
                }}
                hoverBgColor="#f5f5f5"
                hoverColor="#1C1C1C"
                clickColor="#396EFE"
                bgExtendSize={30}
              />
            </span>
          </div>
        </div>
        <div className="carousel-navigation">
          <ul>
            {images.map((_, index) => (
              <li
                key={`navigation-${index}`}
                className={currentIndex === index ? 'active' : ''}
                onMouseEnter={() => this.activePage(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}