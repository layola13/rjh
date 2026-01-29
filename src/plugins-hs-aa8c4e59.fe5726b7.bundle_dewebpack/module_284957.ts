import { generateBomData } from './generateBomData';
import { B2Data } from './B2Data';

export async function bomDataToBom2<T = unknown>(
  bomData: unknown,
  options?: unknown
): Promise<T> {
  return await new B2Data(bomData).genBom2Data(undefined, options);
}

export async function bomDataToBom2WithStatus<T = unknown>(
  bomData: unknown
): Promise<T> {
  return await new B2Data(bomData).genBom2DataWithStus();
}

export async function getBom2Data<T = unknown>(
  bomData: unknown,
  param1: unknown,
  param2: unknown,
  param3: unknown
): Promise<T> {
  return await new B2Data(bomData).getData(param1, param2, param3);
}

export async function toBom2<T = unknown>(): Promise<T> {
  const bomData = await generateBomData();
  return await bomDataToBom2(bomData);
}