import { Filter } from './Filter';
import { Matrix, Point } from './math';
import { Sprite } from './Sprite';
import { FilterSystem } from './FilterSystem';
import { RenderTexture } from './RenderTexture';

const VERTEX_SHADER = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
    
    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
    vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0) ).xy;
}
`;

const FRAGMENT_SHADER = `varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform vec2 scale;
uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
    vec4 map = texture2D(mapSampler, vFilterCoord);
    
    map -= 0.5;
    map.xy = scale * inputSize.zw * (rotation * map.xy);
    
    gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));
}
`;

const DEFAULT_SCALE = 20;

export class DisplacementFilter extends Filter {
    public maskSprite: Sprite;
    public maskMatrix: Matrix;
    public scale: Point;

    constructor(sprite: Sprite, scale?: number) {
        const filterMatrix = new Matrix();
        sprite.renderable = false;

        super(VERTEX_SHADER, FRAGMENT_SHADER, {
            mapSampler: sprite._texture,
            filterMatrix,
            scale: {
                x: 1,
                y: 1
            },
            rotation: new Float32Array([1, 0, 0, 1])
        });

        this.maskSprite = sprite;
        this.maskMatrix = filterMatrix;
        
        const scaleValue = scale ?? DEFAULT_SCALE;
        this.scale = new Point(scaleValue, scaleValue);
    }

    public apply(
        filterManager: FilterSystem,
        input: RenderTexture,
        output: RenderTexture,
        clearMode: number
    ): void {
        this.uniforms.filterMatrix = filterManager.calculateSpriteMatrix(
            this.maskMatrix,
            this.maskSprite
        );
        
        this.uniforms.scale.x = this.scale.x;
        this.uniforms.scale.y = this.scale.y;

        const worldTransform = this.maskSprite.transform.worldTransform;
        const scaleX = Math.sqrt(worldTransform.a * worldTransform.a + worldTransform.b * worldTransform.b);
        const scaleY = Math.sqrt(worldTransform.c * worldTransform.c + worldTransform.d * worldTransform.d);

        if (scaleX !== 0 && scaleY !== 0) {
            this.uniforms.rotation[0] = worldTransform.a / scaleX;
            this.uniforms.rotation[1] = worldTransform.b / scaleX;
            this.uniforms.rotation[2] = worldTransform.c / scaleY;
            this.uniforms.rotation[3] = worldTransform.d / scaleY;
        }

        filterManager.applyFilter(this, input, output, clearMode);
    }

    get map(): any {
        return this.uniforms.mapSampler;
    }

    set map(value: any) {
        this.uniforms.mapSampler = value;
    }
}