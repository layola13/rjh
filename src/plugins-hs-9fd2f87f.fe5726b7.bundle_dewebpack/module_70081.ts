import React, { Component } from 'react';
import imageFurnitureIncluded from './462534';
import imageNoFurniture from './537889';

interface ExportSvgDialogProps {
  onSelected: (includeFurniture: boolean) => void;
  close: () => void;
}

interface ExportSvgDialogState {
  index: number;
  hide: boolean;
}

const EXPORT_OPTION_WITH_FURNITURE = 0;
const EXPORT_OPTION_WITHOUT_FURNITURE = 1;

/**
 * Dialog component for exporting SVG with or without furniture
 */
export default class ExportSvgDialog extends Component<ExportSvgDialogProps, ExportSvgDialogState> {
  constructor(props: ExportSvgDialogProps) {
    super(props);
    this.onSelected = this.onSelected.bind(this);
    this.onCanceled = this.onCanceled.bind(this);
    this.state = {
      index: EXPORT_OPTION_WITH_FURNITURE,
      hide: false
    };
  }

  onSelected(): void {
    const includeFurniture = this.state.index === EXPORT_OPTION_WITHOUT_FURNITURE;
    this.props.onSelected(includeFurniture);
    this.props.close();
  }

  onCanceled(): void {
    this.props.close();
  }

  onItemSelect(selectedIndex: number): void {
    this.setState({
      index: selectedIndex
    });
  }

  render(): JSX.Element {
    const isWithFurnitureSelected = this.state.index === EXPORT_OPTION_WITH_FURNITURE;

    return (
      <div className="container">
        <div className="export-svg-dialog-wrapper">
          <div className="export-svg-dialog">
            <div className="export-svg-dialog-con clearfix">
              <div
                className="export-svg-con-left"
                onClick={() => this.onItemSelect(EXPORT_OPTION_WITH_FURNITURE)}
              >
                <div className="svg-img">
                  <img src={imageFurnitureIncluded} />
                </div>
                <div className="svg-txt">
                  <input
                    type="radio"
                    name="export1"
                    checked={isWithFurnitureSelected}
                    readOnly
                  />
                  <span>图纸带家具</span>
                </div>
              </div>
              <div
                className="export-svg-con-right"
                onClick={() => this.onItemSelect(EXPORT_OPTION_WITHOUT_FURNITURE)}
              >
                <div className="svg-img">
                  <img src={imageNoFurniture} />
                </div>
                <div className="svg-txt">
                  <input
                    type="radio"
                    name="export2"
                    checked={!isWithFurnitureSelected}
                    readOnly
                  />
                  <span>图纸不带家具</span>
                </div>
              </div>
            </div>
            <div className="export-svg-dialog-bottom">
              <div className="export-svg-bot-left">
                <span className="export-btn" onClick={this.onCanceled}>
                  取消
                </span>
              </div>
              <div className="export-svg-bot-right">
                <span className="export-btn" onClick={this.onSelected}>
                  导出
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}