import CryptoJS from 'crypto-js';
import React from 'react';

interface FloatToggleButtonItem {
  icon: string;
  hoverIcon: string;
  text: string;
  onClick: () => void;
}

interface FloatToggleButtonData {
  icon: string;
  groupData: FloatToggleButtonItem[];
}

interface CatalogFloatToggleButtonProps {
  showApplyEntry?: boolean;
  surveyType?: string;
}

interface FloatToggleButtonComponent extends React.ComponentClass<{ data: FloatToggleButtonData }> {}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const HSApp: {
  App: {
    getApp(): {
      pluginManager: {
        getPlugin(pluginName: string): {
          showModelApplyPanel(): void;
        };
      };
    };
  };
  Util: {
    EventTrack: {
      instance(): {
        track(group: unknown, event: string): void;
      };
    };
    EventGroupEnum: {
      Catalog: unknown;
    };
  };
  Config: {
    TENANT: string;
  };
};

declare const adskUser: {
  uid: string;
  hideFeedback: boolean;
};

const FloatToggleButton: FloatToggleButtonComponent = require('./FloatToggleButton').default;

class CatalogFloatToggleButton extends React.Component<CatalogFloatToggleButtonProps> {
  private readonly _floatToggleButtonData: FloatToggleButtonData;

  constructor(props: CatalogFloatToggleButtonProps) {
    super(props);

    const { showApplyEntry = true, surveyType } = props;
    const groupData: FloatToggleButtonItem[] = [];

    if (showApplyEntry) {
      groupData.push({
        icon: 'hs_mian_moxingshenqing',
        hoverIcon: 'hs_mian_moxingshenqing',
        text: ResourceManager.getString('model_apply_entry'),
        onClick: () => {
          HSApp.App.getApp()
            .pluginManager.getPlugin('hsw.plugin.catalogpopup.Plugin')
            .showModelApplyPanel();
          HSApp.Util.EventTrack.instance().track(
            HSApp.Util.EventGroupEnum.Catalog,
            'model_apply_entry'
          );
        }
      });
    }

    groupData.push({
      icon: 'hs_mian_moxingmanyidu',
      hoverIcon: 'hs_mian_moxingmanyidu',
      text: ResourceManager.getString('model_satisfaction_survey'),
      onClick: () => {
        const aesKey = CryptoJS.enc.Utf8.parse('1593655822673853');
        const encryptedUid = CryptoJS.AES.encrypt(adskUser.uid, aesKey, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }).toString();

        let surveyUrl = '';
        if (HSApp.Config.TENANT !== 'fp') {
          surveyUrl = 'https://survey.taobao.com/apps/zhiliao/qBSdrN2uI';
        } else if (surveyType === 'autoStyler') {
          surveyUrl = 'https://survey.alibaba.com/apps/zhiliao/Wno_muYgP';
        } else {
          surveyUrl = 'https://survey.alibaba.com/apps/zhiliao/g5cEjqAhu';
        }

        window.open(
          `${surveyUrl}?uid=${encodeURIComponent(encryptedUid)}`,
          '_blank',
          'noopener=yes, noreferrer=yes'
        );
        HSApp.Util.EventTrack.instance().track(
          HSApp.Util.EventGroupEnum.Catalog,
          'model_satisfaction_survey'
        );
      }
    });

    this._floatToggleButtonData = {
      icon: 'hs_mian_moxingmanyidu',
      groupData
    };
  }

  render(): React.ReactNode {
    if (adskUser.hideFeedback) {
      return null;
    }

    return React.createElement(FloatToggleButton, {
      data: this._floatToggleButtonData
    });
  }
}

export default CatalogFloatToggleButton;