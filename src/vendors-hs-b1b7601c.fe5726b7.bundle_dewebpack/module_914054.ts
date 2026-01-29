import React from 'react';
import WangEditor from 'wangeditor';
import { generateId } from './utils/id';
import { isEqualString, isEmpty, difference } from './utils/helpers';
import { replaceHTMLImgBlobURL } from './utils/image';
import ImgFileManager from './ImgFileManager';

interface EditorConfig {
  zIndex?: number;
  placeholder?: string;
  onchange?: (html: string) => void;
  onfocus?: (event: FocusEvent) => void;
  onblur?: (event: FocusEvent) => void;
  linkImgCallback?: (url: string) => void;
  onlineVideoCallback?: (url: string) => void;
  customUploadImg?: (files: File[], insertImgFn: (url: string) => void) => void;
  languages?: Record<string, unknown>;
}

interface HookMap {
  [key: string]: (...args: unknown[]) => void;
}

interface ReactWEditorProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  config?: EditorConfig;
  languages?: Record<string, unknown>;
  onChange?: (html: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  linkImgCallback?: (url: string) => void;
  onlineVideoCallback?: (url: string) => void;
  localBlobImg?: boolean;
  globalHook?: HookMap;
  instanceHook?: HookMap;
}

class ReactWEditor extends React.PureComponent<ReactWEditorProps> {
  private readonly id: string = generateId(8);
  private hasCreated: boolean = false;
  private imgFile: ImgFileManager = new ImgFileManager();
  private defaultConfig: EditorConfig = {
    zIndex: 1
  };
  private editor: WangEditor | null = null;

  componentDidUpdate(prevProps: ReactWEditorProps): void {
    const prevValue = prevProps.value;
    if (!isEqualString(prevValue, this.props.value)) {
      this.setContentByHTMLString(this.props.value);
    }
  }

  componentDidMount(): void {
    try {
      this.init();
      this.create();
    } catch (error) {
      console.error(`[ReactWEditor Error]: ${error}`);
    }
  }

  componentWillUnmount(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  private __hook__run = (
    hookNames: string[] = [],
    hookParams: unknown[][] = [],
    target: Record<string, unknown>
  ): void => {
    hookNames.forEach((hookName, index) => {
      if (hookName in target && typeof target[hookName] === 'function' && hookParams[index]) {
        (target[hookName] as Function).apply(target[hookName], hookParams[index]);
      } else if (/^(\w+\.\w+)+$/.test(hookName) && hookParams[index]) {
        const paths = hookName.split('.');
        const contexts: unknown[] = [];
        let currentTarget: Record<string, unknown> = target;

        paths.forEach((path) => {
          contexts.push(currentTarget);
          currentTarget = currentTarget[path] as Record<string, unknown>;
        });

        contexts.push(currentTarget);

        if (typeof currentTarget === 'function') {
          currentTarget.apply(contexts[contexts.length - 2], hookParams[index]);
        } else if (typeof hookParams[index] === 'function') {
          (hookParams[index] as Function).apply(hookParams[index], contexts);
        }
      }
    });
  };

  private setDefaultConfigByProps = (): void => {
    const {
      placeholder,
      onChange,
      onFocus,
      onBlur,
      linkImgCallback,
      onlineVideoCallback,
      localBlobImg
    } = this.props;

    if (placeholder) {
      this.defaultConfig.placeholder = placeholder;
    }
    if (onChange) {
      this.defaultConfig.onchange = onChange;
    }
    if (onFocus) {
      this.defaultConfig.onfocus = onFocus;
    }
    if (onBlur) {
      this.defaultConfig.onblur = onBlur;
    }
    if (linkImgCallback) {
      this.defaultConfig.linkImgCallback = linkImgCallback;
    }
    if (onlineVideoCallback) {
      this.defaultConfig.onlineVideoCallback = onlineVideoCallback;
    }
    if (localBlobImg) {
      this.defaultConfig.customUploadImg = (files: File[], insertImgFn: (url: string) => void) => {
        files.forEach((file) => {
          const blobUrl = URL.createObjectURL(file);
          this.imgFile.saveImgFiles(blobUrl, file);
          insertImgFn(blobUrl);
        });
      };
    }
  };

  private changeCreatedFlag = (created: boolean): boolean => {
    return this.hasCreated = created;
  };

  private created = (): boolean => {
    return this.changeCreatedFlag(true);
  };

  private destroyed = (): boolean => {
    return this.changeCreatedFlag(false);
  };

  private isCreated = (): boolean => {
    return this.hasCreated === true;
  };

  private __before__instanced(): void {
    const { globalHook = {} } = this.props;
    const hookNames = Object.keys(globalHook);
    const hookParams = Object.values(globalHook);
    this.__hook__run(hookNames, hookParams, WangEditor as unknown as Record<string, unknown>);
  }

  private __after__instanced(): void {
    if (this.check()) {
      const { instanceHook = {} } = this.props;
      const hookNames = Object.keys(instanceHook);
      const hookParams = Object.values(instanceHook);
      this.__hook__run(hookNames, hookParams, this.editor as unknown as Record<string, unknown>);
    }
  }

  private init(): void {
    const editorElement = document.getElementById(`editor-${this.id}`);
    if (editorElement) {
      this.__before__instanced();
      this.editor = new WangEditor(`#editor-${this.id}`);
      this.__after__instanced();
      this.setDefaultConfigByProps();
      this.setConfig(this.defaultConfig);
    } else {
      console.error('[ReactWEditor Error]: dom is not found');
    }
  }

  private check(): boolean {
    if (!this.editor) {
      console.error('[ReactWEditor Error]: editor not found');
      return false;
    }
    return true;
  }

  private create(extensions: Record<string, unknown> = {}): void {
    const { config, defaultValue } = this.props;
    if (this.check()) {
      this.setConfig(config);
      this.extend(extensions);
      this.editor!.create();
      this.created();
      this.setContentByHTMLString(defaultValue);
    }
  }

  private extend(extensions: Record<string, unknown> = {}, excludeKeys: string[] = []): void {
    if (this.check()) {
      const editorKeys = Object.keys(this.editor!).concat(excludeKeys ?? []);
      const newKeys = difference(Object.keys(extensions), editorKeys);
      newKeys.forEach((key) => {
        (this.editor as Record<string, unknown>)[key] = extensions[key];
      });
    }
  }

  public destroy(): void {
    if (this.isCreated()) {
      this.editor!.destroy();
      this.editor = null;
      this.destroyed();
    } else {
      console.error("[ReactWEditor Error]: editor has not created, don't destroy.");
    }
  }

  private setConfig(config?: EditorConfig): void {
    if (config) {
      this.editor!.config = Object.assign(this.editor!.config, config);
    }
    const { languages } = this.props;
    if (languages && !isEmpty(languages)) {
      this.editor!.config.languages = Object.assign(this.editor!.config.languages, languages);
    }
  }

  private setContentByHTMLString(html?: string): void {
    if (!this.isCreated()) {
      console.error('[ReactWEditor Error]: editor has not created');
    }
    if (this.check()) {
      try {
        this.editor!.txt.html(html);
      } catch (error) {
        console.error(`[ReactWEditor Error]: ${error}`);
      }
    }
  }

  public replaceHTMLImgBlobURL(html: string, callback: (url: string) => string): string {
    return replaceHTMLImgBlobURL(html, this.imgFile.getAllImgFiles(), callback);
  }

  render(): React.ReactElement {
    const { style, className } = this.props;
    return React.createElement('div', {
      style,
      className,
      id: `editor-${this.id}`
    });
  }
}

export default ReactWEditor;