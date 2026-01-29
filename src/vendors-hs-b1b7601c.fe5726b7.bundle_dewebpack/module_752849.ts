import React from 'react';

interface WEditorConfig {
  // 根据实际使用情况定义配置接口
  [key: string]: unknown;
}

export default function withWEditor<P extends object>(
  config: WEditorConfig
): React.ComponentType<P> {
  return class WEditorComponent extends React.Component<P> {
    constructor(props: P) {
      super(props);
    }

    componentDidMount(): void {
      try {
        this.init();
        this.create(config);
      } catch (error) {
        console.error('[ReactWEditor Error]:', error);
      }
    }

    private init(): void {
      // 初始化逻辑
    }

    private create(editorConfig: WEditorConfig): void {
      // 创建编辑器逻辑
    }
  };
}