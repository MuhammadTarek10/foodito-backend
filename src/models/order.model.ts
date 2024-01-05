export interface Order {
  id: string;
  username: string;
  foodname: string;
  price: string;
  restaurant: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
