import { DecorationBarSettings } from './DecorationBarSettings';

/**
 * 装饰条钻石设置类
 * 用于管理钻石形状装饰条的垂直和水平点数配置
 */
export class DecorationBarDiamondSettings extends DecorationBarSettings {
    /** 项目ID */
    private pid: string | number;
    
    /** 多重管理器 */
    private mulManager: unknown;
    
    /** 视图对象 */
    private view: View;

    /**
     * 构造函数
     * @param pid - 项目标识符
     * @param mulManager - 多重管理器实例
     * @param view - 视图实例
     */
    constructor(pid: string | number, mulManager: unknown, view: View) {
        super(pid, mulManager, view);
        this.pid = pid;
        this.mulManager = mulManager;
        this.view = view;
    }

    /**
     * 获取垂直方向点数
     * @returns 装饰条的垂直点数，如果装饰条未定义则返回0
     */
    get verPointCount(): number {
        return this.decorationBar === undefined ? 0 : this.decorationBar.vPtCount;
    }

    /**
     * 设置垂直方向点数
     * 当点数改变时，会重新创建装饰条组件、更新多边形、重绘视图并创建检查点
     * @param value - 新的垂直点数（必须大于0）
     */
    set verPointCount(value: number) {
        if (value <= 0) return;
        
        if (this.decorationBar !== undefined && this.decorationBar.vPtCount !== value) {
            this.decorationBar.vPtCount = value;
            this.decorationBar.recreateComponents();
            this.decorationShape.updatePoly();
            this.decorationShape.draw(this.view);
            this.view.refresh();
            this.view.mometoManager.checkPoint();
        }
    }

    /**
     * 获取水平方向点数
     * @returns 装饰条的水平点数，如果装饰条未定义则返回0
     */
    get horPointCount(): number {
        return this.decorationBar === undefined ? 0 : this.decorationBar.hPtCount;
    }

    /**
     * 设置水平方向点数
     * 当点数改变时，会重新创建装饰条组件、更新多边形、重绘视图并创建检查点
     * @param value - 新的水平点数（必须大于0）
     */
    set horPointCount(value: number) {
        if (value <= 0) return;
        
        if (this.decorationBar !== undefined && this.decorationBar.hPtCount !== value) {
            this.decorationBar.hPtCount = value;
            this.decorationBar.recreateComponents();
            this.decorationShape.updatePoly();
            this.decorationShape.draw(this.view);
            this.view.refresh();
            this.view.mometoManager.checkPoint();
        }
    }
}

/**
 * 视图接口（根据使用推断）
 */
interface View {
    /** 状态管理器（疑似memento模式的拼写错误） */
    mometoManager: MometoManager;
    /** 刷新视图 */
    refresh(): void;
}

/**
 * 状态管理器接口
 */
interface MometoManager {
    /** 创建检查点/快照 */
    checkPoint(): void;
}