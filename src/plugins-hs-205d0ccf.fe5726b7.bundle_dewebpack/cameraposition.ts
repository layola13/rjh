import { PureComponent } from 'react';
import { Tabs, IconfontView } from './UI';
import { createSparkCamera, setSparkCamera } from './SparkCameraUtils';
import { getIntelligenceCameras } from './IntelligenceAPI';

interface CameraSnapshot {
  id: string;
  name: string;
  thumbnail: string;
  type: string;
  camera: any;
  renderType?: string;
  oriRenderUI?: any;
}

interface IntelligenceCamera {
  camera: any;
  roomTypeDisplayName: string;
  thumbnail: string;
}

interface IntelligenceCamerasResponse {
  imageCamera?: IntelligenceCamera[];
}

interface TabData {
  value: string;
  label: string;
}

interface CameraPositionProps {
  visible: boolean;
  frameBound: any;
}

interface CameraPositionState {
  tabValue: string;
  currentCameras: CameraSnapshot[];
  isIntelligenceLoading: boolean;
  autoCameras: IntelligenceCamera[];
}

export class CameraPosition extends PureComponent<CameraPositionProps, CameraPositionState> {
  private tabData: TabData[];
  private app: any;
  private showTabs: boolean;

  constructor(props: CameraPositionProps) {
    super(props);

    this.app = (window as any).HSApp.App.getApp();
    this.tabData = [
      {
        value: '1',
        label: (window as any).ResourceManager.getString('plugin_render_camera_view_manual')
      },
      {
        value: '2',
        label: (window as any).ResourceManager.getString('plugin_render_camera_view_intelligence')
      }
    ];

    this.state = {
      tabValue: '1',
      currentCameras: this.app.floorplan.snapshots.filter(
        (snapshot: CameraSnapshot) => snapshot.type === (window as any).HSApp.View.ViewModeEnum.FirstPerson
      ),
      isIntelligenceLoading: false,
      autoCameras: []
    };

    this.showTabs = false;
  }

  componentDidUpdate(prevProps: CameraPositionProps, prevState: CameraPositionState): void {
    if (prevProps.visible !== this.props.visible && this.props.visible) {
      this._updateCameras();
    }
  }

  componentDidMount(): void {
    this._updateCameras();
  }

  private _updateCameras = (): void => {
    this.setState({
      currentCameras: this.app.floorplan.snapshots.filter(
        (snapshot: CameraSnapshot) => snapshot.type === (window as any).HSApp.View.ViewModeEnum.FirstPerson
      )
    });

    if (this.showTabs) {
      this.setState({
        isIntelligenceLoading: true,
        autoCameras: []
      });

      getIntelligenceCameras().then((response: IntelligenceCamerasResponse | undefined) => {
        this.setState({
          isIntelligenceLoading: false,
          autoCameras: response?.imageCamera ?? []
        });
      });
    }
  };

  private _createCamera = (): void => {
    createSparkCamera(this.state.currentCameras, this.props.frameBound).then((newCamera: CameraSnapshot) => {
      this.setState({
        currentCameras: [newCamera, ...this.state.currentCameras]
      });
    });
  };

  private _refreshCamera = (cameraId: string): void => {
    const floorplan = this.app.floorplan;
    const cameraName = this.state.currentCameras.find(
      (camera: CameraSnapshot) => camera.id === cameraId
    )!.name;

    floorplan.removeSnapshot(cameraId);

    createSparkCamera(undefined, this.props.frameBound, cameraId, cameraName).then((refreshedCamera: CameraSnapshot) => {
      this.setState({
        currentCameras: [
          refreshedCamera,
          ...this.state.currentCameras.filter((camera: CameraSnapshot) => camera.id !== cameraId)
        ]
      });
    });
  };

  private _setCamera = (camera: any, viewType: string, options?: { renderType?: string; oriRenderUI?: any }): void => {
    setSparkCamera(camera, viewType, options);
  };

  private _deleteCamera = (cameraId: string): void => {
    const floorplan = this.app.floorplan;
    
    this.setState({
      currentCameras: this.state.currentCameras.filter((camera: CameraSnapshot) => camera.id !== cameraId)
    });

    floorplan.removeSnapshot(cameraId);
  };

  private handleEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.nativeEvent.keyCode === 13) {
      event.currentTarget.blur();
    }
  };

  private _changeSnapName = (event: React.FocusEvent<HTMLInputElement>, cameraId: string): void => {
    const newName = event.currentTarget.value;

    this.setState({
      currentCameras: this.state.currentCameras.map((camera: CameraSnapshot) => {
        if (camera.id === cameraId) {
          camera.name = newName;
        }
        return camera;
      })
    });

    const snapshots = this.app.floorplan.snapshots;
    for (let i = 0; i < snapshots.length; i++) {
      if (snapshots[i].id === cameraId) {
        snapshots[i].name = newName;
        break;
      }
    }
  };

  render(): JSX.Element {
    const ResourceManager = (window as any).ResourceManager;
    const Popover = (window as any).HSApp.UI.Popover;

    return (
      <div className="camera-position">
        <div className="title">
          <span>{ResourceManager.getString('plugin_render_camera_cameraHorizontalFov')}</span>
        </div>

        {this.showTabs && (
          <Tabs
            className="camera-position-tabs"
            tabs={this.tabData}
            triggerOnMount={false}
            onChange={(tabData: TabData, value: string) => this.setState({ tabValue: value })}
          />
        )}

        {this.state.tabValue === '1' && (
          <div className="camera-position-main">
            <div className="camera-position-card">
              <div
                className="camera-position-plus-btn"
                onClick={() => this._createCamera()}
                id="sparkCreateCamera"
              >
                <IconfontView
                  showType="hs_mian_baocunshijiao"
                  customStyle={{ fontSize: '22px', color: '#396efe' }}
                />
                <span className="camera-position-button-description">
                  {ResourceManager.getString('project_save_camera_position')}
                </span>
              </div>
            </div>

            <div className="camera-positon-group">
              {this.state.currentCameras.map((snapshot: CameraSnapshot) => {
                const { id, thumbnail, type, camera, name, renderType, oriRenderUI } = snapshot;

                return (
                  <div className="camera-position-card" key={id}>
                    <div
                      style={{ backgroundImage: `url(${thumbnail})` }}
                      className="camera-position-normal-card"
                      onClick={() => this._setCamera(camera, type, { renderType, oriRenderUI })}
                    >
                      <Popover.Heavy
                        placement="topR"
                        trigger="click"
                        className="popup-overlay-dark"
                        text={ResourceManager.getString('camera_propbar_cameraHorizontalFov_delete_confirm')}
                        showConfirm={true}
                        cancelText={ResourceManager.getString('cancel')}
                        okText={ResourceManager.getString('confirm')}
                        onOk={(event: React.MouseEvent) => {
                          event.stopPropagation();
                          this._deleteCamera(id);
                        }}
                        onCancel={() => {}}
                        dismissOnClick={true}
                      >
                        <div
                          className="camera-position-delete"
                          onClick={(event: React.MouseEvent) => event.stopPropagation()}
                        >
                          <IconfontView
                            showType="hs_mian_shanchu"
                            customStyle={{ fontSize: '12px', color: '#9B9FAB' }}
                            hoverColor="#396efe"
                          />
                        </div>
                      </Popover.Heavy>

                      <div className="camera-position-refresh">
                        <div
                          className="camera-position-refresh-icon"
                          onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            this._refreshCamera(id);
                          }}
                        >
                          <IconfontView
                            showType="hs_xian_qiehuan"
                            customStyle={{ fontSize: '12px', color: '#ffffff' }}
                          />
                        </div>
                      </div>

                      <input
                        maxLength={20}
                        key={name}
                        className="camera-position-snapname"
                        defaultValue={name}
                        onKeyUp={this.handleEnter}
                        onBlur={(event) => this._changeSnapName(event, id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {this.showTabs && this.state.tabValue === '2' && (
          <div className="intelligence-camera-position-group" id="intelligence-camera-groups">
            {this.state.isIntelligenceLoading && <div className="intelligence-loading" />}

            {this.state.autoCameras.map((autoCamera: IntelligenceCamera, index: number) => {
              const { camera, roomTypeDisplayName, thumbnail } = autoCamera;

              return (
                <div
                  className="intelligence-camera-positon"
                  key={index}
                  onClick={() => this._setCamera(camera, 'firstperson')}
                >
                  <img src={thumbnail} />
                  <p className="camera-position-snapname">{roomTypeDisplayName}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}