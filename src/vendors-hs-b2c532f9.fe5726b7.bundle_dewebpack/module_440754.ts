function swap<T>(array: T[], i: number, j: number): void {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function defaultCompare<T>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function quickselect<T>(
  array: T[],
  k: number,
  left: number,
  right: number,
  compare: (a: T, b: T) => number
): void {
  const THRESHOLD = 600;
  const LOG_FACTOR = 2 / 3;
  const SQRT_FACTOR = 0.5;

  while (right > left) {
    if (right - left > THRESHOLD) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = SQRT_FACTOR * Math.exp(LOG_FACTOR * z);
      const sd = SQRT_FACTOR * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      
      quickselect(array, k, newLeft, newRight, compare);
    }

    const pivot = array[k];
    let i = left;
    let j = right;

    swap(array, left, k);
    
    if (compare(array[right], pivot) > 0) {
      swap(array, left, right);
    }

    while (i < j) {
      swap(array, i, j);
      i++;
      j--;
      
      while (compare(array[i], pivot) < 0) {
        i++;
      }
      
      while (compare(array[j], pivot) > 0) {
        j--;
      }
    }

    if (compare(array[left], pivot) === 0) {
      swap(array, left, j);
    } else {
      j++;
      swap(array, j, right);
    }

    if (j <= k) {
      left = j + 1;
    }
    
    if (k <= j) {
      right = j - 1;
    }
  }
}

export default function<T>(
  array: T[],
  k: number,
  left?: number,
  right?: number,
  compare?: (a: T, b: T) => number
): void {
  quickselect(
    array,
    k,
    left ?? 0,
    right ?? array.length - 1,
    compare ?? defaultCompare
  );
}