type Row = {
  name: string;
  price: number;
  lastUpdatedDate: string;
};

export type Data = {
  priceList: Row[];
};

export type Response = {
  data: Data;
};
