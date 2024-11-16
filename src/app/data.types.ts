export type Snack = {
  id: number;
  name: string;
  price: number;
  images: Image[];
  tag: SnackFlavour[];
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

export type AllPackagingsResponse = {
  allPackagings: Packaging[];
  _allItemsMeta: {
    count: number;
  };
};
