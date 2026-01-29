import React, { useState } from 'react';
import { IconfontView, CheckBox, Button } from './components';

interface RoofChooseLayerProps {
  onClose: () => void;
  onEnter: (layer: number) => void;
  blackTheme: boolean;
  layers: number[];
  selectedLayer: number;
}

export const RoofChooseLayer: React.FC<RoofChooseLayerProps> = ({
  onClose,
  onEnter,
  blackTheme,
  layers,
  selectedLayer
}) => {
  const [currentLayer, setCurrentLayer] = useState<number>(selectedLayer);

  const handleClose = (): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Roof,
      'dialog_layer_close_event'
    );
    onClose();
  };

  const handleLayerChange = (layer: number): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Roof,
      'dialog_layer_choose_event'
    );
    setCurrentLayer(layer);
  };

  const handleEnter = (): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Roof,
      'dialog_layer_enter_event'
    );
    onEnter(currentLayer);
  };

  return (
    <div className="roof-dialog-wrapper">
      <div className="roof-dialog-overLay" onClick={handleClose} />
      <div className="roof-dialog-main">
        <div className="roof-dialog-head">
          <span className="roof-dialog-title">
            {ResourceManager.getString('category_manually_draw_roof')}
          </span>
          <span onClick={handleClose}>
            <IconfontView
              customClass="roof-dialog-close-btn"
              showType="hs_xian_guanbi"
              clickColor="#396EFE"
              hoverBgColor={blackTheme ? '#f5f5f5' : 'transparent'}
              bgExtendSize={10}
            />
          </span>
        </div>
        <div className="roof-choose-container">
          <div className="roof-sub-title">
            <span className="roof-choose-name">
              {ResourceManager.getString('plugin_roof_subtitle')}
            </span>
          </div>
          <div className="roof-checkbox-container">
            {layers.map((layer, index) => (
              <div key={layer} className="checkbox-item">
                <CheckBox
                  className="roof-checkbox"
                  checked={currentLayer === layer}
                  onChange={() => handleLayerChange(layer)}
                >
                  {`${index + 1}F`}
                </CheckBox>
              </div>
            )).reverse()}
          </div>
        </div>
        <div className="roof-dialog-footer">
          <Button
            className="roof-dialog-save-button"
            type="primary"
            onClick={handleEnter}
          >
            {ResourceManager.getString('plugin_draw_roof')}
          </Button>
        </div>
      </div>
    </div>
  );
};