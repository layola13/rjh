interface HandleItem {
  before(data: any): Promise<any>;
  after(data: any): Promise<any>;
}

interface HandleItemMap {
  [key: string]: HandleItem;
}

interface DataItem {
  categoryTypeId?: string;
  locationName?: string;
  [key: string]: any;
}

export class ElementHandle {
  private handleItemMap: HandleItemMap;

  constructor() {
    this.handleItemMap = {};
  }

  registerHandleItem(key: string, item: HandleItem): void {
    this.handleItemMap[key] = item;
  }

  async before<T>(data: T): Promise<T> {
    const entries = Object.entries(this.handleItemMap);
    let result = data;
    
    for (let i = 0; i < entries.length; i++) {
      result = await entries[i][1].before(result);
    }
    
    return result;
  }

  async after<T>(data: T): Promise<T> {
    const entries = Object.entries(this.handleItemMap);
    let result = data;
    
    for (let i = 0; i < entries.length; i++) {
      result = await entries[i][1].after(result);
    }
    
    return result;
  }
}

class LocationHandleItem implements HandleItem {
  private readonly categories: string[];

  constructor() {
    this.categories = [
      "tiles",
      "stone",
      "paint",
      "flooring",
      "matt_finish",
      "wallpape/wallfabric"
    ];
  }

  async before(data: DataItem[]): Promise<DataItem[]> {
    return data.map((item) => {
      if (item.categoryTypeId) {
        if (!this.categories.includes(item.categoryTypeId)) {
          delete item.locationName;
        }
        return item;
      } else {
        delete item.locationName;
        return item;
      }
    });
  }

  async after<T>(data: T): Promise<T> {
    return data;
  }
}

export const elementHandle = new ElementHandle();
elementHandle.registerHandleItem("location", new LocationHandleItem());