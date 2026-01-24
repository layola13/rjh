/**
 * 日语（日本）本地化配置
 * Vuetify UI组件库的日语翻译资源
 */
declare module '@/locale/ja' {
  /**
   * Vuetify日语本地化配置接口
   */
  interface JapaneseLocale {
    /** 徽章组件文本 */
    badge: string;
    
    /** 关闭按钮文本 */
    close: string;
    
    /** 数据迭代器组件配置 */
    dataIterator: {
      /** 无搜索结果时显示的文本 */
      noResultsText: string;
      /** 加载数据时显示的文本 */
      loadingText: string;
    };
    
    /** 数据表格组件配置 */
    dataTable: {
      /** 每页显示行数的标签文本 */
      itemsPerPageText: string;
      
      /** 无障碍访问标签配置 */
      ariaLabel: {
        /** 降序排序的无障碍描述 */
        sortDescending: string;
        /** 升序排序的无障碍描述 */
        sortAscending: string;
        /** 未排序状态的无障碍描述 */
        sortNone: string;
        /** 取消排序操作的无障碍提示 */
        activateNone: string;
        /** 激活降序排序的无障碍提示 */
        activateDescending: string;
        /** 激活升序排序的无障碍提示 */
        activateAscending: string;
      };
      
      /** 排序方式标签 */
      sortBy: string;
    };
    
    /** 数据表格页脚配置 */
    dataFooter: {
      /** 每页显示条目数的标签文本 */
      itemsPerPageText: string;
      /** 显示全部条目的选项文本 */
      itemsPerPageAll: string;
      /** 下一页按钮文本 */
      nextPage: string;
      /** 上一页按钮文本 */
      prevPage: string;
      /** 首页按钮文本 */
      firstPage: string;
      /** 末页按钮文本 */
      lastPage: string;
      /** 分页信息文本模板 {0}-{1} 件目 / {2}件 */
      pageText: string;
    };
    
    /** 日期选择器组件配置 */
    datePicker: {
      /** 已选择日期数量的文本模板 {0}日付選択 */
      itemsSelected: string;
      /** 下个月按钮的无障碍标签 */
      nextMonthAriaLabel: string;
      /** 明年按钮的无障碍标签 */
      nextYearAriaLabel: string;
      /** 上个月按钮的无障碍标签 */
      prevMonthAriaLabel: string;
      /** 去年按钮的无障碍标签 */
      prevYearAriaLabel: string;
    };
    
    /** 无数据时显示的文本 */
    noDataText: string;
    
    /** 轮播图组件配置 */
    carousel: {
      /** 上一个视觉元素按钮文本 */
      prev: string;
      /** 下一个视觉元素按钮文本 */
      next: string;
      
      /** 无障碍访问标签配置 */
      ariaLabel: {
        /** 轮播图幻灯片分隔符文本模板 {0}件目 / {1}件 */
        delimiter: string;
      };
    };
    
    /** 日历组件配置 */
    calendar: {
      /** 更多事件的文本模板 さらに{0} */
      moreEvents: string;
    };
    
    /** 文件输入组件配置 */
    fileInput: {
      /** 文件数量计数器文本模板 {0} ファイル */
      counter: string;
      /** 文件数量和大小计数器文本模板 {0} ファイル (合計 {1}) */
      counterSize: string;
    };
    
    /** 时间选择器组件配置 */
    timePicker: {
      /** 上午标识 */
      am: string;
      /** 下午标识 */
      pm: string;
    };
    
    /** 分页组件配置 */
    pagination: {
      /** 无障碍访问标签配置 */
      ariaLabel: {
        /** 分页导航容器的无障碍标签 */
        wrapper: string;
        /** 下一页按钮的无障碍标签 */
        next: string;
        /** 上一页按钮的无障碍标签 */
        previous: string;
        /** 跳转到指定页的无障碍标签模板 {0}ページ目に移動 */
        page: string;
        /** 当前页的无障碍标签模板 現在のページ、ページ {0} */
        currentPage: string;
      };
    };
    
    /** 评分组件配置 */
    rating: {
      /** 无障碍访问标签配置 */
      ariaLabel: {
        /** 评分图标的无障碍标签模板 Rating {0} of {1} */
        icon: string;
      };
    };
  }

  /** 日语本地化配置对象 */
  const locale: JapaneseLocale;
  export default locale;
}