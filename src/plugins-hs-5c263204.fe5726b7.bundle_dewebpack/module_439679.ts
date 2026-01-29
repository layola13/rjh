export interface ModalOptions {
  isBlack?: boolean;
  type?: string;
}

export interface SortableItem {
  order: number;
}

/**
 * Get modal CSS class based on options
 * @param baseClass - Base CSS class name
 * @param options - Modal configuration options
 * @returns Combined CSS class string
 */
export function getModalClass(baseClass: string, options: ModalOptions): string {
  let className = baseClass;
  
  if (options.isBlack) {
    className += " feedback-modal-black";
  }
  
  if (options.type === "small") {
    className += " feedback-modal-small";
  }
  
  return className;
}

/**
 * Format date to string
 * @param date - Date value to format
 * @param includeTime - Whether to include time in output (default: true)
 * @returns Formatted date string
 */
export function getTime(date: Date | number | string, includeTime: boolean = true): string {
  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = padZero(dateObj.getMonth() + 1);
  const day = padZero(dateObj.getDate());
  const hours = padZero(dateObj.getHours());
  const minutes = padZero(dateObj.getMinutes());
  
  if (!includeTime) {
    return `${year}-${month}-${day}`;
  }
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Sort array using insertion sort algorithm based on order property
 * @param items - Array of items to sort
 * @returns Sorted array
 */
export function insertSort<T extends SortableItem>(items: T[]): T[] {
  for (let currentIndex = 1; currentIndex < items.length; currentIndex++) {
    if (items[currentIndex].order < items[currentIndex - 1].order) {
      const currentItem = items[currentIndex];
      let insertPosition = 0;
      
      for (insertPosition = currentIndex - 1; 
           items[insertPosition] && items[insertPosition].order > currentItem.order; 
           insertPosition--) {
        items[insertPosition + 1] = items[insertPosition];
      }
      
      items[insertPosition + 1] = currentItem;
    }
  }
  
  return items;
}