interface RendererInfo {
  memory: {
    programs: number;
    geometries: number;
    textures: number;
  };
  render: {
    calls: number;
    vertices: number;
    faces: number;
    points: number;
  };
}

interface WebGLRenderer {
  info: RendererInfo;
}

interface RendererStatsInstance {
  domElement: HTMLDivElement;
  update: (renderer: WebGLRenderer) => void;
}

const UPDATE_INTERVAL_MS = 1000 / 30;

export class RendererStats {
  constructor() {
    return this.createStats();
  }

  private createStats(): RendererStatsInstance {
    const container = document.createElement("div");
    container.style.cssText = "width:80px;opacity:0.9;cursor:pointer";

    const panel = document.createElement("div");
    panel.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#200;";
    container.appendChild(panel);

    const title = document.createElement("div");
    title.style.cssText = "color:#f00;font-family:Helvetica, Arial, sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    title.innerHTML = "WebGLRenderer";
    panel.appendChild(title);

    const statLines: HTMLDivElement[] = [];
    const lineCount = 9;
    
    for (let i = 0; i < lineCount; i++) {
      statLines[i] = document.createElement("div");
      statLines[i].style.cssText = "color:#f00;background-color:#311;font-family:Helvetica, Arial, sans-serif;font-size:9px;font-weight:bold;line-height:15px";
      panel.appendChild(statLines[i]);
      statLines[i].innerHTML = "-";
    }

    let lastUpdateTime = Date.now();

    return {
      domElement: container,
      update: (renderer: WebGLRenderer): void => {
        const currentTime = Date.now();
        
        if (currentTime - lastUpdateTime < UPDATE_INTERVAL_MS) {
          return;
        }

        lastUpdateTime = currentTime;

        let lineIndex = 0;
        statLines[lineIndex++].textContent = " == Memory ====";
        statLines[lineIndex++].textContent = `Programs: ${renderer.info.memory.programs}`;
        statLines[lineIndex++].textContent = `Geometries: ${renderer.info.memory.geometries}`;
        statLines[lineIndex++].textContent = `Textures: ${renderer.info.memory.textures}`;
        statLines[lineIndex++].textContent = " == Render ====";
        statLines[lineIndex++].textContent = `Calls: ${renderer.info.render.calls}`;
        statLines[lineIndex++].textContent = `Vertices: ${renderer.info.render.vertices}`;
        statLines[lineIndex++].textContent = `Faces: ${renderer.info.render.faces}`;
        statLines[lineIndex++].textContent = `Points: ${renderer.info.render.points}`;
      }
    };
  }
}