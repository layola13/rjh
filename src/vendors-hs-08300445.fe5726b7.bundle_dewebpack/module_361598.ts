const MIN_SPIN_SIZE = 20;

export function getSpinSize(width: number = 0, height: number = 0): number {
    let spinSize = width / height * width;
    
    if (isNaN(spinSize)) {
        spinSize = 0;
    }
    
    spinSize = Math.max(spinSize, MIN_SPIN_SIZE);
    
    return Math.floor(spinSize);
}