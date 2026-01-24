# Homestyler 模型加载、解码、渲染、显示完整流程

> **补充文档**: 模型加载渲染管线详细分析  
> **创建时间**: 2026-01-24  
> **关键文件**: module_5016.js, contentutils.js, geometrymanager.js

---

## 📋 目录

1. [模型加载流程概览](#1-模型加载流程概览)
2. [模型数据获取](#2-模型数据获取)
3. [几何体解码](#3-几何体解码)
4. [材质加载与处理](#4-材质加载与处理)
5. [网格创建与转换](#5-网格创建与转换)
6. [场景图添加](#6-场景图添加)
7. [DisplayList渲染系统](#7-displaylist渲染系统)
8. [渲染循环](#8-渲染循环)
9. [完整代码示例](#9-完整代码示例)

---

## 1. 模型加载流程概览

### 完整管线

```
1. 模型请求（NWTK.api.catalog）
   ↓
2. 异步加载模型数据（JSON/Binary）
   ↓
3. 几何体解码（DRACO压缩 → BufferGeometry）
   ↓
4. 材质解码（BASIS纹理 → GPU格式）
   ↓
5. 网格创建（Three.js Geometry → T3D StreamingMesh）
   ↓
6. 场景图添加（entity.addChild(mesh)）
   ↓
7. DisplayList注册（displayList[entityId] = viewObject）
   ↓
8. 渲染循环（requestAnimationFrame）
   ↓
9. 屏幕显示（WebGL drawCall）
```

---

## 2. 模型数据获取

### 2.1 API调用

**文件**: `dist/app-hs.fe5726b7.bundle_dewebpack/originalmetacreatortype.js:4961-4962`

```javascript
// 通过seekId获取产品模型
NWTK.api.catalog.getProductById(seekId).then(product => {
    // product包含：
    // - id: 产品ID
    // - seekId: 唯一标识
    // - metadata: 元数据
    // - geometry: 几何数据URL
    // - materials: 材质数据数组
    // - thumbnail: 缩略图URL
    
    loadProductModel(product);
});

// 批量加载（性能优化）
NWTK.api.catalog.getProductsByIds([seekId1, seekId2, ...]).then(products => {
    products.forEach(product => loadProductModel(product));
});
```

### 2.2 元数据结构

```javascript
const product = {
    id: "123456",
    seekId: "model_abc_001",
    name: "沙发",
    category: "furniture",
    
    // 几何数据
    geometry: {
        url: "https://cdn.example.com/models/sofa_001.draco",
        format: "draco",  // 或 "gltf", "obj", "fbx"
        compressed: true,
        size: 245678  // 字节
    },
    
    // 材质数据
    materials: [
        {
            id: "mat_001",
            name: "fabric",
            baseColor: "#F5F5DC",
            textures: {
                diffuse: "https://cdn.example.com/textures/fabric_diffuse.basis",
                normal: "https://cdn.example.com/textures/fabric_normal.basis",
                roughness: "https://cdn.example.com/textures/fabric_roughness.basis"
            },
            properties: {
                roughness: 0.8,
                metalness: 0.0
            }
        }
    ],
    
    // 模型元数据
    metadata: {
        dimensions: { width: 2.0, depth: 0.9, height: 0.85 },
        polycount: 15000,
        lod_levels: 3
    }
};
```

---

## 3. 几何体解码

### 3.1 DRACO解码

```javascript
// WebAssembly DRACO解码器
class DRACODecoder {
    async decode(compressedBuffer) {
        // 1. 初始化DRACO解码器（WebAssembly）
        const decoder = new DracoDecoder();
        const decoderModule = await DRACOLoader.getDecoderModule();
        
        // 2. 创建解码器缓冲区
        const buffer = new decoderModule.DecoderBuffer();
        buffer.Init(new Int8Array(compressedBuffer), compressedBuffer.byteLength);
        
        // 3. 解码几何体
        const geometryType = decoder.GetEncodedGeometryType(buffer);
        let dracoGeometry;
        
        if (geometryType === decoderModule.TRIANGULAR_MESH) {
            dracoGeometry = new decoderModule.Mesh();
            const status = decoder.DecodeBufferToMesh(buffer, dracoGeometry);
            
            if (!status.ok()) {
                throw new Error('DRACO decoding failed: ' + status.error_msg());
            }
        }
        
        // 4. 提取顶点数据
        const numVertices = dracoGeometry.num_points();
        const numFaces = dracoGeometry.num_faces();
        
        // 5. 提取属性
        const attributes = {
            position: this.extractAttribute(decoder, dracoGeometry, 'POSITION'),
            normal: this.extractAttribute(decoder, dracoGeometry, 'NORMAL'),
            uv: this.extractAttribute(decoder, dracoGeometry, 'TEX_COORD'),
            color: this.extractAttribute(decoder, dracoGeometry, 'COLOR')
        };
        
        // 6. 提取索引
        const indices = new Uint32Array(numFaces * 3);
        const indexArray = new decoderModule.DracoInt32Array();
        for (let i = 0; i < numFaces; i++) {
            decoder.GetFaceFromMesh(dracoGeometry, i, indexArray);
            indices[i * 3] = indexArray.GetValue(0);
            indices[i * 3 + 1] = indexArray.GetValue(1);
            indices[i * 3 + 2] = indexArray.GetValue(2);
        }
        
        // 7. 清理
        decoderModule.destroy(dracoGeometry);
        decoderModule.destroy(buffer);
        
        return {
            attributes,
            indices,
            numVertices,
            numFaces
        };
    }
    
    extractAttribute(decoder, geometry, attributeName) {
        const decoderModule = DRACOLoader.getDecoderModule();
        const attribute = decoder.GetAttributeByUniqueId(
            geometry,
            decoderModule[attributeName]
        );
        
        const numComponents = attribute.num_components();
        const numValues = geometry.num_points() * numComponents;
        const dataType = attribute.data_type();
        
        let typedArray;
        if (dataType === decoderModule.DT_FLOAT32) {
            typedArray = new Float32Array(numValues);
            decoder.GetAttributeFloatForAllPoints(
                geometry, attribute, typedArray
            );
        } else if (dataType === decoderModule.DT_INT32) {
            typedArray = new Int32Array(numValues);
            decoder.GetAttributeInt32ForAllPoints(
                geometry, attribute, typedArray
            );
        }
        
        return typedArray;
    }
}
```

### 3.2 创建BufferGeometry

**文件**: `dist/app-hs.fe5726b7.bundle_dewebpack/module_5016.js:50-55`

```javascript
// 从解码的数据创建Three.js BufferGeometry
function createBufferGeometry(decodedData) {
    const geometry = new THREE.BufferGeometry();
    
    // 添加顶点位置
    geometry.setAttribute('position', 
        new THREE.BufferAttribute(decodedData.attributes.position, 3)
    );
    
    // 添加法线
    if (decodedData.attributes.normal) {
        geometry.setAttribute('normal',
            new THREE.BufferAttribute(decodedData.attributes.normal, 3)
        );
    }
    
    // 添加UV坐标
    if (decodedData.attributes.uv) {
        geometry.setAttribute('uv',
            new THREE.BufferAttribute(decodedData.attributes.uv, 2)
        );
    }
    
    // 添加顶点颜色
    if (decodedData.attributes.color) {
        geometry.setAttribute('color',
            new THREE.BufferAttribute(decodedData.attributes.color, 3)
        );
    }
    
    // 设置索引
    geometry.setIndex(
        new THREE.BufferAttribute(decodedData.indices, 1)
    );
    
    // 计算包围盒和包围球
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    
    return geometry;
}
```

---

## 4. 材质加载与处理

### 4.1 BASIS纹理解码

```javascript
class BASISTextureLoader {
    async loadTexture(url) {
        // 1. 加载BASIS文件
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        
        // 2. 初始化BASIS转码器（WebAssembly）
        const { BasisFile, initializeBasis } = await import('basis_universal');
        await initializeBasis();
        
        // 3. 创建BASIS文件对象
        const basisFile = new BasisFile(new Uint8Array(arrayBuffer));
        
        // 4. 获取图像信息
        const width = basisFile.getImageWidth(0, 0);
        const height = basisFile.getImageHeight(0, 0);
        const levels = basisFile.getNumLevels(0);
        
        // 5. 选择目标GPU格式
        const gl = this.getWebGLContext();
        const targetFormat = this.selectBestFormat(gl);
        
        // 6. 转码到GPU格式
        if (!basisFile.startTranscoding()) {
            throw new Error('BASIS transcoding failed to start');
        }
        
        const transcoded = basisFile.transcodeImage(
            0,  // imageIndex
            0,  // levelIndex
            targetFormat,
            0,  // getAlphaForOpaqueFormats
            0   // getImageDescFlags
        );
        
        // 7. 创建WebGL纹理
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        // 8. 上传压缩纹理数据
        gl.compressedTexImage2D(
            gl.TEXTURE_2D,
            0,  // level
            this.getGLFormat(targetFormat),
            width,
            height,
            0,  // border
            transcoded
        );
        
        // 9. 生成mipmap
        for (let level = 1; level < levels; level++) {
            const levelData = basisFile.transcodeImage(0, level, targetFormat, 0, 0);
            const levelWidth = basisFile.getImageWidth(0, level);
            const levelHeight = basisFile.getImageHeight(0, level);
            
            gl.compressedTexImage2D(
                gl.TEXTURE_2D,
                level,
                this.getGLFormat(targetFormat),
                levelWidth,
                levelHeight,
                0,
                levelData
            );
        }
        
        // 10. 设置纹理参数
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        
        // 11. 清理
        basisFile.close();
        basisFile.delete();
        
        return texture;
    }
    
    selectBestFormat(gl) {
        // 根据GPU支持选择最佳格式
        const ext_s3tc = gl.getExtension('WEBGL_compressed_texture_s3tc');
        const ext_etc1 = gl.getExtension('WEBGL_compressed_texture_etc1');
        const ext_astc = gl.getExtension('WEBGL_compressed_texture_astc');
        const ext_pvrtc = gl.getExtension('WEBGL_compressed_texture_pvrtc');
        
        if (ext_astc) return 'ASTC_4x4';  // 最佳质量
        if (ext_s3tc) return 'BC7';        // PC/主机
        if (ext_etc1) return 'ETC1';       // Android
        if (ext_pvrtc) return 'PVRTC1_4';  // iOS
        
        return 'RGBA32';  // 降级到未压缩
    }
}
```

### 4.2 材质创建

**文件**: `dist/plugins-hs-1625f76b.fe5726b7.bundle_dewebpack/contentutils.js:249-250`

```javascript
// 创建PBR材质
function createPBRMaterial(materialData) {
    const material = new T3D.PBRMaterial();
    
    // 基础颜色
    if (materialData.baseColor) {
        material.setColor(materialData.baseColor);
    }
    
    // 加载纹理贴图
    const textureLoader = new BASISTextureLoader();
    
    // Diffuse贴图
    if (materialData.textures.diffuse) {
        textureLoader.loadTexture(materialData.textures.diffuse).then(tex => {
            material.setDiffuseMap(tex);
            material.needsUpdate = true;
        });
    }
    
    // Normal贴图
    if (materialData.textures.normal) {
        textureLoader.loadTexture(materialData.textures.normal).then(tex => {
            material.setNormalMap(tex);
            material.needsUpdate = true;
        });
    }
    
    // Roughness贴图
    if (materialData.textures.roughness) {
        textureLoader.loadTexture(materialData.textures.roughness).then(tex => {
            material.setRoughnessMap(tex);
            material.needsUpdate = true;
        });
    }
    
    // Metalness贴图
    if (materialData.textures.metalness) {
        textureLoader.loadTexture(materialData.textures.metalness).then(tex => {
            material.setMetalnessMap(tex);
            material.needsUpdate = true;
        });
    }
    
    // 材质属性
    material.setRoughness(materialData.properties.roughness || 0.5);
    material.setMetalness(materialData.properties.metalness || 0.0);
    
    // 纹理平铺
    if (materialData.initTileSize_x && materialData.initTileSize_y) {
        material.setTextureRepeat(
            materialData.initTileSize_x,
            materialData.initTileSize_y
        );
    }
    
    return material;
}
```

---

## 5. 网格创建与转换

### 5.1 Three.js → T3D转换

**文件**: 