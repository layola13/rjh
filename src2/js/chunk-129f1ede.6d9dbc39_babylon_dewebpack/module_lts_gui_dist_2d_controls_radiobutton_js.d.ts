import { Observable } from "core/Misc/observable";
import { Control } from "../../../lts/gui/dist/2D/controls/control.js";
import { StackPanel } from "../../../lts/gui/dist/2D/controls/stackPanel.js";
import { TextBlock } from "../../../lts/gui/dist/2D/controls/textBlock.js";

/**
 * 单选按钮控件，用于在一组选项中选择一个
 * 通过 group 属性将多个单选按钮分组，同一组内只能有一个被选中
 */
export class RadioButton extends Control {
    /**
     * 控件名称
     */
    name: string;

    /**
     * 是否选中状态
     * @private
     */
    private _isChecked: boolean = false;

    /**
     * 背景颜色
     * @private
     */
    private _background: string = "black";

    /**
     * 选中标记相对于整个按钮的尺寸比例（0-1之间）
     * @private
     */
    private _checkSizeRatio: number = 0.8;

    /**
     * 边框粗细（像素）
     * @private
     */
    private _thickness: number = 1;

    /**
     * 分组名称，相同组名的单选按钮互斥
     */
    group: string = "";

    /**
     * 选中状态变化时触发的观察者
     */
    onIsCheckedChangedObservable: Observable<boolean>;

    /**
     * 是否阻止指针事件穿透
     */
    isPointerBlocker: boolean = true;

    /**
     * 获取边框粗细
     */
    get thickness(): number {
        return this._thickness;
    }

    /**
     * 设置边框粗细
     * @param value - 边框粗细值（像素）
     */
    set thickness(value: number) {
        if (this._thickness !== value) {
            this._thickness = value;
            this._markAsDirty();
        }
    }

    /**
     * 获取选中标记的尺寸比例
     */
    get checkSizeRatio(): number {
        return this._checkSizeRatio;
    }

    /**
     * 设置选中标记的尺寸比例
     * @param value - 比例值，会被限制在 0-1 之间
     */
    set checkSizeRatio(value: number) {
        value = Math.max(Math.min(1, value), 0);
        if (this._checkSizeRatio !== value) {
            this._checkSizeRatio = value;
            this._markAsDirty();
        }
    }

    /**
     * 获取背景颜色
     */
    get background(): string {
        return this._background;
    }

    /**
     * 设置背景颜色
     * @param value - CSS颜色值
     */
    set background(value: string) {
        if (this._background !== value) {
            this._background = value;
            this._markAsDirty();
        }
    }

    /**
     * 获取是否选中
     */
    get isChecked(): boolean {
        return this._isChecked;
    }

    /**
     * 设置是否选中
     * 选中时会自动取消同组其他单选按钮的选中状态
     * @param value - 是否选中
     */
    set isChecked(value: boolean) {
        if (this._isChecked !== value) {
            this._isChecked = value;
            this._markAsDirty();
            this.onIsCheckedChangedObservable.notifyObservers(value);

            if (this._isChecked && this._host) {
                this._host.executeOnAllControls((control: RadioButton) => {
                    if (control === this || control.group === undefined) {
                        return;
                    }
                    if (control.group === this.group) {
                        control.isChecked = false;
                    }
                });
            }
        }
    }

    /**
     * 构造函数
     * @param name - 控件名称
     */
    constructor(name: string) {
        super(name);
        this.name = name;
        this.onIsCheckedChangedObservable = new Observable<boolean>();
    }

    /**
     * 获取控件类型名称
     * @returns 类型名称字符串
     * @internal
     */
    protected _getTypeName(): string {
        return "RadioButton";
    }

    /**
     * 绘制控件
     * @param context - Canvas 2D渲染上下文
     * @internal
     */
    protected _draw(context: CanvasRenderingContext2D): void {
        context.save();
        this._applyStates(context);

        const width = this._currentMeasure.width - this._thickness;
        const height = this._currentMeasure.height - this._thickness;

        // 应用阴影效果
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowColor = this.shadowColor;
            context.shadowBlur = this.shadowBlur;
            context.shadowOffsetX = this.shadowOffsetX;
            context.shadowOffsetY = this.shadowOffsetY;
        }

        // 绘制外圈背景
        const centerX = this._currentMeasure.left + this._currentMeasure.width / 2;
        const centerY = this._currentMeasure.top + this._currentMeasure.height / 2;
        const radiusX = this._currentMeasure.width / 2 - this._thickness / 2;
        const radiusY = this._currentMeasure.height / 2 - this._thickness / 2;

        Control.drawEllipse(centerX, centerY, radiusX, radiusY, context);
        context.fillStyle = this._isEnabled ? this._background : this._disabledColor;
        context.fill();

        // 清除阴影
        if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }

        // 绘制边框
        context.strokeStyle = this.color;
        context.lineWidth = this._thickness;
        context.stroke();

        // 如果选中，绘制内圈标记
        if (this._isChecked) {
            context.fillStyle = this._isEnabled ? this.color : this._disabledColor;
            const checkWidth = width * this._checkSizeRatio;
            const checkHeight = height * this._checkSizeRatio;

            Control.drawEllipse(
                centerX,
                centerY,
                checkWidth / 2 - this._thickness / 2,
                checkHeight / 2 - this._thickness / 2,
                context
            );
            context.fill();
        }

        context.restore();
    }

    /**
     * 处理指针按下事件
     * @param target - 事件目标控件
     * @param coordinates - 指针坐标
     * @param pointerId - 指针ID
     * @param buttonIndex - 按钮索引
     * @param type - 指针类型
     * @returns 是否处理了事件
     * @internal
     */
    protected _onPointerDown(
        target: Control,
        coordinates: { x: number; y: number },
        pointerId: number,
        buttonIndex: number,
        type: number
    ): boolean {
        if (!super._onPointerDown(target, coordinates, pointerId, buttonIndex, type)) {
            return false;
        }

        if (!this.isReadOnly && !this.isChecked) {
            this.isChecked = true;
        }

        return true;
    }

    /**
     * 创建一个带标题的单选按钮（静态工厂方法）
     * @param title - 标题文本
     * @param group - 分组名称
     * @param checked - 初始选中状态
     * @param onValueChanged - 状态变化回调函数
     * @returns 包含单选按钮和文本的堆栈面板
     */
    static AddRadioButtonWithHeader(
        title: string,
        group: string,
        checked: boolean,
        onValueChanged: (button: RadioButton, value: boolean) => void
    ): StackPanel {
        const panel = new StackPanel();
        panel.isVertical = false;
        panel.height = "30px";

        const button = new RadioButton(title);
        button.width = "20px";
        button.height = "20px";
        button.isChecked = checked;
        button.color = "green";
        button.group = group;
        button.onIsCheckedChangedObservable.add((value: boolean) => {
            return onValueChanged(button, value);
        });

        panel.addControl(button);

        const textBlock = new TextBlock();
        textBlock.text = title;
        textBlock.width = "180px";
        textBlock.paddingLeft = "5px";
        textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        textBlock.color = "white";

        panel.addControl(textBlock);

        return panel;
    }
}