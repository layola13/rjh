/**
 * 渲染项配置接口
 */
interface RenderItemConfig {
  /** 友好显示名称 */
  friendlyName: string;
  /** 项的值 */
  value: unknown;
}

/**
 * 标签输入禁用组件的属性
 */
interface LabelInputDisabledProps {
  /** 标签文本 */
  label: string;
  /** 输入值 */
  value: unknown;
}

/**
 * 获取标签输入禁用组件的服务接口
 */
interface RenderService {
  /**
   * 获取标签输入禁用组件
   * @param props - 组件属性
   * @returns 渲染的组件元素
   */
  getLabelInputDisabledCom(props: LabelInputDisabledProps): React.ReactElement | JSX.Element;
}

/**
 * 获取渲染项的函数
 * @param config - 渲染项配置
 * @param service - 渲染服务实例
 * @returns 渲染的组件元素
 */
declare function getRenderItem(
  config: RenderItemConfig,
  service: RenderService
): React.ReactElement | JSX.Element;

export default getRenderItem;