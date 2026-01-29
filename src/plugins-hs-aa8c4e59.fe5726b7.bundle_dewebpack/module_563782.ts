import React from 'react';
import PropTypes from 'prop-types';

type DesignStyle = 'ASAN' | 'Nordic' | 'Japan' | 'european' | 'mediterranean' | 'chinese' | 'modern' | 'neoclassical' | 'US' | 'Korea';

interface DesignStyleDialogData {
  cancelClick: () => void;
  confirmClick: (style: DesignStyle) => void;
}

interface DesignStyleDialogProps {
  data: DesignStyleDialogData;
}

interface DesignStyleDialogState {
  close: boolean;
  activeStyle: DesignStyle | undefined;
}

const DESIGN_STYLES: Array<[DesignStyle, string]> = [
  ['ASAN', '东南亚'],
  ['Nordic', '北欧'],
  ['Japan', '日式'],
  ['european', '欧式'],
  ['mediterranean', '地中海'],
  ['chinese', '新中式'],
  ['modern', '现代'],
  ['neoclassical', '新古典'],
  ['US', '美式'],
  ['Korea', '韩式']
];

export default class DesignStyleDialog extends React.Component<DesignStyleDialogProps, DesignStyleDialogState> {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  private cancelClickCallback: () => void;
  private confirmClickCallback: (style: DesignStyle) => void;

  constructor(props: DesignStyleDialogProps) {
    super(props);
    
    const { cancelClick, confirmClick } = props.data;
    
    this.state = {
      close: false,
      activeStyle: undefined
    };
    
    this.cancelClickCallback = cancelClick;
    this.confirmClickCallback = confirmClick;
  }

  UNSAFE_componentWillReceiveProps(nextProps: DesignStyleDialogProps): void {
    const { cancelClick, confirmClick } = nextProps.data;
    
    this.cancelClickCallback = cancelClick;
    this.confirmClickCallback = confirmClick;
    
    this.setState({
      close: false,
      activeStyle: undefined
    });
  }

  onItemClick(style: DesignStyle): void {
    this.setState({
      activeStyle: style
    });
  }

  onHide(): void {
    this.setState({
      close: true
    });
  }

  cancelClick(): void {
    this.onHide();
    this.cancelClickCallback();
  }

  confirmClick(): void {
    const { activeStyle } = this.state;
    
    if (activeStyle !== undefined) {
      this.onHide();
      this.confirmClickCallback(activeStyle);
    }
  }

  render(): JSX.Element {
    const { close, activeStyle } = this.state;
    
    let wrapperClassName = 'design-style-dialog-wrapper ';
    if (close) {
      wrapperClassName += 'hidden ';
    }

    return (
      <div className={wrapperClassName}>
        <div className="design-style-dialog-main">
          <header className="design-style-header">
            <div className="design-style-title">
              {ResourceManager.getString('autoRecommend_select_style')}
            </div>
            <div 
              className="design-style-close"
              onClick={() => this.cancelClick()}
            />
          </header>
          
          <main className="design-style-body">
            <section className="design-style-items">
              {DESIGN_STYLES.map((styleItem, index) => {
                const [styleKey, styleLabel] = styleItem;
                const isSelected = styleKey === activeStyle;
                const itemClassName = `design-style-item ${isSelected ? 'design-style-item-selected' : ''}`;
                
                return (
                  <div
                    key={index}
                    className={itemClassName}
                    onClick={() => this.onItemClick(styleKey)}
                  >
                    {styleLabel}
                  </div>
                );
              })}
            </section>
          </main>
          
          <footer className="design-style-foot">
            <button
              type="button"
              onClick={() => this.cancelClick()}
              className="design-style-button design-style-cancel-button"
            >
              {ResourceManager.getString('cancel')}
            </button>
            <button
              type="button"
              onClick={() => this.confirmClick()}
              className={`design-style-button design-style-confirm-button ${activeStyle === undefined ? 'design-style-disabled-button' : ''}`}
            >
              {ResourceManager.getString('confirm')}
            </button>
          </footer>
        </div>
      </div>
    );
  }
}