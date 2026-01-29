export interface PaddingStrategy {
  pad(): void;
  unpad(): void;
}

export const NoPadding: PaddingStrategy = {
  pad(): void {},
  unpad(): void {}
};