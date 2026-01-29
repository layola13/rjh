import React from 'react';

interface SliderData {
  className: string;
  controller: {
    onValueChangeStart: (value: number) => void;
    onValueChanged: (value: number) => void;
    onValueChangeEnd: () => void;
  };
  value: number;
  label: string;
  options: {
    unitType: string;
    rules: {
      positiveOnly: boolean;
      range: {
        checkMax: boolean;
        checkMin: boolean;
        max: number;
        min: number;
      };
    };
  };
}

interface SliderItemProps {
  className?: string;
  destext: string;
  max: number;
  min: number;
  value: number;
  id: string;
  validate: () => void;
  onChangeStart: (value: number, propertyKey: string) => void;
  onChange: (value: number, propertyKey: string) => void;
  onChangeEnd: () => void;
  step: number;
  unitType: string;
  propertyKey: string;
  checkMax?: boolean;
}

interface SliderItemState {}

interface SliderComponentProps {
  data: SliderData;
}

interface FactoryOptions {
  positiveOnly: boolean;
  reciveData?: (value: unknown) => number;
}

function identity<T>(value: T): T {
  return value;
}

export default function createSliderComponent(options: FactoryOptions) {
  const { positiveOnly, reciveData = identity } = options;

  return function withSlider(SliderComponent: React.ComponentType<SliderComponentProps>) {
    class SliderItem extends React.PureComponent<SliderItemProps, SliderItemState> {
      static defaultProps = {
        className: ''
      };

      constructor(props: SliderItemProps) {
        super(props);
        this.state = {};
      }

      onChangeStart = (event: CustomEvent | number): void => {
        let value: number;
        
        if (typeof event === 'object' && 'detail' in event) {
          value = (event as CustomEvent).detail.value;
        } else {
          value = event as number;
        }
        
        this.props.onChangeStart(value, this.props.propertyKey);
      };

      onChange = (event: unknown): void => {
        const value = reciveData(event);
        this.props.onChange(value, this.props.propertyKey);
      };

      onChangeEnd = (): void => {
        this.props.onChangeEnd();
      };

      render(): React.ReactNode {
        const {
          destext,
          max,
          min,
          value,
          id,
          unitType,
          className,
          checkMax
        } = this.props;

        let containerClassName = 'slider-item ';
        if (className) {
          containerClassName += className;
        }

        const sliderData: SliderData = {
          className: 'slider-container',
          controller: {
            onValueChangeStart: this.onChangeStart.bind(this),
            onValueChanged: this.onChange.bind(this),
            onValueChangeEnd: this.onChangeEnd.bind(this)
          },
          value,
          label: destext,
          options: {
            unitType,
            rules: {
              positiveOnly,
              range: {
                checkMax: checkMax !== false,
                checkMin: true,
                max,
                min
              }
            }
          }
        };

        return (
          <div className={containerClassName} id={id}>
            <SliderComponent data={sliderData} />
          </div>
        );
      }
    }

    return SliderItem;
  };
}