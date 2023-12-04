export interface ICreateProductResponseDTO {
  product_id: number;
  name: string;
  description: string;
  value: number;
  is_active: boolean;
  created_at: Date;
}
