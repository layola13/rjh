import { Component, createRef, RefObject } from 'react';
import WangEditor from 'wangeditor';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import { FeedbackBlock } from './FeedbackBlock';
import { uploadFileToS3 } from './utils';
import './styles.css';

interface FeedbackTextareaEditBlockProps {
  data?: {
    content?: string;
  };
  name: string;
  label: string;
  required?: boolean;
  maxLen: number;
}

interface FeedbackTextareaEditBlockState {
  value: string;
  absoluteValue: string;
  textLen: number;
  imgList: string[];
}

interface EditorRefType {
  editor: WangEditor;
}

interface GetValueResult {
  [key: string]: string | string[];
}

export class FeedbackTextareaEditBlock extends FeedbackBlock<
  FeedbackTextareaEditBlockProps,
  FeedbackTextareaEditBlockState
> {
  private editorRef: RefObject<EditorRefType>;

  constructor(props: FeedbackTextareaEditBlockProps) {
    super(props);

    const { data } = props;
    this.state = {
      value: data?.content ?? '',
      absoluteValue: data?.content ?? '',
      textLen: 0,
      imgList: [],
    };

    this.editorRef = createRef<EditorRefType>();
  }

  componentDidMount(): void {
    this.bindEvents();
  }

  componentWillUnmount(): void {
    this.offEvents();
  }

  private handleImg = async (file: File, callback: (url: string) => void): Promise<void> => {
    try {
      const url = await uploadFileToS3(file);
      callback(url);
    } catch {
      (window as any).LiveHint?.show('图片粘贴失败', 3000);
    }
  };

  private bindEvents = (): void => {
    const editor = this.editorRef.current?.editor;
    const textContainer = editor?.$textContainerElem.elems[0] as HTMLElement | undefined;
    const { data } = this.props;

    if (data?.content && editor && !editor.txt.text()) {
      editor.txt.append(data.content);
    }

    if (!textContainer) return;

    textContainer.onpaste = async (event: ClipboardEvent): Promise<void> => {
      event.stopPropagation();

      const clipboardData = event.clipboardData;
      if (!clipboardData || clipboardData.files.length === 0) return;

      const files = clipboardData.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'image/png') {
          const handleImageUpload = (url: string): void => {
            editor?.txt.append(`<img src="${url}"/>`);
            this.keepLastIndex(editor?.$textElem?.elems[0] as HTMLElement);

            const currentImgList = [...this.state.imgList];
            currentImgList.push(url);
            this.setState({ imgList: currentImgList });
          };

          await this.handleImg(file, handleImageUpload);
        }
      }
    };

    textContainer.onkeydown = (event: KeyboardEvent): void => {
      event.stopPropagation();
    };

    textContainer.onkeypress = (event: KeyboardEvent): void => {
      event.stopPropagation();
      const { value } = this.state;
      const { maxLen } = this.props;

      if (value.length >= maxLen) {
        event.preventDefault();
      }
    };
  };

  private offEvents = (): void => {
    const editor = this.editorRef.current?.editor;
    const textContainer = editor?.$textContainerElem.elems[0] as HTMLElement | undefined;

    if (textContainer) {
      textContainer.onpaste = null;
      textContainer.onkeydown = null;
      textContainer.onkeypress = null;
    }
  };

  getValue(): GetValueResult {
    const { name } = this.props;
    const result: GetValueResult = {
      [name]: this.state.absoluteValue,
    };

    if (this.state.imgList.length > 0) {
      result['extraData.image'] = this.state.imgList;
      if (!result[name]) {
        result[name] = (window as any).ResourceManager?.getString('plugin_feedback_has_no_desc') ?? '';
      }
    }

    return result;
  }

  dataExtend(): boolean {
    return true;
  }

  isEmpty(): boolean {
    const values = this.getValue();
    let hasContent = false;

    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (
        (typeof value === 'string' && value.length > 0) ||
        (Array.isArray(value) && value.length > 0)
      ) {
        hasContent = true;
      }
    });

    return !!this.props.required && !hasContent;
  }

  private keepLastIndex(element: HTMLElement | undefined): void {
    if (!element || !window.getSelection) return;

    element.focus();
    const selection = window.getSelection();
    selection?.selectAllChildren(element);
    selection?.collapseToEnd();
  }

  render() {
    const { label, required, maxLen } = this.props;
    const { textLen, imgList } = this.state;
    const placeholder =
      (window as any).ResourceManager?.getString('plugin_feedback_placeholder_support_txt_and_img') ?? '';
    const baseClassName = 'feedback-textarea-edit';
    const editorClassName = imgList.length > 0 ? `${baseClassName} feedback-textarea-edit-large` : baseClassName;

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-textarea-edit-block ${this.context}`}>
          <FeedbackBlockLabel label={label} required={required}>
            <span className="textareedit-limit">
              <span className={textLen > maxLen - 1 ? 'textareedit-limit-red' : ''}>
                {textLen}
              </span>
              <span>/{maxLen}</span>
            </span>
          </FeedbackBlockLabel>
          <WangEditor
            className={editorClassName}
            ref={this.editorRef}
            onChange={() => {
              const editor = this.editorRef.current?.editor;
              if (!editor) return;

              const textElem = editor.$textElem?.elems?.[0] as HTMLElement | undefined;
              let textContent = textElem?.innerText ?? editor.txt.text();
              let trimmedText = textContent.replace(/&nbsp;|\s*/g, '');
              const htmlContent = editor.txt.html() ?? '';
              const filteredImgList = this.state.imgList.filter((url) => htmlContent.includes(url));

              const MAX_LENGTH = 300;
              if (trimmedText.length > MAX_LENGTH) {
                textContent = trimmedText = trimmedText.slice(0, MAX_LENGTH);
                editor.txt.text(trimmedText);
              }

              this.setState({
                value: trimmedText,
                absoluteValue: textContent,
                textLen: trimmedText.length,
                imgList: filteredImgList,
              });
            }}
            config={{
              height: 80,
              menus: [],
              pasteFilterStyle: true,
              pasteIgnoreImg: false,
              showFullScreen: false,
              uploadImgShowBase64: true,
              placeholder,
              zIndex: 0,
            }}
          />
        </div>
      </FeedbackBlockWrapper>
    );
  }
}