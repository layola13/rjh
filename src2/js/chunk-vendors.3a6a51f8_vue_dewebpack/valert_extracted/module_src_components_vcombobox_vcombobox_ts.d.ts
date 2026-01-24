import { VNodeData, VNode } from 'vue';
import VAutocomplete from '../VAutocomplete/VAutocomplete';
import VSelect from '../VSelect/VSelect';

/**
 * VCombobox 组件类型定义
 * 
 * 组合框组件，继承自 VAutocomplete，支持用户输入任意值
 * 提供多选、标签编辑、自定义分隔符等功能
 */
declare const VCombobox: {
  name: 'v-combobox';
  
  /**
   * 组件属性
   */
  props: {
    /**
     * 分隔符数组，用于在输入时自动创建标签
     * @default []
     * @example [',', ';', ' ']
     */
    delimiters: {
      type: ArrayConstructor;
      default(): string[];
    };
    
    /**
     * 是否返回完整对象而非仅值
     * @default true
     */
    returnObject: {
      type: BooleanConstructor;
      default: true;
    };
  };
  
  /**
   * 组件数据
   */
  data(): {
    /**
     * 当前正在编辑的项目索引
     * -1 表示未处于编辑状态
     */
    editingIndex: number;
  };
  
  /**
   * 计算属性
   */
  computed: {
    /**
     * 计算用于计数器显示的值
     * 多选模式返回已选项数量，单选模式返回搜索文本长度
     */
    computedCounterValue(): number;
    
    /**
     * 检查是否存在自定义插槽
     * 继承自 VSelect 的逻辑，或在多选模式下返回 true
     */
    hasSlot(): boolean;
    
    /**
     * 是否允许任意值
     * VCombobox 始终允许输入任意值
     */
    isAnyValueAllowed(): boolean;
    
    /**
     * 下拉菜单是否可以显示
     * 需要组件处于聚焦状态，且有可显示项或存在 no-data 插槽
     */
    menuCanShow(): boolean;
  };
  
  /**
   * 组件方法
   */
  methods: {
    /**
     * 内部搜索值变化时的处理函数
     * 检测分隔符并在多选模式下自动创建标签
     * 
     * @param searchValue - 新的搜索值
     */
    onInternalSearchChanged(searchValue: string): void;
    
    /**
     * 生成输入框元素
     * 移除 name 属性并添加粘贴事件处理
     * 
     * @returns 输入框的 VNode
     */
    genInput(): VNode;
    
    /**
     * 生成选中项的芯片（chip）元素
     * 在多选模式下，双击芯片可进入编辑状态
     * 
     * @param item - 选中的项目数据
     * @param index - 项目在已选列表中的索引
     * @returns 芯片的 VNode
     */
    genChipSelection(item: unknown, index: number): VNode;
    
    /**
     * 芯片输入事件处理
     * 重置编辑索引状态
     * 
     * @param chipValue - 芯片关联的值
     */
    onChipInput(chipValue: unknown): void;
    
    /**
     * Enter 键按下时的处理
     * 阻止默认行为，在未选中菜单项时更新当前值
     * 
     * @param event - 键盘事件对象
     */
    onEnterDown(event: KeyboardEvent): void;
    
    /**
     * 过滤项变化时的处理
     * 仅在启用自动选择首项时调用父类方法
     * 
     * @param newItems - 新的过滤项列表
     * @param oldItems - 旧的过滤项列表
     */
    onFilteredItemsChanged(newItems: unknown[], oldItems: unknown[]): void;
    
    /**
     * 键盘按下事件的通用处理
     * 处理左箭头（多选时移动到芯片）和 Enter 键
     * 
     * @param event - 键盘事件对象
     */
    onKeyDown(event: KeyboardEvent): void;
    
    /**
     * Tab 键按下时的处理
     * 在多选模式且有未提交输入时，阻止默认行为并创建标签
     * 
     * @param event - 键盘事件对象
     */
    onTabDown(event: KeyboardEvent): void;
    
    /**
     * 选择菜单中的项目
     * 如果正在编辑则更新编辑项，否则执行正常选择
     * 
     * @param item - 要选择的项目
     */
    selectItem(item: unknown): void;
    
    /**
     * 根据内部值设置已选项列表
     * 处理空值、单选和多选场景
     */
    setSelectedItems(): void;
    
    /**
     * 设置组件的值
     * 如果未提供值则使用当前搜索文本
     * 
     * @param value - 要设置的新值
     */
    setValue(value?: unknown): void;
    
    /**
     * 更新正在编辑的项目
     * 用搜索文本替换编辑索引处的项，并退出编辑状态
     */
    updateEditing(): void;
    
    /**
     * 更新组合框的值（单选模式）
     * 在搜索文本与当前值不一致时设置新值
     */
    updateCombobox(): void;
    
    /**
     * 更新组件自身状态
     * 多选模式调用 updateTags，单选模式调用 updateCombobox
     */
    updateSelf(): void;
    
    /**
     * 更新标签列表（多选模式）
     * 处理添加、删除和编辑标签的逻辑
     */
    updateTags(): void;
    
    /**
     * 粘贴事件处理
     * 在多选模式下支持粘贴 Vuetify 特定格式的项目数据
     * 
     * @param event - 剪贴板事件对象
     */
    onPaste(event: ClipboardEvent): void;
  };
};

export default VCombobox;