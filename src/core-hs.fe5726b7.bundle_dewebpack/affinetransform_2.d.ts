/**
 * 仿射变换类，用于表示2D图形的线性变换和平移
 * 变换矩阵形式：
 * [ m00  m01  m02 ]
 * [ m10  m11  m12 ]
 * [ 0    0    1   ]
 */
export declare class AffineTransform {
    /** 矩阵元素 - X轴缩放/旋转分量 */
    private m00_: number;
    
    /** 矩阵元素 - Y轴剪切/旋转分量 */
    private m10_: number;
    
    /** 矩阵元素 - X轴剪切/旋转分量 */
    private m01_: number;
    
    /** 矩阵元素 - Y轴缩放/旋转分量 */
    private m11_: number;
    
    /** 矩阵元素 - X轴平移分量 */
    private m02_: number;
    
    /** 矩阵元素 - Y轴平移分量 */
    private m12_: number;

    /**
     * 构造仿射变换
     * @param m00 X轴缩放分量（默认1）
     * @param m10 Y轴剪切分量（默认0）
     * @param m01 X轴剪切分量（默认0）
     * @param m11 Y轴缩放分量（默认1）
     * @param m02 X轴平移分量（默认0）
     * @param m12 Y轴平移分量（默认0）
     */
    constructor(m00?: number, m10?: number, m01?: number, m11?: number, m02?: number, m12?: number);

    /**
     * 判断是否为单位矩阵（无变换）
     * @returns 如果是单位矩阵返回true
     */
    isIdentity(): boolean;

    /**
     * 克隆当前变换
     * @returns 新的AffineTransform实例
     */
    clone(): AffineTransform;

    /**
     * 设置变换矩阵的所有元素
     * @param m00 X轴缩放分量
     * @param m10 Y轴剪切分量
     * @param m01 X轴剪切分量
     * @param m11 Y轴缩放分量
     * @param m02 X轴平移分量
     * @param m12 Y轴平移分量
     * @returns 当前实例（链式调用）
     * @throws 如果参数不是有效数字
     */
    setTransform(m00: number, m10: number, m01: number, m11: number, m02: number, m12: number): this;

    /**
     * 从另一个变换复制矩阵元素
     * @param transform 源变换
     * @returns 当前实例（链式调用）
     */
    copyFrom(transform: AffineTransform): this;

    /**
     * 后乘缩放变换（影响当前坐标系）
     * @param scaleX X轴缩放因子
     * @param scaleY Y轴缩放因子
     * @returns 当前实例（链式调用）
     */
    scale(scaleX: number, scaleY: number): this;

    /**
     * 前乘缩放变换（影响世界坐标系）
     * @param scaleX X轴缩放因子
     * @param scaleY Y轴缩放因子
     * @returns 当前实例（链式调用）
     */
    preScale(scaleX: number, scaleY: number): this;

    /**
     * 后乘平移变换
     * @param translateX X轴平移量
     * @param translateY Y轴平移量
     * @returns 当前实例（链式调用）
     */
    translate(translateX: number, translateY: number): this;

    /**
     * 前乘平移变换
     * @param translateX X轴平移量
     * @param translateY Y轴平移量
     * @returns 当前实例（链式调用）
     */
    preTranslate(translateX: number, translateY: number): this;

    /**
     * 后乘旋转变换
     * @param angle 旋转角度（弧度）
     * @param centerX 旋转中心X坐标
     * @param centerY 旋转中心Y坐标
     * @returns 当前实例（链式调用）
     */
    rotate(angle: number, centerX: number, centerY: number): this;

    /**
     * 前乘旋转变换
     * @param angle 旋转角度（弧度）
     * @param centerX 旋转中心X坐标
     * @param centerY 旋转中心Y坐标
     * @returns 当前实例（链式调用）
     */
    preRotate(angle: number, centerX: number, centerY: number): this;

    /**
     * 后乘剪切变换
     * @param shearX X轴剪切因子
     * @param shearY Y轴剪切因子
     * @returns 当前实例（链式调用）
     */
    shear(shearX: number, shearY: number): this;

    /**
     * 前乘剪切变换
     * @param shearX X轴剪切因子
     * @param shearY Y轴剪切因子
     * @returns 当前实例（链式调用）
     */
    preShear(shearX: number, shearY: number): this;

    /**
     * 转换为CSS matrix()字符串表示
     * @returns 形如 "matrix(m00, m10, m01, m11, m02, m12)" 的字符串
     */
    toString(): string;

    /**
     * 获取X轴缩放分量
     * @returns m00值
     */
    getScaleX(): number;

    /**
     * 获取Y轴缩放分量
     * @returns m11值
     */
    getScaleY(): number;

    /**
     * 获取X轴平移分量
     * @returns m02值
     */
    getTranslateX(): number;

    /**
     * 获取Y轴平移分量
     * @returns m12值
     */
    getTranslateY(): number;

    /**
     * 获取X轴剪切分量
     * @returns m01值
     */
    getShearX(): number;

    /**
     * 获取Y轴剪切分量
     * @returns m10值
     */
    getShearY(): number;

    /**
     * 后乘另一个变换（this = this * transform）
     * @param transform 要连接的变换
     * @returns 当前实例（链式调用）
     */
    concatenate(transform: AffineTransform): this;

    /**
     * 前乘另一个变换（this = transform * this）
     * @param transform 要连接的变换
     * @returns 当前实例（链式调用）
     */
    preConcatenate(transform: AffineTransform): this;

    /**
     * 对坐标数组应用变换
     * @param srcCoords 源坐标数组
     * @param srcOffset 源数组起始偏移
     * @param destCoords 目标坐标数组
     * @param destOffset 目标数组起始偏移
     * @param pointCount 要变换的点数量
     */
    transform(
        srcCoords: number[],
        srcOffset: number,
        destCoords: number[],
        destOffset: number,
        pointCount: number
    ): void;

    /**
     * 计算变换矩阵的行列式
     * @returns 行列式值（m00*m11 - m01*m10）
     */
    getDeterminant(): number;

    /**
     * 判断变换是否可逆
     * @returns 如果行列式非零且所有元素有限则返回true
     */
    isInvertible(): boolean;

    /**
     * 创建逆变换
     * @returns 新的逆变换实例
     */
    createInverse(): AffineTransform;

    /**
     * 创建缩放变换实例
     * @param scaleX X轴缩放因子
     * @param scaleY Y轴缩放因子
     * @returns 新的缩放变换
     */
    static getScaleInstance(scaleX: number, scaleY: number): AffineTransform;

    /**
     * 创建平移变换实例
     * @param translateX X轴平移量
     * @param translateY Y轴平移量
     * @returns 新的平移变换
     */
    static getTranslateInstance(translateX: number, translateY: number): AffineTransform;

    /**
     * 创建剪切变换实例
     * @param shearX X轴剪切因子
     * @param shearY Y轴剪切因子
     * @returns 新的剪切变换
     */
    static getShearInstance(shearX: number, shearY: number): AffineTransform;

    /**
     * 创建旋转变换实例
     * @param angle 旋转角度（弧度）
     * @param centerX 旋转中心X坐标
     * @param centerY 旋转中心Y坐标
     * @returns 新的旋转变换
     */
    static getRotateInstance(angle: number, centerX: number, centerY: number): AffineTransform;

    /**
     * 设置为缩放变换
     * @param scaleX X轴缩放因子
     * @param scaleY Y轴缩放因子
     * @returns 当前实例（链式调用）
     */
    setToScale(scaleX: number, scaleY: number): this;

    /**
     * 设置为平移变换
     * @param translateX X轴平移量
     * @param translateY Y轴平移量
     * @returns 当前实例（链式调用）
     */
    setToTranslation(translateX: number, translateY: number): this;

    /**
     * 设置为剪切变换
     * @param shearX X轴剪切因子
     * @param shearY Y轴剪切因子
     * @returns 当前实例（链式调用）
     */
    setToShear(shearX: number, shearY: number): this;

    /**
     * 设置为旋转变换
     * @param angle 旋转角度（弧度）
     * @param centerX 旋转中心X坐标
     * @param centerY 旋转中心Y坐标
     * @returns 当前实例（链式调用）
     */
    setToRotation(angle: number, centerX: number, centerY: number): this;

    /**
     * 判断两个变换是否相等
     * @param transform 要比较的变换
     * @returns 如果所有矩阵元素都相等返回true
     */
    equals(transform: AffineTransform): boolean;
}