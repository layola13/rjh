import React, { useState, useEffect } from 'react';
import { IconfontView, Tooltip } from './components';
import classNames from 'classnames';
import loadingGif from './assets/loading.gif';
import './styles.css';

enum CalculationState {
  Disable = 0,
  UnCalculate = 1,
  Calculating = 2,
  CalculateSuccess = 3,
  ReTry = 4
}

interface PluginHandler {
  checkCondition(): boolean;
  checkSave(): Promise<boolean>;
  getValidArea(designId: string): Promise<number | undefined>;
  previewValidArea(): void;
}

interface Plugin {
  getHandler(): PluginHandler | null;
}

interface TransactionManager {
  signalUndone: unknown;
  signalRedone: unknown;
  signalCommitted: unknown;
}

interface AppInstance {
  pluginManager: {
    getPlugin(pluginType: string): Plugin | null;
  };
  designMetadata: Map<string, string>;
  transManager: TransactionManager;
  signalDocumentOpened: unknown;
}

declare const HSApp: {
  App: {
    getApp(): AppInstance;
  };
};

declare const HSFPConstants: {
  PluginType: {
    StoreSmartLayout: string;
  };
};

declare const HSCore: {
  Util: {
    SignalHook: new () => SignalHook;
  };
};

interface SignalHook {
  listen(signal: unknown, callback: () => void): this;
  unlistenAll(): void;
  dispose(): void;
}

declare const ResourceManager: {
  getString(key: string): string;
};

const ValidAreaBarComponent: React.FC = () => {
  const [calculationState, setCalculationState] = useState<CalculationState>(CalculationState.Disable);
  const [validArea, setValidArea] = useState<number>(0);

  const getPluginHandler = (): PluginHandler | null => {
    const plugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.StoreSmartLayout);
    return plugin?.getHandler() ?? null;
  };

  const handleCalculate = async (event: React.MouseEvent): Promise<void> => {
    if (isDisabled) {
      return;
    }

    event.stopPropagation();

    const handler = getPluginHandler();
    const canSave = await handler?.checkSave();
    
    if (!canSave) {
      return;
    }

    const app = HSApp.App.getApp();
    const designId = app.designMetadata.get('designId');
    
    setCalculationState(CalculationState.Calculating);

    handler?.getValidArea(designId!)
      .then(
        (area) => {
          if (area !== undefined) {
            setValidArea(area);
            setCalculationState((prevState) => 
              prevState === CalculationState.Calculating 
                ? CalculationState.CalculateSuccess 
                : prevState
            );
          } else {
            setCalculationState(CalculationState.ReTry);
          }
        },
        () => {
          setCalculationState(CalculationState.ReTry);
        }
      );
  };

  const checkAndUpdateState = (): void => {
    const handler = getPluginHandler();
    if (handler?.checkCondition()) {
      setCalculationState(CalculationState.UnCalculate);
    } else {
      setCalculationState(CalculationState.Disable);
    }
  };

  const resetStateBasedOnCondition = (): void => {
    setCalculationState(() => {
      const handler = getPluginHandler();
      return handler?.checkCondition() 
        ? CalculationState.UnCalculate 
        : CalculationState.Disable;
    });
  };

  const setupSignalListeners = (signalHook: SignalHook): void => {
    const app = HSApp.App.getApp();
    signalHook
      .listen(app.transManager.signalUndone, checkAndUpdateState)
      .listen(app.transManager.signalRedone, checkAndUpdateState)
      .listen(app.transManager.signalCommitted, checkAndUpdateState)
      .listen(app.signalDocumentOpened, resetStateBasedOnCondition);
  };

  useEffect(() => {
    const signalHook = new HSCore.Util.SignalHook();
    setupSignalListeners(signalHook);
    checkAndUpdateState();

    return () => {
      signalHook.unlistenAll();
      signalHook.dispose();
    };
  }, []);

  const renderSuffix = (): React.ReactElement => {
    switch (calculationState) {
      case CalculationState.Disable:
        return (
          <div className="floorplan-disable">
            <IconfontView 
              showType="hs_shuxingmianban_xiangqing" 
              customStyle={{ fontSize: '14px' }} 
            />
            <div className="suffix-disable">
              {' '}
              {ResourceManager.getString('store_smart_layout_calculate')}
              {' '}
            </div>
          </div>
        );

      case CalculationState.UnCalculate:
        return (
          <div className="suffix-normal">
            {' '}
            {ResourceManager.getString('store_smart_layout_calculate')}
            {' '}
          </div>
        );

      case CalculationState.Calculating:
        return (
          <div className="loading-img">
            <img src={loadingGif} alt="loading" />
          </div>
        );

      case CalculationState.CalculateSuccess:
        return (
          <div className="calculate-success">
            <div className="calculate-area">{validArea}</div>
            <div className="calculate-unit">m²</div>
            <IconfontView 
              showType="hs_xiao_danjiantou_you" 
              customStyle={{ fontSize: '10px' }} 
            />
            <div className="calculate-retry" onClick={handleCalculate}>
              <IconfontView 
                showType="hs_line_gengxin" 
                customStyle={{ fontSize: '16px', color: '#396EFE' }} 
              />
            </div>
          </div>
        );

      case CalculationState.ReTry:
        return (
          <div className="suffix-retry">
            {' '}
            {ResourceManager.getString('store_smart_layout_retry')}
            {' '}
          </div>
        );
    }
  };

  const handlePreviewClick = (): void => {
    if (isDisabled) {
      return;
    }
    const handler = getPluginHandler();
    handler?.previewValidArea();
  };

  const isDisabled = 
    calculationState === CalculationState.Disable || 
    calculationState === CalculationState.Calculating;

  const bodyClassName = classNames(
    'valid-area-body',
    {
      'disabled-Arrow': isDisabled,
      'body-calculate-success': calculationState === CalculationState.CalculateSuccess
    }
  );

  const titleText = calculationState === CalculationState.ReTry
    ? ResourceManager.getString('store_smart_layout_calculate_failure')
    : ResourceManager.getString('store_smart_layout_Title');

  const handleBodyClick = 
    calculationState === CalculationState.CalculateSuccess 
      ? handlePreviewClick 
      : handleCalculate;

  return (
    <div className="valid-area-container">
      {calculationState === CalculationState.Disable ? (
        <Tooltip
          placement="bottom"
          title={ResourceManager.getString('store_smart_layout_floorplan_invalid_tips')}
          color="dark"
        >
          <div className="valid-area-body disabled-Arrow">
            <div className="valid-area-title">
              {ResourceManager.getString('store_smart_layout_Title')}
            </div>
            <div className="valid-area-suffix">{renderSuffix()}</div>
          </div>
        </Tooltip>
      ) : (
        <div className={bodyClassName} onClick={handleBodyClick}>
          <div className="valid-area-title">{titleText}</div>
          <div className="valid-area-suffix">{renderSuffix()}</div>
        </div>
      )}
    </div>
  );
};

export class ValidAreaBar {
  public order: number;

  constructor() {
    this.order = 0;
  }

  public getRenderItem(): React.ReactElement {
    return <ValidAreaBarComponent />;
  }
}