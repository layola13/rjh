/**
 * 建模消息名称枚举
 * 定义了所有建模相关的命令和消息类型
 */
export declare const ModelingMessageName: {
  /** 建模主消息 */
  readonly Modeling: "modeling";
  /** 选择命令 */
  readonly CommandSelection: "command.selection";
  /** 测量命令 */
  readonly CommandMeasure: "command.measure";
  /** 矩形命令 */
  readonly CommandRect: "command.rect";
  /** 圆形命令 */
  readonly CommandCircle: "command.circle";
  /** 多边形命令 */
  readonly CommandPolygon: "command.polygon";
  /** 直线命令 */
  readonly CommandLine: "command.line";
  /** 拉伸命令 */
  readonly CommandExtrusion: "command.extrusion";
  /** 圆角命令 */
  readonly CommandFillet: "command.fillet";
  /** 拱形命令 */
  readonly CommandArch: "command.arch";
  /** 扫掠命令 */
  readonly CommandSweep: "command.sweep";
  /** 线条装饰命令 */
  readonly CommandMolding: "command.molding";
  /** 灯带命令 */
  readonly CommandLightband: "command.lightband";
  /** 灯带设置命令 */
  readonly CommandLightbandSettings: "command.lightbandsettings";
  /** 灯槽命令 */
  readonly CommandLightslot: "command.lightslot";
  /** 添加内容命令 */
  readonly CommandAddContent: "command.addcontent";
  /** 偏移命令 */
  readonly CommandOffset: "command.offset";
  /** 移动命令 */
  readonly CommandMove: "command.move";
  /** 直线阵列命令 */
  readonly CommandLineRaid: "command.lineraid";
  /** 径向阵列命令 */
  readonly CommandRadioRaid: "command.radioraid";
  /** 镜像命令 */
  readonly CommandMirror: "command.mirror";
  /** 参考线命令 */
  readonly CommandGuideLine: "command.guideline";
  /** 旋转参考线命令 */
  readonly CommandRotateGuideLine: "command.rotateGuideline";
  /** 粘贴命令 */
  readonly CommandPaste: "command.paste";
  /** 复制命令 */
  readonly CommandCopy: "command.copy";
  /** 使用2D相机命令 */
  readonly CommandUse2DCamera: "command.use2Dcamera";
  /** 使用3D相机命令 */
  readonly CommandUse3DCamera: "command.use3Dcamera";
  /** 使用正交相机命令 */
  readonly CommandUseOrthoCamera: "command.useOrthoCamera";
  /** 捕捉起点命令 */
  readonly CommandSnapFrom: "command.snapFrom";
  /** WebCAD日志 */
  readonly WebcadLog: "webcad.log";
  /** 快捷键通过事件 */
  readonly Shortcut: "shortcut.onPassed";
  /** CAD命令 */
  readonly CommandCad: "command.cad";
  /** 平面投影命令 */
  readonly CommandPlaneProjection: "command.planeProjection";
  /** 结束平面投影命令 */
  readonly CommandEndPlaneProjection: "command.endPlaneProjection";
  /** 旋转命令 */
  readonly CommandRotate: "command.rotate";
  /** 保存命令 */
  readonly CommandSave: "command.save";
  /** 生成吊顶命令 */
  readonly CommandGenerateCeiling: "command.generateCeiling";
  /** 退出命令 */
  readonly CommandEscape: "command.escape";
  /** 椭圆命令 */
  readonly CommandEllipse: "command.ellipse";
  /** 文本命令 */
  readonly CommandText: "command.text";
};

/**
 * 建模消息动作类型
 * 定义了建模操作的各种状态和事件
 */
export declare const ModelingMessageAction: {
  /** 开始 */
  readonly Start: "start";
  /** 结束 */
  readonly End: "end";
  /** 启用 */
  readonly Enable: "enable";
  /** 禁用 */
  readonly Disable: "disable";
  /** 提示 */
  readonly Hint: "hint";
  /** 未选中 */
  readonly SelectionNull: "selection.null";
  /** 多选 */
  readonly SelectionMult: "selection.mult";
  /** 选中直线 */
  readonly SelectionLine: "selection.line";
  /** 选中矩形 */
  readonly SelectionRect: "selection.rect";
  /** 选中灯带 */
  readonly SelectionLightband: "selection.lightband";
  /** 选中线条装饰 */
  readonly SelectionMolding: "selection.molding";
  /** 选中组 */
  readonly SelectionGroup: "selection.group";
  /** 选中内容 */
  readonly SelectionContent: "selection.content";
  /** 选中参考线 */
  readonly SelectionGuideLine: "selection.guideLine";
  /** 选中灯槽 */
  readonly SelectionLightSlot: "selection.lightslot";
  /** 选中文本 */
  readonly SelectionText: "selection.text";
  /** 编辑组 */
  readonly EditGroup: "editGroup";
  /** 单次退出 */
  readonly Onescape: "onescape";
  /** 退出编辑组 */
  readonly stepOutEditGroup: "stepOutEditGroup";
  /** 线条装饰工具关闭目录 */
  readonly moldingToolCloseCatalog: "moldingToolCloseCatalog";
  /** 用户输入 */
  readonly UserInput: "userInput";
  /** 刷新属性栏 */
  readonly RefreshPropertyBar: "refreshPropertyBar";
  /** 更新长度 */
  readonly UpdateLength: "updateLength";
  /** 更新旋转角度 */
  readonly UpdateRotateAngle: "updateRotateAngle";
  /** 聚焦宽度输入框 */
  readonly FocusWidthInput: "focusWidthInput";
  /** 更新高度增量 */
  readonly UpdateHeightDelta: "updateHeightDelta";
  /** 完成 */
  readonly Complete: "complete";
  /** 撤销/重做事件 */
  readonly OnUndoRedo: "onUndoRedo";
  /** 显示 */
  readonly Show: "show";
  /** 导入完成 */
  readonly ImportFinish: "importFinish";
  /** 导入失败 */
  readonly ImportFail: "importFail";
  /** 显示编辑框 */
  readonly ShowEditBox: "showEditBox";
  /** 请求保存 */
  readonly requestSave: "requestSave";
  /** 错误事件 */
  readonly OnError: "onError";
  /** 显示目录 */
  readonly ShowCatalog: "showCatalog";
  /** Tab键 */
  readonly Tab: "tab";
  /** Ctrl+P */
  readonly C_p: "C_p";
  /** Ctrl+H */
  readonly C_h: "C_h";
  /** Alt+2 */
  readonly Alt_2: "Alt_2";
  /** Alt+3 */
  readonly Alt_3: "Alt_3";
  /** Alt+4 */
  readonly Alt_4: "Alt_4";
};

/**
 * 内容类型接口
 * 定义了内容对象应具备的类型检查方法
 */
export interface IContentType {
  /**
   * 检查内容是否属于指定类型
   * @param contentType 内容类型枚举值
   * @returns 是否匹配该类型
   */
  isTypeOf(contentType: unknown): boolean;
}

/**
 * 根据内容类型映射到对应的插件标识符
 * 
 * @param content - 内容对象,需实现isTypeOf方法
 * @returns 插件类型字符串:
 *   - "plugin_customizedModeling_type_feature_wall" - 特征墙
 *   - "plugin_customizedModeling_type_ceiling" - 吊顶
 *   - "plugin_customizedModeling_type_platform" - 平台
 *   - "plugin_customizedModeling_type_personalized" - 个性化模型(地板/家具/固定家具)
 */
export declare function ContentTypeToPlugin(content: IContentType): 
  | "plugin_customizedModeling_type_feature_wall"
  | "plugin_customizedModeling_type_ceiling"
  | "plugin_customizedModeling_type_platform"
  | "plugin_customizedModeling_type_personalized";