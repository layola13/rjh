import { GlassSpec } from './GlassSpec';
import { Area, Sash, ShapeType, Glass, Shade, Panel, cutStyle } from './shapes';
import type { PolyId } from './types';
import type { MulManager } from './MulManager';
import type { View } from './View';
import type { Filler } from './Filler';

/**
 * FillerSettings class manages settings and properties for filler objects (Glass, Panel, Shade)
 * in a window/door manufacturing system. It provides a unified interface to access and modify
 * filler properties with automatic view updates and checkpoint management.
 */
export class FillerSettings {
  /** Polygon identifier */
  private readonly pid: PolyId;
  
  /** Manager for mullion operations */
  private readonly mulManager: MulManager;
  
  /** View instance for rendering */
  private readonly view: View;

  /**
   * Creates a new FillerSettings instance
   * @param pid - Polygon identifier
   * @param mulManager - Mullion manager instance
   * @param view - View instance for rendering
   */
  constructor(pid: PolyId, mulManager: MulManager, view: View) {
    this.pid = pid;
    this.mulManager = mulManager;
    this.view = view;
  }

  /**
   * Gets the filler object associated with this polygon ID
   */
  get filler(): Filler | undefined {
    return this.mulManager.fillerManager.fillers.find(
      (filler) => filler.polygon.polyId.equalTo(this.pid)
    );
  }

  /**
   * Gets the serial number text for Area fillers
   */
  get serial(): string {
    const filler = this.filler;
    return filler instanceof Area ? filler.serial.text : '';
  }

  /**
   * Checks if the filler is contained within a sash
   */
  get inSash(): boolean {
    return !!this.filler && this.filler.parent instanceof Sash;
  }

  /**
   * Gets or sets the filler type (Glass, Panel, or Shade)
   */
  get fillerType(): ShapeType {
    return this.filler ? this.filler.type : ShapeType.Glass;
  }

  set fillerType(newType: ShapeType) {
    const filler = this.filler;
    if (!filler) return;

    const validTypes = [ShapeType.Glass, ShapeType.Panel, ShapeType.Shade];
    if (!validTypes.includes(newType)) return;
    if (filler.type === newType) return;

    const updatedFiller = this.mulManager.fillerManager.changeFillerType(
      filler.polygon,
      newType
    );
    
    if (updatedFiller) {
      updatedFiller.draw(this.view);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Gets or sets whether glass has an associated shade
   */
  get withShade(): boolean {
    const filler = this.filler;
    return filler instanceof Glass && filler.withShade;
  }

  set withShade(value: boolean) {
    const filler = this.filler;
    if (!(filler instanceof Glass)) return;
    if (value === filler.withShade) return;

    filler.withShade = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the width of shade slats (minimum 5 units)
   */
  get shadeWidth(): number {
    const filler = this.filler;
    return filler instanceof Shade ? filler.mulManager.width : 0;
  }

  set shadeWidth(value: number) {
    if (value < 5) return;
    
    const filler = this.filler;
    if (!(filler instanceof Shade)) return;

    filler.mulManager.width = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.refresh();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the gap between shade slats
   */
  get shadeGap(): number {
    const filler = this.filler;
    return filler instanceof Shade ? filler.mulManager.gap : 0;
  }

  set shadeGap(value: number) {
    const filler = this.filler;
    if (!(filler instanceof Shade)) return;

    filler.mulManager.gap = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.refresh();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the padding around the shade
   */
  get shadePadding(): number {
    const filler = this.filler;
    return filler instanceof Shade ? filler.mulManager.padding : 0;
  }

  set shadePadding(value: number) {
    const filler = this.filler;
    if (!(filler instanceof Shade)) return;

    filler.mulManager.padding = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.refresh();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets whether the shade includes a bead
   */
  get shadeWithBead(): boolean {
    const filler = this.filler;
    return filler instanceof Shade && filler.withBead;
  }

  set shadeWithBead(value: boolean) {
    const filler = this.filler;
    if (!(filler instanceof Shade)) return;

    filler.withBead = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the specification string for Area fillers
   */
  get spec(): string {
    const filler = this.filler;
    return filler instanceof Area ? filler.glassSpec.spec : '';
  }

  set spec(value: string) {
    const filler = this.filler;
    if (!(filler instanceof Area)) return;

    filler.glassSpec.spec = value.trim();
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the technical specifications array for Area fillers
   */
  get technics(): string[] {
    const filler = this.filler;
    return filler instanceof Area ? filler.glassSpec.technics : [];
  }

  set technics(value: string[]) {
    const filler = this.filler;
    if (!(filler instanceof Area)) return;

    filler.glassSpec.technics = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the name of the Area filler
   */
  get name(): string {
    const filler = this.filler;
    return (filler instanceof Area && filler.glassSpec.name) || '';
  }

  set name(value: string) {
    const filler = this.filler;
    if (!(filler instanceof Area)) return;

    filler.glassSpec.name = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the additional width margin for technical specifications
   */
  get additionWidthMargin(): number {
    const filler = this.filler;
    return filler instanceof Area ? filler.glassSpec.techMargin.width : 0;
  }

  set additionWidthMargin(value: number) {
    const filler = this.filler;
    if (!(filler instanceof Area)) return;

    filler.glassSpec.techMargin.width = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the additional height margin for technical specifications
   */
  get additionHeightMargin(): number {
    const filler = this.filler;
    return filler instanceof Area ? filler.glassSpec.techMargin.height : 0;
  }

  set additionHeightMargin(value: number) {
    const filler = this.filler;
    if (!(filler instanceof Area)) return;

    filler.glassSpec.techMargin.height = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the thickness of the Area filler
   */
  get thickness(): number {
    const filler = this.filler;
    return filler instanceof Area ? filler.glassSpec.thickness : 0;
  }

  set thickness(value: number) {
    const filler = this.filler;
    if (!(filler instanceof Area)) return;

    filler.glassSpec.thickness = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the complete glass specification object
   */
  get glassSpec(): GlassSpec {
    const filler = this.filler;
    return filler instanceof Area ? filler.glassSpec : new GlassSpec();
  }

  set glassSpec(value: GlassSpec) {
    const filler = this.filler;
    if (!(filler instanceof Area)) return;

    const mergedSpec = Object.assign(filler.glassSpec.clone(), value);
    filler.glassSpec = mergedSpec.clone();
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets whether the Area filler has a turning frame
   */
  get withTurningFrame(): boolean {
    const filler = this.filler;
    return filler instanceof Area && filler.withTurningFrame;
  }

  set withTurningFrame(value: boolean) {
    const filler = this.filler;
    if (!(filler instanceof Area)) return;

    filler.withTurningFrame = value;
    filler.updatePoly();
    filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets custom attributes for Shade fillers
   */
  get attrs(): unknown {
    const filler = this.filler;
    if (filler instanceof Shade) {
      return filler.attrs;
    }
    return undefined;
  }

  set attrs(value: unknown) {
    const filler = this.filler;
    if (!(filler instanceof Shade)) return;
    if (filler.attrs === value) return;

    filler.attrs = value;
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the cut style for Panel fillers
   */
  get cutStyle(): cutStyle {
    return this.filler instanceof Panel ? this.filler.cutStyle : cutStyle.None;
  }

  set cutStyle(value: cutStyle) {
    if (!(this.filler instanceof Panel)) return;
    if (this.filler.cutStyle === value) return;

    // Reset related properties when changing cut style
    this.name = '';
    this.spec = '';
    this.thickness = 0;
    
    this.filler.cutStyle = value;
    this.filler.updatePoly();
    this.filler.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Gets or sets the pulling height for the filler
   */
  get pullingHeight(): number {
    if (!this.filler) return 0;

    const pullingHeightData = this.filler.topFrame.mulManager.splitter.getPullingHeight(
      this.pid
    );
    return pullingHeightData?.height ?? 0;
  }

  set pullingHeight(value: number) {
    if (!this.filler) return;

    this.filler.topFrame.mulManager.splitter.setPullingHeight(this.pid, value);
    this.filler.topFrame.updateFrame();
    this.filler.topFrame.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Checks if pulling height can be set for this filler
   */
  get allowPullingHeightSet(): boolean {
    return (
      !!this.filler &&
      this.filler.topFrame.mulManager.splitter.allowPullingHeight(this.filler.polygon)
    );
  }
}