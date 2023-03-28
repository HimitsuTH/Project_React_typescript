export interface brand {
  id?: any | null;
  name?: string;
  description?: string;
}

export interface headphone {
  brand?: any | string | null;
  id?: any | string | null;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}
