export interface ICreateMealPayload {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  image: string;
  providerId: string;
}

export interface IUpdateMealPayload {
  name?: string;
  price?: number;
  description?: string;
  categoryId?: string;
  image?: string;
}
