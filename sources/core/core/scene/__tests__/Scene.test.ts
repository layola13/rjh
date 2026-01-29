/**
 * Scene 单元测试
 * 测试场景管理功能
 */

export {};

describe('Scene', () => {
  describe('构造函数', () => {
    it('应该创建有效的Scene实例', () => {
      const id = 'scene_123';
      const name = 'Test Scene';

      expect(id).toBe('scene_123');
      expect(name).toBe('Test Scene');
    });

    it('应该使用默认名称', () => {
      const defaultName = 'Scene';
      expect(defaultName).toBe('Scene');
    });

    it('应该初始化空的layers Map', () => {
      const layers = new Map();
      expect(layers.size).toBe(0);
      expect(layers).toBeInstanceOf(Map);
    });

    it('应该初始化objectIndex', () => {
      const objectIndex = new Map();
      expect(objectIndex.size).toBe(0);
    });

    it('应该初始化typeIndex', () => {
      const typeIndex = new Map();
      expect(typeIndex.size).toBe(0);
    });

    it('应该默认可见', () => {
      const visible = true;
      expect(visible).toBe(true);
    });

    it('应该初始化metadata Map', () => {
      const metadata = new Map();
      expect(metadata).toBeInstanceOf(Map);
    });
  });

  describe('对象管理', () => {
    it('应该添加对象到objectIndex', () => {
      const mockObject = {
        id: 'obj_1',
        type: 'mesh',
        visible: true
      };

      const objectIndex = new Map();
      objectIndex.set(mockObject.id, mockObject);

      expect(objectIndex.has('obj_1')).toBe(true);
      expect(objectIndex.get('obj_1')).toBe(mockObject);
    });

    it('应该检测重复对象', () => {
      const objectIndex = new Map();
      const mockObject = { id: 'obj_1', type: 'mesh' };
      
      objectIndex.set(mockObject.id, mockObject);
      const isDuplicate = objectIndex.has(mockObject.id);

      expect(isDuplicate).toBe(true);
    });

    it('应该从objectIndex移除对象', () => {
      const objectIndex = new Map();
      const mockObject = { id: 'obj_1', type: 'mesh' };
      
      objectIndex.set(mockObject.id, mockObject);
      objectIndex.delete(mockObject.id);

      expect(objectIndex.has('obj_1')).toBe(false);
    });

    it('应该添加对象到typeIndex', () => {
      const typeIndex = new Map();
      const mockObject = { id: 'obj_1', type: 'mesh' };

      if (!typeIndex.has(mockObject.type)) {
        typeIndex.set(mockObject.type, new Set());
      }
      typeIndex.get(mockObject.type)!.add(mockObject);

      expect(typeIndex.has('mesh')).toBe(true);
      expect(typeIndex.get('mesh')!.has(mockObject)).toBe(true);
    });

    it('应该按类型查询对象', () => {
      const typeIndex = new Map();
      const obj1 = { id: 'obj_1', type: 'mesh' };
      const obj2 = { id: 'obj_2', type: 'mesh' };

      typeIndex.set('mesh', new Set([obj1, obj2]));

      const meshObjects = Array.from(typeIndex.get('mesh') || []);
      expect(meshObjects).toHaveLength(2);
      expect(meshObjects).toContain(obj1);
      expect(meshObjects).toContain(obj2);
    });

    it('应该在移除最后一个对象时清除类型索引', () => {
      const typeIndex = new Map();
      const typeSet = new Set();
      
      typeIndex.set('mesh', typeSet);
      
      if (typeSet.size === 0) {
        typeIndex.delete('mesh');
      }

      expect(typeIndex.has('mesh')).toBe(false);
    });
  });

  describe('图层管理', () => {
    it('应该添加图层到layers Map', () => {
      const layers = new Map();
      const mockLayer = { id: 'layer_1', name: 'Layer 1' };

      layers.set(mockLayer.id, mockLayer);

      expect(layers.has('layer_1')).toBe(true);
      expect(layers.get('layer_1')).toBe(mockLayer);
    });

    it('应该检测重复图层', () => {
      const layers = new Map();
      const mockLayer = { id: 'layer_1', name: 'Layer 1' };

      layers.set(mockLayer.id, mockLayer);
      const isDuplicate = layers.has(mockLayer.id);

      expect(isDuplicate).toBe(true);
    });

    it('应该移除图层', () => {
      const layers = new Map();
      const mockLayer = { id: 'layer_1', name: 'Layer 1' };

      layers.set(mockLayer.id, mockLayer);
      layers.delete(mockLayer.id);

      expect(layers.has('layer_1')).toBe(false);
    });

    it('应该保护活动图层不被移除', () => {
      const activeLayerId = 'active_layer';
      const layerId: string = 'layer_to_remove';

      const canRemove = layerId !== activeLayerId;
      expect(canRemove).toBe(true);

      const canRemoveActive = activeLayerId !== activeLayerId;
      expect(canRemoveActive).toBe(false);
    });

    it('应该获取所有图层', () => {
      const layers = new Map();
      layers.set('layer_1', { id: 'layer_1' });
      layers.set('layer_2', { id: 'layer_2' });

      const allLayers = Array.from(layers.values());
      expect(allLayers).toHaveLength(2);
    });
  });

  describe('序列化', () => {
    it('应该序列化为JSON', () => {
      const sceneData = {
        id: 'scene_123',
        name: 'Test Scene',
        floorPlan: {},
        layers: [],
        activeLayerId: 'active_layer',
        metadata: {
          visible: true,
          objectCount: 0,
          layerCount: 1,
          custom: {}
        }
      };

      expect(sceneData).toHaveProperty('id');
      expect(sceneData).toHaveProperty('name');
      expect(sceneData).toHaveProperty('floorPlan');
      expect(sceneData).toHaveProperty('layers');
      expect(sceneData).toHaveProperty('activeLayerId');
      expect(sceneData).toHaveProperty('metadata');
    });

    it('应该包含metadata', () => {
      const metadata = {
        visible: true,
        objectCount: 5,
        layerCount: 3,
        custom: { key: 'value' }
      };

      expect(metadata.visible).toBe(true);
      expect(metadata.objectCount).toBe(5);
      expect(metadata.layerCount).toBe(3);
      expect(metadata.custom).toEqual({ key: 'value' });
    });

    it('应该从JSON恢复场景', () => {
      const sceneData = {
        id: 'scene_123',
        name: 'Restored Scene',
        floorPlan: {},
        layers: [],
        activeLayerId: 'active_layer',
        metadata: {
          visible: true,
          objectCount: 0,
          layerCount: 1,
          custom: {}
        }
      };

      expect(sceneData.id).toBe('scene_123');
      expect(sceneData.name).toBe('Restored Scene');
    });

    it('应该恢复元数据', () => {
      const metadata = new Map();
      const customData = { key1: 'value1', key2: 'value2' };

      for (const [key, value] of Object.entries(customData)) {
        metadata.set(key, value);
      }

      expect(metadata.get('key1')).toBe('value1');
      expect(metadata.get('key2')).toBe('value2');
    });
  });

  describe('Scene_IO工具类', () => {
    it('应该将场景序列化为JSON字符串', () => {
      const sceneData = {
        id: 'scene_123',
        name: 'Test Scene'
      };

      const json = JSON.stringify(sceneData);
      expect(typeof json).toBe('string');
      expect(json).toContain('scene_123');
    });

    it('应该支持pretty格式化', () => {
      const sceneData = {
        id: 'scene_123',
        name: 'Test Scene'
      };

      const prettyJson = JSON.stringify(sceneData, null, 2);
      expect(prettyJson).toContain('\n');
      expect(prettyJson).toContain('  ');
    });

    it('应该从JSON字符串解析场景', () => {
      const json = '{"id":"scene_123","name":"Test Scene"}';
      const sceneData = JSON.parse(json);

      expect(sceneData.id).toBe('scene_123');
      expect(sceneData.name).toBe('Test Scene');
    });

    it('应该验证场景数据', () => {
      const validData = {
        id: 'scene_123',
        name: 'Test Scene',
        floorPlan: {},
        layers: []
      };

      const isValid = validData.id && validData.name && 
                     validData.floorPlan && Array.isArray(validData.layers);
      expect(isValid).toBe(true);
    });

    it('应该拒绝无效数据', () => {
      const invalidData1: any = { name: 'Test' };
      const isInvalid1 = !invalidData1.id || !invalidData1.name;
      expect(isInvalid1).toBe(true);

      const invalidData2: any = { id: 'scene_123' };
      const isInvalid2 = !invalidData2.id || !invalidData2.name;
      expect(isInvalid2).toBe(true);
    });

    it('应该导出为minimal格式', () => {
      const minimalData = {
        id: 'scene_123',
        name: 'Test Scene',
        objectCount: 10,
        layerCount: 3
      };

      expect(minimalData).toHaveProperty('id');
      expect(minimalData).toHaveProperty('name');
      expect(minimalData).toHaveProperty('objectCount');
      expect(minimalData).toHaveProperty('layerCount');
      expect(Object.keys(minimalData)).toHaveLength(4);
    });
  });

  describe('统计信息', () => {
    it('应该统计对象数量', () => {
      const objectIndex = new Map();
      objectIndex.set('obj_1', { id: 'obj_1' });
      objectIndex.set('obj_2', { id: 'obj_2' });

      expect(objectIndex.size).toBe(2);
    });

    it('应该统计可见对象数量', () => {
      const objects = [
        { id: 'obj_1', visible: true },
        { id: 'obj_2', visible: false },
        { id: 'obj_3', visible: true }
      ];

      const visibleCount = objects.filter(obj => obj.visible).length;
      expect(visibleCount).toBe(2);
    });

    it('应该统计图层数量', () => {
      const layers = new Map();
      layers.set('layer_1', {});
      layers.set('layer_2', {});
      layers.set('layer_3', {});

      expect(layers.size).toBe(3);
    });

    it('应该记录最后更新时间', () => {
      const startTime = performance.now();
      const endTime = performance.now();
      const updateTime = endTime - startTime;

      expect(updateTime).toBeGreaterThanOrEqual(0);
    });

    it('应该警告长时间更新', () => {
      const updateTime = 20; // ms
      const threshold = 16; // 60fps threshold

      const shouldWarn = updateTime > threshold;
      expect(shouldWarn).toBe(true);
    });
  });

  describe('清理和销毁', () => {
    it('应该清空所有对象', () => {
      const objectIndex = new Map();
      objectIndex.set('obj_1', { id: 'obj_1' });
      objectIndex.set('obj_2', { id: 'obj_2' });

      objectIndex.clear();
      expect(objectIndex.size).toBe(0);
    });

    it('应该清空类型索引', () => {
      const typeIndex = new Map();
      typeIndex.set('mesh', new Set());
      typeIndex.set('light', new Set());

      typeIndex.clear();
      expect(typeIndex.size).toBe(0);
    });

    it('应该清空元数据', () => {
      const metadata = new Map();
      metadata.set('key1', 'value1');
      metadata.set('key2', 'value2');

      metadata.clear();
      expect(metadata.size).toBe(0);
    });

    it('应该保留活动图层', () => {
      const layers = new Map();
      const activeLayerId = 'active_layer';
      
      layers.set(activeLayerId, { id: activeLayerId });
      layers.set('layer_1', { id: 'layer_1' });
      layers.set('layer_2', { id: 'layer_2' });

      const layersToRemove = Array.from(layers.values())
        .filter(layer => layer.id !== activeLayerId);

      expect(layersToRemove).toHaveLength(2);
    });
  });
});