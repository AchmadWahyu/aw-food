type Row = {
  name: string;
  price: number;
  lastUpdatedDate: string;
};

export type Data = {
  data: {
    priceList: Row[];
  }
};
