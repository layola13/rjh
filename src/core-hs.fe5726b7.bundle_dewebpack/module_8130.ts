export type RGBAColor = [number, number, number, number];

interface TemperatureColorMap {
  [key: number]: RGBAColor;
}

const TEMPERATURE_COLOR_MAP: TemperatureColorMap = {
  2000: [255, 67, 2, 255],
  2100: [255, 73, 4, 255],
  2200: [255, 79, 7, 255],
  2300: [255, 85, 10, 255],
  2400: [255, 91, 13, 255],
  2500: [255, 97, 16, 255],
  2600: [255, 102, 20, 255],
  2700: [255, 108, 24, 255],
  2800: [255, 113, 29, 255],
  2900: [255, 118, 33, 255],
  3000: [255, 124, 38, 255],
  3100: [255, 129, 43, 255],
  3200: [255, 134, 48, 255],
  3300: [255, 139, 54, 255],
  3400: [255, 144, 59, 255],
  3500: [255, 149, 65, 255],
  3600: [255, 153, 71, 255],
  3700: [255, 158, 77, 255],
  3800: [255, 163, 83, 255],
  3900: [255, 167, 89, 255],
  4000: [255, 171, 95, 255],
  4100: [255, 176, 101, 255],
  4200: [255, 180, 108, 255],
  4300: [255, 184, 114, 255],
  4400: [255, 188, 121, 255],
  4500: [255, 192, 127, 255],
  4600: [255, 196, 134, 255],
  4700: [255, 199, 140, 255],
  4800: [255, 203, 147, 255],
  4900: [255, 207, 153, 255],
  5000: [255, 210, 160, 255],
  5100: [255, 214, 166, 255],
  5200: [255, 217, 173, 255],
  5300: [255, 220, 179, 255],
  5400: [255, 224, 186, 255],
  5500: [255, 227, 192, 255],
  5600: [255, 230, 199, 255],
  5700: [255, 233, 205, 255],
  5800: [255, 236, 212, 255],
  5900: [255, 239, 218, 255],
  6000: [255, 242, 224, 255],
  6100: [255, 244, 230, 255],
  6200: [255, 247, 237, 255],
  6300: [255, 250, 243, 255],
  6400: [255, 252, 249, 255],
  6500: [255, 255, 255, 255]
};

const temperatureKeys = Object.keys(TEMPERATURE_COLOR_MAP).map((key) => parseInt(key, 10));
temperatureKeys.push(Infinity);

const DEFAULT_TEMPERATURE = temperatureKeys[0];

/**
 * Finds the nearest color temperature match for a given temperature value
 * @param temperature - The target color temperature in Kelvin
 * @returns RGBA color array corresponding to the nearest temperature
 */
export function nearestTemperature(temperature: string | number): RGBAColor {
  try {
    const targetTemp = Number.parseInt(String(temperature), 10);
    let minDifference = targetTemp - temperatureKeys[0];
    let nearestTemp = temperatureKeys[0];

    for (let index = 0; index < temperatureKeys.length; index++) {
      const currentTemp = temperatureKeys[index];
      
      if (currentTemp > targetTemp) {
        if (currentTemp - targetTemp < minDifference) {
          nearestTemp = currentTemp;
          break;
        }
        nearestTemp = targetTemp - minDifference;
        break;
      }
      
      minDifference = targetTemp - currentTemp;
    }

    return TEMPERATURE_COLOR_MAP[nearestTemp] ?? TEMPERATURE_COLOR_MAP[DEFAULT_TEMPERATURE];
  } catch (error) {
    return TEMPERATURE_COLOR_MAP[DEFAULT_TEMPERATURE];
  }
}