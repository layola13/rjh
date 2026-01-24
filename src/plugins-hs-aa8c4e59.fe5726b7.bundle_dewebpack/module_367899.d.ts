import React from 'react';
import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'; // 假设来自UI库

// 图片资源导入
import defaultImage from './assets/default-image';
import fpImage from './assets/fp-image';

/**
 * 弹窗回调配置接口
 */
interface ModalCallbackConfig {
  /** 关闭弹窗后的回调函数 */
  callback: () => void;
}

/**
 * 房间类型提示组件的属性接口
 */
interface RoomTypeTipProps {
  /** 传递给组件的数据配置 */
  data: ModalCallbackConfig;
}

/**
 * 自动样式房间类型设置提示工具类
 * 用于显示房间类型设置相关的提示弹窗
 */
class AutoStylerRoomTypeTip {
  /**
   * 显示房间类型设置提示弹窗
   * @param callback - 可选的回调函数，在用户确认后执行
   */
  static show(callback?: () => void): void {
    const config: ModalCallbackConfig = {
      callback: () => {
        callback?.();
        Modal.close('simple');
      }
    };

    Modal.simple({
      title: ResourceManager.getString('plugin_autostylerz_roomtype_setting_tip'),
      content: React.createElement(RoomTypeTipComponent, { data: config }),
      enableCheckbox: false,
      showFooter: false
    });
  }
}

/**
 * 房间类型提示弹窗内容组件
 * 展示提示图片、描述文本和操作按钮
 */
class RoomTypeTipComponent extends Component<RoomTypeTipProps> {
  constructor(props: RoomTypeTipProps) {
    super(props);
    this.handleAction = this.handleAction.bind(this);
  }

  /**
   * 处理用户点击操作按钮的事件
   * 触发回调并关闭弹窗
   */
  private handleAction(): void {
    this.props.data.callback?.();
  }

  /**
   * 渲染组件内容
   */
  render(): JSX.Element {
    // 根据租户配置选择不同的图片资源
    const imageSrc = HSApp.Config.TENANT === 'fp' ? fpImage : defaultImage;

    return (
      <div className="autostyler-roomtype-tip">
        <div className="tip-img">
          <img src={imageSrc} alt="Room type tip" />
        </div>
        <p className="tip-desc">
          {ResourceManager.getString('plugin_autostylerz_roomtype_setting_description')}
        </p>
        <Button
          className="autostyler-roomtype-tip-action-btn"
          type="primary"
          onClick={this.handleAction}
        >
          {ResourceManager.getString('plugin_autostylerz_roomtype_setting_tip_action')}
        </Button>
      </div>
    );
  }
}

export default AutoStylerRoomTypeTip;