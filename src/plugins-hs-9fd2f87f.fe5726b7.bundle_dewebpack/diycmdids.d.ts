/**
 * DIY命令标识符集合
 * 定义了所有可用的DIY编辑器命令ID常量
 * @module DiyCmdIds
 */

/**
 * DIY命令标识符类
 * 包含所有DIY编辑器操作的命令ID常量
 */
export declare class DiyCmdIds {
  /** 绘制3D线条命令 */
  static readonly CMD_DRAW_LINE3D: "diy.cmd.draw.line3d";
  
  /** 绘制矩形面命令 */
  static readonly CMD_DRAW_RECT_FACE: "diy.cmd.draw.rect.face";
  
  /** 绘制圆形面命令 */
  static readonly CMD_DRAW_CIRCLE_FACE: "diy.cmd.draw.circle.face";
  
  /** 绘制椭圆面命令 */
  static readonly CMD_DRAW_ELLIPSE_FACE: "diy.cmd.draw.ellipse.face";
  
  /** 绘制多边形面命令 */
  static readonly CMD_DRAW_POLYGON_FACE: "diy.cmd.draw.polygon.face";
  
  /** 绘制圆弧面命令 */
  static readonly CMD_DRAW_ARC_FACE: "diy.cmd.draw.arc.face";
  
  /** 通过三点绘制圆弧面命令 */
  static readonly CMD_DRAW_ARC_FACE_BY_THREE_PTS: "diy.cmd.draw.arc.face.by.three.pts";
  
  /** DIY扫掠命令 */
  static readonly CMD_DIY_SWEEP: "diy.cmd.sweep";
  
  /** 绘制拉伸命令 */
  static readonly CMD_DRAW_EXTRUDE: "diy.cmd.draw.extrude";
  
  /** 创建组件命令 */
  static readonly CMD_MAKE_COMPONENT: "diy.cmd.create.component";
  
  /** 创建组件实例命令 */
  static readonly CMD_CREATE_COMPONENT_INSTANCE: "diy.cmd.create.component.instance";
  
  /** 分解组件实例命令 */
  static readonly CMD_EXPLODE_COMPONENT_INSTANCE: "diy.cmd.explode.instance";
  
  /** 导入DIY实例命令 */
  static readonly CMD_IMPORT_DIY_INSTANCE: "diy.cmd.import.instance";
  
  /** 创建组命令 */
  static readonly CMD_CREATE_GROUP: "diy.cmd.create.group";
  
  /** 拉伸面命令 */
  static readonly CMD_EXTRUDE_FACE: "diy.cmd.extrude.face";
  
  /** 偏移面命令 */
  static readonly CMD_OFFSET_FACE: "diy.cmd.offset.face";
  
  /** 创建2D圆角命令 */
  static readonly CMD_MAKE_ROUND_2D: "diy.cmd.make.round.2d";
  
  /** 创建文本命令 */
  static readonly CMD_CREATE_TEXT: "diy.cmd.create.text";
  
  /** 移动DIY元素命令 */
  static readonly CMD_MOVE_DIY_ELEMENT: "diy.cmd.move.element";
  
  /** 旋转DIY元素命令 */
  static readonly CMD_ROTATE_DIY_ELEMENT: "diy.cmd.rotate.element";
  
  /** XZ平面翻转命令 */
  static readonly CMD_FLIP_XZ: "diy.cmd.flip.xz";
  
  /** YZ平面翻转命令 */
  static readonly CMD_FLIP_YZ: "diy.cmd.flip.yz";
  
  /** XY平面翻转命令 */
  static readonly CMD_FLIP_XY: "diy.cmd.flip.xy";
  
  /** 编辑DIY实例命令 */
  static readonly CMD_EDIT_DIY_INSTANCE: "diy.cmd.edit.instance";
  
  /** 统计面数量命令 */
  static readonly CMD_COUNT_FACES: "diy.cmd.count.faces";
  
  /** 创建参考线命令 */
  static readonly CMD_GUIDELINE_CREATE: "diy.cmd.guideline.create";
  
  /** 创建旋转参考线命令 */
  static readonly CMD_ROTATED_GUIDELINE_CREATE: "diy.cmd.rotated.guideline.create";
  
  /** 清除参考线命令 */
  static readonly CMD_GUIDELINE_CLEAN: "diy.cmd.guideline.clean";
  
  /** 测量距离命令 */
  static readonly CMD_MEASURE_DISTANCE: "diy.cmd.measure.distance";
  
  /** 打开旧文件命令 */
  static readonly CMD_OPEN_OLD_FILE: "diy.cmd.open.old.file";
  
  /** 打开新文件命令 */
  static readonly CMD_OPEN_FILE: "diy.cmd.open.new.file";
  
  /** 导入CAD文件命令 */
  static readonly CMD_IMPORT_CAD: "diy.cmd.cad.import";
  
  /** CAD导入选择面命令 */
  static readonly CMD_IMPORT_CAD_SELECT_FACE: "diy.cmd.cad.import.select.face";
  
  /** 复制命令(Ctrl+C) */
  static readonly CMD_CTRL_C: "diy.cmd.ctrl.c";
  
  /** 粘贴命令(Ctrl+V) */
  static readonly CMD_CTRL_V: "diy.cmd.ctrl.v";
  
  /** 复制元素命令 */
  static readonly CMD_COPY_ELEMENT: "diy.cmd.copy.element";
  
  /** 2D投影命令 */
  static readonly CMD_2D_PROJECTION: "diy.cmd.2d.projection";
  
  /** 切换相机命令 */
  static readonly CMD_SWITCH_CAMERA: "diy.cmd.switch.camera";
  
  /** 隐藏/显示元素命令 */
  static readonly CMD_HIDE_SHOW_ELEMENTS: "diy.cmd.hide.show.elements";
  
  /** 阵列DIY元素命令 */
  static readonly CMD_ARRAY_DIY_ELEMENTS: "diy.cmd.array.elements";
  
  /** 圆弧阵列DIY元素命令 */
  static readonly CMD_ARC_ARRAY_DIY_ELEMENTS: "diy.cmd.arc.array.elements";
  
  /** 附加材质命令 */
  static readonly CMD_ATTACH_MATRIAL: "diy.cmd.attach.material";
  
  /** 装饰刷命令 */
  static readonly CMD_DECORATOR_BRUSH: "diy.cmd.decorator.brush";
  
  /** 删除材质命令 */
  static readonly CMD_DELETE_MATRIA: "diy.cmd.delete.material";
  
  /** 添加装饰线条命令 */
  static readonly CMD_ADD_MOLDING: "diy.cmd.add.molding";
  
  /** 添加灯槽命令 */
  static readonly CMD_ADD_LIGHT_SLOT: "diy.cmd.add.light.slot";
  
  /** 添加灯带命令 */
  static readonly CMD_ADD_LIGHT_BAND: "diy.cmd.add.light.band";
  
  /** 创建参数化形状命令 */
  static readonly CMD_CREATE_PM_SHAPE: "diy.cmd.add.pm.shape";
  
  /** 切换装饰线条样式命令 */
  static readonly CMD_SWITCH_MOLDING_STYLE: "diy.cmd.switch.molding.style";
  
  /** 显示所有房间命令 */
  static readonly CMD_SHOW_ALL_ROOMS: "diy.cmd.show.all.rooms";
  
  /** 更新铺贴命令 */
  static readonly CMD_UPDATE_PAVE: "diy.cmd.update.pave";
}