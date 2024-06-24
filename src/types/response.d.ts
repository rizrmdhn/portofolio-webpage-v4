export type ApiResponse = {
  data: Data;
};

export type Data = {
  user: User;
};

export type User = {
  pinnedItems: PinnedItems;
};

export type PinnedItems = {
  nodes: PinnedItemsNode[];
};

export type PinnedItemsNode = {
  name: string;
  description: string;
  url: string;
  homepageUrl: null | string;
  languages: Languages;
};

export type Languages = {
  nodes: LanguagesNode[];
};

export type LanguagesNode = {
  name: string;
};
