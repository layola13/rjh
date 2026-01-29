import { useState, useEffect, useMemo } from 'react';

interface FileInfo {
  id: string;
  selected: boolean;
  floorLayer: number;
  [key: string]: unknown;
}

interface MatchLayerDialogProps {
  highestFloor?: number;
  lowestFloor?: number;
  fileList?: FileInfo[];
  onCancel?: () => void;
  onCommit?: (data: {
    result: FileInfo[];
    lowestFloor: number;
    highestFloor: number;
  }) => void;
}

interface FloorOption {
  code: number;
  name: string;
  [key: string]: unknown;
}

const HIGHER_FLOOR_OPTIONS: FloorOption[] = [];
const LOWER_FLOOR_OPTIONS: FloorOption[] = [];

function floorNumberToName(code: number): string {
  return `Floor ${code}`;
}

export default function MatchLayerDialog(props: MatchLayerDialogProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [highestFloor, setHighestFloor] = useState<number>(props.highestFloor || 1);
  const [lowestFloor, setLowestFloor] = useState<number>(props.lowestFloor || 1);
  const [fileList, setFileList] = useState<FileInfo[]>(props.fileList || []);
  const [isHintEnabled, setIsHintEnabled] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [hasNoMembership, setHasNoMembership] = useState<boolean>(false);

  const selectableFloors = useMemo<FloorOption[]>(() => {
    const higherFloors = HIGHER_FLOOR_OPTIONS.slice(
      HIGHER_FLOOR_OPTIONS.length - highestFloor
    );
    const lowerFloors = lowestFloor < 0
      ? LOWER_FLOOR_OPTIONS.slice(1, Math.abs(lowestFloor) + 1)
      : [];

    return higherFloors.concat(lowerFloors).map((floor) => {
      const name = floorNumberToName(floor.code);
      return {
        ...floor,
        name,
      };
    });
  }, [lowestFloor, highestFloor]);

  const updateFileInfo = (updatedFile: FileInfo): void => {
    setFileList(
      fileList.map((file) =>
        updatedFile.id === file.id ? { ...file, ...updatedFile } : file
      )
    );
  };

  const isSelectValidList = useMemo<boolean[]>(() => {
    return fileList.map((file, index, list) => {
      return !list.some(
        (otherFile) =>
          (otherFile.id !== file.id &&
            otherFile.selected &&
            file.selected &&
            otherFile.floorLayer === file.floorLayer) ||
          (file.selected &&
            (file.floorLayer > highestFloor || file.floorLayer < lowestFloor))
      );
    });
  }, [fileList, lowestFloor, highestFloor]);

  const selectedFiles = useMemo<FileInfo[]>(() => {
    return fileList.filter((file) => file.selected);
  }, [fileList]);

  useEffect(() => {
    if (!isHintEnabled && selectedFiles.length > 0) {
      setIsHintEnabled(true);
    }
  }, [selectedFiles, isHintEnabled]);

  useEffect(() => {
    const shouldDisable = !hasNoMembership && fileList.length > 1;
    setIsDisabled(shouldDisable);
  }, [hasNoMembership, fileList]);

  const isFirstFloorSelected = selectedFiles.some((file) => file.floorLayer === 1);

  const isOneFileForOneLayer = useMemo<boolean>(() => {
    return !selectedFiles.some((file) =>
      selectedFiles.some(
        (otherFile) =>
          otherFile.id !== file.id && otherFile.floorLayer === file.floorLayer
      )
    );
  }, [selectedFiles, lowestFloor, highestFloor]);

  const isFloorsContinuous = selectedFiles
    .map((file) => file.floorLayer)
    .sort((a, b) => a - b)
    .every((layer, index, layers) => {
      if (!layers[index + 1]) return true;
      if (layer === layers[index + 1]) return true;
      if (layer === -1) return layers[index + 1] === 1;
      return layers[index + 1] === layer + 1;
    });

  const isInSelectRange = selectedFiles.every(
    (file) => file.floorLayer >= lowestFloor && file.floorLayer <= highestFloor
  );

  const handleCancel = (): void => {
    setIsVisible(false);
    props.onCancel?.();
  };

  const checkMembershipRights = async (): Promise<void> => {
    const plugin = HSApp.App.getApp()
      .pluginManager.getPlugin('hsw.brand.ezhome.firstlogin.Plugin');
    
    const result = await plugin.checkEnterRights('multistory');
    const amount = result?.amount;
    setHasNoMembership(amount === -1);
  };

  useEffect(() => {
    void checkMembershipRights();
  }, []);

  if (!isVisible) return null;

  const totalFloors = highestFloor - lowestFloor + (lowestFloor < 0 ? 0 : 1);

  const handleComplete = (): void => {
    setIsVisible(false);
    props.onCommit?.({
      result: fileList,
      lowestFloor,
      highestFloor,
    });
  };

  const handleUpgradeClick = (): void => {
    handleCancel();
    const marketingPlugin = HSApp.App.getApp()
      .pluginManager.getPlugin(HSFPConstants.PluginType.MarketingBadge);
    
    marketingPlugin?.showMarketModal('render', 'multilayer_import_multilayer_upgrade');
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.MultiLayer,
      '3d_multilayer_import_multilayer_upgrade_click'
    );
  };

  const isCommitEnabled = isInSelectRange && isOneFileForOneLayer && isFirstFloorSelected && isFloorsContinuous && isHintEnabled;

  return (
    <div className="match-layer-dialog-wrapper">
      <div className="match-layer-dialog-overLay" />
      <div className="match-layer-dialog-main">
        <div className="match-layer-dialog-head">
          <span className="match-layer-dialog-title">
            {ResourceManager.getString('plugin_cadunderlay_matchlayrdialog_title')}
          </span>
          <span onClick={handleCancel}>
            <IconfontView
              customClass="match-layer-dialog-close-btn"
              showType="hs_xian_guanbi"
              clickColor="#396EFE"
              hoverBgColor="#f5f5f5"
              bgExtendSize={10}
            />
          </span>
        </div>

        <div className={`match-layer-dialog-content ${isDisabled ? 'disabled' : ''}`}>
          <div className="match-layer-content-header">
            <FloorSelector
              highestFloor={highestFloor}
              lowestFloor={lowestFloor}
              setHighestFloor={setHighestFloor}
              setLowestFloor={setLowestFloor}
              selectedCardsNum={selectedFiles.length}
              isDisabled={isDisabled}
            />
            <ValidationHints
              enabled={isHintEnabled}
              isFloorsContinuous={isFloorsContinuous}
              isFirstFloorSelected={isFirstFloorSelected}
              isOneFileForOneLayer={isOneFileForOneLayer}
              isInSelectRange={isInSelectRange}
            />
          </div>

          <div className="hint">
            {ResourceManager.getString('plugin_cadunderlay_mld_hint').replace(
              '{floors}',
              totalFloors.toString()
            )}
          </div>

          <Scroll
            options={{ suppressScrollX: true }}
            className="match-layer-scrollbar"
          >
            {fileList.map((file, index) => (
              <FileCard
                key={index}
                {...file}
                selectableFloors={selectableFloors}
                updateFileInfo={updateFileInfo}
                isSelectValid={isSelectValidList[index]}
                isDisabled={isDisabled}
              />
            ))}
          </Scroll>
        </div>

        <div className="match-layer-dialog-bottom">
          {!isDisabled && (
            <>
              <Button
                className="match-layer-dialog-button match-layer-dialog-button-save"
                type="primary"
                onClick={handleComplete}
                disabled={!isCommitEnabled}
              >
                {ResourceManager.getString('plugin_cadunderlay_mld_complete')}
              </Button>
              <Button
                className="match-layer-dialog-button match-layer-dialog-button-cancel"
                type="text"
                onClick={handleCancel}
              >
                {ResourceManager.getString('plugin_cadunderlay_mld_cancel')}
              </Button>
            </>
          )}

          {isDisabled && (
            <div className="none-membership">
              <div className="left">
                {ResourceManager.getString('plugin_imageunderlay_upload_nonemember_tips')}
              </div>
              <div className="upgrade">
                <div className="crown-4-upgrade">
                  {HSApp.Config.TENANT === 'fp' ? (
                    <IconfontView
                      showType="hs_zhanshi_renderingmembership_black"
                      customStyle={{ color: '#1C1C1C', fontSize: '18px' }}
                    />
                  ) : (
                    <img src="https://img.alicdn.com/imgextra/i4/O1CN01v8rDI91u3oIt9IAor_!!6000000005982-55-tps-14-14.svg" />
                  )}
                </div>
                <span className="desc">
                  {ResourceManager.getString('plugin_render_exclusive_tip')}
                </span>
                <span className="upgrade-btn" onClick={handleUpgradeClick}>
                  {ResourceManager.getString('plugin_render_attend_activity')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div id="match-layer-image-preview-container" />
    </div>
  );
}