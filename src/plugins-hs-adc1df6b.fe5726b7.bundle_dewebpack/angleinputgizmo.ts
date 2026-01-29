import { Vector2 } from './Vector2';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { Gizmo } from './Gizmo';
import { Signal } from './Signal';

interface RoofParameter {
  name: string;
  value: number;
}

interface Roof {
  parameters: {
    roomLoop: {
      clone(): {
        scale(factor: number): {
          getAllCurves(): Curve[];
        };
      };
    };
  };
}

interface Curve {
  isLine2d(): boolean;
  getDirection(): Vector2;
  getMidPt(): Vector2;
}

interface Entity {
  roof: Roof;
}

interface Context {
  hscanvas: {
    signalViewBoxChanged: Signal<ViewBoxChangedData>;
  };
}

interface ViewBoxChangedData {
  scaleChanged?: boolean;
  positionChanged?: boolean;
}

interface SignalEvent<T> {
  data: T;
}

interface InputBoxComponent {
  updateData(data: Partial<InputBoxData>): void;
  dispose(): void;
}

interface InputBoxData {
  position: Vector2;
  value: number;
  focus: boolean;
  config: {
    min: number;
    max: number;
    unit: string;
  };
}

enum InputBoxType {
  Angle = 'angle'
}

interface InputBoxConfig {
  type: InputBoxType;
  onEnter: (value: number) => void;
  onTab: (component: InputBoxComponent) => void;
}

type CandidateName = 'angleA' | 'angleB';

export class AngleInputGizmo extends Gizmo {
  private inputElements?: Record<string, InputBoxComponent>;
  private oldValue: Record<string, number>;

  constructor(
    context: Context,
    entity: Entity,
    options: unknown
  ) {
    super(context, entity, options);
    
    this.inputElements = undefined;
    this.oldValue = {};

    this.signalHook.listen(
      context.hscanvas.signalViewBoxChanged,
      this.onViewBoxChanged.bind(this)
    );
  }

  protected get roof(): Roof {
    return (this.entity as Entity).roof;
  }

  protected get candidateNames(): CandidateName[] {
    return ['angleA', 'angleB'];
  }

  private onViewBoxChanged(event?: SignalEvent<ViewBoxChangedData>): void {
    if (!event || event.data.scaleChanged || event.data.positionChanged) {
      if (this.inputElements) {
        this.candidateNames.forEach((name) => {
          if (this.inputElements![name]) {
            const position = this.getPosition(name);
            this.inputElements![name].updateData({ position });
          }
        });
      }
    }
  }

  protected onDraw(): void {
    super.onDraw();

    if (!this.inputElements) {
      this.inputElements = {};
      const paramNodes = HSCore.Util.Roof.getRoofParamNodes(this.roof);

      paramNodes.forEach((paramNode) => {
        const candidateName = this.candidateNames.find(
          (name) => paramNode.name === name
        );

        if (candidateName) {
          const position = this.getPosition(candidateName);
          const inputBox = new HSApp.View.SVG.SketchDimension.InputBoxComp(
            this.context,
            {
              type: HSApp.View.SVG.SketchDimension.InputBoxType.Angle,
              onEnter: (value: number) => {
                this.onInputEnter(paramNode.name, value);
              },
              onTab: () => {
                this.onTab(inputBox);
              }
            }
          );

          inputBox.updateData({
            position,
            value: paramNode.value,
            focus: false,
            config: {
              min: 5,
              max: 85,
              unit: '°'
            }
          });

          this.oldValue[paramNode.name] = paramNode.value;
          this.inputElements![paramNode.name] = inputBox;
        }
      });
    }
  }

  private onInputEnter(paramName: string, value: number): void {
    const app = HSApp.App.getApp();
    const commandManager = app.cmdManager;
    
    const command = commandManager.createCommand(
      HSFPConstants.CommandType.ChangeRoofParam,
      [
        this.roof,
        [
          {
            name: paramName,
            value,
            oldValue: this.oldValue[paramName] || 0
          }
        ]
      ]
    );

    commandManager.execute(command);
    this.oldValue[paramName] = value;
  }

  private onTab(currentInputBox: InputBoxComponent): void {
    let currentIndex = -1;

    this.candidateNames.forEach((name, index) => {
      if (this.inputElements![name]) {
        this.inputElements![name].updateData({ focus: false });
        
        if (this.inputElements![name] === currentInputBox) {
          currentIndex = index;
        }
      }
    });

    if (currentIndex !== -1) {
      const nextIndex = currentIndex + 1 > this.candidateNames.length - 1 
        ? 0 
        : currentIndex + 1;
      const nextName = this.candidateNames[nextIndex];
      
      this.inputElements![nextName].updateData({ focus: true });
    }
  }

  protected onCleanup(): void {
    if (this.inputElements) {
      Object.values(this.inputElements).forEach((element) => {
        element.dispose();
      });
    }
    
    this.inputElements = {};
    super.onCleanup();
  }

  private getLineIndex(name: CandidateName): number | undefined {
    if (name === 'angleA') return 3;
    if (name === 'angleB') return 1;
    return undefined;
  }

  private getPosition(name: CandidateName): Vector2 {
    const roof = this.roof;
    const lineIndex = this.getLineIndex(name);
    const curves = roof.parameters.roomLoop
      .clone()
      .scale(0.001)
      .getAllCurves();
    const curve = curves[lineIndex!];

    if (curve && curve.isLine2d()) {
      const paramNodes = HSCore.Util.Roof.getRoofParamNodes(roof);
      const offsetParam = paramNodes.find((node) => node.name === 'offset');
      const offset = 0.001 * (offsetParam?.value || 0);

      const direction = curve.getDirection();
      const midPoint = curve.getMidPt();

      return new Vector2(direction.y, -direction.x)
        .multiply(offset)
        .add(midPoint);
    }

    return Vector2.readonlyO();
  }
}