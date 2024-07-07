export interface TokenPrice {
  currency: string;
  price: number;
  date: string;
}

export enum SwapDirection {
  FROM,
  TO,
}
