/**
 * 语音录制器模块
 * 提供语音录制、上传和语音转文字功能
 */

/**
 * 语音处理状态枚举
 */
export enum VoiceStatus {
  /** 正在录音 */
  Recording = 1,
  /** 正在转换/翻译 */
  Translate = 2,
  /** 处理完成 */
  Done = 3
}

/**
 * 语音录制器组件属性
 */
export interface VoiceRecorderProps {
  /**
   * 语音处理状态变化回调
   * @param status - 当前处理状态
   */
  onVoiceProcess: (status: VoiceStatus) => void;

  /**
   * 语音处理完成回调
   * @param result - 转换结果文本或错误信息
   * @param success - 是否处理成功
   */
  onVoiceDone: (result: string, success: boolean) => void;
}

/**
 * 文件上传响应数据
 */
interface UploadUrlResponse {
  /** 返回状态码数组 */
  ret: string[];
  /** 响应数据 */
  data?: {
    /** 上传目标URL */
    url: string;
    /** 文件类型 */
    fileType: string;
  };
}

/**
 * 语音转文字响应数据
 */
interface ChatDialogueResponse {
  /** 返回状态码数组 */
  ret?: string[];
  /** 响应数据 */
  data?: {
    /** 消息内容 */
    message?: string;
    /** 模型响应 */
    model?: {
      /** 消息内容 */
      message?: string;
    };
  };
}

/**
 * 语音转文字结果
 */
interface SpeechToTextResult {
  /** 转换后的文本 */
  text: string;
}

/**
 * 语音录制器React组件
 * 
 * 功能：
 * - 支持按键快捷操作（S键开始录音，E键结束录音）
 * - 自动上传音频文件到OSS
 * - 调用AI服务进行语音转文字
 * - 鼠标悬停状态管理
 * 
 * @param props - 组件属性
 * @returns React元素
 */
export declare function VoiceRecorder(props: VoiceRecorderProps): React.ReactElement;

/**
 * 组件内部状态和方法（类型声明）
 */
declare namespace VoiceRecorderInternal {
  /** 音频数据块数组 */
  type AudioChunks = Blob[];

  /** 录音状态 */
  type RecordingState = boolean;

  /** 悬停状态 */
  type HoverState = boolean;

  /** 媒体流引用 */
  type MediaStreamRef = React.MutableRefObject<MediaStream | null>;

  /** 媒体录制器引用 */
  type MediaRecorderRef = React.MutableRefObject<MediaRecorder | null>;

  /** 录音进行中标志 */
  type RecordingFlagRef = React.MutableRefObject<boolean>;

  /**
   * 开始录音
   * 请求麦克风权限并启动MediaRecorder
   */
  function startRecording(): Promise<void>;

  /**
   * 停止录音
   * 停止MediaRecorder并释放媒体流资源
   */
  function stopRecording(): void;

  /**
   * 键盘事件处理
   * @param event - 键盘事件对象
   */
  function handleKeyDown(event: KeyboardEvent): void;

  /**
   * 鼠标悬停状态处理
   * @param isHovering - 是否悬停
   */
  function handleHover(isHovering: boolean): void;

  /**
   * 上传音频文件到OSS
   * @param audioBlob - 音频Blob对象
   * @returns 上传后的文件URL
   */
  function uploadAudioFile(audioBlob: Blob): Promise<string>;

  /**
   * 调用语音转文字服务
   * @param fileUrl - 音频文件URL
   * @returns 转换后的文本
   */
  function speechToText(fileUrl: string): Promise<string>;
}