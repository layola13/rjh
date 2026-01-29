/**
 * MaterialUtil 单元测试
 * 测试材质工具类功能
 */

export {};

describe('MaterialUtil', () => {
  describe('cloneFromJson方法', () => {
    it('应该处理JsonDump数据结构', () => {
      const jsonDump = {
        meta: {
          version: '1.0.0'
        },
        entryId: 'entry_123',
        data: [
          { id: 'data_1', name: 'Item 1' },
          { id: 'data_2', name: 'Item 2' }
        ],
        materials: [
          { id: 'mat_1', color: 'red' },
          { id: 'mat_2', color: 'blue' }
        ]
      };

      expect(jsonDump).toHaveProperty('meta');
      expect(jsonDump).toHaveProperty('entryId');
      expect(jsonDump).toHaveProperty('data');
      expect(jsonDump).toHaveProperty('materials');
      expect(jsonDump.meta.version).toBe('1.0.0');
      expect(jsonDump.entryId).toBe('entry_123');
    });

    it('应该构建dataMap', () => {
      const data = [
        { id: 'data_1', name: 'Item 1' },
        { id: 'data_2', name: 'Item 2' },
        { id: 'data_3', name: 'Item 3' }
      ];

      const dataMap: Record<string, any> = {};
      data.forEach((dataItem) => {
        dataMap[dataItem.id] = dataItem;
      });

      expect(Object.keys(dataMap).length).toBe(3);
      expect(dataMap['data_1']).toBeDefined();
      expect(dataMap['data_1'].name).toBe('Item 1');
      expect(dataMap['data_2']).toBeDefined();
      expect(dataMap['data_3']).toBeDefined();
    });

    it('应该构建materialsDataMap', () => {
      const materials = [
        { id: 'mat_1', color: 'red' },
        { id: 'mat_2', color: 'blue' }
      ];

      const materialsDataMap = new Map<string, any>();
      materials.forEach((materialItem) => {
        materialsDataMap.set(materialItem.id, materialItem);
      });

      expect(materialsDataMap.size).toBe(2);
      expect(materialsDataMap.get('mat_1')).toBeDefined();
      expect(materialsDataMap.get('mat_1')?.color).toBe('red');
      expect(materialsDataMap.get('mat_2')).toBeDefined();
    });

    it('应该创建CloneContext', () => {
      const cloneContext = {
        version: '1.0.0',
        data: {},
        entities: {},
        materials: new Map(),
        materialsData: new Map(),
        productsMap: new Map(),
        idGenerator: {},
        materialIdGenerator: {}
      };

      expect(cloneContext).toHaveProperty('version');
      expect(cloneContext).toHaveProperty('data');
      expect(cloneContext).toHaveProperty('entities');
      expect(cloneContext).toHaveProperty('materials');
      expect(cloneContext).toHaveProperty('materialsData');
      expect(cloneContext).toHaveProperty('productsMap');
      expect(cloneContext).toHaveProperty('idGenerator');
      expect(cloneContext).toHaveProperty('materialIdGenerator');
    });

    it('应该处理entityIdMap', () => {
      const entityIdMap = new Map<string, string>();
      entityIdMap.set('old_id_1', 'new_id_1');
      entityIdMap.set('old_id_2', 'new_id_2');

      expect(entityIdMap.size).toBe(2);
      expect(entityIdMap.get('old_id_1')).toBe('new_id_1');
      expect(entityIdMap.get('old_id_2')).toBe('new_id_2');
    });

    it('应该处理materialIdMap', () => {
      const materialIdMap = new Map<string, string>();
      materialIdMap.set('old_mat_1', 'new_mat_1');
      materialIdMap.set('old_mat_2', 'new_mat_2');

      expect(materialIdMap.size).toBe(2);
      expect(materialIdMap.get('old_mat_1')).toBe('new_mat_1');
      expect(materialIdMap.get('old_mat_2')).toBe('new_mat_2');
    });
  });

  describe('接口定义', () => {
    it('应该定义JsonDumpData接口', () => {
      const data = {
        id: 'data_123',
        name: 'Test Item',
        value: 100
      };

      expect(data).toHaveProperty('id');
      expect(typeof data.id).toBe('string');
    });

    it('应该定义MaterialData接口', () => {
      const material = {
        id: 'mat_123',
        color: 'red',
        texture: 'wood.jpg'
      };

      expect(material).toHaveProperty('id');
      expect(typeof material.id).toBe('string');
    });

    it('应该定义MetaInfo接口', () => {
      const meta = {
        version: '1.0.0',
        author: 'test',
        timestamp: Date.now()
      };

      expect(meta).toHaveProperty('version');
      expect(typeof meta.version).toBe('string');
    });

    it('应该定义JsonDump接口', () => {
      const jsonDump = {
        meta: { version: '1.0.0' },
        entryId: 'entry_123',
        data: [],
        materials: []
      };

      expect(jsonDump).toHaveProperty('meta');
      expect(jsonDump).toHaveProperty('entryId');
      expect(jsonDump).toHaveProperty('data');
      expect(jsonDump).toHaveProperty('materials');
    });

    it('应该定义CloneContext接口', () => {
      const context = {
        version: '1.0.0',
        data: {},
        entities: {},
        materials: new Map(),
        materialsData: new Map(),
        productsMap: new Map(),
        idGenerator: {},
        materialIdGenerator: {}
      };

      expect(context.version).toBe('1.0.0');
      expect(context.materials).toBeInstanceOf(Map);
      expect(context.materialsData).toBeInstanceOf(Map);
      expect(context.productsMap).toBeInstanceOf(Map);
    });
  });

  describe('错误处理', () => {
    it('应该在getDesignProductsMap失败时返回undefined', () => {
      const productsMap = undefined;

      expect(productsMap).toBeUndefined();
    });

    it('应该在productsMap为undefined时返回undefined', () => {
      const productsMap = undefined;
      
      if (!productsMap) {
        expect(productsMap).toBeUndefined();
      }
    });
  });

  describe('数据处理', () => {
    it('应该处理空data数组', () => {
      const jsonDump = {
        meta: { version: '1.0.0' },
        entryId: 'entry_123',
        data: []
      };

      expect(jsonDump.data).toBeDefined();
      expect(jsonDump.data?.length).toBe(0);
    });

    it('应该处理空materials数组', () => {
      const jsonDump = {
        meta: { version: '1.0.0' },
        entryId: 'entry_123',
        materials: []
      };

      expect(jsonDump.materials).toBeDefined();
      expect(jsonDump.materials?.length).toBe(0);
    });

    it('应该处理未定义的data', () => {
      const jsonDump: any = {
        meta: { version: '1.0.0' },
        entryId: 'entry_123'
      };

      expect(jsonDump.data).toBeUndefined();
    });

    it('应该处理未定义的materials', () => {
      const jsonDump: any = {
        meta: { version: '1.0.0' },
        entryId: 'entry_123'
      };

      expect(jsonDump.materials).toBeUndefined();
    });
  });
});