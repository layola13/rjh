/**
 * VForm 组件类型定义
 * 表单容器组件，提供表单验证和管理功能
 */

/**
 * 表单输入项接口
 * 描述可在 VForm 中注册的输入组件
 */
interface FormInput {
  /** Vue 组件唯一标识符 */
  _uid: number;
  
  /** 输入项是否存在错误 */
  hasError: boolean;
  
  /** 是否应该进行验证 */
  shouldValidate: boolean;
  
  /**
   * 验证输入项
   * @param force - 是否强制验证
   * @returns 验证是否通过
   */
  validate(force: boolean): boolean;
  
  /**
   * 重置输入项到初始状态
   */
  reset(): void;
  
  /**
   * 重置验证状态但保留输入值
   */
  resetValidation(): void;
  
  /**
   * 监听属性变化
   * @param property - 要监听的属性名
   * @param callback - 属性变化时的回调函数
   * @param options - 监听选项
   * @returns 取消监听的函数
   */
  $watch(
    property: string,
    callback: (newValue: boolean) => void,
    options?: { immediate?: boolean }
  ): () => void;
}

/**
 * 输入项监听器接口
 * 存储输入项的监听器信息
 */
interface InputWatcher {
  /** 关联输入项的唯一标识符 */
  _uid: number;
  
  /** 取消有效性监听 */
  valid: () => void;
  
  /** 取消验证状态监听 */
  shouldValidate: () => void;
}

/**
 * 错误记录对象
 * 键为输入项 _uid，值为是否有错误
 */
interface ErrorBag {
  [uid: number]: boolean;
}

/**
 * VForm 组件属性接口
 */
interface VFormProps {
  /** 是否禁用表单中的所有输入项 */
  disabled?: boolean;
  
  /** 是否启用延迟验证（仅在输入项交互后才验证） */
  lazyValidation?: boolean;
  
  /** 是否将表单中的所有输入项设为只读 */
  readonly?: boolean;
  
  /** 表单的验证状态（true 表示通过验证） */
  value?: boolean;
}

/**
 * VForm 组件数据接口
 */
interface VFormData {
  /** 已注册的输入项列表 */
  inputs: FormInput[];
  
  /** 输入项监听器列表 */
  watchers: InputWatcher[];
  
  /** 错误记录对象，记录各输入项的错误状态 */
  errorBag: ErrorBag;
}

/**
 * VForm 组件方法接口
 */
interface VFormMethods {
  /**
   * 监听输入项的验证状态变化
   * @param input - 要监听的输入项
   * @returns 输入项监听器对象
   */
  watchInput(input: FormInput): InputWatcher;
  
  /**
   * 验证表单中的所有输入项
   * @returns 所有输入项是否都通过验证
   */
  validate(): boolean;
  
  /**
   * 重置表单中所有输入项到初始状态
   */
  reset(): void;
  
  /**
   * 重置错误记录对象
   */
  resetErrorBag(): void;
  
  /**
   * 重置表单验证状态但保留输入值
   */
  resetValidation(): void;
  
  /**
   * 注册新的输入项到表单
   * @param input - 要注册的输入项
   */
  register(input: FormInput): void;
  
  /**
   * 从表单中注销输入项
   * @param input - 要注销的输入项
   */
  unregister(input: FormInput): void;
}

/**
 * VForm 组件计算属性接口
 */
interface VFormComputed {
  /** 继承的属性对象 */
  attrs$: Record<string, unknown>;
}

/**
 * VForm 组件提供的上下文接口
 */
interface VFormProvide {
  /** 表单实例引用 */
  form: VFormComponent;
}

/**
 * VForm 组件实例类型
 */
type VFormComponent = VFormProps & 
  VFormData & 
  VFormMethods & 
  VFormComputed & {
    /** 删除响应式属性 */
    $delete(target: ErrorBag, key: number): void;
    
    /** 设置响应式属性 */
    $set(target: ErrorBag, key: number, value: boolean): void;
    
    /** 触发自定义事件 */
    $emit(event: 'input', value: boolean): void;
    $emit(event: 'submit', nativeEvent: Event): void;
    
    /** 插槽内容 */
    $slots: {
      default?: unknown[];
    };
  };

/**
 * VForm 组件定义
 */
declare const VForm: {
  /** 组件名称 */
  name: 'v-form';
  
  /** 提供给子组件的数据 */
  provide(this: VFormComponent): VFormProvide;
  
  /** 不继承根元素属性 */
  inheritAttrs: false;
  
  /** 组件属性定义 */
  props: {
    disabled: { type: BooleanConstructor };
    lazyValidation: { type: BooleanConstructor };
    readonly: { type: BooleanConstructor };
    value: { type: BooleanConstructor };
  };
  
  /** 组件数据工厂函数 */
  data(this: VFormComponent): VFormData;
  
  /** 监听器配置 */
  watch: {
    errorBag: {
      handler(this: VFormComponent, errorBag: ErrorBag): void;
      deep: true;
      immediate: true;
    };
  };
  
  /** 组件方法 */
  methods: VFormMethods;
  
  /** 渲染函数 */
  render(this: VFormComponent, createElement: CreateElement): VNode;
};

export default VForm;

/**
 * Vue 相关类型辅助定义
 */
interface VNode {
  [key: string]: unknown;
}

type CreateElement = (
  tag: string,
  data?: {
    staticClass?: string;
    attrs?: Record<string, unknown>;
    on?: Record<string, (event: Event) => void>;
  },
  children?: unknown[]
) => VNode;