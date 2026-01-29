import { getCameraPositions, setCameraPositions } from './module_403381';

export default function deleteCameraPosition(index: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const cameraPositions = getCameraPositions();
    
    if (index >= cameraPositions.length || index < 0) {
      reject('delete camera is out of data range');
    } else {
      cameraPositions.splice(index, 1);
      setCameraPositions(cameraPositions);
      resolve();
    }
  });
}