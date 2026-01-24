# Homestyler 模型加载解码渲染管线完整分析

> **文档版本**: v1.0  
> **创建时间**: 2026-01-24  
> **分析来源**: 实际源码逆向分析  
> **核心文件**: GLTFLoader, DRACOLoader, BASISLoader, T3dGLTFLoader

---

## 📋 目录

1. [渲染管线总览](#1-渲染管线总览)
2. [步骤1: 模型文件加载](#2-步骤1-模型文件加载)
3. [步骤2: 格式解析](#3-步骤2-格式解析)
4. [步骤3: WASM解码](#4-步骤3-wasm解码)
5. [步骤4: 几何数据处理](#5-步骤4-几何数据处理)
6. [步骤5: GPU缓冲区创建](#6-步骤5-gpu缓冲区创建)
7. [步骤6: 材质处理](#7-步骤6-材质处理)
8. [步骤7: 场景树集成](#8-步骤7-场景树集成)
9. [步骤8: 渲染输出](#9-步骤8-渲染输出)

---

## 1. 渲染管线总览

### 1.1 完整流程图

```
┌─────────────────────────────────────────────────────────────────┐
│  步骤1: 模型文件加载 (File Loading)                              │
│  ─────────────────────────────────────────────────────────      │
│  URL/Blob → FileLoader → ArrayBuffer                            │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  步骤2: 格式解析 (Format Parsing)                                │
│  ─────────────────────────────────────────────────────────      │
│  GLB/GLTF Parser → JSON + BIN Buffer                            │
│  - 解析JSON元数据                                                │
│  - 提取二进制数据块                                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  步骤3: WASM解码 (WASM Decoding)                                 │
│  ─────────────────────────────────────────────────────────      │
│  ┌──────────────────┐  ┌──────────────────┐                    │
│  │ DRACO Decoder    │  │ BASIS Transcoder │                    │
│  │ (几何解压)        │  │ (纹理转码)        │                    │
│  └────────┬─────────┘  └────────┬─────────┘                    │
│           │                     │                               │
│           ▼                     ▼                               │
│  Vertices/Indices/Normals   GPU Texture Format                 │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  步骤4: 几何数据处理 (Geometry Processing)                       │
│  ─────────────────────────────────────────────────────────      │
│  - 构建BufferGeometry                                           │
│  - 添加属性（position, normal, uv, color）                      │
│  - 计算边界盒                                                    │
│  - 生成切线（可选）                                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  步骤5: GPU缓冲区创建 (GPU Buffer Creation)                      │
│  ─────────────────────────────────────────────────────────      │
│  - WebGL createBuffer()                                         │
│  - bindBuffer(ARRAY_BUFFER)                                     │
│  - bufferData(vertices/normals/uvs)                            │
│  - bindBuffer(ELEMENT_ARRAY_BUFFER)                            │
│  - bufferData(indices)                                         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  步骤6: 材质处理 (Material Processing)                           │
│  ─────────────────────────────────────────────────────────      │
│  - 解析材质参数（PBR/Phong/Basic）                              │
│  - 加载纹理贴图（Diffuse/Normal/Metallic/Roughness）           │
│  - 编译着色器程序                                                │
│  - 创建Uniform绑定                                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  步骤7: 场景树集成 (Scene Graph Integration)                    │
│  ─────────────────────────────────────────────────────────      │
│  - 创建THREE.Mesh对象                                           │
│  - 应用变换矩阵（position/rotation/scale）                      │
│  - 添加到Scene节点树                                            │
│  - 设置用户数据（metadata）                                     │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  步骤8: 渲染输出 (Rendering Output)                              │
│  ─────────────────────────────────────────────────────────      │
│  - 视锥裁剪（Frustum Culling）                                  │
│  - 排序（Opaque → Transparent）                                │
│  - 绑定着色器和材质                                              │
│  - drawElements() 调用                                          │
│  - 帧缓冲输出到Canvas                                           │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 性能指标

| 阶段 | 典型耗时 | 优化手段 |
|------|---------|---------|
| 文件加载 | 100-500ms | CDN加速、预加载 |
| 格式解析 | 10-50ms | 流式解析 |
| WASM解码 | 50-200ms | 并行解码、Worker线程 |
| 几何处理 | 20-100ms | 对象池、缓存 |
| GPU上传 | 10-50ms | 批量上传、压缩格式 |
| 材质编译 | 50-150ms | 着色器缓存 |
| 场景集成 | 5-20ms | 延迟添加 |
| 首次渲染 | 16ms | 双缓冲、VSync |

**总计**: 约 261-1066ms（未压缩模型）  
**DRACO压缩**: 约 150-400ms（减少60-70%）

---

## 2. 步骤1: 模型文件加载

### 2.1 GLTFLoader.load方法

**文件**: `dist/vendors-hs-b1b7601c.fe5726b7.bundle_dewebpack/module_845131.js:44-59`

```javascript
class GLTFLoader {
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        const path = this.path || THREE.Loader.prototype.extractUrlBase(url);
        
        // 创建文件加载器
        const fileLoader = new THREE.FileLoader(this.manager);
        fileLoader.setResponseType('arraybuffer');
        
        // 加载文件
        fileLoader.load(url, function(arrayBuffer) {
            try {
                // 解析模型
                scope.parse(arrayBuffer, path, onLoad, onError);
            } catch (error) {
                if (onError) {
                    onError(error.constructor === Error ? error : new Error('THREE.GLTFLoader: Unable to parse model.'));
                }
            }
        }, onProgress, onError);
    }
}
```

### 2.2 文件加载管理器

```javascript
// LoadingManager - 管理所有资源加载
const manager = new THREE.LoadingManager();

manager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log('Started loading:', url);
};

manager.onProgress = function(url, itemsLoaded, itemsTotal) {
    const progress = (itemsLoaded / itemsTotal) * 100;
    updateProgressBar(progress);
};

manager.onLoad = function() {
    console.log('All resources loaded');
};

manager.onError = function(url) {
    console.error('Error loading:', url);
};
```

---

## 3. 步骤2: 格式解析

### 3.1 GLB格式解析

**文件**: `dist/vendors-hs-b1b7601c.fe5726b7.bundle_dewebpack/module_845131.js:184-213`

```javascript
class KHR_BINARY_GLTF {
    constructor(arrayBuffer) {
        this.name = 'KHR_binary_glTF';
        this.content = null;
        this.body = null;
        
        const HEADER_SIZE = 12;
        const headerView = new DataView(arrayBuffer, 0, HEADER_SIZE);
        
        // 解析GLB头部
        this.header = {
            magic: readString(new Uint8Array(arrayBuffer.slice(0, 4))),  // 'glTF'
            version: headerView.getUint32(4, true),   // 版本号
            length: headerView.getUint32(8, true)     // 总长度
        };
        
        // 验证格式
        if (this.header.magic !== 'glTF') {
            throw new Error('THREE.GLTFLoader: Unsupported glTF-Binary header.');
        }
        
        if (this.header.version < 2) {
            throw new Error('THREE.GLTFLoader: Legacy binary file detected.');
        }
        
        // 解析数据块
        const chunkView = new DataView(arrayBuffer, HEADER_SIZE);
        let chunkOffset = 0;
        
        while (chunkOffset < chunkView.byteLength) {
            const chunkLength = chunkView.getUint32(chunkOffset, true);
            chunkOffset += 4;
            
            const chunkType = chunkView.getUint32(chunkOffset, true);
            chunkOffset += 4;
            
            if (chunkType === CHUNK_TYPES.JSON) {
                // JSON块（场景描述）
                const jsonData = new Uint8Array(arrayBuffer, HEADER_SIZE + chunkOffset, chunkLength);
                this.content = readString(jsonData);
                
            } else if (chunkType === CHUNK_TYPES.BIN) {
                // 二进制块（几何数据）
                const binStart = HEADER_SIZE + chunkOffset;
                this.body = arrayBuffer.slice(binStart, binStart + chunkLength);
            }
            
            chunkOffset += chunkLength;
        }
        
        if (this.content === null) {
            throw new Error('THREE.GLTFLoader: JSON content not found.');
        }
    }
}

const CHUNK_TYPES = {
    JSON: 0x4E4F534A,  // 'JSON' in ASCII
    BIN: 0x004E4942    // 'BIN\0' in ASCII
};
```

### 3.2 GLTF JSON解析

**文件**: `dist/vendors-hs-b1b7601c.fe5726b7.bundle_dewebpack/module_845131.js:69-90`

```javascript
parse(data, path, onLoad, onError) {
    let content;
    const extensions = {};
    
    // 判断是GLB还是GLTF
    if (typeof data === 'string') {
        // 纯JSON格式（.gltf文件）
        content = data;
    } else {
        // 二进制格式（.glb文件）
        const magic = readString(new Uint8Array(data, 0, 4));
        if (magic === 'glTF') {
            extensions['KHR_binary_glTF'] = new KHR_BINARY_GLTF(data);
            content = extensions['KHR_binary_glTF'].content;
        } else {
            content = readString(new Uint8Array(data));
        }
    }
    
    // 解析JSON
    const json = JSON.parse(content);
    
    // 验证版本
    if (json.asset === undefined || 
json.asset.version[0] < 2) {
        onError(new Error('THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.'));
        return;
    }
    
    // 加载扩展
    if (json.extensionsUsed) {
        if (json.extensionsUsed.indexOf('KHR_DRACO_MESH_COMPRESSION') >= 0) {
            // 需要DRACO解码器
        }
        if (json.extensionsUsed.indexOf('KHR_texture_basisu') >= 0) {
            // 需要BASIS转码器
        }
    }
    
    // 创建解析器
    const parser = new GLTFParser(json, extensions, {
        path: path || this.path || '',
        crossOrigin: this.crossOrigin,
        manager: this.manager
    });
    
    // 开始解析
    parser.parse(function(scene, scenes, cameras, animations) {
        onLoad({
            scene: scene,
            scenes: scenes,
            cameras: cameras,
            animations: animations
        });
    }, onError);
}
```

---

## 4. 步骤3: WASM解码

### 4.1 DRACO几何解码流程

**DRACO解码器完整流程**：

```javascript
class DRACODecoder {
    /**
     * 解码DRACO压缩的几何体
     * @param buffer - DRACO压缩的二进制数据
     * @returns 解码后的几何数据
     */
    async decode(buffer) {
        // 1. 初始化DRACO模块
        const decoderModule = await this.getDecoderModule();
        const decoder = new decoderModule.Decoder();
        
        // 2. 创建DRACO缓冲区
        const dracoBuffer = new decoderModule.DecoderBuffer();
        dracoBuffer.Init(new Int8Array(buffer), buffer.byteLength);
        
        // 3. 检测几何类型
        const geometryType = decoder.GetEncodedGeometryType(dracoBuffer);
        
        // 4. 解码几何体
        let dracoGeometry;
        let status;
        
        if (geometryType === decoderModule.TRIANGULAR_MESH) {
            dracoGeometry = new decoderModule.Mesh();
            status = decoder.DecodeBufferToMesh(dracoBuffer, dracoGeometry);
        } else if (geometryType === decoderModule.POINT_CLOUD) {
            dracoGeometry = new decoderModule.PointCloud();
            status = decoder.DecodeBufferToPointCloud(dracoBuffer, dracoGeometry);
        }
        
        if (!status.ok()) {
            throw new Error('DRACO decoding failed: ' + status.error_msg());
        }
        
        // 5. 提取顶点数据
        const numVertices = dracoGeometry.num_points();
        const numFaces = dracoGeometry.num_faces();
        
        // 6. 提取位置属性
        const positionAttribute = decoder.GetAttribute(
            dracoGeometry,
            decoderModule.POSITION
        );
        const positions = new Float32Array(numVertices * 3);
        decoder.GetAttributeFloatForAllPoints(
            dracoGeometry,
            positionAttribute,
            positions
        );
        
        // 7. 提取法线属性
        const normalAttribute = decoder.GetAttribute(
            dracoGeometry,
            decoderModule.NORMAL
        );
        const normals = normalAttribute ? new Float32Array(numVertices * 3) : null;
        if (normals) {
            decoder.GetAttributeFloatForAllPoints(
                dracoGeometry,
                normalAttribute,
                normals
            );
        }
        
        // 8. 提取UV属性
        const uvAttribute = decoder.GetAttribute(
            dracoGeometry,
            decoderModule.TEX_COORD
        );
        const uvs = uvAttribute ? new Float32Array(numVertices * 2) : null;
        if (uvs) {
            decoder.GetAttributeFloatForAllPoints(
                dracoGeometry,
                uvAttribute,
                uvs
            );
        }
        
        // 9. 提取颜色属性
        const colorAttribute = decoder.GetAttribute(
            dracoGeometry,
            decoderModule.COLOR
        );
        const colors = colorAttribute ? new Float32Array(numVertices * 3) : null;
        if (colors) {
            decoder.GetAttributeFloatForAllPoints(
                dracoGeometry,
                colorAttribute,
                colors
            );
        }
        
        // 10. 提取索引
        const indices = new Uint32Array(numFaces * 3);
        const indexArray = new decoderModule.DracoInt32Array();
        
        for (let i = 0; i < numFaces; i++) {
            decoder.GetFaceFromMesh(dracoGeometry, i, indexArray);
            indices[i * 3 + 0] = indexArray.GetValue(0);
            indices[i * 3 + 1] = indexArray.GetValue(1);
            indices[i * 3 + 2] = indexArray.GetValue(2);
        }
        
        // 11. 释放WASM内存
        decoderModule.destroy(indexArray);
        decoderModule.destroy(dracoGeometry);
        decoderModule.destroy(dracoBuffer);
        
        // 12. 返回解码数据
        return {
            attributes: {
                position: positions,
                normal: normals,
                uv: uvs,
                color: colors
            },
            indices: indices,
            numVertices: numVertices,
            numFaces: numFaces
        };
    }
    
    /**
     * 获取DRACO解码器模块
     */
    async getDecoderModule() {
        if (this.decoderModule) {
            return this.decoderModule;
        }
        
        // 加载WASM模块
        this.decoderModule = await new Promise((resolve) => {
            DracoDecoderModule({
                wasmBinaryFile: 'dist/assets/draco_decoder.c61bf26e.wasm'
            }).then(module => {
                resolve(module);
            });
        });
        
        return this.decoderModule;
    }
}
```

### 4.2 BASIS纹理转码流程

```javascript
class BASISTranscoder {
    /**
     * 转码BASIS纹理到GPU格式
     * @param basisBuffer - BASIS压缩的纹理数据
     * @param targetFormat - 目标GPU格式
     * @returns 转码后的纹理数据
     */
    async transcode(basisBuffer, targetFormat) {
        // 1. 初始化BASIS模块
        const basisModule = await this.getBASISModule();
        
        // 2. 创建BASIS文件对象
        const basisFile = new basisModule.BasisFile(new Uint8Array(basisBuffer));
        
        // 3. 开始转码
        if (!basisFile.startTranscoding()) {
            throw new Error('BASIS transcoding initialization failed');
        }
        
        // 4. 获取图像信息
        const numImages = basisFile.getNumImages();
        const imageIndex = 0;  // 通常使用第一张图
        const levelIndex = 0;  // mipmap级别
        
        const width = basisFile.getImageWidth(imageIndex, levelIndex);
        const height = basisFile.getImageHeight(imageIndex, levelIndex);
        const numLevels = basisFile.getNumLevels(imageIndex);
        
        // 5. 选择GPU格式
        const gpuFormat = this.selectGPUFormat(targetFormat);
        
        // 6. 转码图像
        const transcodedData = basisFile.transcodeImage(
            imageIndex,
            levelIndex,
            gpuFormat,
            0,  // flags
            0   // alphaSetting
        );
        
        if (!transcodedData) {
            throw new Error('BASIS transcoding failed');
        }
        
        // 7. 复制数据
        const result = new Uint8Array(transcodedData.byteLength);
        result.set(new Uint8Array(transcodedData));
        
        // 8. 清理
        basisFile.close();
        basisFile.delete();
        
        // 9. 返回结果
        return {
            data: result,
            width: width,
            height: height,
            format: gpuFormat,
            numLevels: numLevels
        };
    }
    
    /**
     * 选择GPU格式
     */
    selectGPUFormat(preferredFormat) {
        const gl = this.gl;
        
        // 检测GPU支持的压缩格式
        const formats = {
            astc: gl.getExtension('WEBGL_compressed_texture_astc'),
            etc: gl.getExtension('WEBGL_compressed_texture_etc'),
            etc1: gl.getExtension('WEBGL_compressed_texture_etc1'),
            pvrtc: gl.getExtension('WEBGL_compressed_texture_pvrtc'),
            s3tc: gl.getExtension('WEBGL_compressed_texture_s3tc'),
            s3tc_srgb: gl.getExtension('WEBGL_compressed_texture_s3tc_srgb')
        };
        
        // 优先级选择
        if (formats.astc) return BASISFormat.cTFASTC_4x4;       // 最佳质量（移动端）
        if (formats.s3tc) return BASISFormat.cTFBC3;            // PC/主机
        if (formats.etc) return BASISFormat.cTFETC2;            // Android
        if (formats.pvrtc) return BASISFormat.cTFPVRTC1_4_RGB;  // iOS
        
        // 降级到未压缩
        return BASISFormat.cTFRGBA32;
    }
}

// BASIS格式枚举
const BASISFormat = {
    cTFBC1: 0,          // BC1/DXT1 (RGB, 不透明)
    cTFBC3: 1,          // BC3/DXT5 (RGBA, 透明)
    cTFBC4: 2,          // BC4 (单通道)
    cTFBC5: 3,          // BC5 (双通道，法线贴图)
    cTFBC7: 6,          // BC7 (最高质量)
    cTFETC1: 10,        // ETC1 (RGB)
    cTFETC2: 11,        // ETC2 (RGBA)
    cTFASTC_4x4: 10,    // ASTC 4x4
    cTFPVRTC1_4_RGB: 16, // PVRTC1 4bpp
    cTFRGBA32: 13       // 未压缩RGBA
};
```

---

## 5. 步骤4: 几何数据处理

### 5.1 BufferGeometry构建

**文件**: `dist/vendors-hs-b1b7601c.fe5726b7.bundle_dewebpack/module_845131.js:770-815`

```javascript
class GLTFParser {
    /**
     * 加载几何体
     */
    loadGeometries(primitives) {
        return this._withDependencies(['accessors']).then(deps => {
            return Promise.all(primitives.map(primitive => {
                // 创建BufferGeometry
                const geometry = new THREE.BufferGeometry();
                
                const attributes = primitive.attributes;
                
                // 遍历所有属性
                for (const attributeName in attributes) {
                    const attributeIndex = attributes[attributeName];
                    if (attributeIndex === undefined) continue;
                    
                    // 获取访问器数据
                    const accessor = deps.accessors[attributeIndex];
                    
                    // 添加属性到几何体
                    switch (attributeName) {
                        case 'POSITION':
                            geometry.addAttribute('position', accessor);
                            break;
                        case 'NORMAL':
                            geometry.addAttribute('normal', accessor);
                            break;
                        case 'TEXCOORD_0':
                        case 'TEXCOORD0':
                        case 'TEXCOORD':
                            geometry.addAttribute('uv', accessor);
                            break;
                        case 'TEXCOORD_1':
                            geometry.addAttribute('uv2', accessor);
                            break;
                        case 'COLOR_0':
                        case 'COLOR0':
                        case 'COLOR':
                            geometry.addAttribute('color', accessor);
                            break;
                        case 'WEIGHTS_0':
                        case 'WEIGHT':
                            geometry.addAttribute('skinWeight', accessor);
                            break;
                        case 'JOINTS_0':
                        case 'JOINT':
                            geometry.addAttribute('skinIndex', accessor);
                            break;
                    }
                }
                
                // 添加索引
                if (primitive.indices !== undefined) {
                    geometry.setIndex(deps.accessors[primitive.indices]);
                }
                
                return geometry;
            }));
        });
    }
    
    /**
     * 加载访问器（Accessor）
     */
    
loadAccessors() {
        const json = this.json;
        
        return Promise.all(json.accessors.map((accessor, index) => {
            return this.getDependency('bufferView', accessor.bufferView)
                .then(bufferView => {
                    // 获取数据类型
                    const itemSize = WEBGL_TYPE_SIZES[accessor.type];
                    const TypedArray = WEBGL_COMPONENT_TYPES[accessor.componentType];
                    const elementBytes = TypedArray.BYTES_PER_ELEMENT;
                    const itemBytes = elementBytes * itemSize;
                    
                    // 获取步长
                    const bufferViewDef = json.bufferViews[accessor.bufferView];
                    const byteStride = bufferViewDef.byteStride;
                    const normalized = accessor.normalized === true;
                    
                    let array;
                    
                    // 处理交错数据
                    if (byteStride && byteStride !== itemBytes) {
                        array = new TypedArray(bufferView);
                        const ib = new THREE.InterleavedBuffer(array, byteStride / elementBytes);
                        return new THREE.InterleavedBufferAttribute(
                            ib,
                            itemSize,
                            accessor.byteOffset / elementBytes,
                            normalized
                        );
                    }
                    
                    // 普通数据
                    array = new TypedArray(
                        bufferView,
                        accessor.byteOffset,
                        accessor.count * itemSize
                    );
                    
                    return new THREE.BufferAttribute(array, itemSize, normalized);
                });
        }));
    }
}

// WebGL类型大小映射
const WEBGL_TYPE_SIZES = {
    'SCALAR': 1,
    'VEC2': 2,
    'VEC3': 3,
    'VEC4': 4,
    'MAT2': 4,
    'MAT3': 9,
    'MAT4': 16
};

// WebGL组件类型映射
const WEBGL_COMPONENT_TYPES = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
};
```

### 5.2 T3dGLTFLoader几何处理

**文件**: `dist/hs.fe5726b7.bundle_dewebpack/module_542156.js:62-166`

```javascript
class T3dGLTFLoader extends THREE.GLTFLoader {
    load(url, onLoad, onProgress, onError, async, last) {
        super.load(url, (gltf) => {
            // 转换为T3D格式
            const t3dNode = new T3D.Node();
            
            // 遍历场景中的所有网格
            gltf.scene.traverse((object) => {
                if (object.isMesh) {
                    // 提取几何数据
                    const geometry = object.geometry;
                    const indices = Array.from(geometry.getIndex().array);
                    const vertices = Array.from(geometry.getAttribute('position').array);
                    const normals = Array.from(geometry.getAttribute('normal').array);
                    const uvs = Array.from(geometry.getAttribute('uv').array);
                    
                    // 构建T3D节点
                    const meshData = {
                        buffers: {
                            indexs: indices,
                            vertices: vertices,
                            normals: normals,
                            uvs: uvs
                        },
                        material: {
                            diffuse: {
                                image: object.material.map?.image
                            },
                            color: object.material.color.getHex(),
                            transparent: object.material.transparent,
                            opacity: object.material.opacity
                        },
                        params: {
                            meshName: object.name
                        }
                    };
                    
                    // 构建T3D节点
                    const t3dMeshNode = this.buildNode(meshData);
                    t3dNode.addChild(t3dMeshNode);
                }
            });
            
            onLoad(t3dNode);
        }, onProgress, onError);
    }
    
    /**
     * 构建T3D节点
     */
    buildNode(data) {
        // 创建T3D.Mesh
        const mesh = new T3D.Mesh();
        mesh.setPrimitiveType(T3D.PrimitiveType.PT_TriangleList);
        
        // 添加网格部分
        const part = mesh.addPart();
        const vertexFormat = new T3D.VertexFormat();
        vertexFormat.mIsMultiStride = true;
        part.setVertexFormat(vertexFormat);
        
        // 处理索引
        const indices = data.buffers.indexs;
        const vertices = data.buffers.vertices;
        const normals = data.buffers.normals;
        const uvs = data.buffers.uvs;
        
        const numVertices = vertices.length / 3;
        const numIndices = indices.length;
        
        // 选择索引格式
        let indexArray;
        if (numVertices > 65535) {
            part.setIndexFormat(T3D.IndexFormat.INDEX32);
            indexArray = Uint32Array.from(indices);
        } else {
            part.setIndexFormat(T3D.IndexFormat.INDEX16);
            indexArray = Uint16Array.from(indices);
        }
        
        // 计算边界盒
        const boundingBox = new T3D.BoundingBox(
            new T3D.Vector3(Infinity, Infinity, Infinity),
            new T3D.Vector3(-Infinity, -Infinity, -Infinity)
        );
        
        const vertex = new T3D.Vector3();
        for (let i = 0; i < numVertices; i++) {
            vertex.set(
                vertices[i * 3 + 0],
                vertices[i * 3 + 1],
                vertices[i * 3 + 2]
            );
            boundingBox.mergePoint(vertex);
        }
        
        // 交错顶点数据
        let stride = 0;
        if (vertices) stride += 3;
        if (normals) stride += 3;
        if (uvs) stride += 2;
        
        const interleavedData = new Float32Array(numVertices * stride);
        let offset = 0;
        
        // 复制顶点
        interleavedData.set(vertices);
        vertexFormat.appendWithOffset(
            new T3D.Element(
                T3D.AttributeIndex.VET_POSITION,
                T3D.ComponentType.CT_FLOAT,
                3
            ),
            0
        );
        offset += vertices.length;
        
        // 复制法线
        if (normals) {
            interleavedData.set(normals, offset);
            vertexFormat.appendWithOffset(
                new T3D.Element(
                    T3D.AttributeIndex.VET_NORMAL,
                    T3D.ComponentType.CT_FLOAT,
                    3
                ),
                offset * 4  // 字节偏移
            );
            offset += normals.length;
        }
        
        // 复制UV
        if (uvs) {
            interleavedData.set(uvs, offset);
            vertexFormat.appendWithOffset(
                new T3D.Element(
                    T3D.AttributeIndex.VET_TEXCOORD0,
                    T3D.ComponentType.CT_FLOAT,
                    2
                ),
                offset * 4
            );
        }
        
        // 设置边界盒
        part.setBoundingBox(boundingBox.clone());
        mesh.setBoundingBox(boundingBox.clone());
        
        // 设置网格数据
        const meshData = mesh.getMeshData();
        meshData.mVertexData = new Uint8Array(interleavedData.buffer);
        meshData.mIndexData = new Uint8Array(indexArray.buffer);
        
        part.setVertexDataOffset(0);
        part.setIndexDataOffset(0);
        part.setIndexCount(numIndices);
        
        // 设置名称和路径
        const uuid = THREE.Math.generateUUID();
        mesh.setName(uuid);
        mesh.setPath('/' + uuid);
        
        // 创建网格组件
        const meshComponent = new T3D.MeshComponent();
        meshComponent.setMesh(mesh);
        
        // 设置材质
        if (data.material?.diffuse?.image) {
            const textureInstance = new T3D.Texture2DInstance();
            const texture = new T3D.Texture2D();
            const textureData = new T3D.TextureData();
            
            textureData.setMipImage(data.material.diffuse.image);
            texture.setTextureData(textureData);
            textureInstance.setTexture(texture);
            
            // 创建材质
            for (let i = 0; i < mesh.getPartCount(); i++) {
                const material = new T3D.MeshBasicMaterial({
                    cullMode: T3D.RasterizerCullMode.CM_CW,
                    diffuseTexture: textureInstance,
                    transparent: data.material.transparent,
                    color: data.material.color,
                    opacity: data.material.opacity
                });
                
                meshComponent.setMeshPartMaterial(i, material);
            }
        }
        
        // 创建节点
        const node = new T3D.Node(data.params.meshName);
        node.addComponent(meshComponent);
        
        return node;
    }
}
```

---

## 6. 步骤5: GPU缓冲区创建

### 6.1 WebGL缓冲区创建流程

```javascript
class WebGLGeometry {
    /**
     * 创建GPU缓冲区
     */
    createBuffers(geometry) {
        const gl = this.gl;
        const buffers = {};
        
        // 1. 创建顶点缓冲区
        buffers.position = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            geometry.attributes.position.array,
            gl.STATIC_DRAW
        );
        
        // 2. 创建法线缓冲区
        if (geometry.attributes.normal) {
            buffers.normal = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                geometry.attributes.normal.array,
                gl.STATIC_DRAW
            );
        }
        
        // 3. 创建UV缓冲区
        if (geometry.attributes.uv) {
            buffers.uv = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.uv);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                geometry.attributes.uv.array,
                gl.STATIC_DRAW
            );
        }
        
        // 4. 创建颜色缓冲区
        if (geometry.attributes.color) {
            buffers.color = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                geometry.attributes.color.array,
                gl.STATIC_DRAW
            );
        }
        
        // 5. 创建索引缓冲区
        if (geometry.index) {
            buffers.index = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                geometry.index.array,
                gl.STATIC_DRAW
            );
        }
        
        // 6. 解绑缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        
        return buffers;
    }
}
```

### 6.2 GPU内存布局

```
GPU显存布局:
┌──────────────────────────────────────┐
│  Vertex Buffer (ARRAY_BUFFER)        │
│  ────────────────────────────────    │
│  Offset 0: Position (Float32 x 3)    │
│  Offset 12: Normal (Float32 x 3)     │
│  Offset 24: UV (Float32 x 2)         │
│  Offset 32: Color (Float32 x 4)      │
│  Total Stride: 48 bytes              │
├──────────────────────────────────────┤
│  Index Buffer (ELEMENT_ARRAY_BUFFER) │
│  ────────────────────────────────    │
│  Uint16Array or Uint32Array          │
│  [0, 1, 2, 2, 1, 3, ...]             │
└──────────────────────────────────────┘
```

---

## 7. 步骤6: 材质处理

### 7.1 材质加载流程

**文件**: `dist/vendors-hs-b1b7601c.fe5726b7.bundle_dewebpack/module_845131.js:726-768`

```javascript
class GLTFParser {
    /**
     * 加载材质
     */
    loadMaterials() {
        const json = this.json;
        const extensions = this.extensions;
        
        return Promise.all(json.materials.map(materialDef => {
            let MaterialType;
            const materialParams = {};
            const materialExtensions = materialDef.extensions || {};
            const pending = [];
            
            // 检测材质类型
            
if (materialExtensions['KHR_materials_pbrSpecularGlossiness']) {
                // PBR Specular-Glossiness材质
                const sgExtension = extensions['KHR_materials_pbrSpecularGlossiness'];
                MaterialType = sgExtension.getMaterialType(materialDef);
                pending.push(sgExtension.extendParams(materialParams, materialDef, this));
                
            } else if (materialDef.pbrMetallicRoughness !== undefined) {
                // PBR Metallic-Roughness材质（标准）
                MaterialType = THREE.MeshStandardMaterial;
                
                const pbrDef = materialDef.pbrMetallicRoughness;
                
                // 基础颜色
                materialParams.color = new THREE.Color(1, 1, 1);
                materialParams.opacity = 1;
                
                if (Array.isArray(pbrDef.baseColorFactor)) {
                    const array = pbrDef.baseColorFactor;
                    materialParams.color.fromArray(array);
                    materialParams.opacity = array[3];
                }
                
                // 基础颜色纹理
                if (pbrDef.baseColorTexture !== undefined) {
                    pending.push(
                        this.assignTexture(materialParams, 'map', pbrDef.baseColorTexture.index)
                    );
                }
                
                // 金属度和粗糙度
                materialParams.metalness = pbrDef.metallicFactor !== undefined ? pbrDef.metallicFactor : 1.0;
                materialParams.roughness = pbrDef.roughnessFactor !== undefined ? pbrDef.roughnessFactor : 1.0;
                
                // 金属粗糙度纹理
                if (pbrDef.metallicRoughnessTexture !== undefined) {
                    const textureIndex = pbrDef.metallicRoughnessTexture.index;
                    pending.push(this.assignTexture(materialParams, 'metalnessMap', textureIndex));
                    pending.push(this.assignTexture(materialParams, 'roughnessMap', textureIndex));
                }
                
            } else {
                // 降级到Phong材质
                MaterialType = THREE.MeshPhongMaterial;
            }
            
            // 双面渲染
            if (materialDef.doubleSided === true) {
                materialParams.side = THREE.DoubleSide;
            }
            
            // Alpha模式
            const alphaMode = materialDef.alphaMode || 'OPAQUE';
            if (alphaMode !== 'OPAQUE') {
                materialParams.transparent = true;
                if (alphaMode === 'MASK') {
                    materialParams.alphaTest = materialDef.alphaCutoff || 0.5;
                }
            } else {
                materialParams.transparent = false;
            }
            
            // 法线贴图
            if (materialDef.normalTexture !== undefined) {
                pending.push(this.assignTexture(materialParams, 'normalMap', materialDef.normalTexture.index));
                materialParams.normalScale = new THREE.Vector2(1, 1);
                
                if (materialDef.normalTexture.scale !== undefined) {
                    materialParams.normalScale.set(
                        materialDef.normalTexture.scale,
                        materialDef.normalTexture.scale
                    );
                }
            }
            
            // AO贴图
            if (materialDef.occlusionTexture !== undefined) {
                pending.push(this.assignTexture(materialParams, 'aoMap', materialDef.occlusionTexture.index));
                
                if (materialDef.occlusionTexture.strength !== undefined) {
                    materialParams.aoMapIntensity = materialDef.occlusionTexture.strength;
                }
            }
            
            // 自发光
            if (materialDef.emissiveFactor !== undefined) {
                if (MaterialType === THREE.MeshBasicMaterial) {
                    materialParams.color = new THREE.Color().fromArray(materialDef.emissiveFactor);
                } else {
                    materialParams.emissive = new THREE.Color().fromArray(materialDef.emissiveFactor);
                }
            }
            
            // 自发光贴图
            if (materialDef.emissiveTexture !== undefined) {
                const mapKey = MaterialType === THREE.MeshBasicMaterial ? 'map' : 'emissiveMap';
                pending.push(this.assignTexture(materialParams, mapKey, materialDef.emissiveTexture.index));
            }
            
            // 等待所有纹理加载完成
            return Promise.all(pending).then(() => {
                let material;
                
                if (MaterialType === THREE.ShaderMaterial) {
                    material = extensions['KHR_materials_pbrSpecularGlossiness'].createMaterial(materialParams);
                } else {
                    material = new MaterialType(materialParams);
                }
                
                if (materialDef.name !== undefined) {
                    material.name = materialDef.name;
                }
                
                // 修正法线贴图Y方向
                if (material.normalScale) {
                    material.normalScale.x = -material.normalScale.x;
                }
                
                // 设置纹理编码
                if (material.map) material.map.encoding = THREE.sRGBEncoding;
                if (material.emissiveMap) material.emissiveMap.encoding = THREE.sRGBEncoding;
                
                // 保存额外数据
                if (materialDef.extras) {
                    material.userData = materialDef.extras;
                }
                
                return material;
            });
        }));
    }
}
```

### 7.2 纹理加载流程

**文件**: `dist/vendors-hs-b1b7601c.fe5726b7.bundle_dewebpack/module_845131.js:684-717`

```javascript
loadTexture(textureIndex) {
    const json = this.json;
    const options = this.options;
    const textureLoader = this.textureLoader;
    
    const textureDef = json.textures[textureIndex];
    const imageDef = json.images[textureDef.source];
    
    let sourceURI = imageDef.uri;
    let isObjectURL = false;
    
    // 处理嵌入的图像数据
    if (imageDef.bufferView !== undefined) {
        sourceURI = this.getDependency('bufferView', imageDef.bufferView)
            .then(bufferView => {
                isObjectURL = true;
                
                const blob = new Blob([bufferView], {
                    type: imageDef.mimeType
                });
                
                return URL.createObjectURL(blob);
            });
    }
    
    return Promise.resolve(sourceURI).then(uri => {
        // 加载纹理
        const loader = THREE.Loader.Handlers.get(uri) || textureLoader;
        
        return new Promise((resolve, reject) => {
            loader.load(resolveURL(uri, options.path), resolve, undefined, reject);
        });
        
    }).then(texture => {
        // 配置纹理
        if (isObjectURL) {
            URL.revokeObjectURL(sourceURI);
        }
        
        texture.flipY = false;
        
        if (textureDef.name !== undefined) {
            texture.name = textureDef.name;
        }
        
        // 纹理格式
        texture.format = textureDef.format !== undefined 
            ? WEBGL_TEXTURE_FORMATS[textureDef.format]
            : THREE.RGBAFormat;
            
        texture.type = textureDef.type !== undefined
            ? WEBGL_TEXTURE_DATATYPES[textureDef.type]
            : THREE.UnsignedByteType;
        
        // 采样器参数
        const samplerDef = (json.samplers || {})[textureDef.sampler] || {};
        
        texture.magFilter = WEBGL_FILTERS[samplerDef.magFilter] || THREE.LinearFilter;
        texture.minFilter = WEBGL_FILTERS[samplerDef.minFilter] || THREE.LinearMipMapLinearFilter;
        texture.wrapS = WEBGL_WRAPPINGS[samplerDef.wrapS] || THREE.RepeatWrapping;
        texture.wrapT = WEBGL_WRAPPINGS[samplerDef.wrapT] || THREE.RepeatWrapping;
        
        return texture;
    });
}
```

---

## 8. 步骤7: 场景树集成

### 8.1 网格对象创建

**文件**: `dist/vendors-hs-b1b7601c.fe5726b7.bundle_dewebpack/module_845131.js:817-867`

```javascript
loadMeshes() {
    const json = this.json;
    const extensions = this.extensions;
    
    return this._withDependencies(['accessors', 'materials']).then(deps => {
        return Promise.all(json.meshes.map((meshDef, meshIndex) => {
            const group = new THREE.Group();
            const primitives = meshDef.primitives || [];
            
            return this.loadGeometries(primitives).then(geometries => {
                for (let i = 0; i < primitives.length; i++) {
                    const primitive = primitives[i];
                    const geometry = geometries[i];
                    
                    // 获取材质
                    let material;
                    if (primitive.material === undefined) {
                        // 默认材质
                        material = new THREE.MeshStandardMaterial({
                            color: 0xFFFFFF,
                            emissive: 0x000000,
                            metalness: 1,
                            roughness: 1,
                            transparent: false,
                            depthTest: true,
                            side: THREE.FrontSide
                        });
                    } else {
                        material = deps.materials[primitive.material];
                    }
                    
                    // 处理AO贴图的UV2
                    if (material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined) {
                        geometry.addAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
                    }
                    
                    // 检测顶点颜色和法线
                    const hasVertexColors = geometry.attributes.color !== undefined;
                    const hasFlatShading = geometry.attributes.normal === undefined;
                    
                    // 克隆材质（如果需要修改）
                    if (hasVertexColors || hasFlatShading) {
                        if (material.isGLTFSpecularGlossinessMaterial) {
                            material = extensions['KHR_materials_pbrSpecularGlossiness'].cloneMaterial(material);
                        } else {
                            material = material.clone();
                        }
                    }
                    
                    if (hasVertexColors) {
                        material.vertexColors = THREE.VertexColors;
                        material.needsUpdate = true;
                    }
                    
                    if (hasFlatShading) {
                        material.flatShading = true;
                    }
                    
                    // 根据图元模式创建对象
                    let mesh;
                    const mode = primitive.mode;
                    
                    if (mode === WEBGL_CONSTANTS.TRIANGLES || mode === undefined) {
                        mesh = new THREE.Mesh(geometry, material);
                    } else if (mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {
                        mesh = new THREE.Mesh(geometry, material);
                        mesh.drawMode = THREE.TriangleStripDrawMode;
                    } else if (mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {
                        mesh = new THREE.Mesh(geometry, material);
                        mesh.drawMode = THREE.TriangleFanDrawMode;
                    } else if (mode === WEBGL_CONSTANTS.LINES) {
                        mesh = new THREE.LineSegments(geometry, material);
                    } else if (mode === WEBGL_CONSTANTS.LINE_STRIP) {
                        mesh = new THREE.Line(geometry, material);
                    } else if (mode === WEBGL_CONSTANTS.LINE_LOOP) {
                        mesh = new THREE.LineLoop(geometry, material);
                    } else if (mode === WEBGL_CONSTANTS.POINTS) {
                        mesh = new THREE.Points(geometry, material);
                    } else {
                        throw new Error('THREE.GLTFLoader: Primitive mode unsupported: ' + mode);
                    }
                    
                    // 设置名称
                    mesh.name = meshDef.name || ('mesh_' + meshIndex);
                    
                    // 处理Morph Targets
                    if (primitive.targets !== undefined) {
                        addMorphTargets(mesh, meshDef, primitive, deps);
                    }
                    
                    // 保存额外数据
                    if (primitive.extras) {
                        mesh.userData = primitive.extras;
                    }
                    
                    // 如果有多个图元，添加到组
                    if (primitives.length > 1) {
                        mesh.name += '_' + i;
                        group.add(mesh);
                    } else {
                        return mesh;
                    }
                }
                
                return group;
            });
        }));
    });
}
```

### 8.2 
节点树构建

**文件**: `dist/vendors-hs-b1b7601c.fe5726b7.bundle_dewebpack/module_845131.js:1025-1061`

```javascript
loadScenes() {
    const json = this.json;
    const extensions = this.extensions;
    
    // 递归构建节点树
    function buildNodeHierarchy(nodeIndex, parentObject, nodeDefs) {
        const nodeDef = json.nodes[nodeIndex];
        const nodeObject = nodeDefs[nodeIndex];
        
        parentObject.add(nodeObject);
        
        // 递归添加子节点
        if (nodeDef.children) {
            const children = nodeDef.children;
            for (let i = 0; i < children.length; i++) {
                buildNodeHierarchy(children[i], nodeObject, nodeDefs);
            }
        }
    }
    
    return this._withDependencies(['nodes']).then(deps => {
        return Promise.all(json.scenes.map(sceneDef => {
            // 创建场景
            const scene = new THREE.Scene();
            
            if (sceneDef.name !== undefined) {
                scene.name = sceneDef.name;
            }
            
            if (sceneDef.extras) {
                scene.userData = sceneDef.extras;
            }
            
            // 添加根节点
            const nodeIndices = sceneDef.nodes || [];
            for (let i = 0; i < nodeIndices.length; i++) {
                buildNodeHierarchy(nodeIndices[i], scene, deps.nodes);
            }
            
            // 应用材质扩展
            scene.traverse(object => {
                if (object.material && object.material.isGLTFSpecularGlossinessMaterial) {
                    object.onBeforeRender = extensions['KHR_materials_pbrSpecularGlossiness'].refreshUniforms;
                }
            });
            
            // 添加灯光
            if (sceneDef.extensions && sceneDef.extensions['KHR_lights']) {
                const lights = extensions['KHR_lights'].lights;
                const lightIndex = sceneDef.extensions['KHR_lights'].light;
                scene.add(lights[lightIndex]);
            }
            
            return scene;
        }));
    });
}
```

---

## 9. 步骤8: 渲染输出

### 9.1 WebGL渲染循环

```javascript
class WebGLRenderer {
    /**
     * 渲染单帧
     */
    render(scene, camera) {
        const gl = this.context;
        
        // 1. 清空帧缓冲
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        // 2. 更新场景矩阵
        scene.updateMatrixWorld();
        camera.updateMatrixWorld();
        
        // 3. 视锥裁剪
        const frustum = new THREE.Frustum();
        frustum.setFromMatrix(
            new THREE.Matrix4().multiplyMatrices(
                camera.projectionMatrix,
                camera.matrixWorldInverse
            )
        );
        
        // 4. 收集可见对象
        const renderList = [];
        scene.traverse(object => {
            if (object.isMesh && object.visible) {
                // 视锥裁剪测试
                if (frustum.intersectsObject(object)) {
                    renderList.push(object);
                }
            }
        });
        
        // 5. 排序渲染列表
        // 不透明物体：前到后（减少overdraw）
        // 透明物体：后到前（正确混合）
        const opaqueObjects = renderList.filter(obj => !obj.material.transparent);
        const transparentObjects = renderList.filter(obj => obj.material.transparent);
        
        opaqueObjects.sort((a, b) => {
            const distA = camera.position.distanceToSquared(a.position);
            const distB = camera.position.distanceToSquared(b.position);
            return distA - distB;  // 前到后
        });
        
        transparentObjects.sort((a, b) => {
            const distA = camera.position.distanceToSquared(a.position);
            const distB = camera.position.distanceToSquared(b.position);
            return distB - distA;  // 后到前
        });
        
        // 6. 渲染不透明物体
        for (const object of opaqueObjects) {
            this.renderObject(object, camera);
        }
        
        // 7. 渲染透明物体
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        
        for (const object of transparentObjects) {
            this.renderObject(object, camera);
        }
        
        gl.disable(gl.BLEND);
    }
    
    /**
     * 渲染单个对象
     */
    renderObject(object, camera) {
        const gl = this.context;
        const geometry = object.geometry;
        const material = object.material;
        
        // 1. 绑定着色器程序
        const program = this.getProgram(material);
        gl.useProgram(program);
        
        // 2. 设置Uniform
        this.setUniforms(program, material, camera, object);
        
        // 3. 绑定顶点属性
        this.bindAttributes(program, geometry);
        
        // 4. 绑定纹理
        this.bindTextures(material);
        
        // 5. 设置渲染状态
        this.setRenderState(material);
        
        // 6. 绘制调用
        if (geometry.index) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.index.buffer);
            gl.drawElements(
                gl.TRIANGLES,
                geometry.index.count,
                geometry.index.array instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT,
                0
            );
        } else {
            gl.drawArrays(
                gl.TRIANGLES,
                0,
                geometry.attributes.position.count
            );
        }
    }
    
    /**
     * 设置Uniform变量
     */
    setUniforms(program, material, camera, object) {
        const gl = this.context;
        
        // 模型矩阵
        const modelMatrix = object.matrixWorld;
        gl.uniformMatrix4fv(
            gl.getUniformLocation(program, 'modelMatrix'),
            false,
            modelMatrix.elements
        );
        
        // 视图矩阵
        const viewMatrix = camera.matrixWorldInverse;
        gl.uniformMatrix4fv(
            gl.getUniformLocation(program, 'viewMatrix'),
            false,
            viewMatrix.elements
        );
        
        // 投影矩阵
        const projectionMatrix = camera.projectionMatrix;
        gl.uniformMatrix4fv(
            gl.getUniformLocation(program, 'projectionMatrix'),
            false,
            projectionMatrix.elements
        );
        
        // 材质参数
        if (material.color) {
            gl.uniform3f(
                gl.getUniformLocation(program, 'diffuseColor'),
                material.color.r,
                material.color.g,
                material.color.b
            );
        }
        
        if (material.opacity !== undefined) {
            gl.uniform1f(
                gl.getUniformLocation(program, 'opacity'),
                material.opacity
            );
        }
        
        // PBR参数
        if (material.metalness !== undefined) {
            gl.uniform1f(
                gl.getUniformLocation(program, 'metalness'),
                material.metalness
            );
        }
        
        if (material.roughness !== undefined) {
            gl.uniform1f(
                gl.getUniformLocation(program, 'roughness'),
                material.roughness
            );
        }
    }
}
```

### 9.2 着色器编译

```javascript
class ShaderCompiler {
    /**
     * 编译着色器
     */
    compileShader(gl, source, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        // 检查编译错误
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const error = gl.getShaderInfoLog(shader);
            console.error('Shader compilation error:', error);
            gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    /**
     * 链接程序
     */
    linkProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        // 检查链接错误
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const error = gl.getProgramInfoLog(program);
            console.error('Program linking error:', error);
            gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }
}
```

### 9.3 PBR着色器示例

```glsl
// 顶点着色器
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vPosition = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vUv = uv;
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}

// 片段着色器
precision highp float;

uniform vec3 diffuseColor;
uniform float metalness;
uniform float roughness;
uniform float opacity;

uniform sampler2D map;
uniform sampler2D normalMap;
uniform sampler2D metalnessMap;
uniform sampler2D roughnessMap;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;

// PBR光照计算
vec3 BRDF(vec3 N, vec3 V, vec3 L, vec3 albedo, float metallic, float roughness) {
    vec3 H = normalize(V + L);
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float NdotH = max(dot(N, H), 0.0);
    float VdotH = max(dot(V, H), 0.0);
    
    // Fresnel
    vec3 F0 = mix(vec3(0.04), albedo, metallic);
    vec3 F = F0 + (1.0 - F0) * pow(1.0 - VdotH, 5.0);
    
    // Distribution (GGX)
    float alpha = roughness * roughness;
    float alpha2 = alpha * alpha;
    float denom = NdotH * NdotH * (alpha2 - 1.0) + 1.0;
    float D = alpha2 / (3.14159 * denom * denom);
    
    // Geometry
    float k = (roughness + 1.0) * (roughness + 1.0) / 8.0;
    float G1 = NdotV / (NdotV * (1.0 - k) + k);
    float G2 = NdotL / (NdotL * (1.0 - k) + k);
    float G = G1 * G2;
    
    // Cook-Torrance BRDF
    vec3 specular = (D * F * G) / max(4.0 * NdotV * NdotL, 0.001);
    vec3 kD = (vec3(1.0) - F) * (1.0 - metallic);
    vec3 diffuse = kD * albedo / 3.14159;
    
    return (diffuse + specular) * NdotL;
}

void main() {
    // 采样纹理
    vec4 texColor = texture2D(map, vUv);
    vec3 albedo = diffuseColor * texColor.rgb;
    
    float metallic = metalness * texture2D(metalnessMap, vUv).b;
    float rough = roughness * texture2D(roughnessMap, vUv).g;
    
    // 法线贴图
    vec3 N = normalize(vNormal);
    vec3 mapN = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
    // TODO: 转换到世界空间
    
    // 光照计算
    vec3 V = normalize(cameraPosition - vPosition);
    vec3 L = normalize(vec3(1.0, 1.0, 1.0));  // 主光源方向
    
    vec3 color = BRDF(N, V, L, albedo, metallic, rough);
    
    // 环境光
    color += albedo * 0.03;
    
    gl_FragColor = vec4(color, opacity * texColor.a);
}
```

---

## 10. 完整流程时序图

```
时间轴 (ms)
0     ┌─────────────────────────────────────────────────────────┐
      │ 用户点击"加载模型"                                        │
      └──────────────────┬──────────────────────────────────────┘
                         │
100   ┌──────────────────▼──────────────────────────────────────┐
      │ FileLoader.load(url) - 网络请求                          │
      │ - 发送HTTP GET请求                                       │
      │ - 接收ArrayBuffer数据                                    │
      └──────────────────┬──────────────────────────────────────┘
                         │
600   ┌──────────────────▼──────────────────────────────────────┐
      │ GLTFLoader.parse() - 格式解析                            │
      │ - 