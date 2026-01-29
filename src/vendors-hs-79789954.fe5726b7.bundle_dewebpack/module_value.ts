interface GLContext {
  defaultShader?: Shader;
}

class Shader {}

function getDefaultShader(c: { get(key: string): GLContext }): Shader {
  const glContext = c.get("gl");
  
  if (!glContext.defaultShader) {
    glContext.defaultShader = new Shader();
  }
  
  return glContext.defaultShader;
}