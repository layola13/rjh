/**
 * 简体中文（zh-Hans）语言包
 * 用于 Vuetify UI 组件库的国际化支持
 */
declare module 'vuetify/src/locale/zh-Hans' {
  /**
   * Vuetify 简体中文语言包配置
   */
  interface VuetifyLocale {
    /** 徽章组件文本 */
    badge: string;

    /** 关闭按钮文本 */
    close: string;

    /** 数据迭代器组件文本配置 */
    dataIterator: {
      /** 无结果时显示的文本 */
      noResultsText: string;
      /** 加载中显示的文本 */
      loadingText: string;
    };

    /** 数据表格组件文本配置 */
    dataTable: {
      /** 每页数目选择器的标签文本 */
      itemsPerPageText: string;
      
      /** 无障碍访问标签配置 */
      ariaLabel: {
        /** 降序排列的提示文本 */
        sortDescending: string;
        /** 升序排列的提示文本 */
        sortAscending: string;
        /** 未排序的提示文本 */
        sortNone: string;
        /** 移除排序的操作提示 */
        activateNone: string;
        /** 激活降序排列的操作提示 */
        activateDescending: string;
        /** 激活升序排列的操作提示 */
        activateAscending: string;
      };

      /** 排序方式标签文本 */
      sortBy: string;
    };

    /** 数据表格页脚组件文本配置 */
    dataFooter: {
      /** 每页数目选择器的标签文本 */
      itemsPerPageText: string;
      /** 显示全部选项的文本 */
      itemsPerPageAll: string;
      /** 下一页按钮文本 */
      nextPage: string;
      /** 上一页按钮文本 */
      prevPage: string;
      /** 首页按钮文本 */
      firstPage: string;
      /** 尾页按钮文本 */
      lastPage: string;
      /** 分页信息文本模板，支持 {0}-{1} 共 {2} 格式 */
      pageText: string;
    };

    /** 日期选择器组件文本配置 */
    datePicker: {
      /** 已选择项数量文本模板，{0} 为选中数量 */
      itemsSelected: string;
      /** 下个月按钮的无障碍标签 */
      nextMonthAriaLabel: string;
      /** 明年按钮的无障碍标签 */
      nextYearAriaLabel: string;
      /** 前一个月按钮的无障碍标签 */
      prevMonthAriaLabel: string;
      /** 前一年按钮的无障碍标签 */
      prevYearAriaLabel: string;
    };

    /** 无数据时显示的文本 */
    noDataText: string;

    /** 轮播图组件文本配置 */
    carousel: {
      /** 上一张按钮文本 */
      prev: string;
      /** 下一张按钮文本 */
      next: string;
      
      /** 无障碍访问标签配置 */
      ariaLabel: {
        /** 轮播图分隔符文本模板，{0} 为当前幻灯片，{1} 为总数 */
        delimiter: string;
      };
    };

    /** 日历组件文本配置 */
    calendar: {
      /** 更多事件文本模板，{0} 为剩余事件数量 */
      moreEvents: string;
    };

    /** 文件输入组件文本配置 */
    fileInput: {
      /** 文件计数文本模板，{0} 为文件数量 */
      counter: string;
      /** 文件计数及大小文本模板，{0} 为文件数量，{1} 为总大小 */
      counterSize: string;
    };

    /** 时间选择器组件文本配置 */
    timePicker: {
      /** 上午标识 */
      am: string;
      /** 下午标识 */
      pm: string;
    };

    /** 分页组件文本配置 */
    pagination: {
      /** 无障碍访问标签配置 */
      ariaLabel: {
        /** 分页导航容器标签 */
        wrapper: string;
        /** 下一页按钮标签 */
        next: string;
        /** 上一页按钮标签 */
        previous: string;
        /** 页码按钮标签模板，{0} 为页码 */
        page: string;
        /** 当前页标签模板，{0} 为当前页码 */
        currentPage: string;
      };
    };

    /** 评分组件文本配置 */
    rating: {
      /** 无障碍访问标签配置 */
      ariaLabel: {
        /** 评分图标标签模板，{0} 为当前评分，{1} 为总分 */
        icon: string;
      };
    };
  }

  const locale: VuetifyLocale;
  export default locale;
}