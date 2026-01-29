/**
 * 创建缺失模块的占位文件
 */
const fs = require('fs');
const path = require('path');

// 需要创建的模块列表
const missingModules = [
  '../../../parametric/ParametricModel',
  '../../../scene/Entity',
  '../../../scene/decorators',
  '../../scene/Entity',
  '../../scene/decorators',
  '../../utils/Signal',
  '../ExtrudedBody',
  '../Wall',
  '../geometry/Polygon',
  '../geometry/RoomInfo',
  '../lighting/Position',
  '../parametric/ParametricModel',
  '../rendering/MaterialData',
  '../scene/Entity',
  '../types/ContentType',
  './Constants',
  './ModelClass',
  './RequestType',
  './GraphicsObjectType',
  './Render',
  './RenderLight',
  './Config',
  './CustomizationContentType',
  './ParametricDoorWindowSystemVariablesName'
];

// 创建基本的占位内容
function createStubContent(moduleName) {
  const baseName = path.basename(moduleName);
  return `/**
 * ${baseName} - 占位文件
 * 此文件为自动生成的占位文件，用于解决编译依赖问题
 */

// 导出空对象作为占位
export const ${baseName} = {} as any;

// 默认导出
export default ${baseName};
`;
}

// 处理每个模块
missingModules.forEach(modulePath => {
  // 转换为实际文件路径
  let filePath = modulePath.replace(/\.\.\//g, '');
  
  // 确保是相对于 source 目录的路径
  if (!filePath.startsWith('source/')) {
    filePath = path.join('source', filePath);
  }
  
  // 添加 .ts 扩展名
  if (!filePath.endsWith('.ts')) {
    filePath += '.ts';
  }
  
  // 创建目录
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`创建目录: ${dir}`);
  }
  
  // 如果文件不存在，创建占位文件
  if (!fs.existsSync(filePath)) {
    const content = createStubContent(path.basename(modulePath));
    fs.writeFileSync(filePath, content);
    console.log(`创建占位文件: ${filePath}`);
  } else {
    console.log(`文件已存在: ${filePath}`);
  }
});

console.log('占位文件创建完成！');