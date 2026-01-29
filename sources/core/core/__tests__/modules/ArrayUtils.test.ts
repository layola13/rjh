/**
 * Array工具函数单元测试
 * 测试数组相关的工具方法和polyfill
 */

export {};

describe('Array Polyfills', () => {
  describe('Array.prototype.at', () => {
    describe('正向索引', () => {
      it('应该能通过正数索引访问数组元素', () => {
        const arr = [10, 20, 30, 40, 50];
        const result = arr.at(2);
        
        expect(result).toBe(30);
      });

      it('应该返回第一个元素当索引为0', () => {
        const arr = ['a', 'b', 'c'];
        const result = arr.at(0);
        
        expect(result).toBe('a');
      });

      it('应该返回最后一个元素当索引为length-1', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = arr.at(arr.length - 1);
        
        expect(result).toBe(5);
      });
    });

    describe('负向索引', () => {
      it('应该能通过负数索引从末尾访问数组元素', () => {
        const arr = [10, 20, 30, 40, 50];
        const result = arr.at(-1);
        
        expect(result).toBe(50);
      });

      it('应该返回倒数第二个元素当索引为-2', () => {
        const arr = ['x', 'y', 'z'];
        const result = arr.at(-2);
        
        expect(result).toBe('y');
      });

      it('应该返回第一个元素当索引为-length', () => {
        const arr = [100, 200, 300];
        const result = arr.at(-arr.length);
        
        expect(result).toBe(100);
      });
    });

    describe('边界情况', () => {
      it('应该返回undefined当索引超出范围', () => {
        const arr = [1, 2, 3];
        const result = arr.at(10);
        
        expect(result).toBeUndefined();
      });

      it('应该返回undefined当负索引超出范围', () => {
        const arr = [1, 2, 3];
        const result = arr.at(-10);
        
        expect(result).toBeUndefined();
      });

      it('应该处理空数组', () => {
        const arr: number[] = [];
        const result = arr.at(0);
        
        expect(result).toBeUndefined();
      });

      it('应该处理单元素数组', () => {
        const arr = [42];
        const result = arr.at(0);
        
        expect(result).toBe(42);
      });
    });
  });

  describe('Array.prototype.push', () => {
    describe('基本push功能', () => {
      it('应该能向数组添加单个元素', () => {
        const arr = [1, 2, 3];
        const result = arr.push(4);
        
        expect(arr).toEqual([1, 2, 3, 4]);
        expect(result).toBe(4); // 返回新长度
      });

      it('应该能向空数组添加元素', () => {
        const arr: number[] = [];
        const result = arr.push(1);
        
        expect(arr).toEqual([1]);
        expect(result).toBe(1);
      });

      it('应该能向数组添加多个元素', () => {
        const arr = [1, 2];
        const result = arr.push(3, 4, 5);
        
        expect(arr).toEqual([1, 2, 3, 4, 5]);
        expect(result).toBe(5);
      });
    });

    describe('返回值', () => {
      it('应该返回数组的新长度', () => {
        const arr = ['a', 'b'];
        const length = arr.push('c');
        
        expect(length).toBe(3);
        expect(length).toBe(arr.length);
      });

      it('添加多个元素后应该返回正确的长度', () => {
        const arr = [1];
        const length = arr.push(2, 3, 4, 5);
        
        expect(length).toBe(5);
      });
    });

    describe('不同类型的元素', () => {
      it('应该能添加字符串', () => {
        const arr: string[] = [];
        arr.push('hello', 'world');
        
        expect(arr).toEqual(['hello', 'world']);
      });

      it('应该能添加对象', () => {
        const arr: any[] = [];
        const obj1 = { id: 1 };
        const obj2 = { id: 2 };
        
        arr.push(obj1, obj2);
        
        expect(arr).toEqual([obj1, obj2]);
      });

      it('应该能添加null和undefined', () => {
        const arr: any[] = [1];
        arr.push(null, undefined);
        
        expect(arr).toEqual([1, null, undefined]);
      });
    });

    describe('边界情况', () => {
      it('应该处理不传入任何元素的情况', () => {
        const arr = [1, 2, 3];
        const result = arr.push();
        
        expect(arr).toEqual([1, 2, 3]);
        expect(result).toBe(3);
      });

      it('应该能多次调用push', () => {
        const arr: number[] = [];
        
        arr.push(1);
        arr.push(2);
        arr.push(3);
        
        expect(arr).toEqual([1, 2, 3]);
      });
    });
  });

  describe('Array工具方法', () => {
    describe('reduce', () => {
      it('应该能对数组求和', () => {
        const arr = [1, 2, 3, 4, 5];
        const sum = arr.reduce((acc, val) => acc + val, 0);
        
        expect(sum).toBe(15);
      });

      it('应该能连接字符串', () => {
        const arr = ['Hello', ' ', 'World'];
        const result = arr.reduce((acc, val) => acc + val, '');
        
        expect(result).toBe('Hello World');
      });

      it('应该处理空数组和初始值', () => {
        const arr: number[] = [];
        const result = arr.reduce((acc, val) => acc + val, 10);
        
        expect(result).toBe(10);
      });
    });

    describe('includes', () => {
      it('应该找到存在的元素', () => {
        const arr = [1, 2, 3, 4, 5];
        
        expect(arr.includes(3)).toBe(true);
      });

      it('应该返回false对于不存在的元素', () => {
        const arr = [1, 2, 3, 4, 5];
        
        expect(arr.includes(10)).toBe(false);
      });

      it('应该能处理字符串数组', () => {
        const arr = ['apple', 'banana', 'cherry'];
        
        expect(arr.includes('banana')).toBe(true);
        expect(arr.includes('grape')).toBe(false);
      });
    });

    describe('find', () => {
      it('应该找到第一个满足条件的元素', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = arr.find(x => x > 2);
        
        expect(result).toBe(3);
      });

      it('应该返回undefined当没有元素满足条件', () => {
        const arr = [1, 2, 3];
        const result = arr.find(x => x > 10);
        
        expect(result).toBeUndefined();
      });
    });

    describe('filter', () => {
      it('应该过滤出满足条件的所有元素', () => {
        const arr = [1, 2, 3, 4, 5];
        const result = arr.filter(x => x % 2 === 0);
        
        expect(result).toEqual([2, 4]);
      });

      it('应该返回空数组当没有元素满足条件', () => {
        const arr = [1, 3, 5];
        const result = arr.filter(x => x % 2 === 0);
        
        expect(result).toEqual([]);
      });
    });

    describe('map', () => {
      it('应该转换数组的每个元素', () => {
        const arr = [1, 2, 3];
        const result = arr.map(x => x * 2);
        
        expect(result).toEqual([2, 4, 6]);
      });

      it('应该保持原数组不变', () => {
        const arr = [1, 2, 3];
        const original = [...arr];
        
        arr.map(x => x * 2);
        
        expect(arr).toEqual(original);
      });
    });
  });
});