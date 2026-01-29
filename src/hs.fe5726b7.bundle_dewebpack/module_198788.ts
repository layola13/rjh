export const MODULE_FIELD_MAPPINGS = {
  timeCreated: "time_created",
  timeModified: "time_modified",
  neighborName: "neighborName"
} as const;

export type FieldMappingKey = keyof typeof MODULE_FIELD_MAPPINGS;
export type FieldMappingValue = typeof MODULE_FIELD_MAPPINGS[FieldMappingKey];