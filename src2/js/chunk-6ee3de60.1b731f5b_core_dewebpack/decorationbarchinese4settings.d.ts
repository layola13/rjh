import { DecorationBarSettings } from './DecorationBarSettings';

/**
 * 中式装饰条4设置类
 * 用于管理中式风格装饰条的各种参数配置，包括垂直/水平条数量、间距等
 */
export declare class DecorationBarChinese4Settings extends DecorationBarSettings {
    /**
     * 项目ID
     */
    pid: string | number;

    /**
     * 多重管理器实例
     */
    mulManager: unknown;

    /**
     * 视图实例
     */
    view: View;

    /**
     * 构造函数
     * @param pid - 项目标识符
     * @param mulManager - 多重管理器实例
     * @param view - 视图实例
     */
    constructor(pid: string | number, mulManager: unknown, view: View);

    /**
     * 装饰条实例（只读）
     * 获取当前的装饰条对象
     */
    get decBar(): DecorationBar;

    /**
     * 垂直中间条数量
     * 控制装饰条垂直方向的条数
     */
    get verMiddleCount(): number;
    set verMiddleCount(value: number);

    /**
     * 水平中间条数量
     * 控制装饰条水平方向的条数
     */
    get horMiddleCount(): number;
    set horMiddleCount(value: number);

    /**
     * 边缘间距
     * 控制装饰条与边缘之间的间隙距离
     */
    get edgeSep(): number;
    set edgeSep(value: number);

    /**
     * 水平中间间距
     * 控制水平方向条之间的间隔距离
     */
    get horMiddleSep(): number;
    set horMiddleSep(value: number);

    /**
     * 垂直中间间距
     * 控制垂直方向条之间的间隔距离
     */
    get verMiddleSep(): number;
    set verMiddleSep(value: number);
}

/**
 * 装饰条接口
 * 定义装饰条的核心属性和方法
 */
interface DecorationBar {
    /** 垂直条数量 */
    verticalBarCount: number;
    
    /** 水平条数量 */
    horizontalBarCount: number;
    
    /** 边缘间隙 */
    gap: number;
    
    /** 水平间距 */
    hSep: number;
    
    /** 垂直间距 */
    vSep: number;
    
    /**
     * 重新创建组件
     * 根据当前参数重新生成装饰条的各个组成部分
     */
    recreateComponents(): void;
}

/**
 * 视图接口
 * 管理渲染和历史记录
 */
interface View {
    /**
     * 刷新视图
     * 更新界面显示
     */
    refresh(): void;
    
    /**
     * 备忘录管理器
     * 用于撤销/重做操作
     */
    mometoManager: MomentoManager;
}

/**
 * 备忘录管理器接口
 * 管理操作历史记录
 */
interface MomentoManager {
    /**
     * 创建检查点
     * 在历史记录中保存当前状态
     */
    checkPoint(): void;
}