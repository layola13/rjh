export interface PaginationLocale {
  items_per_page: string;
  jump_to: string;
  jump_to_confirm: string;
  page: string;
  prev_page: string;
  next_page: string;
  prev_5: string;
  next_5: string;
  prev_3: string;
  next_3: string;
  page_size: string;
}

const paginationLocale: PaginationLocale = {
  items_per_page: "条/页",
  jump_to: "跳至",
  jump_to_confirm: "确定",
  page: "页",
  prev_page: "上一页",
  next_page: "下一页",
  prev_5: "向前 5 页",
  next_5: "向后 5 页",
  prev_3: "向前 3 页",
  next_3: "向后 3 页",
  page_size: "页码"
};

export default paginationLocale;