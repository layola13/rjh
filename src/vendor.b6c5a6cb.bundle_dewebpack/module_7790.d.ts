/**
 * Rabbit流密码算法的TypeScript类型定义
 * Rabbit是一种高速流密码算法,设计用于高性能加密场景
 */

declare namespace CryptoJS {
  namespace lib {
    /**
     * 流密码基类接口
     */
    interface StreamCipher {
      /**
       * 扩展流密码以创建新的加密算法
       * @param overrides - 要重写的方法和属性
       */
      extend(overrides: Record<string, unknown>): typeof StreamCipher;
      
      /**
       * 创建算法的辅助工具方法
       * @param cipher - 密码算法实例
       */
      _createHelper(cipher: unknown): unknown;
    }
  }

  namespace algo {
    /**
     * Rabbit流密码算法配置
     */
    interface RabbitConfig {
      /** 初始化向量(IV),用于增加加密随机性 */
      iv?: WordArray;
    }

    /**
     * Rabbit流密码算法实现
     * 
     * 特性:
     * - 块大小: 128位(4个32位字)
     * - IV大小: 64位(2个32位字)
     * - 高性能流密码,适用于软件实现
     * - 使用8个32位状态变量和8个32位计数器
     */
    interface Rabbit extends CryptoJS.lib.StreamCipher {
      /** 密钥的字数组表示 */
      _key: WordArray;
      
      /** 算法配置对象 */
      cfg: RabbitConfig;
      
      /** 内部状态数组X(8个32位字) */
      _X: number[];
      
      /** 内部计数器数组C(8个32位字) */
      _C: number[];
      
      /** 进位标志位 */
      _b: number;

      /**
       * 重置密码器状态
       * 使用密钥和可选的IV初始化内部状态
       * 
       * 算法步骤:
       * 1. 密钥设置:从256位密钥导出初始状态X和计数器C
       * 2. 执行4次迭代以混合状态
       * 3. 如果提供IV,将其混入状态并再次迭代4次
       */
      _doReset(): void;

      /**
       * 处理单个数据块
       * @param dataWords - 要处理的数据字数组
       * @param offset - 数据在数组中的起始偏移量
       * 
       * 处理流程:
       * 1. 执行下一次迭代函数更新内部状态
       * 2. 从状态X提取密钥流
       * 3. 使用XOR将密钥流应用到数据块
       */
      _doProcessBlock(dataWords: number[], offset: number): void;

      /** 块大小(以32位字为单位): 4个字 = 128位 */
      blockSize: 4;

      /** IV大小(以32位字为单位): 2个字 = 64位 */
      ivSize: 2;
    }
  }

  /**
   * 32位字的数组表示
   * 用于存储和操作加密数据
   */
  interface WordArray {
    /** 32位整数数组 */
    words: number[];
    
    /** 有效字节数 */
    sigBytes: number;
  }

  /**
   * Rabbit加密算法的快捷访问
   * 
   * @example
   *