import React from 'react';
import { ColorWrap, Saturation, Hue } from './common';
import PhotoshopPointerCircle from './PhotoshopPointerCircle';
import PhotoshopPointerHue from './PhotoshopPointerHue';
import PhotoshopFields from './PhotoshopFields';
import PhotoshopButton from './PhotoshopButton';
import PhotoshopPreviews from './PhotoshopPreviews';

interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
  a?: number;
}

interface PhotoshopStyles {
  picker?: React.CSSProperties;
  head?: React.CSSProperties;
  body?: React.CSSProperties;
  saturation?: React.CSSProperties;
  hue?: React.CSSProperties;
  controls?: React.CSSProperties;
  top?: React.CSSProperties;
  previews?: React.CSSProperties;
  actions?: React.CSSProperties;
}

interface PhotoshopProps {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  styles?: PhotoshopStyles;
  className?: string;
  header?: string;
  onChange: (color: any) => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

interface PhotoshopState {
  currentColor: string;
}

class Photoshop extends React.Component<PhotoshopProps, PhotoshopState> {
  static defaultProps = {
    header: 'Color Picker',
    styles: {}
  };

  constructor(props: PhotoshopProps) {
    super(props);
    this.state = {
      currentColor: props.hex
    };
  }

  render(): React.ReactElement {
    const { styles = {}, className = '', header, rgb, hsl, hsv, onChange, onAccept, onCancel } = this.props;

    const defaultStyles: PhotoshopStyles = {
      picker: {
        background: '#DCDCDC',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0, 0, 0, .25), 0 8px 16px rgba(0, 0, 0, .15)',
        boxSizing: 'initial',
        width: '513px'
      },
      head: {
        backgroundImage: 'linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)',
        borderBottom: '1px solid #B1B1B1',
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, .2), inset 0 -1px 0 0 rgba(0, 0, 0, .02)',
        height: '23px',
        lineHeight: '24px',
        borderRadius: '4px 4px 0 0',
        fontSize: '13px',
        color: '#4D4D4D',
        textAlign: 'center'
      },
      body: {
        padding: '15px 15px 0',
        display: 'flex'
      },
      saturation: {
        width: '256px',
        height: '256px',
        position: 'relative',
        border: '2px solid #B3B3B3',
        borderBottom: '2px solid #F0F0F0',
        overflow: 'hidden'
      },
      hue: {
        position: 'relative',
        height: '256px',
        width: '19px',
        marginLeft: '10px',
        border: '2px solid #B3B3B3',
        borderBottom: '2px solid #F0F0F0'
      },
      controls: {
        width: '180px',
        marginLeft: '10px'
      },
      top: {
        display: 'flex'
      },
      previews: {
        width: '60px'
      },
      actions: {
        flex: '1',
        marginLeft: '20px'
      }
    };

    const mergedStyles: PhotoshopStyles = {
      ...defaultStyles,
      ...styles
    };

    return (
      <div style={mergedStyles.picker} className={`photoshop-picker ${className}`}>
        <div style={mergedStyles.head}>{header}</div>
        <div style={mergedStyles.body} className="flexbox-fix">
          <div style={mergedStyles.saturation}>
            <Saturation
              hsl={hsl}
              hsv={hsv}
              pointer={PhotoshopPointerCircle}
              onChange={onChange}
            />
          </div>
          <div style={mergedStyles.hue}>
            <Hue
              direction="vertical"
              hsl={hsl}
              pointer={PhotoshopPointerHue}
              onChange={onChange}
            />
          </div>
          <div style={mergedStyles.controls}>
            <div style={mergedStyles.top} className="flexbox-fix">
              <div style={mergedStyles.previews}>
                <PhotoshopPreviews
                  rgb={rgb}
                  currentColor={this.state.currentColor}
                />
              </div>
              <div style={mergedStyles.actions}>
                <PhotoshopButton
                  label="OK"
                  onClick={onAccept}
                  active={true}
                />
                <PhotoshopButton
                  label="Cancel"
                  onClick={onCancel}
                />
                <PhotoshopFields
                  onChange={onChange}
                  rgb={rgb}
                  hsv={hsv}
                  hex={this.props.hex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Photoshop };
export default ColorWrap(Photoshop);