import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

/**
 * 图片上传组件的属性接口
 */
interface UploadImageProps {
  /** 文件列表 */
  fileList?: unknown[];
  /** 是否显示标签 */
  showLabel?: boolean;
  /** 初始图片源地址 */
  initialSrc?: string;
  /** 组件宽度（像素） */
  width?: number;
  /** 组件高度（像素） */
  height?: number;
  /** 是否支持多选 */
  multiple?: boolean;
}

/**
 * 图片上传组件的数据接口
 */
interface UploadImageData {
  /** 图片源地址数组 */
  src: string[];
  /** 是否显示图片查看器 */
  viewImg: boolean;
  /** 当前选中的图片地址 */
  choosedImg: string;
}

/**
 * 图片上传组件事件接口
 */
interface UploadImageEvents {
  /** 当输入框内容改变时触发 */
  inputChange: (event: Event) => void;
  /** 当图片读取完成时触发 */
  imgReadComplete: (sources: string[]) => void;
  /** 当删除图片时触发 */
  deletePic: (index: number) => void;
}

/**
 * 图片上传组件
 * 支持单个或多个图片上传、预览和删除功能
 */
@Component({
  name: 'UploadImage',
  components: {
    ImgViewer
  }
})
export default class UploadImage extends Vue implements UploadImageData {
  /** 文件列表属性 */
  @Prop({ 
    type: Array, 
    default: () => [] 
  })
  readonly fileList!: unknown[];

  /** 是否显示标签 */
  @Prop({ 
    type: Boolean, 
    default: true 
  })
  readonly showLabel!: boolean;

  /** 初始图片源地址 */
  @Prop({ 
    type: String, 
    default: '' 
  })
  readonly initialSrc!: string;

  /** 组件宽度 */
  @Prop({ 
    type: Number, 
    default: 90 
  })
  readonly width!: number;

  /** 组件高度 */
  @Prop({ 
    type: Number, 
    default: 90 
  })
  readonly height!: number;

  /** 是否支持多选 */
  @Prop({ 
    type: Boolean, 
    default: false 
  })
  readonly multiple!: boolean;

  /** 图片源地址数组 */
  src: string[] = [];

  /** 是否显示图片查看器 */
  viewImg = false;

  /** 当前选中的图片地址 */
  choosedImg = '';

  /**
   * 监听初始图片源变化
   * @param newValue - 新的图片源地址
   * @param oldValue - 旧的图片源地址
   */
  @Watch('initialSrc')
  onInitialSrcChange(newValue: string, oldValue: string): void {
    if (newValue) {
      this.src = [newValue];
    }
  }

  /**
   * 组件挂载时初始化图片源
   */
  mounted(): void {
    if (this.initialSrc) {
      this.src = [this.initialSrc];
    }
  }

  /**
   * 处理文件输入变化事件
   * @param event - 输入事件对象
   */
  async inputChange(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files || files.length === 0) {
      return;
    }

    this.$emit('inputChange', event);

    const fileCount = files.length;
    for (let i = 0; i < fileCount; i++) {
      await this.readImg(files[i], i, fileCount - 1);
    }
  }

  /**
   * 读取图片文件并转换为Base64
   * @param file - 要读取的文件对象
   * @param index - 当前文件索引
   * @param lastIndex - 最后一个文件的索引
   */
  readImg(file: File, index: number, lastIndex: number): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;

        if (result && typeof result === 'string') {
          this.src.push(result);

          // 如果是最后一个文件，触发完成事件
          if (index === lastIndex) {
            this.$emit('imgReadComplete', this.src);
          }
        }

        resolve();
      };

      reader.readAsDataURL(file);
    });
  }

  /**
   * 删除指定索引的图片
   * @param index - 要删除的图片索引
   */
  deletePic(index: number): void {
    this.src.splice(index, 1);
    this.$emit('deletePic', index);
  }

  /**
   * 清空文件输入框中的文件
   */
  removeFiles(): void {
    const fileInput = document.querySelector('#file') as HTMLInputElement;
    if (fileInput) {
      const dataTransfer = new DataTransfer();
      fileInput.files = dataTransfer.files;
    }
  }
}