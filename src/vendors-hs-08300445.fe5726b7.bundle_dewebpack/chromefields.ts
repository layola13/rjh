import React, { Component, CSSProperties, MouseEvent } from 'react';
import reactCSS from 'reactcss';
import color from './color';
import { EditableInput } from './EditableInput';
import UnfoldMoreHorizontalIcon from './UnfoldMoreHorizontalIcon';

interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface ColorChangeData {
  hex?: string;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  h?: number;
  s?: number | string;
  l?: number | string;
  source?: string;
}

interface ChromeFieldsProps {
  rgb: RGB;
  hsl: HSL;
  hex: string;
  onChange: (data: ColorChangeData, event?: Event) => void;
  disableAlpha?: boolean;
}

interface ChromeFieldsState {
  view: 'hex' | 'rgb' | 'hsl' | '';
}

interface Styles {
  wrap: CSSProperties;
  fields: CSSProperties;
  field: CSSProperties;
  alpha: CSSProperties;
  toggle: CSSProperties;
  icon: CSSProperties;
  iconHighlight: CSSProperties;
  input: CSSProperties;
  label: CSSProperties;
  svg: CSSProperties;
}

export class ChromeFields extends Component<ChromeFieldsProps, ChromeFieldsState> {
  private icon: HTMLDivElement | null = null;

  constructor(props: ChromeFieldsProps) {
    super(props);
    
    this.state = {
      view: ''
    };
  }

  componentDidMount(): void {
    if (this.props.hsl.a === 1 && this.state.view !== 'hex') {
      this.setState({ view: 'hex' });
    } else if (this.state.view !== 'rgb' && this.state.view !== 'hsl') {
      this.setState({ view: 'rgb' });
    }
  }

  componentWillReceiveProps(nextProps: ChromeFieldsProps): void {
    if (nextProps.hsl.a !== 1 && this.state.view === 'hex') {
      this.setState({ view: 'rgb' });
    }
  }

  toggleViews = (): void => {
    if (this.state.view === 'hex') {
      this.setState({ view: 'rgb' });
    } else if (this.state.view === 'rgb') {
      this.setState({ view: 'hsl' });
    } else if (this.state.view === 'hsl') {
      if (this.props.hsl.a === 1) {
        this.setState({ view: 'hex' });
      } else {
        this.setState({ view: 'rgb' });
      }
    }
  };

  handleChange = (data: ColorChangeData, event?: Event): void => {
    if (data.hex) {
      if (color.isValidHex(data.hex)) {
        this.props.onChange({
          hex: data.hex,
          source: 'hex'
        }, event);
      }
    } else if (data.r !== undefined || data.g !== undefined || data.b !== undefined) {
      this.props.onChange({
        r: data.r ?? this.props.rgb.r,
        g: data.g ?? this.props.rgb.g,
        b: data.b ?? this.props.rgb.b,
        source: 'rgb'
      }, event);
    } else if (data.a !== undefined) {
      let alpha = data.a;
      if (alpha < 0) {
        alpha = 0;
      } else if (alpha > 1) {
        alpha = 1;
      }
      
      this.props.onChange({
        h: this.props.hsl.h,
        s: this.props.hsl.s,
        l: this.props.hsl.l,
        a: Math.round(alpha * 100) / 100,
        source: 'rgb'
      }, event);
    } else if (data.h !== undefined || data.s !== undefined || data.l !== undefined) {
      let saturation = data.s;
      let lightness = data.l;
      
      if (typeof saturation === 'string' && saturation.includes('%')) {
        saturation = saturation.replace('%', '');
      }
      if (typeof lightness === 'string' && lightness.includes('%')) {
        lightness = lightness.replace('%', '');
      }
      
      this.props.onChange({
        h: data.h ?? this.props.hsl.h,
        s: Number(saturation ?? this.props.hsl.s),
        l: Number(lightness ?? this.props.hsl.l),
        source: 'hsl'
      }, event);
    }
  };

  showHighlight = (event: MouseEvent<HTMLDivElement>): void => {
    event.currentTarget.style.background = '#eee';
  };

  hideHighlight = (event: MouseEvent<HTMLDivElement>): void => {
    event.currentTarget.style.background = 'transparent';
  };

  render(): JSX.Element {
    const styles = reactCSS<Styles>({
      default: {
        wrap: {
          paddingTop: '16px',
          display: 'flex'
        },
        fields: {
          flex: '1',
          display: 'flex',
          marginLeft: '-6px'
        },
        field: {
          paddingLeft: '6px',
          width: '100%'
        },
        alpha: {
          paddingLeft: '6px',
          width: '100%'
        },
        toggle: {
          width: '32px',
          textAlign: 'right',
          position: 'relative'
        },
        icon: {
          marginRight: '-4px',
          marginTop: '12px',
          cursor: 'pointer',
          position: 'relative'
        },
        iconHighlight: {
          position: 'absolute',
          width: '24px',
          height: '28px',
          background: '#eee',
          borderRadius: '4px',
          top: '10px',
          left: '12px',
          display: 'none'
        },
        input: {
          fontSize: '11px',
          color: '#333',
          width: '100%',
          borderRadius: '2px',
          border: 'none',
          boxShadow: 'inset 0 0 0 1px #dadada',
          height: '21px',
          textAlign: 'center'
        },
        label: {
          textTransform: 'uppercase',
          fontSize: '11px',
          lineHeight: '11px',
          color: '#969696',
          textAlign: 'center',
          display: 'block',
          marginTop: '12px'
        },
        svg: {
          fill: '#333',
          width: '24px',
          height: '24px',
          border: '1px transparent solid',
          borderRadius: '5px'
        }
      },
      disableAlpha: {
        alpha: {
          display: 'none'
        }
      }
    }, this.props, this.state);

    let fieldsContent: JSX.Element;

    if (this.state.view === 'hex') {
      fieldsContent = (
        <div style={styles.fields} className="flexbox-fix">
          <div style={styles.field}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="hex"
              value={this.props.hex}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    } else if (this.state.view === 'rgb') {
      fieldsContent = (
        <div style={styles.fields} className="flexbox-fix">
          <div style={styles.field}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="r"
              value={this.props.rgb.r}
              onChange={this.handleChange}
            />
          </div>
          <div style={styles.field}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="g"
              value={this.props.rgb.g}
              onChange={this.handleChange}
            />
          </div>
          <div style={styles.field}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="b"
              value={this.props.rgb.b}
              onChange={this.handleChange}
            />
          </div>
          <div style={styles.alpha}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="a"
              value={this.props.rgb.a}
              arrowOffset={0.01}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    } else {
      fieldsContent = (
        <div style={styles.fields} className="flexbox-fix">
          <div style={styles.field}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="h"
              value={Math.round(this.props.hsl.h)}
              onChange={this.handleChange}
            />
          </div>
          <div style={styles.field}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="s"
              value={`${Math.round(this.props.hsl.s * 100)}%`}
              onChange={this.handleChange}
            />
          </div>
          <div style={styles.field}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="l"
              value={`${Math.round(this.props.hsl.l * 100)}%`}
              onChange={this.handleChange}
            />
          </div>
          <div style={styles.alpha}>
            <EditableInput
              style={{ input: styles.input, label: styles.label }}
              label="a"
              value={this.props.hsl.a}
              arrowOffset={0.01}
              onChange={this.handleChange}
            />
          </div>
        </div>
      );
    }

    return (
      <div style={styles.wrap} className="flexbox-fix">
        {fieldsContent}
        <div style={styles.toggle}>
          <div
            style={styles.icon}
            onClick={this.toggleViews}
            ref={(element) => this.icon = element}
          >
            <UnfoldMoreHorizontalIcon
              style={styles.svg}
              onMouseOver={this.showHighlight}
              onMouseEnter={this.showHighlight}
              onMouseOut={this.hideHighlight}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChromeFields;