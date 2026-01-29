/**
 * 第二阶段模块测试
 * 测试补充的63个核心模块
 */

import { describe, it, expect } from '@jest/globals';
import { Vector2, Vector3 } from 'three';

// 墙体系统
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WallUtil } from '../wall/WallUtil';
import { WallFaceAssembly } from '../wall/WallFaceAssembly';
import { WallJoint, WallJointType } from '../wall/WallJoint';
import { WallRegion, WallRegionType } from '../wall/WallRegion';
import { WallProfile, WallProfileType } from '../wall/WallProfile';
import { WallMode, WallModeEnum } from '../wall/WallMode';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WallLoopInfo, LoopDirection } from '../wall/WallLoopInfo';

// 门窗系统
import { DoorTypeEnum, DoorTypeUtil } from '../opening/DoorTypeEnum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WindowHole, WindowHoleType } from '../opening/WindowHole';

// 楼板系统
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SlabUtil } from '../slab/SlabUtil';
import { SlabProfile, SlabProfileType } from '../slab/SlabProfile';
import { SlabRegion, SlabRegionType } from '../slab/SlabRegion';

// 结构系统
import { BeamFaceInfo, BeamFaceType } from '../structure/BeamFaceInfo';

// 装饰系统
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MoldingUtil } from '../decoration/MoldingUtil';

// 家具系统
import { CabinetBase, CabinetBaseType } from '../furniture/CabinetBase';

// 工具类
import { Signal } from '../../utils/Signal';

describe('第二阶段核心模块测试', () => {
    describe('墙体系统', () => {
        it('WallProfile - 创建矩形轮廓', () => {
            const profile = WallProfile.createRectangle(200, 2800);
            expect(profile.width).toBe(200);
            expect(profile.height).toBe(2800);
            expect(profile.type).toBe(WallProfileType.Rectangle);
            expect(profile.getArea()).toBeGreaterThan(0);
        });

        it('WallRegion - 区域面积计算', () => {
            const contour = [
                new Vector2(0, 0),
                new Vector2(100, 0),
                new Vector2(100, 100),
                new Vector2(0, 100)
            ];
            const region = new WallRegion('test-region', WallRegionType.Full, contour);
            expect(region.getArea()).toBe(10000);
        });

        it('WallJoint - 连接类型判断', () => {
            const point = new Vector3(0, 0, 0);
            const joint = new WallJoint(point, []);
            expect(joint.point).toBeDefined();
            expect(joint.type).toBe(WallJointType.Unknown);
        });

        it('WallMode - 模式设置', () => {
            const mode = new WallMode();
            mode.setMode(WallModeEnum.Edit);
            expect(mode.getMode()).toBe(WallModeEnum.Edit);
            expect(mode.isEditMode()).toBe(true);
        });

        it('WallFaceAssembly - 区域管理', () => {
            const faceInfo = {
                faceId: 'face-1',
                faceIndex: 0,
                faceType: 'front'
            };
            const assembly = new WallFaceAssembly(faceInfo);
            expect(assembly.getRegionCount()).toBe(0);
            
            const region = {
                id: 'region-1',
                contour: [],
                type: 'main'
            };
            assembly.addRegion(region);
            expect(assembly.getRegionCount()).toBe(1);
        });
    });

    describe('门窗系统', () => {
        it('DoorTypeEnum - 门类型判断', () => {
            expect(DoorTypeUtil.isSwingDoor(DoorTypeEnum.Swing)).toBe(true);
            expect(DoorTypeUtil.isSlidingDoor(DoorTypeEnum.Sliding)).toBe(true);
            expect(DoorTypeUtil.isFoldingDoor(DoorTypeEnum.Folding)).toBe(true);
        });

        it('DoorTypeUtil - 默认配置', () => {
            const config = DoorTypeUtil.getDefaultConfig(DoorTypeEnum.Swing);
            expect(config.width).toBeDefined();
            expect(config.height).toBeDefined();
        });
    });

    describe('楼板系统', () => {
        it('SlabProfile - 创建矩形轮廓', () => {
            const profile = SlabProfile.createRectangle(5000, 4000);
            expect(profile.type).toBe(SlabProfileType.Rectangle);
            expect(profile.getArea()).toBe(20000000);
        });

        it('SlabProfile - L型轮廓', () => {
            const profile = SlabProfile.createLShape(3000, 4000, 2000, 2000);
            expect(profile.type).toBe(SlabProfileType.LShape);
            expect(profile.getArea()).toBeGreaterThan(0);
        });

        it('SlabRegion - 区域创建和管理', () => {
            const contour = [
                new Vector2(0, 0),
                new Vector2(5000, 0),
                new Vector2(5000, 4000),
                new Vector2(0, 4000)
            ];
            const region = new SlabRegion('room-1', SlabRegionType.Main, contour);
            expect(region.getArea()).toBe(20000000);
            expect(region.isValid()).toBe(true);
        });

        it('SlabRegion - 点在区域内判断', () => {
            const contour = [
                new Vector2(0, 0),
                new Vector2(100, 0),
                new Vector2(100, 100),
                new Vector2(0, 100)
            ];
            const region = new SlabRegion('test', SlabRegionType.Full, contour);
            expect(region.containsPoint(new Vector2(50, 50))).toBe(true);
            expect(region.containsPoint(new Vector2(150, 50))).toBe(false);
        });
    });

    describe('结构系统', () => {
        it('BeamFaceInfo - 创建和管理', () => {
            const faceInfo = new BeamFaceInfo(BeamFaceType.Top, 0);
            expect(faceInfo.faceType).toBe(BeamFaceType.Top);
            expect(faceInfo.faceIndex).toBe(0);
        });

        it('BeamFaceInfo - 顶点设置和面积计算', () => {
            const faceInfo = new BeamFaceInfo(BeamFaceType.Top, 0);
            const vertices = [
                new Vector3(0, 0, 0),
                new Vector3(1, 0, 0),
                new Vector3(1, 1, 0),
                new Vector3(0, 1, 0)
            ];
            faceInfo.setVertices(vertices);
            expect(faceInfo.area).toBeGreaterThan(0);
        });
    });

    describe('家具系统', () => {
        it('CabinetBase - 创建地柜', () => {
            const cabinet = new CabinetBase('cabinet-1', {
                type: CabinetBaseType.Base,
                width: 600,
                height: 800,
                depth: 550,
                drawerCount: 2,
                shelfCount: 1
            });
            expect(cabinet.baseType).toBe(CabinetBaseType.Base);
            expect(cabinet.drawerCount).toBe(2);
        });

        it('CabinetBase - 组件生成', () => {
            const cabinet = new CabinetBase('cabinet-2', {
                type: CabinetBaseType.Wall,
                width: 800,
                height: 600,
                depth: 350
            });
            cabinet.regenerateComponents();
            expect(cabinet.getAllComponents().length).toBeGreaterThan(0);
        });

        it('CabinetBase - 体积计算', () => {
            const cabinet = new CabinetBase('cabinet-3', {
                type: CabinetBaseType.Tall,
                width: 600,
                height: 2200,
                depth: 550
            });
            const volume = cabinet.calculateVolume();
            expect(volume).toBeGreaterThan(0);
        });
    });

    describe('工具类', () => {
        it('Signal - 事件订阅和分发', () => {
            const signal = new Signal<string>();
            let received = '';
            
            signal.add((data) => {
                received = data;
            });
            
            signal.dispatch('test-data');
            expect(received).toBe('test-data');
        });

        it('Signal - 一次性监听', () => {
            const signal = new Signal<number>();
            let count = 0;
            
            signal.once(() => {
                count++;
            });
            
            signal.dispatch(1);
            signal.dispatch(2);
            expect(count).toBe(1);
        });

        it('Signal - 移除监听', () => {
            const signal = new Signal<boolean>();
            let triggered = false;
            
            const listener = () => {
                triggered = true;
            };
            
            signal.add(listener);
            signal.remove(listener);
            signal.dispatch(true);
            expect(triggered).toBe(false);
        });
    });

    describe('集成测试', () => {
        it('墙体轮廓和区域配合', () => {
            const profile = WallProfile.createRectangle(200, 2800);
            const contour = profile.toPath3D(0);
            expect(contour.length).toBe(4);
        });

        it('楼板轮廓和区域配合', () => {
            const profile = SlabProfile.createRectangle(5000, 4000);
            const contour2D = profile.outerContour;
            const region = new SlabRegion('room', SlabRegionType.Main, contour2D);
            expect(region.getArea()).toBe(profile.getArea());
        });
    });
});