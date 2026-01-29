export class VolumeLightOption {
    enable: boolean;
    density: number;
    scatteringMultiplier: number;

    constructor(enable: boolean = false, density: number = 1, scatteringMultiplier: number = 2) {
        this.enable = enable;
        this.density = density;
        this.scatteringMultiplier = scatteringMultiplier;
    }

    dump(): VolumeLightOptionData {
        return {
            enable: this.enable,
            density: this.density,
            scatteringMultiplier: this.scatteringMultiplier
        };
    }

    load(data: VolumeLightOptionData): void {
        this.enable = data.enable;
        this.density = data.density;
        this.scatteringMultiplier = data.scatteringMultiplier ?? 2;
    }

    clone(): VolumeLightOption {
        return new VolumeLightOption(this.enable, this.density, this.scatteringMultiplier);
    }
}

interface VolumeLightOptionData {
    enable: boolean;
    density: number;
    scatteringMultiplier: number;
}