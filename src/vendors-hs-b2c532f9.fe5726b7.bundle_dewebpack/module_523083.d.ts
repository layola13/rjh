/**
 * GZip 文件头信息类
 * 用于存储和管理 GZip 压缩格式的文件头元数据
 * 符合 RFC 1952 GZip 文件格式规范
 */
export class GZipHeader {
  /**
   * 文本标志位
   * 如果设置为1，表示文件可能是ASCII文本
   * @default 0
   */
  text: number;

  /**
   * 文件修改时间戳
   * Unix时间戳格式（秒数）
   * @default 0
   */
  time: number;

  /**
   * 额外标志位
   * 用于指示压缩方法的特定信息
   * @default 0
   */
  xflags: number;

  /**
   * 操作系统标识
   * 表示压缩文件的原始操作系统类型
   * 常见值: 0=FAT, 3=Unix, 7=Macintosh, 11=NTFS
   * @default 0
   */
  os: number;

  /**
   * 额外字段数据
   * 可选的额外数据内容
   * @default null
   */
  extra: Uint8Array | null;

  /**
   * 额外字段长度
   * extra字段的字节数
   * @default 0
   */
  extra_len: number;

  /**
   * 原始文件名
   * 以null结尾的原始文件名字符串
   * @default ""
   */
  name: string;

  /**
   * 文件注释
   * 以null结尾的注释字符串
   * @default ""
   */
  comment: string;

  /**
   * 头部CRC校验值
   * 用于验证头部数据完整性的16位CRC值
   * @default 0
   */
  hcrc: number;

  /**
   * 解析完成标志
   * 表示头部是否已完全解析
   * @default false
   */
  done: boolean;

  constructor();
}

export default GZipHeader;