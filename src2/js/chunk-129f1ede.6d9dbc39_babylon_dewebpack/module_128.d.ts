/**
 * Array prototype extensions for LINQ-like operations
 * Provides functional programming utilities for arrays
 */

declare global {
  interface Array<T> {
    /**
     * Returns the first element that satisfies the predicate, or null if none found
     * @param predicate - Function to test each element
     * @returns The first matching element or null
     * @example
     * const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
     * const user = users.firstOrDefault(u => u.id === 2); // { id: 2, name: 'Bob' }
     */
    firstOrDefault(predicate: (item: T) => boolean): T | null;

    /**
     * Returns the element with the maximum value based on the selector function
     * @param selector - Function to extract comparable value from each element
     * @returns The element with maximum value
     * @example
     * const items = [{ score: 10 }, { score: 25 }, { score: 15 }];
     * const max = items.max(item => item.score); // { score: 25 }
     */
    max<TValue>(selector: (item: T) => TValue): T;

    /**
     * Returns the element with the minimum value based on the selector function
     * @param selector - Function to extract comparable value from each element
     * @returns The element with minimum value
     * @example
     * const items = [{ score: 10 }, { score: 25 }, { score: 15 }];
     * const min = items.min(item => item.score); // { score: 10 }
     */
    min<TValue>(selector: (item: T) => TValue): T;

    /**
     * Calculates the sum of array elements or their projected values
     * @param selector - Optional function to extract numeric value from each element
     * @returns The sum of all elements
     * @example
     * [1, 2, 3].sum(); // 6
     * [{ value: 10 }, { value: 20 }].sum(item => item.value); // 30
     */
    sum(selector?: (item: T, index: number) => number): number;

    /**
     * Calculates the average of array elements or their projected values
     * @param selector - Optional function to extract numeric value from each element
     * @returns The arithmetic mean of all elements
     * @example
     * [1, 2, 3].avg(); // 2
     * [{ value: 10 }, { value: 20 }].avg(item => item.value); // 15
     */
    avg(selector?: (item: T, index: number) => number): number;

    /**
     * Checks if any element satisfies the predicate
     * @param predicate - Function to test each element
     * @returns True if at least one element matches, false otherwise
     * @example
     * [1, 2, 3].contain(x => x > 2); // true
     */
    contain(predicate: (item: T) => boolean): boolean;

    /**
     * Filters array elements based on a predicate
     * @param predicate - Function to test each element
     * @returns New array containing only matching elements
     * @example
     * [1, 2, 3, 4].where(x => x % 2 === 0); // [2, 4]
     */
    where(predicate: (item: T) => boolean): T[];

    /**
     * Removes the first occurrence of the specified element
     * @param item - Element to remove
     * @returns True if element was found and removed, false otherwise
     * @example
     * const arr = [1, 2, 3];
     * arr.remove(2); // true, arr is now [1, 3]
     */
    remove(item: T): boolean;

    /**
     * Removes all elements in the specified collection
     * @param items - Collection of elements to remove
     * @example
     * const arr = [1, 2, 3, 4];
     * arr.removeRange([2, 4]); // arr is now [1, 3]
     */
    removeRange(items: T[]): void;

    /**
     * Adds an element to the end of the array
     * @param item - Element to add
     * @example
     * const arr = [1, 2];
     * arr.add(3); // arr is now [1, 2, 3]
     */
    add(item: T): void;

    /**
     * Adds all elements from the specified collection to the end of the array
     * @param items - Collection of elements to add
     * @example
     * const arr = [1, 2];
     * arr.addRange([3, 4]); // arr is now [1, 2, 3, 4]
     */
    addRange(items: T[]): void;

    /**
     * Sorts array in ascending order based on the selector function
     * @param selector - Function to extract comparable value from each element
     * @returns The sorted array (mutates original)
     * @example
     * const users = [{ age: 30 }, { age: 20 }, { age: 25 }];
     * users.orderBy(u => u.age); // [{ age: 20 }, { age: 25 }, { age: 30 }]
     */
    orderBy<TValue>(selector: (item: T) => TValue): T[];

    /**
     * Sorts array in descending order based on the selector function
     * @param selector - Function to extract comparable value from each element
     * @returns The sorted array (mutates original)
     * @example
     * const users = [{ age: 20 }, { age: 30 }, { age: 25 }];
     * users.orderByDescending(u => u.age); // [{ age: 30 }, { age: 25 }, { age: 20 }]
     */
    orderByDescending<TValue>(selector: (item: T) => TValue): T[];

    /**
     * Sorts array by multiple selectors in ascending order
     * @param selectors - Array of functions to extract comparable values
     * @returns The sorted array (mutates original)
     * @example
     * const users = [{ dept: 'IT', age: 30 }, { dept: 'HR', age: 25 }];
     * users.orderByMany([u => u.dept, u => u.age]);
     */
    orderByMany<TValue>(selectors: Array<(item: T) => TValue>): T[];

    /**
     * Sorts array by multiple selectors in descending order
     * @param selectors - Array of functions to extract comparable values
     * @returns The sorted array (mutates original)
     * @example
     * const users = [{ dept: 'HR', age: 25 }, { dept: 'IT', age: 30 }];
     * users.orderByManyDescending([u => u.dept, u => u.age]);
     */
    orderByManyDescending<TValue>(selectors: Array<(item: T) => TValue>): T[];

    /**
     * Checks if the array is null or empty
     * @returns True if array is null or has zero length, false otherwise
     * @example
     * [].isEmpty(); // true
     * [1, 2].isEmpty(); // false
     */
    isEmpty(): boolean;
  }
}

export {};