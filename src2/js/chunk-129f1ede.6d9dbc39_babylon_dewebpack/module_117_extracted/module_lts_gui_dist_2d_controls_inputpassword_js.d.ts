import { InputText } from "./inputText";
import { TextWrapper } from "./textWrapper";
import { RegisterClass } from "core/Misc/typeStore";

/**
 * InputPassword控件 - 密码输入框组件
 * 继承自InputText，将输入内容显示为圆点以隐藏密码
 */
export class InputPassword extends InputText {
    /**
     * 获取控件类型名称
     * @returns 控件类型字符串 "InputPassword"
     */
    protected _getTypeName(): string {
        return "InputPassword";
    }

    /**
     * 渲染文本前的处理 - 将实际文本转换为圆点显示
     * @param text - 原始输入文本
     * @returns 包含圆点字符的TextWrapper对象，用于隐藏实际内容
     */
    protected _beforeRenderText(text: string): TextWrapper {
        const wrapper = new TextWrapper();
        let maskedText = "";
        
        // 将每个字符替换为圆点
        for (let i = 0; i < text.length; i++) {
            maskedText += "•";
        }
        
        wrapper.text = maskedText;
        return wrapper;
    }
}

// 注册类到Babylon.js类型系统
RegisterClass("BABYLON.GUI.InputPassword", InputPassword);