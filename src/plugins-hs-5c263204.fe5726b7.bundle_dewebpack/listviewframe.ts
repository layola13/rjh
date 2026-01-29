import React from 'react';
import { Scroll, RadioGroup, Radio, Popover } from './c-module';
import ImageComponent from './ImageComponent';
import defaultImage from './default-image';

interface HistoricalVersion {
  versionId: string;
  image?: string;
  modelTag?: boolean;
  magic?: string;
  createdAt: string;
  auditTag?: boolean;
  saveType: 1 | 2 | 3;
}

interface ListViewFrameProps {
  selectedVersionId: string;
  data: HistoricalVersion[];
  newestVersionId: string;
  isSevenDayDeadLine: boolean;
  setItem: (versionId: string) => void;
}

const SAVE_TYPE_I18N_MAP: Record<number, string> = {
  1: 'history_version_savetype_manual',
  2: 'history_version_savetype_auto',
  3: 'history_version_savetype_auto',
};

const FLOORPLAN_MAGIC = '61cd47b78148';
const SPECIAL_VERSION_MAGIC = 'u6tklt3u60yg';

export class ListViewFrame extends React.Component<ListViewFrameProps> {
  private _historicalVersionContainer: HTMLElement | null;

  constructor(props: ListViewFrameProps) {
    super(props);
    this._historicalVersionContainer = document.querySelector('.historical-version-container');
  }

  handleClick = (versionId: string): void => {
    this.props.setItem(versionId);
  };

  render(): React.ReactElement {
    const { selectedVersionId, data, newestVersionId, isSevenDayDeadLine } = this.props;

    return (
      <div className="historical-version-list">
        <div className="historical-version-scroll">
          <Scroll option={{ suppressScrollX: true }}>
            <RadioGroup value={selectedVersionId}>
              <ul>
                {data.map((version) => {
                  const isSelected = selectedVersionId === version.versionId;
                  const selectedClass = isSelected ? 'selected' : '';

                  const popoverContent = (
                    <Popover.Item overlayClassName="historical-version-popover">
                      <ImageComponent
                        src={version.image}
                        className="historical-version-picture"
                        fallbackSrc={() => HSApp.App.getApp().designMetadata.get('image3d')}
                      />
                    </Popover.Item>
                  );

                  const isNewFloorplanVersion =
                    FLOORPLAN_MAGIC === HSCore.Doc.FloorplanMeta.magic &&
                    SPECIAL_VERSION_MAGIC === version.magic;

                  return (
                    <li
                      onClick={() => this.handleClick(version.versionId)}
                      className={`historical-version-li ${selectedClass}`}
                      key={version.versionId}
                    >
                      <div className="historical-version-info">
                        <Radio value={version.versionId} />

                        {version.image && (
                          <Popover.Trigger
                            popover={popoverContent}
                            placement="left"
                            trigger="hover"
                            delayOpen={300}
                            animation={true}
                            arrow={false}
                            getPopupContainer={() => this._historicalVersionContainer}
                          >
                            <div className="history-img-cntr">
                              <ImageComponent
                                src={version.image}
                                className="historical-version-preview"
                                fallbackSrc={() => HSApp.App.getApp().designMetadata.get('image3d')}
                              />
                              {version.modelTag && (
                                <div className="updated">
                                  <span>系统更新</span>
                                </div>
                              )}
                            </div>
                          </Popover.Trigger>
                        )}

                        {!version.image && (
                          <img className="historical-version-preview" src={defaultImage} />
                        )}

                        <div>
                          {isNewFloorplanVersion && (
                            <div className="historical-version-tag">
                              {ResourceManager.getString('history_version_savetype_newfp')}
                            </div>
                          )}

                          <span className="historical-version-time">{version.createdAt}</span>

                          {version.auditTag && (
                            <span className="historical-version-audit-tag">审单</span>
                          )}

                          <span className="historical-version-divider">|</span>

                          <span className="historical-version-save-type">
                            {ResourceManager.getString(SAVE_TYPE_I18N_MAP[version.saveType])}
                          </span>
                        </div>
                      </div>

                      {version.versionId === newestVersionId && (
                        <span className="historical-version-newest">NEW</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </RadioGroup>
          </Scroll>

          {isSevenDayDeadLine && (
            <div className="historical-version-deadline">
              <div className="content">
                {ResourceManager.getString('user_vip_historical_version_limit_time')}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}