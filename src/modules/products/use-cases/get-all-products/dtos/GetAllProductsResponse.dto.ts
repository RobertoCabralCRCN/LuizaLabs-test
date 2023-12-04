export interface IGetAllProductResponseDTO {
  product_id: number;
  name: string;
  description: string;
  value: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}
