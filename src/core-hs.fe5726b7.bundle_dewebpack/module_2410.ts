interface PAssemblyMetadata {
  userFreeData?: {
    defaultValues?: Array<{
      equation: string;
    }>;
  };
}

interface PAssembly {
  metadata?: PAssemblyMetadata;
}

interface RotationInfo {
  opening: string;
  rotationId: string;
}

interface ContentRotations {
  [key: string]: RotationInfo;
}

declare namespace HSCore {
  namespace Model {
    class PAssembly {
      metadata?: PAssemblyMetadata;
    }
  }
}

export const PAssemblyRotation = {
  getContentRotations(assembly: PAssembly | undefined): ContentRotations | undefined {
    if (!assembly || !(assembly instanceof HSCore.Model.PAssembly)) {
      return;
    }

    if (!assembly.metadata?.userFreeData?.defaultValues) {
      return;
    }

    const rotations: ContentRotations = {};

    assembly.metadata.userFreeData.defaultValues.forEach((defaultValue) => {
      const normalizedEquation = defaultValue.equation
        .toLowerCase()
        .split(' ')
        .join('');

      const openingIndex = normalizedEquation.indexOf('_opening=');

      if (openingIndex !== -1) {
        const rotationId = normalizedEquation.substring(0, openingIndex);
        const opening = normalizedEquation.substring(openingIndex + 9);
        const lastChar = rotationId.substring(rotationId.length - 1);

        rotations[rotationId] = {
          opening,
          rotationId
        };

        rotations[`id_handle${lastChar}`] = {
          opening,
          rotationId
        };
      }
    });

    return rotations;
  }
};