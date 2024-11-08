export type Snack = {
  name: string;
  price: number;
  tag: string[];
  _updatedAt: string;
};

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
