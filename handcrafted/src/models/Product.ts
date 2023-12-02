export interface Product {
  _id: string;

  sellerId: string;
  title: string;
  description: string;
  price: number;
  images: string[ ];
}