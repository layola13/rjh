import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Modal, Select, Option } from './modal-components';

interface InspirationAction {
  createAux2DView(container: HTMLDivElement | null): void;
  destroyAux2DView(): void;
  resizeAux2DView(): void;
}

interface LayerData {
  layer: {
    id: string;
  };
  text: string;
}

interface LayersEditData {
  activeLayerData: LayerData;
  allLayersData: LayerData[];
}

interface PluginManager {
  getPlugin(pluginType: string): any;
}

interface SelectionManager {
  unselectAll(): void;
}

interface App {
  pluginManager: PluginManager;
  selectionManager: SelectionManager;
}

interface HSApp {
  App: {
    getApp(): App;
  };
  Util: {
    Url: {
      getQueryStrings(): { templateId?: string };
    };
  };
}

interface ResourceManager {
  getString(key: string): string;
}

interface HSFPConstants {
  PluginType: {
    StartUpAction: string;
    LayerEdit: string;
  };
}

declare const HSApp: HSApp;
declare const ResourceManager: ResourceManager;
declare const HSFPConstants: HSFPConstants;

interface ShowSelectRoomDialogOptions {
  disableOkButton?: boolean;
  executeCmd(templateId?: string): void;
}

interface SelectRoomComponentProps {
  inspirationAction: InspirationAction;
}

/**
 * Displays a modal dialog for selecting a room from available layers
 */
export function showSelectRoomDialog(
  inspirationAction: InspirationAction,
  options: ShowSelectRoomDialogOptions
): void {
  const app = HSApp.App.getApp();
  const startUpActionPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.StartUpAction);
  const templateId = HSApp.Util.Url.getQueryStrings().templateId;

  Modal.basic({
    key: 'community-inspiration-selectRoom',
    title: ResourceManager.getString('please_select_a_room'),
    className: 'inspiration-selectRoom2d-dialog',
    content: React.createElement(SelectRoomComponent, {
      inspirationAction
    }),
    enableCheckbox: false,
    disableOkButton: options.disableOkButton,
    okButtonContent: ResourceManager.getString('messageDialog_OK'),
    cancelButtonContent: ResourceManager.getString('messageDialog_CANCEL'),
    onOk: () => {
      startUpActionPlugin?.completeAction();
      options.executeCmd(templateId);
    },
    onClose: () => {
      startUpActionPlugin?.cancelAction();
      app.selectionManager.unselectAll();
    },
    onCancel: () => {
      startUpActionPlugin?.cancelAction();
      app.selectionManager.unselectAll();
    }
  });
}

const SelectRoomComponent: React.FC<SelectRoomComponentProps> = ({ inspirationAction }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersEditDataRef = useRef<LayersEditData>(
    HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit)
      .getLayersEditData()
  );
  
  const [activeLayerId, setActiveLayerId] = useState<string>(
    layersEditDataRef.current.activeLayerData.layer.id
  );

  useEffect(() => {
    inspirationAction.createAux2DView(containerRef.current);
    
    setTimeout(() => {
      resizeView();
    }, 350);

    return () => {
      inspirationAction.destroyAux2DView();
    };
  }, []);

  const resizeView = (): void => {
    if (containerRef.current) {
      inspirationAction.resizeAux2DView();
    }
  };

  const handleLayerChange = (layerId: string): void => {
    const layerData = layersEditDataRef.current.allLayersData.find(
      (data) => data.layer.id === layerId
    );
    
    if (layerData) {
      HSApp.App.getApp()
        .pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit)
        .activateLayer(layerData.layer);
      setActiveLayerId(layerId);
    }
  };

  return (
    <Fragment>
      <div className="inspiration-selectRoom-layers">
        <Select
          size="middle"
          bindSelf={true}
          key="inspiration-selectRoom-layer-select"
          defaultValue={activeLayerId}
          validOptions={{ valid: true }}
          onChange={handleLayerChange}
          onClose={() => {}}
        >
          {layersEditDataRef.current.allLayersData.map((layerData, index) => (
            <Option
              key={index}
              value={layerData.layer.id}
              title={layerData.text}
            >
              {layerData.text}
            </Option>
          ))}
        </Select>
      </div>
      <div ref={containerRef} className="inspiration-selectRoom2d-div" />
    </Fragment>
  );
};