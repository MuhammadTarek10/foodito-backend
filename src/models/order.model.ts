export interface Order {
  id: string;
  username: string;
  foodname: string;
  price: number;
  restaurant?: string;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
