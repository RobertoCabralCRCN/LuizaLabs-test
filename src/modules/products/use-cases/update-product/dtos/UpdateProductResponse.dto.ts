export interface IUpdateProductResponseDTO {
  product_id: number;
  name: string;
  description: string;
  value: number;
  is_active: boolean;
  updated_at: Date;
}
