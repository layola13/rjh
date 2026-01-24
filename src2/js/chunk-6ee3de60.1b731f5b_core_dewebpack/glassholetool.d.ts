import { Glass } from './Glass';
import { Tool, ToolType } from './Tool';
import { View } from './View';
import { Point } from './Point';
import { Shape } from './Shape';
import { Sash } from './Sash';

/**
 * 玻璃打孔工具类
 * 用于在玻璃表面创建孔洞
 */
export class GlassHoleTool extends Tool {
  /** 视图实例引用 */
  private view: View;

  /**
   * 构造函数
   * @param view - 当前视图实例
   */
  constructor(view: View) {
    super(ToolType.glassHole, view);
    this.view = view;
  }

  /**
   * 鼠标抬起事件处理
   * 在当前鼠标位置的玻璃上打孔
   * @param event - 鼠标事件对象
   */
  public mouseup(event: MouseEvent): void {
    super.mouseup(event);

    // 查找包含当前鼠标位置的玻璃对象
    const targetGlass = this.fetchGlasses().find((glass: Glass) => {
      return glass.polygon.contains(this.curPt);
    });

    // 如果找到目标玻璃，则在该位置打孔
    if (targetGlass) {
      targetGlass.makeHole(this.curPt, "100");
      targetGlass.draw(this.view);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
      this.view.toolManager.releaseTool();
    }
  }

  /**
   * 获取所有玻璃对象
   * 遍历视图中的所有形状和窗扇，收集其中的玻璃对象
   * @returns 玻璃对象数组
   */
  private fetchGlasses(): Glass[] {
    const glasses: Glass[] = [];

    this.view.shapeManager.shapem.forEach((shape: Shape) => {
      // 收集形状上的玻璃
      shape.mulManager.glasses.forEach((glass: unknown) => {
        if (glass instanceof Glass) {
          glasses.push(glass);
        }
      });

      // 收集窗扇上的玻璃
      shape.sashManager.allSashes.forEach((sash: Sash) => {
        sash.mulManager.glasses.forEach((glass: unknown) => {
          if (glass instanceof Glass) {
            glasses.push(glass);
          }
        });
      });
    });

    return glasses;
  }
}