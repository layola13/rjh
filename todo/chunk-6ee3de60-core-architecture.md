# 门窗系统核心模块 (chunk-6ee3de60.1b731f5b_core) 完整架构分析

## 基本信息
- **模块路径**: dist2/js/chunk-6ee3de60.1b731f5b_core_dewebpack
- **文件数量**: 536个JS文件
- **代码总量**: 128,115行
- **模块性质**: 门窗系统核心引擎 (Window & Door System Core)

---

## 一、系统架构总览

```
┌────────────────────────────────────────────────────────────────┐
│                  门窗系统核心架构                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ 用户交互层  │  │ 业务逻辑层  │  │ 几何引擎层  │             │
│  │ Tools/Edit │  │ Sash/Frame │  │ Arc/Polygon│             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 二、八大子系统

### 2.1 窗扇系统 (Sash System) ~45文件
| 核心文件 | 大小 | 功能 |
|---------|------|------|
| sash.js | 10.7KB | 窗扇基类 |
| sashmanager.js | 21KB | 窗扇管理器 |
| doublesash.js | 11.5KB | 双开窗扇 |
| slidesash.js | 6.6KB | 滑动窗扇 |
| foldsash.js | 1.6KB | 折叠窗扇 |
| kfcsash.js | 2.5KB | KFC折叠门 |
| circlesash.js | 0.9KB | 圆形窗扇 |
| guardsash.js | 2.9KB | 护窗 |

### 2.2 框架系统 (Frame System) ~35文件
| 核心文件 | 大小 | 功能 |
|---------|------|------|
| frame.js | 32.9KB | 框架基类 |
| ccbar.js | 107.6KB | 连续杆件 ⭐最大 |
| bar.js | 17.7KB | 杆件基类 |
| mullionmanager.js | 14.3KB | 中挺管理器 |
| subframe.js | 9.1KB | 副框架 |

### 2.3 滑动系统 (Slide System) ~25文件
| 核心文件 | 大小 | 功能 |
|---------|------|------|
| slideoptions.js | 70.5KB | 滑动选项 ⭐第2大 |
| slidehardwaremanager.js | 4.6KB | 滑动五金件 |
| slidesash.js | 6.6KB | 滑动窗扇 |
| slideposition.js | 20.4KB | 滑动位置 |

### 2.4 折叠系统 (Fold System) ~15文件
| 核心文件 | 大小 | 功能 |
|---------|------|------|
| fold.js | 10.4KB | 折叠基类 |
| foldsash.js | 1.6KB | 折叠窗扇 |
| foldhardwaremanager.js | 3.4KB | 折叠五金件 |

### 2.5 五金件系统 (Hardware) ~40文件
| 核心文件 | 大小 | 功能 |
|---------|------|------|
| hardware.js | 7.4KB | 五金件基类 |
| handle.js | 3.6KB | 把手 |
| hinge.js | 2.6KB | 铰链 |
| connector.js | 6.5KB | 连接件 |
| cornerjoiner.js | 22.4KB | 角部连接件 |

### 2.6 装饰系统 (Decoration) ~30文件
| 核心文件 | 大小 | 功能 |
|---------|------|------|
| decorationbarcreator.js | 40KB | 装饰线条创建器 |
| decorationbarmanager.js | 4.5KB | 装饰线条管理 |
| decorationbarprairie.js | 3.5KB | 草原装饰线 |
| decorationbarchinese.js | 2.2KB | 中式装饰线 |

### 2.7 多边形系统 (Polygon) ~50文件
| 核心文件 | 大小 | 功能 |
|---------|------|------|
| arc.js | 118.7KB | 弧形引擎 ⭐最大 |
| shapemanager.js | 59.4KB | 形状管理器 |
| polygoncreator.js | 18.2KB | 多边形创建器 |
| kfcpolygon.js | 6.4KB | KFC多边形 |
| regularpoly.js | 4.6KB | 正多边形 |

### 2.8 标注系统 (Dimension) ~25文件
| 核心文件 | 大小 | 功能 |
|---------|------|------|
| dim.js | 28.9KB | 通用标注 |
| dimension.js | 6KB | 标注基类 |
| extradim.js | 3.7KB | 扩展标注 |

## 三、文件分类清单

### 窗扇系统文件
sash.js, sashmanager.js, sashsettings.js, doublesash.js, doublesashsettings.js, slidesash.js, slidesettings.js, foldsash.js, foldsashsettings.js, circlesash.js, kfcsash.js, kfcsashsettings.js, doublekfcsash.js, doublekfcsashsettings.js, guardsash.js, sashtool.js, sashutil.js, sashbottomdim.js, sashbarsettings.js

### 框架系统文件
frame.js, framesettings.js, framemanager.js, frametool.js, frameutil.js, frameidentity.js, frameccbar.js, framebardim.js, framejointway.js, ccbar.js, bar.js, barmodifier.js, barendpoint.js, barwidthutils.js, baruid.js, bardragger.js, splitbar.js, mullionmanager.js, mullionrobot.js, mullioncrossline.js, mullioncrosslineequal.js, subframe.js, subframemanager.js, subframesettings.js

### 滑动系统文件
slideoptions.js, slidehardwaremanager.js, slidesash.js, slidesettings.js, slidetool.js, slidebottomdim.js, pushslideccbar.js, indicatorforslide.js, slideposition.js

### 折叠系统文件
fold.js, foldsash.js, foldsashsettings.js, foldccbar.js, foldhardwaremanager.js, foldtool.js

### 五金件系统文件
hardware.js, hardwaremanager.js, handle.js, kfchandle.js, crosshandle.js, commercialhandle.js, handleoncircle.js, hinge.js, endpointhinge.js, hingeoncircle.js, connector.js, cornerjoiner.js, cornerjoinertool.js, cornerjoinersettings.js, panoramiccornerjoiner.js, hardwareonframe.js, hardwareonedge.js, hardwareonmullion.js, hardwareoncircle.js, hardwareshapecreator.js, circlepushsashhardwaremanager.js, pushsashhardwaremanager.js

### 装饰系统文件
decoration.js, decorationbar.js, decorationbarmanager.js, decorationbarcreator.js, decorationbarparser.js, decorationbarprairie.js, decorationbarprairiesettings.js, decorationbarchinese.js, decorationbarchinese2.js, decorationbarchinese3.js, decorationbarchinese4.js, decorationbarchinesesettings.js, decorationbarcolonial.js, decorationbarcolonialsettings.js, decorationbardiamond.js, decorationbardiamondsettings.js, decorationbarsemiarc.js, decorationbarsemiarcsettings.js, decorationbarsettings.js, decorationbartool.js, decorationcomponent.js, decorationcomponentparser.js, decorationshape.js, decorationsplithelper.js, decoraitonreference.js

### 多边形系统文件
regularpoly.js, circlepoly.js, quartercirclepoly.js, halfcirclepoly.js, semiarc.js, semiarcpro.js, semiarcpro2.js, semisegmentpro.js, isoscelestrianglepoly.js, peakpentagonpoly.js, trapezoidpoly.js, parallelogrampoly.js, roundedrectanglepolygon.js, diamondpoly.js, gothicpoly.js, mosquepoly.js, quatrefoilpoly.js, onionpoly.js, springlinepoly.js, wavepoly.js, convexpoly.js, hollowpoly.js, hollow2polygon.js, hollowsidepoly.js, doorpolygon.js, polygoncreator.js, polyparser.js, polyfill.js, polytype.js, polyid.js

### 标注系统文件
dimension.js, dim.js, dimcraft.js, dimsetting.js, dimtoground.js, dimtomid.js, dimtosash.js, sizedim.js, extradim.js, extradimangle.js, extradimarbitrary.js, extradimhorizontal.js, extradimvertical.js, extradimradius.js, extradimhorizontaltool.js, extradimverticaltool.js, extradimarbitrarytool.js, extradimradiustool.js, extradimangletool.js, extradimmanager.js, extradimtypeenum.js

### 工具系统文件
tool.js, toolmanager.js, linetool.js, pantool.js, squreselecttool.js, dragdrawtool.js, simplelinetool.js, simpleline.js, simplelinecreator.js, simplelinecut.js, spinline.js, spinlinecreator.js, spinlinecut.js, custompolygontool.js, handdrawnrecognition.js, cutline.js, cutlinetype.js, polycraft.js, pointcut.js

### 编辑工具文件
editsashtool.js, editdimtool.js, editdimensiontool.js, editextradimtool.js, editglassholetool.js, editglassholedimtool.js, edithandletool.js, edithingeTool.js, editconnector.js, editconnectorrobot.js, editcornerjoiner.js, editcornerjoinerprofilesizetexttool.js, editcornerrobot.js, editsplittertool.js, editmullionrobottool.js, editedgerobottool.js, editwalledgerobottool.js, editwalldragrobottool.js, edittopviewdragrobottool.js, editdragrobottool.js, edithardwaretool.js, edithardwareonframetool.js, edithardwareonmulliontool.js, editskewtexttool.js, editthreedarctexttool.js, editlabeltool.js, editnotetool.js, editextrapersonimagetool.js, editcommercialhandletool.js, editcrosshandletool.js

### 几何系统文件
arc.js, transform.js, shapes.js, shape.js, shapemanager.js, shapeactor.js, shapecolor.js, shapehelper.js, shapeidx.js, shapetype.js, drawpolytype.js, drawparams.js, drawinginfo.js, drawingsummary.js, json2d.js, json3d.js, jsoncc.js, dxfexporter.js, fillimagedata.js, fillpattern.js, displayutils.js, threedarcframe.js, threedimensionalarcpoly.js, fixedthreedarcshape.js, topview.js, view.js, wall.js, wallsettings.js, walltool.js, wallcornerjoiner.js

### 辅助系统文件
utils.js, observable.js, layer.js, eventtype.js, shortkeyhelper.js, systemparam.js, runtime.js, unit.js, idcreator.js, param.js, docktype.js, dockparam.js, docktaskstatus.js, empty.js, emptytrackposition.js, mometomanager.js, indicator.js, indicatorforsash.js, indicatorforantitheft.js, label.js, text.js, textcraft.js, textdim.js, note.js, notesettings.js, notetool.js, border.js, hitresult.js, partition.js, partitionwidth.js, colormanager.js, glass.js, glassspec.js, glassholesettings.js, glassholetool.js, holestyle.js, panel.js, doorpolygon.js, aligntypeenum.js, equalsplittype.js, eventtype.js, cutlinetype.js, cutline.js, couplesettings.js, couple.js, beadsettings.js, bead.js, shadehandletype.js, shademanager.js, shutterorientation.js, shuttertool.js, profilestructtool.js, profilesizemanager.js, polyid.js, loadkjl.js, diffmatchpatch.js, ktk.js, tk.js, artisanal.js, partialsubframe.js, equalsplitglassoptimizer.js, scaleframe.js, foldccbar.js, guardsash.js, guard sashheightdim.js, halfwheel.js, simpleline.js, simplehalfhexagon.js, simpleinnerarc.js, simplewave.js, simplewavecut.js, quartercirclepoly.js, regularframesettings.js, roundedrectangframesettings.js, trapezoidframesettings.js, angledframesettings.js, angledframe2settings.js, halfkfcframesettings.js, halfkfc2framesettings.js, halfkfcpolygon.js, halfkfc2polygon.js, halfkfcframetify.js, halfkfc2frametify.js, earframesettings.js, ear2framesettings.js, earframetify.js, ear2frametify.js, earpolygon.js, ear2polygon.js, pointedearsframesettings.js, pointedearpolygon.js, pointedearframetify.js, doubleearsframesettings.js, doubleearsframetify.js, doubleearspolygon.js, doubletrackframesettings.js, doubletrackframetify.js, doubletrackpolygon.js, hollow2polygon.js, hollow2frametify.js, circlepoly.js, circlepushsashhardwaremanager.js, circlesash.js, kfcframesettings.js, kfcframetify.js, kfcpolygon.js, kfcsash.js, kfcsashtool.js, kfcsashhardwaremanager.js, kfcsashsettings.js, kfc2polygon.js, kfc2frametify.js, kfc3polygon.js, kfc3frametify.js, kfc4polygon.js, kfc4frametify.js, compoundline.js, compoundlinecircle.js, compoundlinecreator.js, compoundlinecut.js, compoundlinetool.js, compounddoubleoctagon.js, compoundlongoctagon.js

## 四、模块TOP 15文件

| 排名 | 文件名 | 大小 | 功能 |
|------|--------|------|------|
| 1 | arc.js | 118.7KB | 弧形几何引擎 |
| 2 | ccbar.js | 107.6KB | 连续杆件系统 |
| 3 | slideoptions.js | 70.5KB | 滑动选项配置 |
| 4 | shapemanager.js | 59.4KB | 形状管理器 |
| 5 | json3d.js | 71.7KB | 3D数据交换 |
| 6 | audit.js | 89.6KB | 审计/日志系统 |
| 7 | frame.js | 32.9KB | 框架基类 |
| 8 | dim.js | 28.9KB | 尺寸标注 |
| 9 | bar.js | 17.7KB | 杆件基类 |
| 10 | jsoncc.js | 17.3KB | CC数据交换 |
| 11 | sash.js | 10.7KB | 窗扇基类 |
| 12 | transform.js | 18.9KB | 变换矩阵 |
| 13 | sashmanager.js | 21KB | 窗扇管理器 |
| 14 | fold.js | 10.4KB | 折叠基类 |
| 15 | toolmanager.js | 32.5KB | 工具管理器 |

## 五、架构特点总结

1. **模块化设计**: 536个文件清晰分类到8大子系统
2. **核心引擎**: arc.js(弧形) + ccbar(连续杆) 是两大核心
3. **完整产品线**: 覆盖窗、门、幕墙所有类型
4. **工具丰富**: 80+编辑工具支持精细化设计
5. **数据导出**: 支持JSON2D/3D/CC/DXF多种格式

## 六、依赖关系

```
用户操作 → ToolManager → 各系统(窗扇/框架/五金件) → ShapeManager → 渲染
                              ↓
                       Geometry Engine (arc.js)
                              ↓
                       Data Export (JSON/CC/DXF)
```

---

**分析时间**: 2026-01-22  
**模块版本**: chunk-6ee3de60.1b731f5b_core
