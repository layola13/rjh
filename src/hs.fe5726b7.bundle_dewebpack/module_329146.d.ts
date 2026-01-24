/**
 * Signal管理器类 - 用于管理目录系统中的各种事件信号
 * 采用单例模式，确保全局唯一实例
 */
declare class CatalogSignalManager {
  /**
   * 单例实例
   */
  private static instance: CatalogSignalManager | undefined;

  /**
   * 目录项被点击时触发的信号
   */
  signalItemClicked: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 鼠标悬停在目录项上时触发的信号
   */
  signalItemMouseOver: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 鼠标移出目录项时触发的信号
   */
  signalItemMouseOut: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 独立面板隐藏时触发的信号
   */
  signalIndependentHidden: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 目录展开时触发的信号
   */
  signalExpandCatalog: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 目录显示时触发的信号
   */
  signalShowCatalog: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 独立面板显示时触发的信号
   */
  signalIndependentPanelShow: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 菜单项被点击时触发的信号
   */
  signalMenuItemClick: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 上传项被点击时触发的信号
   */
  signalUploadItemsClick: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 页面滚动开始时触发的信号
   */
  signalPageScrollStart: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 页码变化时触发的信号
   */
  signalPageNumChange: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 目录渲染完成时触发的信号
   */
  signalCatalogRenderEnd: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 目录日志记录时触发的信号
   */
  signalCatalogToLog: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 目录标签页被点击时触发的信号
   */
  signalCatalogTabsClick: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 上传模型按钮被点击时触发的信号
   */
  signalUploadModelClick: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 收藏ID列表更新时触发的信号
   */
  signalUpdateFavIdList: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 目录用户行为追踪日志记录时触发的信号
   */
  signalCatalogToUserTrackLogger: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 目录头部被点击时触发的信号
   */
  signalCatalogHeaderClick: HSCore.Util.Signal<CatalogSignalManager>;

  /**
   * 私有构造函数 - 防止外部实例化
   */
  private constructor();

  /**
   * 获取单例实例
   * @returns 唯一的CatalogSignalManager实例
   */
  static getInstance(): CatalogSignalManager;
}

/**
 * HSCore命名空间声明
 */
declare namespace HSCore {
  namespace Util {
    /**
     * 信号类 - 用于事件发布/订阅模式
     * @template T 信号源类型
     */
    class Signal<T> {
      constructor(source: T);
    }
  }
}

export default CatalogSignalManager;