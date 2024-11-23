export type Snack = {
  id: number;
  name: string;
  description: string;
  price: number;
  tag: SnackFlavour[];
  slug: string;
  images: Image[];
  _updatedAt: string;
};

export type Image = {
  url: string;
};

export type SnackFlavour = 'sweet' | 'salted';

export type Packaging = {
  name: string;
  price: number;
  tag: string[];
  _updatedAt: string;
};

export type AllSnackResponse = {
  allItems: Snack[];
  _allItemsMeta: {
    count: number;
  };
};

export type SnackResponse = {
  item: Snack;
};

export type AllPackagingsResponse = {
  allPackagings: Packaging[];
  _allItemsMeta: {
    count: number;
  };
};
