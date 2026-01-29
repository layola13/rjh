import { Signal } from 'HSCore.Util';

// Constants
const PLUGIN_NAME = 'hsw.plugin.orbitview.orbitviewpopup';
const CAMERA_Z_RANGE_DEFAULT = { min: -6, max: 6 };
const CAMERA_Z_RANGE_ORBITVIEW = { min: -60, max: 60 };
const CAMERA_FOV_RANGE = { min: 40, max: 120 };
const POPUP_OFFSET = { bottom: 4, left: -200 };

// Interfaces
interface ICamera {
    type: string;
    z: number;
    horizontal_fov: number;
    signalFieldChanged: Signal<ICamera>;
}

interface IApp {
    activeEnvironmentId: string;
    pluginManager: IPluginManager;
    floorplan: IFloorplan;
    cmdManager: ICommandManager;
}

interface IPluginManager {
    getPlugin(name: string): any;
}

interface IFloorplan {
    cameras: Record<string, ICamera>;
}

interface ICommandManager {
    current: any;
    createCommand(type: string, args: any[]): ICommand;
    execute(command: ICommand): void;
    receive(action: string, params: any): void;
    complete(): void;
}

interface ICommand {
    type: string;
}

interface ITriggerBound {
    top: number;
    left: number;
}

interface ISliderData {
    className: string;
    label: string;
    value: number;
    options: {
        includeUnit?: boolean;
        showTunningButtons?: boolean;
        startFromMin?: boolean;
        unitType?: string;
        displayDigits?: number;
        rules: {
            range: {
                min: number;
                max: number;
                checkMax?: boolean;
            };
            positiveOnly?: boolean;
        };
    };
    marks?: Record<number, string>;
    onValueChange: (event: { detail: { value: number } }) => void;
    onValueChangeEnd?: () => void;
}

interface IPluginContext {
    [key: string]: any;
}

// Plugin Class
class OrbitViewPopupPlugin extends HSApp.Plugin.IPlugin {
    constructor() {
        super({
            name: 'orbitview popup plugin',
            description: 'orbitview popup plugin'
        });
    }

    onActive(context: { app: IApp }, plugins: IPluginContext): void {
        const { app } = context;
        PluginHandler.init(app, plugins);
    }

    onDeactive(): void {
        PluginHandler.uninit();
    }

    toggle(bound: ITriggerBound, camera?: ICamera): boolean {
        return PluginHandler.toggle(bound, camera);
    }

    hide(force: boolean): void {
        PluginHandler.hide(force);
    }

    isPin(): boolean {
        return PluginHandler.isPin;
    }
}

// Handler Object
const PluginHandler = {
    propertyBarPopup: undefined as any,
    isShow: false,
    isPin: false,
    triggerTargetBound: undefined as ITriggerBound | undefined,
    app: undefined as IApp | undefined,
    cmdMgr: undefined as ICommandManager | undefined,
    camera: undefined as ICamera | undefined,
    cameraZIcon: '',
    cameraFovIcon: '',
    cameraClipIcon: '',
    pinIcon: '',
    signalHook: undefined as any,
    contextualToolsPlugin: undefined as any,

    init(app: IApp, plugins: IPluginContext): void {
        this.app = app;
        this.cmdMgr = this.app.cmdManager;
        this.cameraZIcon = 'plugin/orbitview/res/ImgOrbitView/setting_height.svg';
        this.cameraFovIcon = 'plugin/orbitview/res/ImgOrbitView/setting_fov.svg';
        this.cameraClipIcon = 'plugin/orbitview/res/ImgOrbitView/camera_clip.svg';
        this.pinIcon = './plugin/orbitview/res/ImgOrbitView/pin.svg';
        this.signalHook = new HSCore.Util.SignalHook(this);
        this.contextualToolsPlugin = plugins[HSFPConstants.PluginType.ContextualTools];

        $('#plugin-container').append('<div class="camera-setting-popup-container"></div>');

        document.addEventListener('mousedown', (event: MouseEvent) => {
            this.documentClickedHidePopup(event);
        });
    },

    uninit(): void {
        document.removeEventListener('mousedown', (event: MouseEvent) => {
            this.documentClickedHidePopup(event);
        });
    },

    toggle(bound?: ITriggerBound, camera?: ICamera): boolean {
        const activeEnv = HSApp.App.getApp().activeEnvironmentId;
        
        if (activeEnv !== HSFPConstants.Environment.Render &&
            activeEnv !== HSFPConstants.Environment.FaceMaterial &&
            activeEnv !== HSFPConstants.Environment.Elevation) {

            if (camera) {
                this.camera = camera;
            } else {
                const orbitViewPlugin = HSApp.App.getApp().pluginManager.getPlugin('hsw.plugin.orbitview.Plugin');
                const currentCameraType = orbitViewPlugin.getCurrentCameraType();
                this.camera = this.getCameraByType(currentCameraType);
            }

            if (bound) {
                this.triggerTargetBound = bound;
            } else {
                const settingElement = document.querySelector('.camera-setting');
                if (settingElement) {
                    this.triggerTargetBound = settingElement.getBoundingClientRect() as ITriggerBound;
                }
            }

            if (this.triggerTargetBound) {
                if (!this.isPin) {
                    this.isShow = !this.isShow;
                }

                const orbitViewPlugin = HSApp.App.getApp().pluginManager.getPlugin('hsw.plugin.orbitview.Plugin');

                if (this.isShow || this.isPin) {
                    if (!this.isPin && this.camera) {
                        this.camera.signalFieldChanged.listen(this.setCameraZValue, this);
                        this.updatePopup();
                        orbitViewPlugin.signalOrbitViewPopup.dispatch({ isActive: true });
                    }
                } else {
                    this.hide(true);
                }

                return this.isShow;
            }
        }
        return false;
    },

    getCameraByType(cameraType: string): ICamera | null {
        const cameras = Object.values(HSApp.App.getApp().floorplan.cameras);
        for (const camera of cameras) {
            if (camera.type === cameraType) {
                return camera;
            }
        }
        return null;
    },

    hide(force: boolean): void {
        if (force || (this.isShow && !this.isPin)) {
            const orbitViewPlugin = HSApp.App.getApp().pluginManager.getPlugin('hsw.plugin.orbitview.Plugin');
            orbitViewPlugin.signalOrbitViewPopup.dispatch({ isActive: false });

            this.isShow = false;
            this.isPin = false;

            const container = document.querySelector('.camera-setting-popup-container');
            if (container) {
                ReactDOM.unmountComponentAtNode(container);
            }
        }
    },

    documentClickedHidePopup(event: MouseEvent): void {
        if (this.isShow) {
            const popupElements = $('.camera-setting-popup-container, .camera-setting');
            const isClickOutside = !popupElements.is(event.target as Element) && 
                                   popupElements.has(event.target as Element).length === 0;
            const isRightClick = (event as any).which === 3;

            if (isClickOutside || isRightClick) {
                this.hide(true);
            }
        }
    },

    setCameraZValue(camera: ICamera): void {
        if (this.isShow) {
            this.updatePopup();
        }
    },

    onResetBtnClk(): void {
        if (this.camera && this.cmdMgr) {
            this._launchCmd(HSFPConstants.CommandType.ResetCamera, this.camera);
            this.cmdMgr.complete();
        }
    },

    onZInputChange(zValue: number): void {
        if (this.camera && this.cmdMgr) {
            this._launchCmd(HSFPConstants.CommandType.MoveCamera3D, this.camera);
            this.cmdMgr.receive('movealongaxis', { type: 'z', value: zValue });
            this.cmdMgr.complete();
        }
    },

    onFovSliderChange(fovValue: number): void {
        if (this.camera && this.cmdMgr) {
            this._launchCmd(HSFPConstants.CommandType.ChangeCameraFov, this.camera);
            this.cmdMgr.receive('update_horizontal_fov', { value: fovValue });
            this.cmdMgr.complete();
        }
    },

    onFovInputChange(fovValue: number): void {
        if (this.camera && this.cmdMgr) {
            this._launchCmd(HSFPConstants.CommandType.ChangeCameraFov, this.camera);
            this.cmdMgr.receive('update_horizontal_fov', { value: fovValue });
            this.cmdMgr.complete();
        }
    },

    updatePopup(): void {
        const guidePlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
        
        if (!guidePlugin?.showGuide()) {
            const container = document.querySelector('.camera-setting-popup-container');
            if (container) {
                ReactDOM.render(React.createElement(CameraSettingPopup, null), container);
            }
        }

        $('#editor3d').focus();
    },

    _launchCmd(commandType: string, camera: ICamera): ICommand {
        if (!this.cmdMgr) {
            throw new Error('Command manager not initialized');
        }
        const command = this.cmdMgr.createCommand(commandType, [camera]);
        this.cmdMgr.execute(command);
        return command;
    }
};

// React Component
class CameraSettingPopup extends React.Component {
    onResetClick(): void {
        PluginHandler.onResetBtnClk();
        PluginHandler.updatePopup();
    }

    render(): JSX.Element {
        if (!PluginHandler.triggerTargetBound || !PluginHandler.camera) {
            return React.createElement('div', null);
        }

        const popupStyle = {
            bottom: window.innerHeight - PluginHandler.triggerTargetBound.top + POPUP_OFFSET.bottom,
            left: PluginHandler.triggerTargetBound.left + POPUP_OFFSET.left
        };

        const cameraZConfig: ISliderData = {
            className: 'camera-z-position',
            label: ResourceManager.getString('plugin_style_camera_height'),
            value: PluginHandler.camera.z,
            options: {
                includeUnit: true,
                showTunningButtons: true,
                startFromMin: true,
                rules: {
                    range: { ...CAMERA_Z_RANGE_DEFAULT, checkMax: false },
                    positiveOnly: false
                }
            },
            onValueChange: (event: { detail: { value: number } }) => {
                const value = event.detail?.value;
                if (value !== undefined) {
                    PluginHandler.onZInputChange(value);
                }
            }
        };

        const cameraFovConfig: ISliderData = {
            className: 'camera-angle',
            label: ResourceManager.getString('plugin_style_viewport_angle'),
            value: PluginHandler.camera.horizontal_fov < CAMERA_FOV_RANGE.min ? 
                   CAMERA_FOV_RANGE.min : 
                   PluginHandler.camera.horizontal_fov,
            options: {
                unitType: '°',
                displayDigits: 0,
                includeUnit: true,
                rules: {
                    range: { ...CAMERA_FOV_RANGE }
                }
            },
            onValueChange: (event: { detail: { value: number } }) => {
                const value = event.detail.value;
                PluginHandler.onFovSliderChange(value);
            },
            onValueChangeEnd: () => {
                PluginHandler.updatePopup();
            }
        };

        if (PluginHandler.camera.type === 'orbitview') {
            cameraZConfig.options.rules.range = { ...CAMERA_Z_RANGE_ORBITVIEW };
            cameraFovConfig.options.rules.range = { ...CAMERA_FOV_RANGE };
        }

        cameraFovConfig.marks = {
            40: ResourceManager.getString('plugin_render_eye'),
            55: ResourceManager.getString('plugin_render_standard'),
            120: ResourceManager.getString('plugin_render_wide_angle')
        };

        return React.createElement(
            'div',
            { className: 'camera-setting-popup', style: popupStyle },
            React.createElement(
                'div',
                { className: 'camera-slider' },
                React.createElement((window as any).default, { data: cameraZConfig }),
                React.createElement((window as any).default, { data: cameraFovConfig })
            ),
            React.createElement(
                (window as any).Button,
                {
                    className: 'reset-button',
                    type: 'default',
                    onClick: () => this.onResetClick()
                },
                ResourceManager.getString('plugin_style_rotate_reset')
            )
        );
    }
}

// Register Plugin
HSApp.Plugin.registerPlugin(`${PLUGIN_NAME}.Plugin`, OrbitViewPopupPlugin);