/**
 * MRDL Backplate Vertex Shader Module
 * Provides vertex shader code for MRDL (Mixed Reality Design Language) backplate rendering
 */

/**
 * Shader name identifier
 */
export const SHADER_NAME: string = "mrdlBackplateVertexShader";

/**
 * Complete GLSL vertex shader source code for MRDL backplate material.
 * 
 * This shader handles:
 * - Rounded rectangle geometry with per-corner radius control
 * - Edge anti-aliasing
 * - Animated highlight effects
 * - Iridescence effects
 * - Gradient coloring
 * - Line rendering with configurable width
 * 
 * @remarks
 * The shader transforms vertices to create rounded rectangles with smooth edges,
 * applies world transformations, and prepares various parameters for the fragment shader.
 */
export const VERTEX_SHADER_SOURCE: string = `
uniform mat4 world;
uniform mat4 viewProjection;
uniform vec3 cameraPosition;

attribute vec3 position;
attribute vec3 normal;
attribute vec3 tangent;

// Shape parameters
uniform float _Radius_;
uniform float _Line_Width_;
uniform bool _Absolute_Sizes_;
uniform float _Filter_Width_;

// Color parameters
uniform vec4 _Base_Color_;
uniform vec4 _Line_Color_;

// Per-corner radius controls
uniform float _Radius_Top_Left_;
uniform float _Radius_Top_Right_;
uniform float _Radius_Bottom_Left_;
uniform float _Radius_Bottom_Right_;

// Animation parameters
uniform float _Rate_;

// Highlight parameters
uniform vec4 _Highlight_Color_;
uniform float _Highlight_Width_;
uniform vec4 _Highlight_Transform_;
uniform float _Highlight_;

// Iridescence parameters
uniform float _Iridescence_Intensity_;
uniform float _Iridescence_Edge_Intensity_;
uniform vec4 _Iridescence_Tint_;
uniform sampler2D _Iridescent_Map_;

// Gradient parameters
uniform float _Angle_;
uniform bool _Reflected_;
uniform float _Frequency_;
uniform float _Vertical_Offset_;
uniform vec4 _Gradient_Color_;
uniform vec4 _Top_Left_;
uniform vec4 _Top_Right_;
uniform vec4 _Bottom_Left_;
uniform vec4 _Bottom_Right_;

// Edge parameters
uniform float _Edge_Width_;
uniform float _Edge_Power_;
uniform float _Line_Gradient_Blend_;
uniform float _Fade_Out_;

// Varyings passed to fragment shader
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;
varying vec3 vTangent;
varying vec3 vBinormal;
varying vec4 vExtra1;
varying vec4 vExtra2;

/**
 * Transform position from object space to world space
 */
void Object_To_World_Pos_B314(
    vec3 Pos_Object,
    out vec3 Pos_World
) {
    Pos_World = (world * vec4(Pos_Object, 1.0)).xyz;
}

/**
 * Calculate rounded rectangle vertex parameters
 */
void Round_Rect_Vertex_B357(
    vec2 UV,
    float Radius,
    float Margin,
    float Anisotropy,
    float Gradient1,
    float Gradient2,
    vec3 Normal,
    vec4 Color_Scale_Translate,
    out vec2 Rect_UV,
    out vec4 Rect_Parms,
    out vec2 Scale_XY,
    out vec2 Line_UV,
    out vec2 Color_UV_Info
) {
    Scale_XY = vec2(Anisotropy, 1.0);
    Line_UV = (UV - vec2(0.5, 0.5));
    Rect_UV = Line_UV * Scale_XY;
    Rect_Parms.xy = Scale_XY * 0.5 - vec2(Radius, Radius) - vec2(Margin, Margin);
    Rect_Parms.z = Gradient1;
    Rect_Parms.w = Gradient2;
    Color_UV_Info = (Line_UV + vec2(0.5, 0.5)) * Color_Scale_Translate.xy + Color_Scale_Translate.zw;
}

/**
 * Calculate animated line vertex position for highlight effect
 */
void Line_Vertex_B333(
    vec2 Scale_XY,
    vec2 UV,
    float Time,
    float Rate,
    vec4 Highlight_Transform,
    out vec3 Line_Vertex
) {
    float angle2 = (Rate * Time) * 2.0 * 3.1416;
    float sinAngle2 = sin(angle2);
    float cosAngle2 = cos(angle2);
    vec2 xformUV = UV * Highlight_Transform.xy + Highlight_Transform.zw;
    Line_Vertex.x = 0.0;
    Line_Vertex.y = cosAngle2 * xformUV.x - sinAngle2 * xformUV.y;
    Line_Vertex.z = 0.0;
}

/**
 * Calculate direction vector from angle and basis vectors
 */
void PickDir_B334(
    float Degrees,
    vec3 DirX,
    vec3 DirY,
    out vec3 Dir
) {
    float a = Degrees * 3.14159 / 180.0;
    Dir = cos(a) * DirX + sin(a) * DirY;
}

/**
 * Move vertices to create rounded corners
 */
void Move_Verts_B327(
    float Anisotropy,
    vec3 P,
    float Radius,
    out vec3 New_P,
    out vec2 New_UV,
    out float Radial_Gradient,
    out vec3 Radial_Dir
) {
    vec2 UV = P.xy * 2.0 + 0.5;
    vec2 center = clamp(UV, 0.0, 1.0);
    vec2 delta = UV - center;
    vec2 r2 = 2.0 * vec2(Radius / Anisotropy, Radius);
    New_UV = center + r2 * (UV - 2.0 * center + 0.5);
    New_P = vec3(New_UV - 0.5, P.z);
    Radial_Gradient = 1.0 - length(delta) * 2.0;
    Radial_Dir = vec3(delta * r2, 0.0);
}

/**
 * Select appropriate corner radius based on vertex position
 */
void Pick_Radius_B336(
    float Radius,
    float Radius_Top_Left,
    float Radius_Top_Right,
    float Radius_Bottom_Left,
    float Radius_Bottom_Right,
    vec3 Position,
    out float Result
) {
    bool whichY = Position.y > 0.0;
    Result = Position.x < 0.0 
        ? (whichY ? Radius_Top_Left : Radius_Bottom_Left)
        : (whichY ? Radius_Top_Right : Radius_Bottom_Right);
    Result *= Radius;
}

/**
 * Calculate edge anti-aliasing gradients based on view angle
 */
void Edge_AA_Vertex_B328(
    vec3 Position_World,
    vec3 Position_Object,
    vec3 Normal_Object,
    vec3 Eye,
    float Radial_Gradient,
    vec3 Radial_Dir,
    vec3 Tangent,
    out float Gradient1,
    out float Gradient2
) {
    vec3 I = (Eye - Position_World);
    vec3 T = (vec4(Tangent, 0.0)).xyz;
    float g = (dot(T, I) < 0.0) ? 0.0 : 1.0;
    
    if (Normal_Object.z == 0.0) {
        Gradient1 = Position_Object.z > 0.0 ? g : 1.0;
        Gradient2 = Position_Object.z > 0.0 ? 1.0 : g;
    } else {
        Gradient1 = g + (1.0 - g) * (Radial_Gradient);
        Gradient2 = 1.0;
    }
}

/**
 * Transform direction from object space to world space
 */
void Object_To_World_Dir_B330(
    vec3 Dir_Object,
    out vec3 Binormal_World,
    out vec3 Binormal_World_N,
    out float Binormal_Length
) {
    Binormal_World = (world * vec4(Dir_Object, 0.0)).xyz;
    Binormal_Length = length(Binormal_World);
    Binormal_World_N = Binormal_World / Binormal_Length;
}

/**
 * Convert relative or absolute measurements based on size mode
 */
void RelativeOrAbsoluteDetail_B341(
    float Nominal_Radius,
    float Nominal_LineWidth,
    bool Absolute_Measurements,
    float Height,
    out float Radius,
    out float Line_Width
) {
    float scale = Absolute_Measurements ? 1.0 / Height : 1.0;
    Radius = Nominal_Radius * scale;
    Line_Width = Nominal_LineWidth * scale;
}

void main() {
    // Calculate world-space normal
    vec3 Nrm_World_Q326 = normalize((world * vec4(normal, 0.0)).xyz);
    
    // Calculate tangent in world space
    vec3 Tangent_World_Q329 = (world * vec4(vec3(1, 0, 0), 0.0)).xyz;
    float Tangent_Length_Q329 = length(Tangent_World_Q329);
    vec3 Tangent_World_N_Q329 = Tangent_World_Q329 / Tangent_Length_Q329;
    
    // Calculate binormal in world space
    vec3 Binormal_World_Q330;
    vec3 Binormal_World_N_Q330;
    float Binormal_Length_Q330;
    Object_To_World_Dir_B330(vec3(0, 1, 0), Binormal_World_Q330, Binormal_World_N_Q330, Binormal_Length_Q330);
    
    // Calculate actual radius and line width
    float Radius_Q341;
    float Line_Width_Q341;
    RelativeOrAbsoluteDetail_B341(_Radius_, _Line_Width_, _Absolute_Sizes_, Binormal_Length_Q330, Radius_Q341, Line_Width_Q341);
    
    // Calculate gradient direction
    vec3 Dir_Q334;
    PickDir_B334(_Angle_, Tangent_World_N_Q329, Binormal_World_N_Q330, Dir_Q334);
    
    // Pick corner-specific radius
    float Result_Q336;
    Pick_Radius_B336(Radius_Q341, _Radius_Top_Left_, _Radius_Top_Right_, _Radius_Bottom_Left_, _Radius_Bottom_Right_, position, Result_Q336);
    
    // Calculate anisotropy ratio
    float Anisotropy_Q331 = Tangent_Length_Q329 / Binormal_Length_Q330;
    
    // Pack radius and line width into color output
    vec4 Out_Color_Q337 = vec4(Result_Q336, Line_Width_Q341, 0, 1);
    
    // Move vertices to create rounded shape
    vec3 New_P_Q327;
    vec2 New_UV_Q327;
    float Radial_Gradient_Q327;
    vec3 Radial_Dir_Q327;
    Move_Verts_B327(Anisotropy_Q331, position, Result_Q336, New_P_Q327, New_UV_Q327, Radial_Gradient_Q327, Radial_Dir_Q327);
    
    // Transform to world space
    vec3 Pos_World_Q314;
    Object_To_World_Pos_B314(New_P_Q327, Pos_World_Q314);
    
    // Calculate edge anti-aliasing gradients
    float Gradient1_Q328;
    float Gradient2_Q328;
    #if SMOOTH_EDGES
    Edge_AA_Vertex_B328(Pos_World_Q314, position, normal, cameraPosition, Radial_Gradient_Q327, Radial_Dir_Q327, tangent, Gradient1_Q328, Gradient2_Q328);
    #else
    Gradient1_Q328 = 1.0;
    Gradient2_Q328 = 1.0;
    #endif
    
    // Calculate rounded rectangle parameters
    vec2 Rect_UV_Q357;
    vec4 Rect_Parms_Q357;
    vec2 Scale_XY_Q357;
    vec2 Line_UV_Q357;
    vec2 Color_UV_Info_Q357;
    Round_Rect_Vertex_B357(New_UV_Q327, Result_Q336, 0.0, Anisotropy_Q331, Gradient1_Q328, Gradient2_Q328, normal, vec4(1, 1, 0, 0), Rect_UV_Q357, Rect_Parms_Q357, Scale_XY_Q357, Line_UV_Q357, Color_UV_Info_Q357);
    
    // Calculate animated line vertex for highlight
    vec3 Line_Vertex_Q333;
    Line_Vertex_B333(Scale_XY_Q357, Line_UV_Q357, (20.0), _Rate_, _Highlight_Transform_, Line_Vertex_Q333);
    
    // Pack color UV info
    float X_Q359 = Color_UV_Info_Q357.x;
    float Y_Q359 = Color_UV_Info_Q357.y;
    vec4 Vec4_Q358 = vec4(X_Q359, Y_Q359, Result_Q336, Line_Width_Q341);
    
    // Set output position
    gl_Position = viewProjection * vec4(Pos_World_Q314, 1);
    
    // Pass varyings to fragment shader
    vPosition = Pos_World_Q314;
    vNormal = Nrm_World_Q326;
    vUV = Rect_UV_Q357;
    vTangent = Line_Vertex_Q333;
    vBinormal = Dir_Q334;
    vExtra1 = Rect_Parms_Q357;
    vExtra2 = Vec4_Q358;
}
`;

/**
 * Shader definition object containing metadata and source
 */
export interface ShaderDefinition {
    /** Unique shader identifier */
    name: string;
    /** GLSL shader source code */
    shader: string;
}

/**
 * Complete shader definition for MRDL backplate vertex shader
 */
export const mrdlBackplateVertexShader: ShaderDefinition;