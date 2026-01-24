/**
 * 国际化文本资源配置
 * 提供建筑/3D建模工具的中文本地化字符串
 */
declare module 'module_7cfe' {
  /**
   * 本地化文本键值对映射接口
   */
  interface LocalizationStrings {
    /** 绘制工具 */
    draw: string;
    
    /** 平移操作 */
    translate: string;
    
    /** 延展功能 */
    extend: string;
    
    /** 创建水槽 */
    create_trough: string;
    
    /** 创建新梁 */
    create_beam: string;
    
    /** 补充平面 */
    supply_plane: string;
    
    /** 平面 */
    plane: string;
    
    /** 设计窗口 */
    design_window: string;
    
    /** 创建墙体 */
    create_wall: string;
    
    /** 墙体材质 */
    wall_color: string;
    
    /** 生成3D模型 */
    create_3d: string;
    
    /** 应用按钮 */
    apply: string;
    
    /** 添加标注线 */
    ConnectDimension: string;
    
    /** 创建椎体 */
    create_centrum: string;
    
    /** 椎体大小 */
    centrum_size: string;
    
    /** 平面缩放 */
    plane_scale: string;
    
    /** 平面缩放提示：正数放大, 负数缩小 */
    plane_scale_tip: string;
    
    /** 墙体 */
    wall: string;
    
    /** 辅助点 */
    aux_node: string;
    
    /** 辅助线 */
    aux_edge: string;
    
    /** 梁 */
    pillar: string;
    
    /** 窗户 */
    window: string;
    
    /** 梁材质 */
    pillar_color: string;
    
    /** 应用范围 */
    apply_scope: string;
    
    /** 当前选中 */
    current: string;
    
    /** 全部 */
    all: string;
    
    /** 编辑窗口 */
    edit_window: string;
    
    /** 长度 */
    length: string;
    
    /** 绿黄方向 */
    to_left: string;
    
    /** 黄绿方向 */
    to_right: string;
    
    /** 两端扩展 */
    both_ends: string;
    
    /** 梁长度提示：黄绿:由黄点向绿点方向扩展 */
    pillar_length_tip: string;
    
    /** 打断操作 */
    break: string;
    
    /** 水平分割数量 */
    h_divide: string;
    
    /** 垂直分割数量 */
    v_divide: string;
    
    /** 平面等分 */
    poly_divide: string;
    
    /** 梁长度 */
    pillar_length: string;
    
    /** 确定按钮 */
    confirm: string;
    
    /** 人字顶 */
    herring_bone_top: string;
    
    /** 生成 */
    generate: string;
    
    /** 坡顶 */
    slope: string;
    
    /** 梯形 */
    trapezoid: string;
    
    /** 梯形缩进 */
    trapezoid_width: string;
    
    /** 梯形高度 */
    trapezoid_height: string;
    
    /** 纯色 */
    color: string;
    
    /** 厚度 */
    thick: string;
    
    /** 水槽颜色 */
    flume_color: string;
  }

  /**
   * 导出的本地化字符串对象
   */
  const localizationStrings: LocalizationStrings;
  
  export = localizationStrings;
}