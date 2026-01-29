interface FetchItemsParams {
  modelIdList: string[];
}

interface FetchItemsResponse {
  items: unknown[];
}

interface UpdateItemsParams {
  items: unknown[];
}

function onClick(): void {
  if (t !== f) {
    S({ modelIdList: e[1] }).then((response: FetchItemsResponse) => {
      m(t);
      const items = response.items;
      b({ items });
    });
  }
}