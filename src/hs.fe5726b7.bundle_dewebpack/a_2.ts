export const ViewEventTypes = {
  ViewActivating: "viewactivating",
  ViewActivated: "viewactivated",
  Content: "content",
  ContentMouseOver: "contentmouseover",
  ContentMouseLeave: "contentmouseleave"
} as const;

export type ViewEventType = typeof ViewEventTypes[keyof typeof ViewEventTypes];