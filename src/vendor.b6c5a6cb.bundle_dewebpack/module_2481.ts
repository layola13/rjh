import { Texture } from './Texture';
import { Container } from './Container';
import { ObservablePoint, Point, Rectangle } from './math';
import { settings } from './settings';
import { Sprite } from './Sprite';
import { removeItems, getResolutionOfUrl } from './utils';
import { LoaderResource } from './loaders';

interface BitmapFontOptions {
  tint?: number;
  align?: 'left' | 'center' | 'right';
  font?: string | BitmapFontDescriptor;
}

interface BitmapFontDescriptor {
  name: string;
  size: number;
}

interface FontData {
  tint: number;
  align: 'left' | 'center' | 'right';
  name: string | null;
  size: number;
}

interface CharData {
  xOffset: number;
  yOffset: number;
  xAdvance: number;
  kerning: Record<number, number>;
  texture: Texture;
  page: string | number;
}

interface BitmapFontData {
  font: string;
  size: number;
  lineHeight: number;
  chars: Record<number, CharData>;
}

interface GlyphData {
  texture: Texture;
  line: number;
  charCode: number;
  position: Point;
}

export class BitmapText extends Container {
  public static fonts: Record<string, BitmapFontData> = {};

  private _textWidth: number = 0;
  private _textHeight: number = 0;
  private _glyphs: Sprite[] = [];
  private _font: FontData;
  private _text: string;
  private _maxWidth: number = 0;
  private _maxLineHeight: number = 0;
  private _letterSpacing: number = 0;
  private _anchor: ObservablePoint;
  public dirty: boolean = false;
  public roundPixels: boolean;

  constructor(text: string, options: BitmapFontOptions = {}) {
    super();

    this._font = {
      tint: options.tint !== undefined ? options.tint : 0xFFFFFF,
      align: options.align || 'left',
      name: null,
      size: 0
    };

    this.font = options.font;
    this._text = text;

    this._anchor = new ObservablePoint(() => {
      this.dirty = true;
    }, this, 0, 0);

    this.roundPixels = settings.ROUND_PIXELS;
    this.updateText();
  }

  public updateText(): void {
    const fontData = BitmapText.fonts[this._font.name!];
    const scale = this._font.size / fontData.size;
    const position = new Point();
    const glyphs: GlyphData[] = [];
    const lineWidths: number[] = [];
    const text = this._text.replace(/(?:\r\n|\r)/g, '\n') || ' ';
    const textLength = text.length;
    const maxWidth = this._maxWidth * fontData.size / this._font.size;

    let previousCharCode: number | null = null;
    let currentLineWidth = 0;
    let currentLine = 0;
    let lastBreakPos = -1;
    let lastBreakWidth = 0;
    let spacesRemoved = 0;
    let maxLineHeight = 0;

    for (let i = 0; i < textLength; i++) {
      const charCode = text.charCodeAt(i);
      const char = text.charAt(i);

      if (/(?:\s)/.test(char)) {
        lastBreakPos = i;
        lastBreakWidth = currentLineWidth;
      }

      if (char === '\r' || char === '\n') {
        lineWidths.push(currentLineWidth);
        currentLineWidth = 0;
        currentLine++;
        spacesRemoved++;
        position.x = 0;
        position.y += fontData.lineHeight;
        previousCharCode = null;
        continue;
      }

      const charData = fontData.chars[charCode];
      if (!charData) {
        continue;
      }

      if (previousCharCode && charData.kerning[previousCharCode]) {
        position.x += charData.kerning[previousCharCode];
      }

      glyphs.push({
        texture: charData.texture,
        line: currentLine,
        charCode: charCode,
        position: new Point(
          position.x + charData.xOffset + this._letterSpacing / 2,
          position.y + charData.yOffset
        )
      });

      position.x += charData.xAdvance + this._letterSpacing;
      currentLineWidth = position.x;
      maxLineHeight = Math.max(maxLineHeight, charData.yOffset + charData.texture.height);
      previousCharCode = charCode;

      if (lastBreakPos !== -1 && maxWidth > 0 && position.x > maxWidth) {
        spacesRemoved++;
        removeItems(glyphs, 1 + lastBreakPos - spacesRemoved, 1 + i - lastBreakPos);
        i = lastBreakPos;
        lastBreakPos = -1;
        lineWidths.push(lastBreakWidth);
        currentLineWidth = 0;
        currentLine++;
        position.x = 0;
        position.y += fontData.lineHeight;
        previousCharCode = null;
      }
    }

    const lastChar = text.charAt(text.length - 1);
    if (lastChar !== '\r' && lastChar !== '\n') {
      if (/(?:\s)/.test(lastChar)) {
        currentLineWidth = lastBreakWidth;
      }
      lineWidths.push(currentLineWidth);
    }

    const maxLineWidth = Math.max(...lineWidths);
    const lineAlignOffsets: number[] = [];

    for (let i = 0; i <= currentLine; i++) {
      let alignOffset = 0;
      if (this._font.align === 'right') {
        alignOffset = maxLineWidth - lineWidths[i];
      } else if (this._font.align === 'center') {
        alignOffset = (maxLineWidth - lineWidths[i]) / 2;
      }
      lineAlignOffsets.push(alignOffset);
    }

    const glyphCount = glyphs.length;
    const tint = this.tint;

    for (let i = 0; i < glyphCount; i++) {
      let glyphSprite = this._glyphs[i];
      if (glyphSprite) {
        glyphSprite.texture = glyphs[i].texture;
      } else {
        glyphSprite = new Sprite(glyphs[i].texture);
        glyphSprite.roundPixels = this.roundPixels;
        this._glyphs.push(glyphSprite);
      }

      glyphSprite.position.x = (glyphs[i].position.x + lineAlignOffsets[glyphs[i].line]) * scale;
      glyphSprite.position.y = glyphs[i].position.y * scale;
      glyphSprite.scale.x = glyphSprite.scale.y = scale;
      glyphSprite.tint = tint;

      if (!glyphSprite.parent) {
        this.addChild(glyphSprite);
      }
    }

    for (let i = glyphCount; i < this._glyphs.length; ++i) {
      this.removeChild(this._glyphs[i]);
    }

    this._textWidth = maxLineWidth * scale;
    this._textHeight = (position.y + fontData.lineHeight) * scale;

    if (this.anchor.x !== 0 || this.anchor.y !== 0) {
      for (let i = 0; i < glyphCount; i++) {
        this._glyphs[i].x -= this._textWidth * this.anchor.x;
        this._glyphs[i].y -= this._textHeight * this.anchor.y;
      }
    }

    this._maxLineHeight = maxLineHeight * scale;
  }

  public updateTransform(): void {
    this.validate();
    this.containerUpdateTransform();
  }

  public getLocalBounds(): Rectangle {
    this.validate();
    return super.getLocalBounds();
  }

  public validate(): void {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
  }

  get tint(): number {
    return this._font.tint;
  }

  set tint(value: number) {
    this._font.tint = typeof value === 'number' && value >= 0 ? value : 0xFFFFFF;
    this.dirty = true;
  }

  get align(): 'left' | 'center' | 'right' {
    return this._font.align;
  }

  set align(value: 'left' | 'center' | 'right') {
    this._font.align = value || 'left';
    this.dirty = true;
  }

  get anchor(): ObservablePoint {
    return this._anchor;
  }

  set anchor(value: ObservablePoint | number) {
    if (typeof value === 'number') {
      this._anchor.set(value);
    } else {
      this._anchor.copyFrom(value);
    }
  }

  get font(): string | BitmapFontDescriptor | undefined {
    return this._font as any;
  }

  set font(value: string | BitmapFontDescriptor | undefined) {
    if (!value) {
      return;
    }

    if (typeof value === 'string') {
      const parts = value.split(' ');
      this._font.name = parts.length === 1 ? parts[0] : parts.slice(1).join(' ');
      this._font.size = parts.length >= 2 ? parseInt(parts[0], 10) : BitmapText.fonts[this._font.name].size;
    } else {
      this._font.name = value.name;
      this._font.size = typeof value.size === 'number' ? value.size : parseInt(String(value.size), 10);
    }

    this.dirty = true;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    const stringValue = String(value ?? '');
    if (this._text !== stringValue) {
      this._text = stringValue;
      this.dirty = true;
    }
  }

  get maxWidth(): number {
    return this._maxWidth;
  }

  set maxWidth(value: number) {
    if (this._maxWidth !== value) {
      this._maxWidth = value;
      this.dirty = true;
    }
  }

  get maxLineHeight(): number {
    this.validate();
    return this._maxLineHeight;
  }

  get textWidth(): number {
    this.validate();
    return this._textWidth;
  }

  get letterSpacing(): number {
    return this._letterSpacing;
  }

  set letterSpacing(value: number) {
    if (this._letterSpacing !== value) {
      this._letterSpacing = value;
      this.dirty = true;
    }
  }

  get textHeight(): number {
    this.validate();
    return this._textHeight;
  }

  public static registerFont(xml: Document, textures: Texture | Texture[] | Record<string, Texture>): BitmapFontData {
    const data: Partial<BitmapFontData> = {};
    const info = xml.getElementsByTagName('info')[0];
    const common = xml.getElementsByTagName('common')[0];
    const pages = xml.getElementsByTagName('page');
    const resolution = getResolutionOfUrl(pages[0].getAttribute('file')!);
    const textureMap: Record<string, Texture> = {};

    data.font = info.getAttribute('face')!;
    data.size = parseInt(info.getAttribute('size')!, 10);
    data.lineHeight = parseInt(common.getAttribute('lineHeight')!, 10) / resolution;
    data.chars = {};

    if (textures instanceof Texture) {
      textures = [textures];
    }

    for (let i = 0; i < pages.length; i++) {
      const id = pages[i].getAttribute('id')!;
      const file = pages[i].getAttribute('file')!;
      textureMap[id] = Array.isArray(textures) ? textures[i] : textures[file];
    }

    const chars = xml.getElementsByTagName('char');
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const charId = parseInt(char.getAttribute('id')!, 10);
      const page = char.getAttribute('page') || '0';
      const textureRect = new Rectangle(
        parseInt(char.getAttribute('x')!, 10) / resolution + textureMap[page].frame.x / resolution,
        parseInt(char.getAttribute('y')!, 10) / resolution + textureMap[page].frame.y / resolution,
        parseInt(char.getAttribute('width')!, 10) / resolution,
        parseInt(char.getAttribute('height')!, 10) / resolution
      );

      data.chars![charId] = {
        xOffset: parseInt(char.getAttribute('xoffset')!, 10) / resolution,
        yOffset: parseInt(char.getAttribute('yoffset')!, 10) / resolution,
        xAdvance: parseInt(char.getAttribute('xadvance')!, 10) / resolution,
        kerning: {},
        texture: new Texture(textureMap[page].baseTexture, textureRect),
        page: page
      };
    }

    const kernings = xml.getElementsByTagName('kerning');
    for (let i = 0; i < kernings.length; i++) {
      const kerning = kernings[i];
      const first = parseInt(kerning.getAttribute('first')!, 10) / resolution;
      const second = parseInt(kerning.getAttribute('second')!, 10) / resolution;
      const amount = parseInt(kerning.getAttribute('amount')!, 10) / resolution;

      if (data.chars![second]) {
        data.chars![second].kerning[first] = amount;
      }
    }

    BitmapText.fonts[data.font!] = data as BitmapFontData;
    return data as BitmapFontData;
  }
}

export class BitmapFontLoader {
  public static parse(resource: LoaderResource, textures: Texture | Texture[] | Record<string, Texture>): void {
    resource.bitmapFont = BitmapText.registerFont(resource.data, textures);
  }

  public static add(): void {
    LoaderResource.setExtensionXhrType('fnt', LoaderResource.XHR_RESPONSE_TYPE.DOCUMENT);
  }

  public static dirname(path: string): string {
    const dir = path.replace(/\\/g, '/').replace(/\/$/, '').replace(/\/[^\/]*$/, '');
    return dir === path ? '.' : dir === '' ? '/' : dir;
  }

  public static use(this: any, resource: LoaderResource, next: () => void): void {
    if (!resource.data || resource.type !== LoaderResource.TYPE.XML) {
      next();
      return;
    }

    const pages = resource.data.getElementsByTagName('page');
    const info = resource.data.getElementsByTagName('info');

    if (pages.length === 0 || info.length === 0 || info[0].getAttribute('face') === null) {
      next();
      return;
    }

    let dirname = resource.isDataUrl ? '' : BitmapFontLoader.dirname(resource.url);

    if (resource.isDataUrl) {
      if (dirname === '.') {
        dirname = '';
      }
      if (this.baseUrl && dirname && this.baseUrl.charAt(this.baseUrl.length - 1) === '/') {
        dirname += '/';
      }
    }

    dirname = dirname.replace(this.baseUrl, '');
    if (dirname && dirname.charAt(dirname.length - 1) !== '/') {
      dirname += '/';
    }

    const loadedTextures: Record<string, Texture> = {};

    const onTextureLoaded = (textureResource: LoaderResource): void => {
      loadedTextures[textureResource.metadata.pageFile] = textureResource.texture!;

      if (Object.keys(loadedTextures).length === pages.length) {
        BitmapFontLoader.parse(resource, loadedTextures);
        next();
      }
    };

    for (let i = 0; i < pages.length; ++i) {
      const pageFile = pages[i].getAttribute('file')!;
      const url = dirname + pageFile;
      let textureFound = false;

      for (const name in this.resources) {
        const existingResource = this.resources[name];
        if (existingResource.url === url) {
          existingResource.metadata.pageFile = pageFile;

          if (existingResource.texture) {
            onTextureLoaded(existingResource);
          } else {
            existingResource.onAfterMiddleware.add(onTextureLoaded);
          }

          textureFound = true;
          break;
        }
      }

      if (!textureFound) {
        const loadOptions = {
          crossOrigin: resource.crossOrigin,
          loadType: LoaderResource.LOAD_TYPE.IMAGE,
          metadata: {
            pageFile: pageFile,
            ...resource.metadata.imageMetadata
          },
          parentResource: resource
        };

        this.add(url, loadOptions, onTextureLoaded);
      }
    }
  }
}