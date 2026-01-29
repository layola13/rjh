import { AddFaceMoldingRequest } from './AddFaceMoldingRequest';

export class AddWallMoldingRequest extends AddFaceMoldingRequest {
  constructor(
    firstParam: unknown,
    secondParam: unknown,
    thirdParam: unknown
  ) {
    super(firstParam, secondParam, thirdParam);
  }

  onCommit(): void {
    super.onCommit([]);
  }
}