function getDefaultShader(): Shader {
    const gl = context.get("gl");
    gl.defaultShader = gl.defaultShader || new Shader();
    return gl.defaultShader;
}