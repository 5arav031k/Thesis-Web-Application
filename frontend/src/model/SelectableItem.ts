export type SelectableItem = {
  index: number;
  itemType: SelectableItemType;
};

export enum SelectableItemType {
  LAUNCH,
  PROFILE,
}
