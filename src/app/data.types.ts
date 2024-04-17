type Row = {
  name: string;
  price: string;
  lastUpdatedDate: string;
};

export type Data = {
  data: {
    priceList: Row[];
  }
};
