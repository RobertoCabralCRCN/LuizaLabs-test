export interface IUpdateProductRequestDTO {
  product_id: number;
  name?: string;
  description?: string;
  value?: number;
  is_active?: boolean;
}
